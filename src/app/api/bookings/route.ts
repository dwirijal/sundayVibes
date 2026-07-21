import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'
import { logger } from '@/lib/logger'
import { sendBookingConfirmation, sendAdminNotification } from '@/lib/email'
import { rateLimit, getClientIp } from '@/lib/rateLimit'

type BookingBody = {
  productId?: string | number
  type?: string
  license?: string
  customer?: { email?: string; name?: string; phone?: string }
  service?: string
  date?: string
  notes?: string
  // amount intentionally ignored — priced server-side
}

async function resolveAmount(
  payload: Awaited<ReturnType<typeof getPayload>>,
  body: BookingBody,
): Promise<{ amount: number; itemName: string; bookingNotes: string; serviceId: string | number | null }> {
  const { productId, type, license, service, date, notes } = body
  let itemName = 'General Booking'
  let bookingNotes = notes || ''
  let amount = 0
  let serviceId: string | number | null = null

  if ((type === 'product' || type === 'photo') && productId != null) {
    const collection = type === 'photo' ? 'photos' : 'products'
    const product = await payload
      .findByID({ collection, id: String(productId), overrideAccess: true })
      .catch(() => null)

    if (!product) {
      throw Object.assign(new Error('Product not found'), { status: 404 })
    }

    itemName = product.title || 'Product'
    if (type === 'photo') {
      const lic = license === 'extended' ? 'extended' : 'standard'
      amount =
        lic === 'extended'
          ? Number(product.price_extended) || 0
          : Number(product.price_standard) || 0
      bookingNotes = `Item: ${itemName}\nType: photo\nLicense: ${lic}`
    } else {
      amount = Number(product.price) || 0
      bookingNotes = `Item: ${itemName}\nType: product\n${license ? `License: ${license}` : ''}`
    }
  }

  if (type === 'booking') {
    bookingNotes = `Service: ${service}\nProject Date: ${date}\n${notes || ''}`
    // Manual/WA bookings: amount 0 until admin sets it
    amount = 0
  }

  const serviceSlugMap: Record<string, string> = {
    events: 'events',
    digital: 'digital',
    'sewa-alat': 'sewa-alat',
    design: 'design',
    coding: 'coding',
    wordpress: 'wordpress',
    photography: 'photography',
  }
  const lookupSlug =
    type === 'photo' || type === 'product'
      ? 'photography'
      : serviceSlugMap[service || ''] || service || 'events'

  const relatedService = await payload.find({
    collection: 'services',
    where: { slug: { equals: lookupSlug } },
    limit: 1,
    overrideAccess: true,
  })
  serviceId = relatedService.docs.length > 0 ? relatedService.docs[0].id : null

  if ((type === 'product' || type === 'photo') && amount <= 0) {
    throw Object.assign(new Error('Invalid product price'), { status: 400 })
  }

  return { amount, itemName, bookingNotes, serviceId }
}

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(getClientIp(req), 10, 60_000)) {
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan. Coba lagi dalam 1 menit.' },
        { status: 429 },
      )
    }

    const body = (await req.json()) as BookingBody
    const { productId, type, license, customer, service, date, notes } = body

    if (!customer?.email || !customer?.name) {
      return NextResponse.json(
        { error: 'Customer name and email are required' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Find or create user (public checkout — override access)
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

    const { amount, itemName, bookingNotes, serviceId } = await resolveAmount(payload, {
      productId,
      type,
      license,
      service,
      date,
      notes,
    })

    const orderId = `ORD-${Date.now()}-${crypto.randomUUID().split('-')[0]}`

    const booking = await payload.create({
      collection: 'bookings',
      data: {
        order_id: orderId,
        ...(serviceId && { service_type: serviceId }),
        client: userId,
        date: date || new Date().toISOString(),
        amount,
        notes: bookingNotes,
        status: 'pending',
        payment_status: 'unpaid',
      },
      overrideAccess: true,
    })

    try {
      await sendBookingConfirmation(customer.email, {
        service: itemName,
        date: date || new Date().toISOString(),
        duration: 1,
        totalPrice: amount,
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone || '',
      })
      await sendAdminNotification({
        service: itemName,
        date: date || new Date().toISOString(),
        duration: 1,
        totalPrice: amount,
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone || '',
      })
    } catch (emailErr) {
      logger.error('Email notification failed (non-blocking)', { error: String(emailErr) })
    }

    return NextResponse.json({ booking, order_id: orderId, amount }, { status: 201 })
  } catch (error) {
    const status = (error as { status?: number })?.status
    if (status === 404 || status === 400) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Bad request' },
        { status },
      )
    }
    logger.error('Booking creation error', { error: String(error) })
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
