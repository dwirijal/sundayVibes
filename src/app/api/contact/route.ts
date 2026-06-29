import { NextResponse } from 'next/server'
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { getCache, setCache } from '@/lib/cloudflare-cache'

export const revalidate = 3600 // Revalidate setiap 1 jam

export async function GET() {
  const cacheKey = 'contact-info'

  try {
    // Coba ambil dari cache dulu
    const cached = await getCache(cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    if (process.env.CI) return NextResponse.json({ whatsappNumber: "6285157319611" })

    // Jika tidak ada di cache, ambil dari database
    const payload = await getPayload({ config: configPromise })
    const contactInfo = await payload.findGlobal({ slug: "contact-info" }) as { whatsappNumber?: string | number }
    let waNumber = "6285157319611"

    if (contactInfo?.whatsappNumber) {
      waNumber = contactInfo.whatsappNumber.toString().replace(/^0/, '62')
    }

    const result = { whatsappNumber: waNumber }

    // Simpan ke cache selama 1 jam
    await setCache(cacheKey, result, { ttl: 3600 })

    return NextResponse.json(result)
  } catch (_error) {
    return NextResponse.json({ whatsappNumber: "6285157319611" })
  }
}