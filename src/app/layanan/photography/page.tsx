import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PhotographyPage() {
  const packages = [
    {
      name: "Produk",
      price: "Mulai Rp 1.500.000",
      description: "Foto produk profesional untuk marketplace, katalog, atau sosial media.",
      features: ["10-15 Produk", "Background Studio", "Basic Editing", "File High-Res", "Siap Upload Marketplace", "1x Revisi"],
    },
    {
      name: "Portrait",
      price: "Mulai Rp 2.000.000",
      description: "Sesi foto portrait untuk personal branding, LinkedIn, atau CV profesional.",
      features: ["2 Jam Sesi", "2 Outfit", "20-30 Foto Edited", "Location Indoor/Outdoor", "Online Gallery", "Print 1 Foto"],
      isPopular: true,
    },
    {
      name: "Event",
      price: "Mulai Rp 5.000.000",
      description: "Dokumentasi foto acara: wedding, seminar, launching produk, atau gathering.",
      features: ["Full Day Coverage", "2 Fotografer", "Unlimited Shot", "300+ Foto Edited", "Same Day Preview", "USB Delivery"],
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
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-primary shadow-xl shadow-primary/10 bg-card' : 'border-border bg-muted/50'}`}>
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
                <Link href="/booking?service=photography">Pilih Paket</Link>
              </Button>
            </div>
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
