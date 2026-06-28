import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCap, CheckCircle2, Star, Clock, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Promo Paket Foto Wisuda - Sunday Vibes",
  description: "Abadikan momen kelulusanmu dengan Paket Foto Wisuda Sunday Vibes. Harga promo mahasiswa, fotografer profesional, dan hasil memuaskan.",
};

export default function FotoWisudaPage() {
  const packages = [
    {
      name: "Graduation Lite",
      price: "350.000",
      normalPrice: "500.000",
      target: "Personal / 1-2 Orang",
      features: [
        "Sesi foto 1 Jam",
        "Lokasi area kampus Surabaya",
        "Unlimited shoot",
        "10 Foto edit color grading",
        "Semua soft copy via GDrive",
      ]
    },
    {
      name: "Graduation Squad",
      price: "750.000",
      normalPrice: "1.000.000",
      target: "Grup / 3-6 Orang",
      popular: true,
      features: [
        "Sesi foto 2 Jam",
        "Lokasi area kampus Surabaya",
        "Unlimited shoot",
        "25 Foto edit color grading",
        "Cetak 1 Foto ukuran 10R + Frame",
        "Semua soft copy via GDrive",
      ]
    },
    {
      name: "Graduation Premium",
      price: "1.500.000",
      normalPrice: "2.000.000",
      target: "Keluarga & Grup Besar",
      features: [
        "Sesi foto 3 Jam",
        "Lokasi kampus & studio/cafe",
        "2 Fotografer profesional",
        "50 Foto edit (color grading & retouch)",
        "Cetak 1 Album Photobook 20 lbr",
        "Video highlight reels 1 menit",
        "Semua soft copy via flashdisk",
      ]
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8 animate-bounce">
          <GraduationCap className="w-10 h-10" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6 border border-secondary/20">
          <Star className="w-4 h-4 fill-secondary" /> PROMO KAMPUS 2026
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Paket Foto Wisuda</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Momen sekali seumur hidup berhak mendapatkan sentuhan profesional. 
          Pilih paket wisuda yang pas untukmu atau geng kampusmu dengan harga spesial mahasiswa.
        </p>
      </section>

      {/* Pricing Packages */}
      <section className="container mx-auto px-6 mb-24 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`relative bg-card border rounded-[2rem] p-8 flex flex-col h-full ${
                pkg.popular 
                  ? "border-secondary shadow-xl shadow-secondary/10 md:-translate-y-4" 
                  : "border-border hover:border-primary/50 transition-colors"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground font-black uppercase tracking-wider text-xs px-4 py-1.5 rounded-full">
                  Paling Laris
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-foreground mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground font-semibold mb-6">{pkg.target}</p>
                <div className="text-muted-foreground line-through text-sm mb-1">
                  Rp {pkg.normalPrice}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="font-bold text-xl">Rp</span>
                  <span className="text-4xl font-black text-foreground">{pkg.price}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${pkg.popular ? "text-secondary" : "text-primary"}`} />
                    <span className="text-sm text-foreground/80 leading-tight pt-0.5">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                asChild
                size="lg" 
                variant={pkg.popular ? "secondary" : "default"}
                className={`w-full rounded-xl font-bold ${pkg.popular ? "" : "bg-foreground text-background hover:bg-foreground/90"}`}
              >
                <Link href={`/booking?service=foto-wisuda&paket=${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  Booking Jadwal
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Info Sections */}
      <section className="container mx-auto px-6 max-w-4xl">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8">
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-xl font-bold text-foreground mb-2">Proses Pengerjaan Cepat</h4>
            <p className="text-muted-foreground">Preview foto maksimal H+1. Hasil edit akhir dikirimkan dalam 3-5 hari kerja setelah foto dipilih.</p>
          </div>
          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8">
            <ImageIcon className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-xl font-bold text-foreground mb-2">Style Warna Bebas Pilih</h4>
            <p className="text-muted-foreground">Bisa request tone warna (Light & Airy, Moody Cinematic, True to Color, atau Vintage) sesuai selera.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
