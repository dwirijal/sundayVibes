import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PricingCard } from "@/components/PricingCard";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Jasa Photography - Sunday Vibes",
  description: "Foto produk, portrait, wedding, dan event. Paket fotografi profesional di Surabaya.",
};

interface PhotoPackage {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isPromo?: boolean;
}

export default function PhotographyPage() {
  const packages: PhotoPackage[] = [
    {
      name: "Produk",
      price: "Mulai Rp 1.500.000",
      description: "Foto produk profesional untuk marketplace, katalog, atau sosial media.",
      features: ["10-15 Produk", "Background Studio", "Basic Editing", "File High-Res", "Siap Upload Marketplace", "1x Revisi"],
      isPopular: false,
      isPromo: false,
    },
    {
      name: "Portrait",
      price: "Mulai Rp 2.000.000",
      description: "Sesi foto portrait untuk personal branding, LinkedIn, atau CV profesional.",
      features: ["2 Jam Sesi", "2 Outfit", "20-30 Foto Edited", "Location Indoor/Outdoor", "Online Gallery", "Print 1 Foto"],
      isPopular: true,
      isPromo: false,
    },
    {
      name: "Wisuda / Graduation",
      price: "Rp 850.000",
      originalPrice: "Rp 1.500.000",
      description: "PROMO: Paket dokumentasi wisuda khusus area Surabaya.",
      features: ["1.5 Jam Sesi", "1 Lokasi (Kampus)", "15 Foto Edited", "Semua Softcopy", "Maks. 5 Orang", "Free Print 10R"],
      isPromo: true,
      isPopular: false,
    },
    {
      name: "Event",
      price: "Mulai Rp 5.000.000",
      description: "Dokumentasi foto acara: wedding, seminar, launching produk, atau gathering.",
      features: ["Full Day Coverage", "2 Fotografer", "Unlimited Shot", "300+ Foto Edited", "Same Day Preview", "USB Delivery"],
      isPopular: false,
      isPromo: false,
    },
  ];

  const specialties = [
    { icon: "📦", name: "Product Photography" },
    { icon: "👤", name: "Portrait" },
    { icon: "🎓", name: "Wisuda" },
    { icon: "💍", name: "Wedding" },
    { icon: "🏢", name: "Corporate" },
    { icon: "🍽️", name: "Food & Beverage" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <ServiceSchema name="Photography" description="Foto produk, portrait, wedding, dan event. Paket fotografi profesional di Surabaya." provider="Sunday Vibes" areaServed={["Surabaya", "Tuban"]} priceRange="Mulai Rp 250.000" />
      <BreadcrumbSchema items={[{ name: "Beranda", url: "/" }, { name: "Layanan", url: "/layanan" }, { name: "Photography", url: "/layanan/photography" }]} />
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-accent text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">📸</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Photography Service</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Foto profesional untuk berbagai kebutuhan. Dari produk, portrait, hingga dokumentasi event.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Spesialisasi</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {specialties.map((spec) => (
              <div key={spec.name} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/50 border border-border">
                <span className="text-3xl">{spec.icon}</span>
                <span className="text-xs font-medium text-foreground text-center">{spec.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket</h2>
          <p className="text-muted-foreground">Pilih paket sesuai kebutuhan foto Anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <PricingCard
              key={pkg.name}
              name={pkg.name}
              description={pkg.description}
              price={pkg.price}
              features={pkg.features}
              highlighted={pkg.isPopular}
              badge={pkg.isPopular ? "Paling Diminati" : pkg.isPromo ? "Promo Spesial" : undefined}
              originalPrice={pkg.originalPrice}
              checkColor={pkg.isPromo ? "text-secondary" : "text-primary"}
            >
              <Button size="lg" variant={pkg.isPopular ? "default" : pkg.isPromo ? "secondary" : "outline"} className={`w-full rounded-full ${(!pkg.isPopular && !pkg.isPromo) ? 'border-2' : ''}`}>
                <Link href="/booking?service=photography">Pilih Paket</Link>
              </Button>
            </PricingCard>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-foreground rounded-[2.5rem] p-12 text-center text-background">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Butuh Paket Custom?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Punya kebutuhan khusus? Diskusikan paket foto custom sesuai budget dan requirements Anda.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg">
            <Link href="/booking?service=photography">Konsultasi Sekarang</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
