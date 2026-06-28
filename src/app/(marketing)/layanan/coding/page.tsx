import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PricingCard } from "@/components/PricingCard";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Jasa Coding & Web Development - Sunday Vibes",
  description: "Pengembangan web app, API, dan integrasi sistem dengan Next.js dan teknologi modern.",
};

export default function CodingPage() {
  const packages = [
    {
      name: "Landing Page",
      price: "Mulai Rp 3.000.000",
      description: "Landing page modern dengan Next.js, responsif, dan SEO-friendly.",
      features: ["Desain Custom", "Responsive Mobile", "SEO Basic", "Form Kontak", "Deploy ke VPS/Vercel", "1x Revisi Major"],
    },
    {
      name: "Web Application",
      price: "Mulai Rp 15.000.000",
      description: "Aplikasi web full-stack dengan authentication, database, dan API.",
      features: ["Next.js + React", "Backend API", "Database PostgreSQL", "Authentication", "Admin Dashboard", "3x Revisi Major"],
      isPopular: true,
    },
    {
      name: "Custom System",
      price: "Custom",
      description: "Sistem integrasi, ERP, CRM, atau aplikasi enterprise sesuai kebutuhan.",
      features: ["System Architecture", "Microservices", "API Integration", "Real-time Features", "Documentation", "Dedicated Support"],
    },
  ];

  const techStack = [
    { name: "Next.js", icon: "▲" },
    { name: "React", icon: "⚛️" },
    { name: "TypeScript", icon: "TS" },
    { name: "Node.js", icon: "🟢" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Tailwind", icon: "🎨" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <ServiceSchema name="Jasa Coding & Development" description="Pengembangan web app, API, dan integrasi sistem dengan Next.js dan teknologi modern." provider="Sunday Vibes" areaServed={["Surabaya", "Tuban"]} priceRange="Mulai Rp 3.000.000 - Custom" />
      <BreadcrumbSchema items={[{ name: "Beranda", url: "/" }, { name: "Layanan", url: "/layanan" }, { name: "Jasa Coding", url: "/layanan/coding" }]} />
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">⚡</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Jasa Coding & Development</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Pengembangan aplikasi web modern dengan teknologi terkini. Dari landing page hingga sistem enterprise.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Tech Stack</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/50 border border-border">
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-xs font-medium text-foreground">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket</h2>
          <p className="text-muted-foreground">Sesuai dengan kebutuhan dan budget Anda.</p>
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
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'border-2'}`}>
                <Link href="/booking?service=coding">Pilih Paket</Link>
              </Button>
            </PricingCard>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card border border-border shadow-sm rounded-[2.5rem] p-12 text-center text-foreground">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Punya Ide Project?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Ceritakan requirements Anda, timeline, dan budget. Kami siap bantu wujudkan.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-lg">
            <Link href="/booking?service=coding">Konsultasi Sekarang</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
