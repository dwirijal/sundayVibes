"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Equipment {
  id: string;
  name: string;
  slug: string;
  price_per_day: number;
  available: number;
  images?: Array<{
    image: {
      url: string;
      alt?: string;
    }
  }>;
}

interface SewaAlatProps {
  equipment: Equipment[];
}

export default function SewaAlatClient({ equipment }: SewaAlatProps) {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
          🎥
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Sewa Alat Produksi</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Peralatan dokumentasi profesional siap pakai untuk mendukung kelancaran produksi kreatif Anda.
        </p>
      </section>

      {/* Equipment Grid */}
      <section className="container mx-auto px-6 mb-24 max-w-6xl">
        {equipment.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">Katalog alat sedang diperbarui.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col p-6 rounded-[2rem] border border-border bg-card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white dark:bg-stone-800 mb-6 border border-stone-100 dark:border-stone-700 flex items-center justify-center p-4">
                  {item.images && item.images.length > 0 && item.images[0]?.image?.url ? (
                    <Image
                      src={item.images[0].image.url}
                      alt={item.images[0].image.alt || item.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-6xl opacity-20">📷</div>
                  )}
                  
                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10 ${
                    item.available > 0 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {item.available > 0 ? `${item.available} Tersedia` : 'Sedang Disewa'}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">
                  {item.name}
                </h3>
                
                <div className="flex flex-col mt-auto pb-6 border-b border-border mb-6">
                  <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                    Harga Sewa
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-foreground">
                      Rp {item.price_per_day.toLocaleString('id-ID')}
                    </span>
                    <span className="text-muted-foreground font-medium">/hari</span>
                  </div>
                </div>

                <Button asChild={item.available > 0} 
                  size="lg" 
                  className={`w-full rounded-full h-12 font-bold ${
                    item.available > 0 
                      ? 'bg-foreground text-background hover:bg-foreground/90' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  disabled={item.available <= 0}
                >
                  {item.available > 0 ? (
                    <Link href={`/booking?service=sewa-alat&equipment=${item.slug}`}>
                      Booking Alat Ini
                    </Link>
                  ) : (
                    <span>Tidak Tersedia</span>
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Syarat dan Ketentuan Banner */}
      <section className="container mx-auto px-6 mb-24">
        <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Syarat & Ketentuan Sewa
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <ul className="space-y-3 list-disc list-inside">
              <li>Penyewa wajib menjaminkan 2 identitas asli (KTP/SIM/KK/KTM) yang masih berlaku.</li>
              <li>Penyewa wajib menitipkan kendaraan beserta STNK atas nama yang sama dengan KTP (atau deposit dana tunai setara harga alat).</li>
              <li>Sewa dihitung per 24 jam. Keterlambatan pengembalian akan dikenakan denda proporsional per jam.</li>
            </ul>
            <ul className="space-y-3 list-disc list-inside">
              <li>Penyewa bertanggung jawab penuh atas kerusakan atau kehilangan alat selama masa sewa.</li>
              <li>Booking alat minimal 1 hari sebelumnya dengan menyertakan DP 50%.</li>
              <li>Pembatalan H-1 akan dikenakan potongan DP 50%.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
