import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Shield, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sewa Alat Dokumentasi - Sunday Vibes",
  description: "Sewa kamera, drone, lighting, dan perlengkapan dokumentasi. Paket bundle tersedia.",
};

export default function SewaAlatPage() {
  const categories = [
    {
      name: "Lighting Equipment",
      items: [
        { name: "IL60 60W", slug: "il60-60w", desc: "Studio light portable, CRI 98", price: 75000, stock: 2 },
        { name: "IL150Pro 150W", slug: "il150pro-150w", desc: "Studio light pro, 2700K-7500K", price: 125000, stock: 2 },
        { name: "Softbox Kit-1", desc: "1 head, entry level", price: 75000, stock: 2 },
        { name: "Softbox Kit-2", desc: "2 head, mid tier", price: 85000, stock: 2 },
        { name: "Softbox Kit-3", desc: "3 head + tripod, full kit", price: 100000, stock: 2 },
        { name: "IPL17 RGB", desc: "RGB portable LED, battery", price: 35000, stock: 3 },
        { name: "Mixio PL08", desc: "Mini LED panel, on-camera", price: 30000, stock: 2 },
      ],
    },
    {
      name: "Stabilizer & Microphone",
      items: [
        { name: "TNW-M01Pro", desc: "Condenser mic pro, studio grade", price: 200000, stock: 1 },
        { name: "Brica B-Steady 2", desc: "Gimbal smartphone 3-axis", price: 175000, stock: 1 },
        { name: "DJI OM7", desc: "Gimbal smartphone premium, magnetic", price: 325000, stock: 1 },
      ],
    },
    {
      name: "Tripod",
      items: [
        { name: "Tripod S", desc: "Entry, max 150cm", price: 25000, stock: 4 },
        { name: "Tripod M", desc: "Mid, heavy duty, max 200cm", price: 35000, stock: 3 },
        { name: "Tripod L", desc: "Pro, max 260cm", price: 50000, stock: 2 },
      ],
    },
    {
      name: "Drone & Aerial",
      items: [
        { name: "DJI Lito X1", slug: "dji-lito-x1", desc: "Drone 4K/60fps HDR, 48MP, ActiveTrack, 30mnt", price: 220000, stock: 1, image: "/images/equipment/dji-lito-x1-4.jpg" },
        { name: "DJI Neo 2", slug: "dji-neo-2", desc: "Drone 4K/60fps, 12MP, Omnidirectional Obstacle Avoidance, 19mnt", price: 175000, stock: 1, image: "/images/equipment/dji-neo-2-3.jpg" },
      ],
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">🎥</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Katalog Sewa Multimedia</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Sewa lighting, stabilizer, microphone, dan tripod profesional. Pickup langsung, minimum 1 hari.
        </p>
      </section>

      {/* Catalog Section */}
      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {categories.map((category) => (
            <div key={category.name}>
              <h2 className="text-3xl font-bold text-foreground mb-8">{category.name}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item: { name: string; slug?: string; desc: string; price: number; stock: number; image?: string; }) => (
                  
                  <div key={item.name} className="flex flex-col p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow group overflow-hidden relative">
                    
                    {/* Add Image if available */}
                    {item.image && (
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity -mt-4 -mr-4 pointer-events-none">
                        <Image src={item.image} alt={item.name} fill sizes="128px" className="object-contain" />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-3 relative z-10">
                      <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                        Stok: {item.stock}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.desc}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-2xl font-black text-foreground">
                        Rp {item.price.toLocaleString("id-ID")}
                        <span className="text-sm font-normal text-muted-foreground">/hari</span>
                      </div>
                    </div>
                    {item.slug && (
                      <Link href={`/layanan/sewa-alat/${item.slug}`} className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-border font-bold text-sm hover:border-primary hover:bg-primary/5 transition-colors group-hover:border-primary/30">
                        Lihat Detail <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deposit Policy Section */}
      <section className="container mx-auto px-6 mb-16">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Kebijakan Deposit</h2>
              <p className="text-muted-foreground">Syarat dan ketentuan sewa alat</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Deposit: KTP/SIM Asli</p>
                <p className="text-sm text-muted-foreground">Tinggalkan identitas asli saat pickup, dikembalikan setelah alat dikembalikan</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Tanda Tangan Kontrak</p>
                <p className="text-sm text-muted-foreground">Semua penyewa wajib menandatangani kontrak rental sederhana</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Minimum Sewa: 1 Hari</p>
                <p className="text-sm text-muted-foreground">Pickup langsung di lokasi kami, tidak ada delivery</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Late Fee: 50% per Hari</p>
                <p className="text-sm text-muted-foreground">Keterlambatan pengenaan biaya tambahan 50% dari harga sewa per hari</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-foreground rounded-[2.5rem] p-12 text-center text-background">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Siap Sewa Alat?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Booking alat yang Anda butuhkan sekarang. Tim kami akan konfirmasi ketersediaan dan jadwal pickup.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg">
            <Link href="/kontrak">Ke Halaman Booking</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
