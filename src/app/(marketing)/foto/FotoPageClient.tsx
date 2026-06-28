"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Photo {
  id: string;
  title: string;
  slug: string;
  category: string;
  price_standard: number;
  price_extended: number;
  file_hires: {
    url: string;
    alt?: string;
  };
  preview_watermark?: {
    url: string;
  };
}

interface FotoPageProps {
  photos: Photo[];
}

const categories = ["Semua", "Wedding", "Product", "Portrait", "Event", "Nature"];

export default function FotoPageClient({ photos }: FotoPageProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredPhotos = activeCategory === "Semua"
    ? photos
    : photos.filter((photo) => photo.category === activeCategory);

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
          📸
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Foto Marketplace</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Koleksi foto profesional untuk kebutuhan komersial, editorial, dan personal
        </p>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-6 mb-12 max-w-6xl">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className="rounded-full px-5 py-2 text-sm font-semibold transition-all border-2 min-h-[44px] hover:-translate-y-0.5 hover:shadow-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="container mx-auto px-6 mb-24 max-w-6xl">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">Belum ada foto di kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <Link
                key={photo.id}
                href={`/foto/${photo.slug}`}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-xs group block"
              >
                {/* Photo Image */}
                {photo.file_hires?.url ? (
                  <Image
                    src={photo.preview_watermark?.url || photo.file_hires.url}
                    alt={photo.file_hires.alt || photo.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800" />
                )}

                {/* Category Badge (Top-Left) */}
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                  {photo.category}
                </div>

                {/* Price Tag (Bottom-Right) */}
                <div className="absolute bottom-3 right-3 bg-background/95 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-border/80 shadow-xs flex flex-col gap-0.5 text-right z-10">
                  <span className="text-[10px] font-black text-foreground">
                    Standard Rp {photo.price_standard.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[9px] text-muted-foreground">
                    Extended Rp {photo.price_extended.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-foreground/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 z-20">
                  <span className="bg-background text-foreground text-xs font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-transform">
                    Lihat Detail
                  </span>
                  <span className="text-background text-[10px] font-medium opacity-80 mt-1">
                    {photo.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-foreground rounded-[2.5rem] p-12 text-center text-background">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Butuh foto custom?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Kami juga melayani jasa fotografi kustom untuk kebutuhan komersial, event, pernikahan, dan portofolio pribadi Anda.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg">
            <Link href="/booking?service=photography">Booking Sekarang</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
