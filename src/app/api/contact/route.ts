import { NextResponse } from 'next/server'
import { getPayload } from "payload"
import configPromise from "@payload-config"

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const contactInfo = await payload.findGlobal({ slug: "contact-info" }) as { whatsappNumber?: string | number }
    let waNumber = "6285157319611"
    
    if (contactInfo?.whatsappNumber) {
      waNumber = contactInfo.whatsappNumber.toString().replace(/^0/, '62')
    }
    
    return NextResponse.json({ whatsappNumber: waNumber })
  } catch (_error) {
    return NextResponse.json({ whatsappNumber: "6285157319611" })
  }
}