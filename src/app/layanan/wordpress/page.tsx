import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function WordPressPage() {
  const packages = [
    {
      name: "Starter",
      price: "Mulai Rp 2.500.000",
      description: "Website company profile atau blog personal dengan WordPress.",
      features: ["Theme Premium", "5 Halaman", "Contact Form", "SEO Basic", "SSL & Hosting 1 Tahun", "Training Penggunaan"],
    },
    {
      name: "Business",
      price: "Mulai Rp 5.000.000",
      description: "Website bisnis profesional dengan fitur lengkap dan kustomisasi.",
      features: ["Theme Custom", "Unlimited Halaman", "WooCommerce (50 Produk)", "SEO Advanced", "Speed Optimization", "Maintenance 3 Bulan"],
      isPopular: true,
    },
    {
      name: "Ecommerce",
      price: "Mulai Rp 10.000.000",
      description: "Toko online lengkap dengan payment gateway dan manajemen produk.",
      features: ["Custom Theme", "Unlimited Produk", "Payment Gateway", "Shipping Integration", "Multi-currency", "Maintenance 6 Bulan"],
    },
  ];

  const maintenance = [
    { name: "Basic", price: "Rp 300rb/bln", features: ["Update Core & Plugin", "Backup Mingguan", "Security Scan"] },
    { name: "Pro", price: "Rp 700rb/bln", features: ["Semua di Basic", "Update Konten 4x/bln", "Performance Monitor", "Priority Support"] },
    { name: "Enterprise", price: "Custom", features: ["Semua di Pro", "Custom Development", "Dedicated Server", "24/7 Support"] },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">🌐</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Jasa WordPress</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Setup, kustomisasi, dan maintenance website WordPress. Dari company profile hingga toko online lengkap.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket Website</h2>
          <p className="text-muted-foreground">Pilih paket yang sesuai dengan kebutuhan bisnis Anda.</p>
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

              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'border-2'}`}>
                <Link href="/booking?service=wordpress">Pilih Paket</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Paket Maintenance</h2>
          <p className="text-muted-foreground">Jaga website Anda tetap aman, cepat, dan up-to-date.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {maintenance.map((plan) => (
            <div key={plan.name} className="flex flex-col p-8 rounded-3xl border border-border bg-muted/50">
              <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="text-2xl font-black text-foreground mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card border border-border shadow-sm rounded-[2.5rem] p-12 text-center text-foreground">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Butuh Website WordPress?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Diskusikan kebutuhan website Anda. Kami bantu pilih solusi terbaik.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-lg">
            <Link href="/booking?service=wordpress">Konsultasi Gratis</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
