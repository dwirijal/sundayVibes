import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })
    
    // First, try to find it as a digital product
    let result = await payload.find({
      collection: 'products',
      where: {
        or: [
          { id: { equals: id } },
          { slug: { equals: id } }
        ]
      },
      limit: 1,
    })

    if (result.docs.length > 0) {
      const p = result.docs[0]
      return NextResponse.json({
        id: p.id,
        name: p.title,
        price: p.price,
        type: 'product',
        license: p.license_type
      })
    }

    // Next, try to find it as a photo
    result = await payload.find({
      collection: 'photos',
      where: {
        or: [
          { id: { equals: id } },
          { slug: { equals: id } }
        ]
      },
      limit: 1,
    })

    if (result.docs.length > 0) {
      const p = result.docs[0]
      const url = new URL(request.url)
      const license = url.searchParams.get('license') || 'standard'
      const price = license === 'extended' ? p.price_extended : p.price_standard

      return NextResponse.json({
        id: p.id,
        name: `${p.title} (${license} license)`,
        price: price,
        type: 'photo',
        license: license
      })
    }

    return NextResponse.json({ error: 'Item not found' }, { status: 404 })
  } catch (error) {
    console.error('Fetch product error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    )
  }
}
