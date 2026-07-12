import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (process.env.NEXT_PHASE === 'phase-production-build' && !process.env.DATABASE_URI) return []
  try {
    const payload = await getPayload({ config: configPromise })
    const products = await payload.find({
      collection: 'products',
      limit: 100,
    })
    return products.docs.map((p) => ({ slug: p.slug }))
  } catch (e) {
    console.error('generateStaticParams failed (produk-digital)', e)
    return []
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise })

  const productResult = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  if (productResult.docs.length === 0) {
    notFound();
  }

  const product = productResult.docs[0];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          href="/produk-digital"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Produk Digital
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image/Preview Column */}
          <div className="sticky top-32">
            <div className="relative aspect-video lg:aspect-square w-full overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-lg">
              {product.preview?.url ? (
                <Image
                  src={product.preview.url}
                  alt={product.preview.alt || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  📦
                </div>
              )}
            </div>
          </div>

          {/* Details & Checkout Column */}
          <div className="flex flex-col">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-wider mb-6 w-fit">
              {product.type}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              {product.title}
            </h1>

            <div className="text-3xl font-black text-foreground mb-8 pb-8 border-b border-border">
              Rp {product.price.toLocaleString('id-ID')}
            </div>

            <div className="space-y-6 mb-10">
              <h3 className="text-lg font-bold">Lisensi: <span className="capitalize text-primary">{product.license_type}</span></h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.license_type === 'personal' && 'Hanya untuk penggunaan pribadi. Tidak boleh dijual kembali atau digunakan untuk project komersial klien.'}
                {product.license_type === 'commercial' && 'Dapat digunakan untuk project komersial, materi marketing, dan end-product klien. Tidak untuk dijual kembali sebagai asset stand-alone.'}
                {product.license_type === 'extended' && 'Lisensi penuh. Dapat digunakan pada end-product yang dijual massal atau aplikasi SaaS.'}
              </p>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900 rounded-3xl p-8 border border-border mb-10">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Secure Checkout
              </h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Instant Download setelah pembayaran berhasil</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>File akan dikirimkan otomatis ke email Anda</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Life-time access via dashboard klien</span>
                </li>
              </ul>

              <Button asChild size="lg" className="w-full rounded-full h-14 text-lg font-bold bg-foreground text-background hover:bg-foreground/90">
                <Link href={`/checkout?type=digital&id=${product.id}`} className="flex items-center justify-center gap-2 w-full">
                  Beli Sekarang
                </Link>
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
