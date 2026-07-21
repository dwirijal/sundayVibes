import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PricingCard } from "@/components/PricingCard";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "AI Integration & Systems Automation - Sunday Vibes",
  description: "Layanan integrasi AI chatbot bisnis, otomatisasi workflow operasional, digitalisasi SOP, dan sistem CRM CRM.",
};

export default function AutomationPage() {
  const packages = [
    {
      name: "AI Business Chatbot",
      price: "Rp 3.000.000",
      description: "Chatbot bertenaga AI kustom untuk menangani CS, FAQ, dan kualifikasi lead awal di WhatsApp atau Website.",
      features: [
        "Integrasi WhatsApp / Web Widget",
        "Custom LLM Prompt Engineering",
        "Riset & Input FAQ Bisnis",
        "Basic Lead Capture & Database",
        "Eskalasi Manual ke Admin",
        "Maintenance & Monitoring 1 Bulan"
      ],
    },
    {
      name: "Workflow & CRM Automation",
      price: "Rp 5.000.000",
      description: "Sinkronisasi antar-sistem operasional (Notion, Google Sheets, WhatsApp) untuk menghilangkan kerja manual.",
      features: [
        "Workflow Mapping & Audit",
        "Koneksi Sistem (Make/Zapier)",
        "Notifikasi Otomatis WhatsApp/Email",
        "CRM Setup (Customer Database)",
        "Otomatisasi Follow-Up Lead",
        "Dokumentasi Alur Kerja & SOP"
      ],
      isPopular: true,
    },
    {
      name: "Enterprise Digitalization",
      price: "Rp 12.000.000",
      description: "Sistem operasional digital terpusat lengkap dengan AI Wiki untuk SOP internal perusahaan Anda.",
      features: [
        "Digital Transformation Blueprint",
        "AI Internal Knowledge Base (Wiki)",
        "Sistem Order-Payment-Tracking",
        "Full CRM Integration (Sales Funnel)",
        "Custom API & Database Integration",
        "SLA Uptime & Support Prioritas"
      ],
    },
  ];

  const categories = [
    { icon: "🤖", name: "AI Chatbots" },
    { icon: "🔁", name: "Workflow Integration" },
    { icon: "📋", name: "SOP Digitalization" },
    { icon: "👥", name: "CRM Setup" },
    { icon: "🗣️", name: "AI Sales Assistant" },
    { icon: "🧠", name: "AI Knowledge Base" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <ServiceSchema name="AI & Systems Automation" description="Layanan integrasi AI chatbot bisnis, otomatisasi workflow operasional, digitalisasi SOP, dan sistem CRM." provider="Sunday Vibes" areaServed={["Surabaya", "Tuban"]} priceRange="Mulai Rp 3.000.000" />
      <BreadcrumbSchema items={[{ name: "Beranda", url: "/" }, { name: "Layanan", url: "/layanan" }, { name: "AI & Systems Automation", url: "/layanan/automation" }]} />
      
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-pulse">🤖</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">AI & Systems Automation</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Meningkatkan efisiensi kerja tim hingga 10x lipat. Otomatiskan proses bisnis manual Anda dan integrasikan asisten AI cerdas ke sistem operasional harian.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Solusi Otomasi</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {categories.map((item) => (
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
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket Automasi</h2>
          <p className="text-muted-foreground">Desain sistem operasional tanpa hambatan.</p>
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
              badge={pkg.isPopular ? "Rekomendasi Utama" : undefined}
              checkColor="text-primary"
            >
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-2'}`}>
                <Link href={`/booking?service=automation&package=${pkg.name}`}>Pilih Paket</Link>
              </Button>
            </PricingCard>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-foreground rounded-[2.5rem] p-12 text-center text-background">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Konsultasikan Otomasi Workflow Bisnis</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Hapus pekerjaan administratif yang membuang-buang waktu. Diskusikan arsitektur sistem otomatis Anda bersama tim kami secara gratis.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg">
            <Link href="/booking?service=automation">Konsultasi Sistem AI</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
