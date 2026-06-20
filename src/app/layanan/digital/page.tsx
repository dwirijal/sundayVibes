import Link from "next/link";
import { Check } from "lucide-react";

export default function DigitalPage() {
  const products = [
    {
      name: "Lightroom Presets",
      price: "Rp 149.000",
      description: "Kumpulan 20+ preset Lightroom untuk foto wedding dan event.",
      features: ["Instant Download", "Desktop & Mobile", "One-click Edit", "Tutorial PDF"],
    },
    {
      name: "Notion OS Template",
      price: "Rp 249.000",
      description: "Sistem manajemen project lengkap untuk freelancer kreatif di Notion.",
      features: ["Client CRM", "Invoice Tracker", "Task Management", "Template Dokumen", "Lifetime Update"],
      isPopular: true,
    },
    {
      name: "Social Media Bundle",
      price: "Rp 199.000",
      description: "100+ template Canva siap pakai untuk berbagai kebutuhan sosmed.",
      features: ["Instagram Feed", "Tiktok Covers", "Editable di Canva", "Free Fonts", "Bonus Calendar Plan"],
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">📱</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Digital Products</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Template, preset, dan tools digital terbaik untuk meningkatkan produktivitas dan kualitas karya Anda.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((pkg) => (
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-amber-500 shadow-xl shadow-amber-500/10 bg-card' : 'border-border bg-muted'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Bestseller
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#"
                className={`inline-flex h-11 items-center justify-center rounded-full px-8 text-sm font-medium transition-colors w-full ${pkg.isPopular ? 'bg-amber-500 text-white hover:bg-amber-600' : 'border-2 border-border bg-transparent hover:bg-muted-foreground/10 text-foreground'}`}
              >
                Beli Sekarang
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}