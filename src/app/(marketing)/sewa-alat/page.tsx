import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import SewaAlatClient from './SewaAlatClient'

export const metadata: Metadata = {
  title: "Sewa Alat - Sunday Vibes",
  description: "Katalog persewaan alat dokumentasi profesional: kamera, lensa, lighting, drone, audio, dan perlengkapan produksi.",
};

export default async function Page() {
  let equipment: any = { docs: [] }
  try {
    const payload = await getPayload({ config: configPromise })

    equipment = await payload.find({
      collection: 'equipment',
      limit: 100,
      depth: 1,
    })
  } catch (error) {
    console.error('Failed to fetch equipment:', error)
  }

  const serializedEquipment = (equipment.docs as unknown as Array<{
    id: string;
    name: string;
    slug: string;
    price_per_day: number;
    available: number;
    images?: Array<{ image?: { url?: string; alt?: string } }>;
  }>).map((doc) => ({
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    price_per_day: doc.price_per_day,
    available: doc.available,
    images: doc.images?.map((img) => ({
      image: {
        url: img.image?.url || '',
        alt: img.image?.alt,
      }
    }))
  }));

  return <SewaAlatClient equipment={serializedEquipment} />
}
