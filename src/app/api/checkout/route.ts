import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'
import { snap, generateOrderId } from '@/lib/midtrans'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId, type, license, customer } = body

    const payload = await getPayload({ config })

    let itemDetails: any = null;

    if (type === 'photo') {
      const photo = await payload.findByID({
        collection: 'photos',
        id: productId,
      });

      if (!photo) {
        return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
      }

      const price = license === 'extended' ? photo.price_extended : photo.price_standard;

      itemDetails = {
        id: photo.id,
        price: price,
        quantity: 1,
        name: `${photo.title} (${license} license)`,
      }
    } else {
      // Default to digital products
      const product = await payload.findByID({
        collection: 'products',
        id: productId,
      });

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }

      itemDetails = {
        id: product.id,
        price: product.price,
        quantity: 1,
        name: product.title,
      }
    }

    const orderId = generateOrderId()

    // Create Midtrans transaction
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: itemDetails.price,
      },
      customer_details: {
        first_name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      item_details: [itemDetails],
    }

    const transaction = await snap.createTransaction(parameter)

    // Background database operations via `after()`
    after(async () => {
      try {
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

        // Find the digital product / photo service
        const serviceSlug = type === 'photo' ? 'photography' : 'digital';
        const relatedService = await payload.find({
          collection: 'services',
          where: { slug: { equals: serviceSlug } },
          limit: 1,
        })

        const serviceId = relatedService.docs.length > 0 ? relatedService.docs[0].id : null;

        // Create booking record
        await payload.create({
          collection: 'bookings',
          data: {
            ...(serviceId && { service_type: serviceId }),
            client: userId,
            date: new Date().toISOString(),
            amount: itemDetails.price,
            notes: `Order ID: ${orderId}\nItem: ${itemDetails.name}\nType: ${type}`,
            status: 'pending',
            payment_status: 'unpaid',
          },
        })
      } catch (dbErr) {
        console.error('Background DB error:', dbErr)
      }
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
