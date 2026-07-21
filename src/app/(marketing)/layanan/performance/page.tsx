import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PricingCard } from "@/components/PricingCard";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Performance & Conversion Optimization - Sunday Vibes",
  description: "Layanan optimasi performa web, CRO (Conversion Rate Optimization), A/B testing, heatmap, & data analytics.",
};

export default function PerformancePage() {
  const packages = [
    {
      name: "Speed & Analytics Setup",
      price: "Rp 1.500.000",
      description: "Setup infrastruktur analitik modern dan optimasi kecepatan loading website (Core Web Vitals).",
      features: [
        "Google Analytics / Umami Setup",
        "Page Speed Optimization",
        "Core Web Vitals Pass Guarantee",
        "Setup Event Tracking (Klik/Form)",
        "Search Console Indexing",
        "Laporan Analitik Awal"
      ],
    },
    {
      name: "CRO & Conversion Funnel",
      price: "Rp 3.000.000",
      description: "Meningkatkan persentase penjualan dari traffic yang sudah masuk ke website Anda.",
      features: [
        "Audit User Journey & UX",
        "Heatmap & Scrollmap Integration",
        "A/B Testing Landing Page",
        "Copywriting Conversion-focused",
        "Optimasi Lead Capture Form",
        "1 Sesi Evaluasi & Rekomendasi"
      ],
      isPopular: true,
    },
    {
      name: "Performance Retainer",
      price: "Rp 5.000.000 / bln",
      description: "Optimasi konversi dan pengawasan metrik website berkelanjutan untuk pertumbuhan jangka panjang.",
      features: [
        "Weekly A/B Testing & Updates",
        "Monthly Behavior Analysis Report",
        "Continuous Speed Maintenance",
        "Funnel Leak Analysis",
        "Dedicated Optimization Engineer",
        "WhatsApp / Slack Support Group"
      ],
    },
  ];

  const highlights = [
    { icon: "📊", name: "Analytics" },
    { icon: "⚡", name: "Speed Tuning" },
    { icon: "🎯", name: "CRO" },
    { icon: "🔥", name: "Heatmaps" },
    { icon: "🧪", name: "A/B Testing" },
    { icon: "📈", name: "Funnel Analysis" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <ServiceSchema name="Performance & Analytics" description="Layanan optimasi performa web, CRO (Conversion Rate Optimization), A/B testing, heatmap, & data analytics." provider="Sunday Vibes" areaServed={["Surabaya", "Tuban"]} priceRange="Mulai Rp 1.500.000" />
      <BreadcrumbSchema items={[{ name: "Beranda", url: "/" }, { name: "Layanan", url: "/layanan" }, { name: "Performance & Analytics", url: "/layanan/performance" }]} />
      
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-4xl mx-auto mb-8 animate-pulse">📊</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Performance & Data Layer</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Jangan biarkan budget iklan terbuang sia-sia. Kami mengoptimalkan rasio konversi website Anda menggunakan data analitik perilaku pengguna.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Keahlian Optimasi</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {highlights.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/50 border border-border">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-medium text-foreground text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket Optimasi</h2>
          <p className="text-muted-foreground">Maksimalkan konversi prospek menjadi pembeli setia.</p>
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
              badge={pkg.isPopular ? "Paling Populer" : undefined}
              checkColor="text-secondary"
            >
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'border-2'}`}>
                <Link href={`/booking?service=performance&package=${pkg.name}`}>Pilih Paket</Link>
              </Button>
            </PricingCard>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card border border-border shadow-sm rounded-[2.5rem] p-12 text-center text-foreground">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Mulai Optimasi Kecepatan & Konversi</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Gunakan data analitik untuk menemukan hambatan utama di website Anda. Konsultasikan audit konversi awal secara gratis.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-lg">
            <Link href="/booking?service=performance">Hubungi Tim Optimasi</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
