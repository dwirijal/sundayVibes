"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  slug: string;
  type: string;
  price: number;
  license_type: string;
  preview?: {
    url: string;
    alt?: string;
  };
}

interface ProdukDigitalProps {
  products: Product[];
}

const categories = ["Semua", "template", "ebook", "asset", "course"];

export default function ProdukDigitalClient({ products }: ProdukDigitalProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProducts = activeCategory === "Semua"
    ? products
    : products.filter((p) => p.type === activeCategory);

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
          💻
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Produk Digital</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Template, preset, E-book, dan aset digital siap pakai untuk kebutuhan kreatif dan bisnis Anda.
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
              className="rounded-full px-5 py-2 text-sm font-semibold transition-all border-2 capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-6 mb-24 max-w-6xl">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">Belum ada produk di kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/produk-digital/${product.slug}`}
                className="group flex flex-col p-6 rounded-[2rem] border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted mb-6">
                  {product.preview?.url ? (
                    <Image
                      src={product.preview.url}
                      alt={product.preview.alt || product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20 bg-stone-100 dark:bg-stone-800">
                      📦
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10">
                    {product.type}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                  {product.title}
                </h3>
                
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      {product.license_type} License
                    </span>
                    <span className="text-lg font-black text-foreground">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <span className="text-secondary bg-secondary/10 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
