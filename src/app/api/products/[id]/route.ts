import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import { getCache, setCache } from '@/lib/cloudflare-cache'
import { logger } from '@/lib/logger'

export const revalidate = 1800 // Revalidate setiap 30 menit

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const url = new URL(request.url)
    const license = url.searchParams.get('license') || 'standard'

    // Cache key berdasarkan ID dan license
    const cacheKey = `product-${id}-${license}`

    // Coba ambil dari cache dulu
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

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
      const productData = {
        id: p.id,
        name: p.title,
        price: p.price,
        type: 'product',
        license: p.license_type
      }

      // Simpan ke cache selama 30 menit
      await setCache(cacheKey, productData, { ttl: 1800 })

      return NextResponse.json(productData)
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
      const price = license === 'extended' ? p.price_extended : p.price_standard

      const photoData = {
        id: p.id,
        name: `${p.title} (${license} license)`,
        price: price,
        type: 'photo',
        license: license
      }

      // Simpan ke cache selama 30 menit
      await setCache(cacheKey, photoData, { ttl: 1800 })

      return NextResponse.json(photoData)
    }

    return NextResponse.json({ error: 'Item not found' }, { status: 404 })
  } catch (error) {
    logger.error('Fetch product error', { error: String(error) })
    return NextResponse.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    )
  }
}
