import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PricingCard } from "@/components/PricingCard";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Growth Packages (Productized Marketing & Systems) - Sunday Vibes",
  description: "Pilihan Paket Growth bulanan terintegrasi untuk akselerasi performa bisnis Anda. Starter, Business, dan Enterprise Growth Engine.",
};

export default function PackagesPage() {
  const packages = [
    {
      name: "Starter Growth System",
      price: "Rp 3.500.000 / bln",
      description: "Ideal untuk bisnis pemula atau UMKM yang ingin memulai eksistensi digital dengan matang.",
      features: [
        "10–12 Konten Reels/TikTok/Carousel",
        "Riset Hashtag & Pilar Konten Dasar",
        "Copywriting Caption & Visual Assets",
        "Auto Posting & Penjadwalan Sistem",
        "Laporan Bulanan Performa Dasar",
        "1x Revisi Minor Konten"
      ],
    },
    {
      name: "Business Growth System",
      price: "Rp 7.500.000 / bln",
      description: "Dirancang untuk brand berkembang yang ingin mendominasi pasar lokal & meluncurkan marketing funnel konversi tinggi.",
      features: [
        "20–24 Konten Reels/TikTok/Carousel",
        "Full Content Strategy Blueprint",
        "Meta Ads & Google Ads Setup",
        "Landing Page Konversi (1 Halaman)",
        "Dashboard Analitik Bulanan Interaktif",
        "Competitor Analysis Report"
      ],
      isPopular: true,
    },
    {
      name: "Enterprise Growth Engine",
      price: "Mulai Rp 15.000.000 / bln",
      description: "Sistem pertumbuhan menyeluruh untuk korporat skala menengah ke atas dengan integrasi otomatisasi operasional penuh.",
      features: [
        "30+ Konten (inc. 3D motion/cinematic)",
        "Audit Pertumbuhan Triwulanan",
        "AI WhatsApp Chatbot Integration",
        "CRM Lead Pipeline Setup",
        "Infrastruktur Cloud IT Maintenance",
        "Backup Otomatis Harian & SLA Uptime"
      ],
    },
  ];

  const valueProps = [
    { icon: "📈", title: "Akselerasi Pertumbuhan", text: "Menggabungkan konten viral, iklan tertarget, dan optimasi konversi." },
    { icon: "🤖", title: "Otomatisasi Sistem", text: "Menghilangkan pekerjaan operasional manual dengan integrasi AI & CRM." },
    { icon: "💰", title: "Biaya Flat Efisien", text: "Mendapatkan tim desainer, copywriter, developer, & server admin dalam satu paket." },
    { icon: "📊", title: "Keputusan Berbasis Data", text: "Laporan performa berkala dan dashboard analitik interaktif yang transparan." },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <ServiceSchema name="Growth Packages" description="Pilihan Paket Growth bulanan terintegrasi untuk akselerasi performa bisnis Anda. Starter, Business, dan Enterprise Growth Engine." provider="Sunday Vibes" areaServed={["Surabaya", "Tuban"]} priceRange="Mulai Rp 3.500.000 / bulan" />
      <BreadcrumbSchema items={[{ name: "Beranda", url: "/" }, { name: "Layanan", url: "/layanan" }, { name: "Growth Packages", url: "/layanan/packages" }]} />
      
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-accent text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-pulse">📦</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Productized Growth Packages</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Hentikan membayar layanan e-ceran. Dapatkan mesin pertumbuhan bisnis menyeluruh yang menyatukan strategi, konten kreatif, iklan, analitik, otomatisasi AI, dan infrastruktur IT.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-20 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          {valueProps.map((prop) => (
            <div key={prop.title} className="flex gap-4 p-6 rounded-3xl border border-border bg-card">
              <span className="text-4xl flex-shrink-0">{prop.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">{prop.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{prop.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket Sistem Pertumbuhan</h2>
          <p className="text-muted-foreground">Berlangganan bulanan tanpa kontrak yang mengikat, dapat dibatalkan kapan saja.</p>
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
              badge={pkg.isPopular ? "Paling Direkomendasikan" : undefined}
              checkColor="text-primary"
            >
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-2'}`}>
                <Link href={`/booking?service=packages&package=${pkg.name}`}>Langganan Sekarang</Link>
              </Button>
            </PricingCard>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card border border-border shadow-sm rounded-[2.5rem] p-12 text-center text-foreground">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ingin Mendiskusikan Kebutuhan Enterprise?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Apakah Anda memiliki sistem operasional warisan (legacy) atau kebutuhan kepatuhan data khusus? Hubungi tim arsitek sistem kami untuk demo integrasi kustom.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg">
            <Link href="/booking?service=packages">Ajukan Kebutuhan Kustom</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
