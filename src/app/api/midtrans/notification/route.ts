import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import { sendBookingConfirmation, sendAdminNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const notification = await req.json()

    // Verify notification via Midtrans API
    const serverKey = process.env.MIDTRANS_SERVER_KEY || ''
    const isProduction = process.env.NODE_ENV === 'production'
    const baseUrl = isProduction
      ? 'https://api.midtrans.com/v2'
      : 'https://api.sandbox.midtrans.com/v2'

    const statusResponse = await fetch(
      `${baseUrl}/${notification.order_id}/status`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(serverKey).toString('base64'),
        },
      }
    ).then((res) => res.json())

    const payload = await getPayload({ config })

    // Find booking by order ID (using like to match the notes field)
    const bookings = await payload.find({
      collection: 'bookings',
      where: {
        notes: {
          like: notification.order_id,
        },
      },
      limit: 1,
    })

    if (bookings.docs.length === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const booking = bookings.docs[0]

    // Update booking status and payment_status based on transaction status
    let status = 'pending'
    let payment_status = 'unpaid'

    if (statusResponse.transaction_status === 'capture') {
      if (statusResponse.fraud_status === 'accept') {
        status = 'confirmed'
        payment_status = 'paid'
      }
    } else if (statusResponse.transaction_status === 'settlement') {
      status = 'confirmed'
      payment_status = 'paid'
    } else if (
      statusResponse.transaction_status === 'deny' ||
      statusResponse.transaction_status === 'cancel' ||
      statusResponse.transaction_status === 'expire'
    ) {
      status = 'cancelled'
      payment_status = 'unpaid'
    }

    await payload.update({
      collection: 'bookings',
      id: booking.id,
      data: {
        status,
        payment_status,
      },
    })

    // Send email notifications if payment confirmed
    if (status === 'confirmed') {
      const client = typeof booking.client === 'object' ? booking.client : null;
      const service = typeof booking.service_type === 'object' ? booking.service_type : null;

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
    console.error('Midtrans notification error:', error)
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    )
  }
}
