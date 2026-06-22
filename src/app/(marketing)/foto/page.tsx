import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import FotoPage from './FotoPageClient'

export const metadata: Metadata = {
  title: "Foto Marketplace - Sunday Vibes",
  description: "Marketplace foto profesional untuk kebutuhan komersial, editorial, dan personal. Standard & Extended license.",
};

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const photos = await payload.find({
    collection: 'photos',
    limit: 100,
    depth: 1,
  })

  return <FotoPage photos={photos.docs as any} />
}
