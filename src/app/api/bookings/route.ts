import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'
import { logger } from '@/lib/logger'
import { sendBookingConfirmation, sendAdminNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, type, license, customer, amount, service, date, notes } = body

    const payload = await getPayload({ config })

    // Validate required fields
    if (!customer?.email || !customer?.name) {
      return NextResponse.json(
        { error: 'Customer name and email are required' },
        { status: 400 },
      )
    }

    // Find or create user (override access — public endpoint)
    let userId: string | number
    const existingUsers = await payload.find({
      collection: 'users',
      where: { email: { equals: customer.email } },
      limit: 1,
      overrideAccess: true,
    })

    if (existingUsers.docs.length > 0) {
      userId = existingUsers.docs[0].id
    } else {
      const newUser = await payload.create({
        collection: 'users',
        data: {
          email: customer.email,
          name: customer.name,
          phone: customer.phone || '',
          role: 'client',
          password: crypto.randomUUID() + 'A1!',
        },
        overrideAccess: true,
      })
      userId = newUser.id
    }

    // Determine product/service info
    let itemName = 'General Booking'
    let bookingNotes = notes || ''

    if (type === 'product' || type === 'photo') {
      // Digital product or photo purchase
      const collection = type === 'photo' ? 'photos' : 'products'
      const product = await payload.findByID({
        collection,
        id: productId,
      }).catch(() => null)

      if (product) {
        itemName = product.title || 'Product'
        bookingNotes = `Item: ${itemName}\nType: ${type}\n${license ? `License: ${license}` : ''}`
      }
    }

    if (type === 'booking') {
      bookingNotes = `Service: ${service}\nProject Date: ${date}\n${notes || ''}`
    }

    // Find matching service slug
    let serviceId: string | number | null = null
    const serviceSlugMap: Record<string, string> = {
      events: 'events',
      digital: 'digital',
      'sewa-alat': 'sewa-alat',
      design: 'design',
      coding: 'coding',
      wordpress: 'wordpress',
      photography: 'photography',
    }
    const lookupSlug = serviceSlugMap[service] || service || 'events'
    const relatedService = await payload.find({
      collection: 'services',
      where: { slug: { equals: lookupSlug } },
      limit: 1,
      overrideAccess: true,
    })
    serviceId = relatedService.docs.length > 0 ? relatedService.docs[0].id : null

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${crypto.randomUUID().split('-')[0]}`

    // Create booking
    const booking = await payload.create({
      collection: 'bookings',
      data: {
        order_id: orderId,
        ...(serviceId && { service_type: serviceId }),
        client: userId,
        date: date || new Date().toISOString(),
        amount: amount || 0,
        notes: bookingNotes,
        status: 'pending',
        payment_status: 'unpaid',
      },
      overrideAccess: true,
    })

    // Send notification emails (non-blocking)
    try {
      await sendBookingConfirmation(customer.email, {
        service: itemName,
        date: date || new Date().toISOString(),
        duration: 1,
        totalPrice: amount || 0,
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone || '',
      })
      await sendAdminNotification({
        service: itemName,
        date: date || new Date().toISOString(),
        duration: 1,
        totalPrice: amount || 0,
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone || '',
      })
    } catch (emailErr) {
      logger.error('Email notification failed (non-blocking)', { error: String(emailErr) })
    }

    return NextResponse.json({ booking, order_id: orderId }, { status: 201 })
  } catch (error) {
    logger.error('Booking creation error', { error: String(error) })
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 },
    )
  }
}
