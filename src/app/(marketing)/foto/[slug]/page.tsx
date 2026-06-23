import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, ShieldCheck, Download, Info } from "lucide-react";
import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const photos = await payload.find({
    collection: 'photos',
    limit: 100,
  })
  return photos.docs.map((p) => ({ slug: p.slug }))
}

export default async function PhotoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise })

  const photoResult = await payload.find({
    collection: 'photos',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  if (photoResult.docs.length === 0) {
    notFound();
  }

  const photo = photoResult.docs[0];

  const aspectClass = photo.orientation === 'portrait' 
    ? 'aspect-[3/4]' 
    : photo.orientation === 'square' 
      ? 'aspect-square' 
      : 'aspect-[4/3]';

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          href="/foto"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image/Preview Column */}
          <div className="sticky top-32">
            <div className={`relative ${aspectClass} w-full overflow-hidden rounded-[2.5rem] border border-border bg-muted shadow-lg`}>
              {photo.file_hires?.url ? (
                <Image
                  src={photo.preview_watermark?.url || photo.file_hires.url}
                  alt={photo.file_hires.alt || photo.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  📸
                </div>
              )}
              {/* Watermark overlay if not hard-baked into the image */}
              {!photo.preview_watermark?.url && (
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="transform -rotate-45 text-4xl sm:text-6xl font-black text-white mix-blend-overlay tracking-widest uppercase">
                    SUNDAY VIBES
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details & Checkout Column */}
          <div className="flex flex-col">
            {photo.category && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-6 w-fit">
                {photo.category}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              {photo.title}
            </h1>
            
            {photo.tags && photo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {photo.tags.map((tag: any, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                  >
                    #{tag.tag}
                  </span>
                ))}
              </div>
            )}

            {/* License Selection Options (Static Layout showing both) */}
            <div className="space-y-6 mb-10">
              <h3 className="text-xl font-bold">Pilih Lisensi</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Standard License */}
                <div className="border-2 border-stone-200 dark:border-stone-700 hover:border-primary transition-colors rounded-3xl p-6 flex flex-col h-full bg-card">
                  <div className="text-lg font-bold mb-1">Standard</div>
                  <div className="text-2xl font-black text-foreground mb-4">
                    Rp {photo.price_standard.toLocaleString('id-ID')}
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Sosial media & blog</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Presentasi & materi internal</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground opacity-50">
                      <svg className="w-4 h-4 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      <span className="line-through">Iklan komersial / cetak</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full rounded-full" variant="outline">
                    <Link href={`/checkout?type=photo&id=${photo.id}&license=standard`} className="w-full">
                      Beli Standard
                    </Link>
                  </Button>
                </div>

                {/* Extended License */}
                <div className="border-2 border-primary rounded-3xl p-6 flex flex-col h-full bg-primary/5 relative">
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                    Recommended
                  </div>
                  <div className="text-lg font-bold mb-1">Extended</div>
                  <div className="text-2xl font-black text-primary mb-4">
                    Rp {photo.price_extended.toLocaleString('id-ID')}
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Semua benefit Standard</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Iklan cetak & digital (Ads)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>Produk untuk dijual kembali (Merchandise)</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href={`/checkout?type=photo&id=${photo.id}&license=extended`} className="w-full">
                      Beli Extended
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900 rounded-3xl p-6 border border-border mb-10 flex gap-4 items-start">
              <div className="bg-white dark:bg-stone-800 p-3 rounded-full shadow-sm">
                <Download className="w-6 h-6 text-stone-700 dark:text-stone-300" />
              </div>
              <div>
                <h4 className="font-bold mb-1">High-Resolution File</h4>
                <p className="text-sm text-muted-foreground">
                  File asli berkualitas tinggi tanpa watermark akan tersedia untuk didownload seketika setelah pembayaran berhasil dikonfirmasi.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
