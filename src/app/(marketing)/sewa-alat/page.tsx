import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import SewaAlatClient from './SewaAlatClient'

export const metadata: Metadata = {
  title: "Sewa Alat - Sunday Vibes",
  description: "Katalog persewaan alat dokumentasi profesional: kamera, lensa, lighting, drone, audio, dan perlengkapan produksi.",
};

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const equipment = await payload.find({
    collection: 'equipment',
    limit: 100,
    depth: 1,
  })

  return <SewaAlatClient equipment={equipment.docs as any} />
}
