import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'
import { snap, generateOrderId } from '@/lib/midtrans'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, customer } = body

    const payload = await getPayload({ config })

    // Fetch product details
    const product = await payload.findByID({
      collection: 'products',
      id: productId,
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const orderId = generateOrderId()

    // Create Midtrans transaction
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: product.price,
      },
      customer_details: {
        first_name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      item_details: [
        {
          id: product.id,
          price: product.price,
          quantity: 1,
          name: product.title,
        },
      ],
    }

    const transaction = await snap.createTransaction(parameter)

    // Find or create user for this customer
    let userId: string | number
    const existingUsers = await payload.find({
      collection: 'users',
      where: { email: { equals: customer.email } },
      limit: 1,
    })

    if (existingUsers.docs.length > 0) {
      userId = existingUsers.docs[0].id
    } else {
      // Create guest user account
      const newUser = await payload.create({
        collection: 'users',
        data: {
          email: customer.email,
          name: customer.name,
          phone: customer.phone,
          role: 'client',
          password: Math.random().toString(36).slice(-12), // Random password for guest
        },
      })
      userId = newUser.id
    }

    // Find the digital product service
    const digitalService = await payload.find({
      collection: 'services',
      where: { slug: { equals: 'digital' } },
      limit: 1,
    })

    // Create booking record
    await payload.create({
      collection: 'bookings',
      data: {
        service_type: digitalService.docs[0].id,
        client: userId,
        date: new Date().toISOString(),
        amount: product.price,
        notes: `Order ID: ${orderId}\nProduct: ${product.title}`,
        status: 'pending',
        payment_status: 'unpaid',
      },
    })

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: orderId,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}
