import type { Metadata } from "next";
import Link from "next/link";
import { LocationSchema } from "@/components/seo/LocationSchema";

export const metadata: Metadata = {
  title: "Sunday Vibes Tuban - Event Organizer & Jasa Kreatif Terpercaya",
  description: "Layanan event organizer, sewa kamera, jasa foto wisuda, design grafis, dan pembuatan website di Tuban. Hubungi Sunday Vibes untuk konsultasi gratis.",
  keywords: [
    "event organizer Tuban",
    "sewa kamera Tuban",
    "jasa foto wisuda Tuban",
    "jasa design Tuban",
    "pembuatan website Tuban",
    "sewa drone Tuban",
    "jasa WordPress Tuban"
  ],
  alternates: {
    canonical: "/lokasi/tuban"
  }
};

export default function TubanPage() {
  const services = [
    {
      title: "Event Organizer",
      description: "Penyelenggaraan event pernikahan, wisuda, seminar, dan acara korporat di Tuban",
      href: "/layanan/events",
      icon: "🎉"
    },
    {
      title: "Sewa Kamera & Drone",
      description: "Rental kamera mirrorless, DSLR, dan drone untuk dokumentasi di Tuban",
      href: "/layanan/sewa-alat",
      icon: "📷"
    },
    {
      title: "Jasa Foto Profesional",
      description: "Fotografi wisuda, prewedding, produk, dan acara di Tuban",
      href: "/layanan/photography",
      icon: "📸"
    },
    {
      title: "Design Grafis",
      description: "Jasa design logo, brosur, banner, dan materi promosi untuk UMKM Tuban",
      href: "/layanan/design",
      icon: "🎨"
    },
    {
      title: "Pembuatan Website",
      description: "Jasa coding dan WordPress untuk bisnis, toko online, dan portfolio di Tuban",
      href: "/layanan/coding",
      icon: "💻"
    },
    {
      title: "Produk Digital",
      description: "Template, preset, dan aset digital untuk kreator konten Tuban",
      href: "/produk-digital",
      icon: "📦"
    }
  ];

  return (
    <>
      <LocationSchema city="Tuban" />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Hero */}
          <section className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
              Sunday Vibes <span className="text-primary">Tuban</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Premium Digital Growth & Systems Agency. Mitra strategis optimasi konversi, otomatisasi sistem bisnis berbasis AI, & pengembangan infrastruktur IT di Tuban, Jawa Timur.
            </p>
          </section>

          {/* Services Grid */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Layanan Kami di Tuban
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="p-6 rounded-3xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-[border-color,box-shadow]"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Kenapa Pilih Sunday Vibes Tuban?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex gap-4">
                <div className="text-3xl">⚡</div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Respon Cepat</h3>
                  <p className="text-sm text-muted-foreground">Konsultasi via WhatsApp dengan respon dalam hitungan menit</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">💰</div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Harga Transparan</h3>
                  <p className="text-sm text-muted-foreground">Paket jelas tanpa biaya tersembunyi, cocok untuk UMKM Tuban</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Hasil Profesional</h3>
                  <p className="text-sm text-muted-foreground">Portfolio berkualitas dengan standar industri kreatif</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">🤝</div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Paham Lokal</h3>
                  <p className="text-sm text-muted-foreground">Memahami kebutuhan dan karakteristik pasar Tuban</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="bg-foreground rounded-[2.5rem] p-12 text-background">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Siap Mulai Project di Tuban?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Konsultasi gratis untuk event, sewa alat, jasa foto, atau pembuatan website Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/6285157319611?text=Halo%20Sunday%20Vibes%2C%20saya%20dari%20Tuban%20mau%20konsultasi"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition"
                >
                  💬 Chat WhatsApp
                </a>
                <Link
                  href="/kontak"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition"
                >
                  Kirim Pesan
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
