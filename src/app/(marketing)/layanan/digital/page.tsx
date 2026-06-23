import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Products - Sunday Vibes",
  description: "Template, preset, dan tools digital: Lightroom Presets, Notion OS Template, Social Media Bundle.",
};

export default function DigitalPage() {
  const products = [
    {
      id: "lightroom-presets",
      name: "Lightroom Presets",
      price: "Rp 149.000",
      description: "Preset premium untuk foto wedding dan event agar estetika visual konsisten secara instan.",
      features: [
        "20+ preset wedding/event",
        "Instant download",
        "Desktop & mobile",
        "One-click edit",
        "Tutorial PDF",
      ],
    },
    {
      id: "notion-os-template",
      name: "Notion OS Template",
      price: "Rp 249.000",
      description: "Sistem workspace all-in-one untuk mengelola proyek, klien, tugas, dan keuangan bisnis kreatif Anda.",
      features: [
        "Client CRM",
        "Invoice tracker",
        "Task management",
        "Template dokumen",
        "Lifetime update",
      ],
      isPopular: true,
    },
    {
      id: "social-media-bundle",
      name: "Social Media Bundle",
      price: "Rp 199.000",
      description: "Ratusan template Canva siap pakai untuk merapikan feed dan menarik perhatian audiens Anda.",
      features: [
        "100+ template Canva",
        "Instagram feed",
        "TikTok covers",
        "Editable",
        "Free fonts",
        "Bonus calendar",
      ],
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
          💻
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Digital Products</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Template, preset, dan tools digital pilihan untuk mempercepat alur kerja kreatif dan meningkatkan kualitas karya Anda.
        </p>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Produk</h2>
          <p className="text-muted-foreground">Unduh aset digital siap pakai kami untuk menunjang produktivitas Anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.name}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                product.isPopular
                  ? "border-secondary shadow-xl shadow-secondary/10 bg-card"
                  : "border-border bg-muted/50"
              }`}
            >
              {product.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Bestseller
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{product.name}</h3>
              <p className="text-muted-foreground mb-6 text-sm flex-grow">{product.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{product.price}</div>

              <ul className="space-y-4 mb-8">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-secondary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={product.isPopular ? "default" : "outline"}
                className={`w-full rounded-full ${
                  product.isPopular
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    : "border-2 border-border bg-background hover:bg-muted hover:text-foreground"
                }`}
              >
                <Link href={`/checkout?product=${product.id}`} className="w-full text-center">
                  Beli Sekarang
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Request CTA Section */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-foreground rounded-[2.5rem] p-12 text-center text-background">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Butuh Template Kustom?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Kami melayani pembuatan template Notion, Canva, atau preset Lightroom kustom yang disesuaikan khusus dengan kebutuhan alur kerja unik brand atau bisnis Anda.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-lg font-medium transition-all"
          >
            <Link href="/kontak">Hubungi Kami</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
