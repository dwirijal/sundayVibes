import Link from "next/link";
import { Check } from "lucide-react";

export default function SewaAlatPage() {
  const packages = [
    {
      name: "Paket Vlogger",
      price: "Rp 350.000 / hari",
      description: "Set ringan untuk kebutuhan vlog atau content creation harian.",
      features: ["Mirrorless Camera (Sony a6400)", "Lensa Kit 16-50mm", "Wireless Mic (Boya)", "Mini Tripod", "2 Baterai"],
    },
    {
      name: "Paket Production",
      price: "Rp 1.200.000 / hari",
      description: "Setup lengkap untuk video shooting profesional atau film pendek.",
      features: ["Cinema Line Camera (Sony FX3)", "Lensa G-Master 24-70mm", "Gimbal Stabilizer", "Lighting Kit (2 Titik)", "Wireless Mic Pro"],
      isPopular: true,
    },
    {
      name: "Drone & Aerial",
      price: "Rp 800.000 / hari",
      description: "Kebutuhan pengambilan gambar udara dengan resolusi tinggi.",
      features: ["DJI Mavic 3", "3 Smart Battery", "ND Filters", "Remote Controller", "Sudah termasuk Pilot (Opsional)"],
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">🎥</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Sewa Alat Dokumentasi</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Sewa kamera, drone, lighting, dan perlengkapan produksi dengan jaminan kualitas dan ketersediaan real-time.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Paket Sewa Populer</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-blue-500 shadow-xl shadow-blue-500/10 bg-card' : 'border-border bg-muted'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Paling Diminati
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/booking?service=sewa-alat"
                className={`inline-flex h-11 items-center justify-center rounded-full px-8 text-sm font-medium transition-colors w-full ${pkg.isPopular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border-2 border-border bg-transparent hover:bg-muted-foreground/10 text-foreground'}`}
              >
                Sewa Sekarang
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}