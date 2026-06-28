import { Suspense } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CheckoutContent } from './CheckoutContent'

export default async function CheckoutPage() {
  let waNumber = "6285157319611"; // Default fallback
  try {
    const payload = await getPayload({ config: configPromise });
    const contactInfo = await payload.findGlobal({ slug: "contact-info" }) as { whatsappNumber?: string | number } | undefined;
    if (contactInfo?.whatsappNumber) {
      waNumber = contactInfo.whatsappNumber.toString().replace(/^0/, '62');
    }
  } catch (err) {
    console.error("Failed to fetch contact info for WA", err);
  }

  return (
    <Suspense fallback={<div className="container mx-auto px-6 py-24">Loading...</div>}>
      <CheckoutContent waNumber={waNumber} />
    </Suspense>
  )
}
