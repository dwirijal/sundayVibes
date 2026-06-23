import type { Metadata } from 'next'
import Link from "next/link";
import { Check } from "lucide-react";

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
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-secondary shadow-xl shadow-secondary/10 bg-card' : 'border-border bg-muted/50'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Paling Diminati
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-secondary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/booking?service=design" className={`inline-flex items-center justify-center h-10 gap-1.5 px-8 w-full rounded-full transition-all outline-none text-sm font-medium focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${pkg.isPopular ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm' : 'border-2 border-border bg-background hover:bg-muted hover:text-foreground'}`}>Pilih Paket</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card border border-border shadow-sm rounded-[2.5rem] p-12 text-center text-foreground">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Isi Brief Desain Anda</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Ceritakan kebutuhan visual Anda dan unggah referensi style yang diinginkan. Kami siap mewujudkannya.
          </p>
          <Link href="/booking?service=design" className="inline-flex items-center justify-center rounded-full px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-lg font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 shadow-sm">Isi Brief Sekarang</Link>
        </div>
      </section>
    </main>
  );
}
