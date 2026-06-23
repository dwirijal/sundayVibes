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

  const serializedPhotos = photos.docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    price_standard: doc.price_standard,
    price_extended: doc.price_extended,
    file_hires: doc.file_hires ? { url: doc.file_hires.url, alt: doc.file_hires.alt } : { url: '' },
    preview_watermark: doc.preview_watermark ? { url: doc.preview_watermark.url } : undefined,
  }));

  return <FotoPage photos={serializedPhotos} />
}
