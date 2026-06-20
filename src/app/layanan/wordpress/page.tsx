import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function WordPressPage() {
  const packages = [
    {
      name: "WP Starter",
      price: "Mulai Rp 1.500.000",
      description: "Setup dasar WordPress untuk blog atau website company profile sederhana.",
      features: ["Instalasi WP & Tema", "Setup Plugin Esensial", "Hingga 5 Halaman", "Optimasi Keamanan Dasar"],
    },
    {
      name: "WP Ecommerce",
      price: "Mulai Rp 4.500.000",
      description: "Toko online lengkap menggunakan WooCommerce dengan integrasi payment.",
      features: ["Setup WooCommerce", "Integrasi Midtrans", "Ongkir Otomatis (RajaOngkir)", "Input 20 Produk Awal", "Tutorial Penggunaan"],
      isPopular: true,
    },
    {
      name: "WP Maintenance",
      price: "Rp 500.000 / bln",
      description: "Perawatan rutin untuk memastikan website Anda aman dan berjalan cepat.",
      features: ["Update Core & Plugin", "Backup Mingguan", "Malware Scanning", "Prioritas Support", "Uptime Monitoring"],
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">⚙️</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Jasa WordPress</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Setup, kustomisasi, pengembangan toko online, dan maintenance website WordPress profesional.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-sky-500 shadow-xl shadow-sky-500/10 bg-card' : 'border-border bg-muted/30'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Siap Jualan
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-sky-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/booking?service=wordpress"
                className={`w-full inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 ${pkg.isPopular ? 'bg-sky-500 text-white hover:bg-sky-600' : 'border-2 border-border bg-transparent hover:bg-accent hover:text-accent-foreground'}`}
              >
                Pilih Paket
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
