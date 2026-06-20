"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = ["Semua", "Wedding", "Product", "Portrait", "Event", "Nature"];

const photos = [
  {
    id: 1,
    title: "Rustic Wedding Bloom",
    category: "Wedding",
    gradient: "from-pink-400 via-rose-400 to-rose-500",
  },
  {
    id: 2,
    title: "Minimalist Cosmetic Pack",
    category: "Product",
    gradient: "from-amber-300 via-orange-400 to-orange-500",
  },
  {
    id: 3,
    title: "Classic Studio Portrait",
    category: "Portrait",
    gradient: "from-indigo-400 via-purple-400 to-violet-500",
  },
  {
    id: 4,
    title: "Corporate Seminar Stage",
    category: "Event",
    gradient: "from-cyan-400 via-sky-400 to-blue-500",
  },
  {
    id: 5,
    title: "Misty Mountain Sunrise",
    category: "Nature",
    gradient: "from-emerald-400 via-teal-400 to-green-500",
  },
  {
    id: 6,
    title: "Golden Hour Couple",
    category: "Wedding",
    gradient: "from-rose-300 via-pink-400 to-pink-500",
  },
  {
    id: 7,
    title: "Premium Watch Mockup",
    category: "Product",
    gradient: "from-yellow-200 via-amber-300 to-orange-400",
  },
  {
    id: 8,
    title: "Neon Cyberpunk Model",
    category: "Portrait",
    gradient: "from-violet-400 via-fuchsia-400 to-pink-600",
  },
  {
    id: 9,
    title: "Rock Concert Spotlight",
    category: "Event",
    gradient: "from-blue-400 via-indigo-400 to-purple-600",
  },
  {
    id: 10,
    title: "Deep Ocean Reef",
    category: "Nature",
    gradient: "from-teal-300 via-cyan-400 to-blue-600",
  },
  {
    id: 11,
    title: "Intimate Garden Vows",
    category: "Wedding",
    gradient: "from-pink-300 via-rose-300 to-amber-200",
  },
  {
    id: 12,
    title: "Gourmet Dessert Close-up",
    category: "Product",
    gradient: "from-orange-300 via-red-400 to-rose-500",
  },
];

export default function FotoPage() {
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
              className="rounded-full px-5 py-2 text-sm font-semibold transition-all border-2"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="container mx-auto px-6 mb-24 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-xs group"
            >
              {/* Gradient Background Placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />

              {/* Category Badge (Top-Left) */}
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                {photo.category}
              </div>

              {/* Price Tag (Bottom-Right) */}
              <div className="absolute bottom-3 right-3 bg-background/95 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-border/80 shadow-xs flex flex-col gap-0.5 text-right z-10">
                <span className="text-[10px] font-black text-foreground">Standard Rp 150rb</span>
                <span className="text-[9px] text-muted-foreground">Extended Rp 500rb</span>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-foreground/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-1 z-20">
                <span className="bg-background text-foreground text-xs font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer">
                  Lihat Detail
                </span>
                <span className="text-background text-[10px] font-medium opacity-80 mt-1">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>
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
