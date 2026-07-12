import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ProdukDigitalClient from './ProdukDigitalClient'

export const metadata: Metadata = {
  title: "Produk Digital - Sunday Vibes",
  description: "Marketplace produk digital: template, ebook, asset kreatif, dan tools digital siap pakai.",
};

export default async function Page() {
  let products = { docs: [] } as any;

  try {
    if (process.env.NEXT_PHASE !== 'phase-production-build' || process.env.DATABASE_URI) {
      const payload = await getPayload({ config: configPromise })

      products = await payload.find({
        collection: 'products',
        limit: 100,
        depth: 1,
      })
    }
  } catch (error) {
    console.error('Failed to fetch digital products:', error);
  }

  // Extract docs and assert them to the expected Client type implicitly by serializing and destructuring if needed,
  // or pass down via mapping to strip off complex backend payload Types.
  const serializedProducts = (products.docs as unknown as Array<{
    id: string;
    title: string;
    slug: string;
    type?: string;
    price: number;
    license_type?: string;
    preview?: { url?: string; alt?: string };
  }>).map((doc) => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    type: doc.type ?? '',
    price: doc.price,
    license_type: doc.license_type ?? '',
    preview: doc.preview ? {
      url: doc.preview.url ?? '',
      alt: doc.preview.alt,
    } : undefined
  }));

  return <ProdukDigitalClient products={serializedProducts} />
}
