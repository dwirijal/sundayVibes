import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ProdukDigitalClient from './ProdukDigitalClient'

export const metadata: Metadata = {
  title: "Produk Digital - Sunday Vibes",
  description: "Marketplace produk digital: template, ebook, asset kreatif, dan tools digital siap pakai.",
};

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 1,
  })

  return <ProdukDigitalClient products={products.docs as any} />
}
