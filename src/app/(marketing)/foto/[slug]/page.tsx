import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, ShoppingCart, Download, Eye } from "lucide-react";
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
  return photos.docs.map((photo) => ({ slug: photo.slug }))
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

  // Get related photos from same category
  const relatedResult = await payload.find({
    collection: 'photos',
    where: {
      category: { equals: photo.category },
      slug: { not_equals: slug },
    },
    limit: 4,
    depth: 1,
  })

  const relatedPhotos = relatedResult.docs;

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Back Button */}
        <Link
          href="/foto"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Photo Preview */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg group">
            {photo.file_hires?.url ? (
              <Image
                src={photo.preview_watermark?.url || photo.file_hires.url}
                alt={photo.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800" />
            )}
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10">
              {photo.category}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-foreground/40 backdrop-blur-sm z-20">
              <div className="flex items-center gap-2 bg-background/95 px-4 py-2 rounded-full">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-bold">Preview</span>
              </div>
            </div>
          </div>

          {/* Photo Info */}
          <div className="flex flex-col">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4 w-fit">
              {photo.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 leading-tight">
              {photo.title}
            </h1>

            {/* Tags */}
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

            {/* Pricing */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card">
                <div>
                  <div className="font-bold text-foreground">Standard License</div>
                  <div className="text-sm text-muted-foreground">
                    Penggunaan personal & komersial terbatas
                  </div>
                </div>
                <div className="text-2xl font-black text-primary">
                  Rp {photo.price_standard.toLocaleString('id-ID')}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-primary bg-primary/5">
                <div>
                  <div className="font-bold text-foreground">Extended License</div>
                  <div className="text-sm text-muted-foreground">
                    Penggunaan komersial penuh, resale rights
                  </div>
                </div>
                <div className="text-2xl font-black text-primary">
                  Rp {photo.price_extended.toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-bold"
              >
                <Link href={`/checkout?photo=${photo.id}&license=standard`} className="flex items-center gap-2 w-full justify-center">
                  <ShoppingCart className="w-5 h-5" />
                  Beli Standard
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 rounded-full border-2 border-primary text-primary hover:bg-primary/10 h-14 text-lg font-bold"
              >
                <Link href={`/checkout?photo=${photo.id}&license=extended`} className="flex items-center gap-2 w-full justify-center">
                  <Download className="w-5 h-5" />
                  Beli Extended
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Resolusi tinggi (4K+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Instant download</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Lisensi komersial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Photos */}
        {relatedPhotos.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-foreground mb-8">Foto Terkait</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedPhotos.map((related) => (
                <Link
                  key={related.slug}
                  href={`/foto/${related.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm group-hover:shadow-xl transition-all duration-300">
                    {related.file_hires?.url ? (
                      <Image
                        src={related.preview_watermark?.url || related.file_hires.url}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800" />
                    )}
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full z-10">
                      {related.category}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {related.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Rp {related.price_standard.toLocaleString('id-ID')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
