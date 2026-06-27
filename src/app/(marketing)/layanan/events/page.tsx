import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PricingCard } from "@/components/PricingCard";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Event Organizer - Sunday Vibes",
  description: "Layanan event organizer profesional di Surabaya. Paket Bronze, Silver, Gold untuk acara kecil hingga besar.",
};

export default function EventsPage() {
  const packages = [
    {
      name: "Bronze",
      price: "Mulai Rp 5.000.000",
      description: "Cocok untuk acara skala kecil seperti ulang tahun atau intimate gathering.",
      features: ["Konsultasi Konsep", "Venue Sourcing", "Rundown Acara", "1 Crew Event"],
    },
    {
      name: "Silver",
      price: "Mulai Rp 15.000.000",
      description: "Pilihan tepat untuk seminar, workshop, atau acara corporate menengah.",
      features: ["Semua di Bronze", "Vendor Management", "Desain Publikasi Dasar", "3 Crew Event", "Laporan Kegiatan"],
      isPopular: true,
    },
    {
      name: "Gold",
      price: "Custom",
      description: "Layanan end-to-end untuk acara besar, konser, atau pameran.",
      features: ["Semua di Silver", "Sponsorship Management", "Talent Management", "Full Tim Dokumentasi", "Dedicated Project Manager"],
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">🎉</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Event Organizer</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Layanan penyelenggaraan acara profesional dari skala kecil hingga besar. Kami mengurus detailnya, Anda menikmati acaranya.
        </p>
      </section>

      {/* Packages Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket</h2>
          <p className="text-muted-foreground">Pilih paket yang sesuai dengan skala acara Anda.</p>
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
            >
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? '' : 'border-2'}`}>
                <Link href="/booking?service=events" className="w-full">Pilih Paket</Link>
              </Button>
            </PricingCard>
          ))}
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-foreground rounded-[2.5rem] p-12 text-center text-background">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Punya Konsep Acara Sendiri?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Isi form konsultasi kami dengan detail tanggal, tipe acara, budget, dan lokasi. Tim kami akan segera menghubungi Anda dengan penawaran terbaik.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg">
            <Link href="/booking?service=events">Konsultasi Sekarang</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
