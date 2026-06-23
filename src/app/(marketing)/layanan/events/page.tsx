import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

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
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-primary shadow-xl shadow-primary/10 bg-card' : 'border-border bg-muted'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Paling Diminati
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? '' : 'border-2'}`}>
                <Link href="/booking?service=events" className="w-full">Pilih Paket</Link>
              </Button>
            </div>
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
