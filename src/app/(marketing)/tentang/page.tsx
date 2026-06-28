import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami - Sunday Vibes",
  description: "Sunday Vibes adalah one-stop creative platform di Surabaya yang menyatukan layanan kreatif dan teknis.",
};

export default function TentangPage() {
  const values = [
    {
      title: "Good Vibes Only",
      description: "Pengalaman menyenangkan dari awal hingga akhir.",
      icon: "✨",
    },
    {
      title: "Transparan",
      description: "Harga & proses yang jelas, real-time tracking.",
      icon: "👁️",
    },
    {
      title: "Kreatif",
      description: "Output yang tidak generik, portfolio showcase.",
      icon: "🎨",
    },
    {
      title: "Andal",
      description: "Deadline selalu terpenuhi, notifikasi otomatis.",
      icon: "⚡",
    },
  ];

  const stats = [
    { value: "50+", label: "Klien" },
    { value: "100+", label: "Project" },
    { value: "6", label: "Layanan" },
    { value: "4.9★", label: "Rating" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">☀️</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Tentang Sunday Vibes</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          One-stop creative platform di Surabaya
        </p>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-6 max-w-3xl text-center mb-24">
        <h2 className="text-3xl font-bold text-foreground mb-6">Cerita Kami</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Sunday Vibes adalah one-stop creative platform di Surabaya yang berdedikasi untuk memberikan solusi kreatif terbaik. Kami menyediakan berbagai layanan terintegrasi mulai dari penyelenggaraan event, pembuatan produk digital, photography, hingga jasa design, coding, dan pengembangan website berbasis WordPress. Kami hadir untuk membantu brand dan bisnis Anda tumbuh serta bersinar di era digital.
        </p>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Nilai-Nilai Kami</h2>
          <p className="text-muted-foreground">Prinsip yang mendasari setiap karya dan kolaborasi kami.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((val) => (
            <div key={val.title} className="group p-6 rounded-3xl border border-border bg-card flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
              <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110">{val.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{val.title}</h3>
              <p className="text-sm text-muted-foreground">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16 border-t border-b border-border mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="transition-transform duration-300 hover:scale-110">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</div>
              <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-foreground rounded-[2.5rem] p-12 text-center text-background">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Siap Bekerja Sama?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Mari wujudkan ide-ide kreatif Anda bersama kami. Hubungi tim kami sekarang untuk berdiskusi tentang proyek impian Anda.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg">
            <Link href="/kontak">Hubungi Kami</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
