import type { Metadata } from 'next'
import Link from "next/link";
import { PricingCard } from "@/components/PricingCard";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Jasa Design - Sunday Vibes",
  description: "Jasa desain grafis: logo, brand identity, social media kit, dan print design.",
};

export default function DesignPage() {
  const packages = [
    {
      name: "Sosmed Kit",
      price: "Mulai Rp 1.500.000",
      description: "Desain konten bulanan untuk Instagram/TikTok agar feed brand Anda konsisten.",
      features: ["15 Feed Design", "10 Story Design", "Copywriting Dasar", "2x Revisi Minor"],
    },
    {
      name: "Brand Identity",
      price: "Mulai Rp 3.500.000",
      description: "Pembuatan identitas visual komplit untuk brand baru atau rebranding.",
      features: ["Logo Design", "Color Palette", "Typography", "Brand Guidelines", "3 Mockup Implementasi"],
      isPopular: true,
    },
    {
      name: "Print & Merch",
      price: "Custom",
      description: "Desain kemasan, brosur, banner, hingga merchandise perusahaan.",
      features: ["Desain Packaging", "Desain Seragam", "Company Profile", "Siap Cetak (Hi-Res)", "Source File"],
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <ServiceSchema name="Jasa Design" description="Jasa desain grafis: logo, brand identity, social media kit, dan print design." provider="Sunday Vibes" areaServed={["Surabaya", "Tuban"]} priceRange="Mulai Rp 150.000" />
      <BreadcrumbSchema items={[{ name: "Beranda", url: "/" }, { name: "Layanan", url: "/layanan" }, { name: "Jasa Design", url: "/layanan/design" }]} />
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">🎨</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Jasa Design</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Desain grafis, branding, social media, dan materi marketing yang tidak generik untuk memperkuat identitas brand Anda.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket Desain</h2>
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
              badge={pkg.isPopular ? "Paling Diminati" : undefined}
              checkColor="text-secondary"
            >
              <Link href="/booking?service=design" className={`inline-flex items-center justify-center h-11 gap-1.5 px-8 w-full rounded-full transition-[background-color,color,box-shadow,border-color] outline-none text-sm font-medium focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${pkg.isPopular ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm' : 'border-2 border-border bg-background hover:bg-muted hover:text-foreground'}`}>Pilih Paket</Link>
            </PricingCard>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card border border-border shadow-sm rounded-[2.5rem] p-12 text-center text-foreground">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Isi Brief Desain Anda</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Ceritakan kebutuhan visual Anda dan unggah referensi style yang diinginkan. Kami siap mewujudkannya.
          </p>
          <Link href="/booking?service=design" className="inline-flex items-center justify-center rounded-full px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-lg font-medium transition-[background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 shadow-sm">Isi Brief Sekarang</Link>
        </div>
      </section>
    </main>
  );
}
