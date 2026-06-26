import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import { sendBookingConfirmation, sendAdminNotification } from '@/lib/email'
import crypto from 'crypto'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  try {
    const notification = await req.json()

    const serverKey = process.env.MIDTRANS_SERVER_KEY || ''
    if (!serverKey) {
      logger.error('MIDTRANS_SERVER_KEY not configured')
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    // Verify notification signature — reject if tampered
    const orderId = notification.order_id
    const statusCode = notification.status_code
    const grossAmount = notification.gross_amount
    const signatureKey = notification.signature_key

    if (!orderId || !statusCode || !grossAmount || !signatureKey) {
      return NextResponse.json({ error: 'Invalid notification payload' }, { status: 400 })
    }

    const expectedSignature = crypto
      .createHash('sha512')
      .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
      .digest('hex')

    if (expectedSignature !== signatureKey) {
      logger.error('Midtrans notification signature mismatch', { orderId })
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    // Verify transaction status via Midtrans API (belt-and-suspenders)
    const isProduction = process.env.NODE_ENV === 'production'
    const baseUrl = isProduction
      ? 'https://api.midtrans.com/v2'
      : 'https://api.sandbox.midtrans.com/v2'

    const statusResponse = await fetch(
      `${baseUrl}/${orderId}/status`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(serverKey).toString('base64'),
        },
      }
    )

    if (!statusResponse.ok) {
      logger.error('Midtrans status check failed', { status: statusResponse.status, orderId })
      return NextResponse.json({ error: 'Failed to verify payment status' }, { status: 502 })
    }

    const txStatus = await statusResponse.json()

    const payload = await getPayload({ config })

    // Find booking by order_id (direct field, not notes hack)
    const bookings = await payload.find({
      collection: 'bookings',
      where: { order_id: { equals: orderId } },
      limit: 1,
    })

    if (bookings.docs.length === 0) {
      logger.error('Booking not found', { orderId })
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const booking = bookings.docs[0]

    // Map Midtrans status → order status flow: pending → paid → fulfilled
    let status = booking.status
    let payment_status = booking.payment_status

    switch (txStatus.transaction_status) {
      case 'capture':
        if (txStatus.fraud_status === 'accept') {
          status = 'confirmed'
          payment_status = 'paid'
        }
        break
      case 'settlement':
        status = 'confirmed'
        payment_status = 'paid'
        break
      case 'partial_refund':
      case 'refund':
        // Keep status but note partial refund scenario
        status = 'pending'
        payment_status = 'partial'
        break
      case 'deny':
      case 'cancel':
      case 'expire':
        status = 'cancelled'
        payment_status = 'unpaid'
        break
      // pending/authorize — no change
      default:
        break
    }

    await payload.update({
      collection: 'bookings',
      id: booking.id,
      data: { status, payment_status },
    })

    // Send email notifications on payment confirmation
    if (status === 'confirmed' && booking.payment_status !== 'paid') {
      const client = typeof booking.client === 'object' ? booking.client : null
      const service = typeof booking.service_type === 'object' ? booking.service_type : null

      const bookingData = {
        service: service?.title || 'Unknown Service',
        date: booking.date,
        duration: 1,
        totalPrice: booking.amount,
        customerName: client?.name || 'Customer',
        email: client?.email || '',
        phone: client?.phone || '',
      }

      if (bookingData.email) {
        await sendBookingConfirmation(bookingData.email, bookingData)
      }
      await sendAdminNotification(bookingData)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Midtrans notification error', { error: String(error) })
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    )
  }
}
