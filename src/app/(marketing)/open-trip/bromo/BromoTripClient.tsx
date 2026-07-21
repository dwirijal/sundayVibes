"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/PricingCard";
import { TiltCard } from "@/components/animations";
import { getDuration, STAGGER } from "@/lib/animations";
import { Calendar, AlertCircle, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DESTINATIONS = [
  {
    title: "Gunung Bromo",
    icon: "🌋",
    desc: "Kawah aktif eksotis dengan pemandangan kaldera lautan pasir raksasa yang menakjubkan.",
    color: "from-amber-500/20 to-orange-500/20 text-amber-500 dark:text-amber-400",
  },
  {
    title: "Penanjakan",
    icon: "🌅",
    desc: "Spot golden sunrise terbaik untuk menyaksikan keindahan matahari terbit berlatar Gunung Bromo, Batok, dan Semeru.",
    color: "from-red-500/20 to-pink-500/20 text-red-500 dark:text-pink-400",
  },
  {
    title: "Pura Luhur Poten",
    icon: "⛩️",
    desc: "Tempat ibadah umat Hindu suku Tengger yang berdiri megah di kaki Gunung Bromo.",
    color: "from-violet-500/20 to-purple-500/20 text-violet-500 dark:text-violet-400",
  },
  {
    title: "Pasir Berbisik",
    icon: "🏜️",
    desc: "Padang pasir luas yang mengeluarkan suara mendesir khas ketika angin bertiup kencang.",
    color: "from-yellow-500/20 to-amber-600/20 text-yellow-600 dark:text-amber-300",
  },
  {
    title: "Bukit Teletubbies",
    icon: "⛰️",
    desc: "Hamparan bukit savana hijau bergelombang yang menyegarkan mata, mirip lanskap fiksi Teletubbies.",
    color: "from-emerald-500/20 to-green-500/20 text-emerald-500 dark:text-green-400",
  },
];

const FACILITIES = [
  { text: "Makan 1x (sarapan/makan siang lokal)", icon: "🍽️" },
  { text: "Snack box keberangkatan", icon: "🍪" },
  { text: "Air mineral botol selama trip", icon: "💧" },
  { text: "Tour Leader & Guide ramah per rombongan", icon: "🧭" },
  { text: "Transportasi Full AC (pulang-pergi)", icon: "🚐" },
  { text: "Jeep Hardtop 4x4 (isi max 6 orang - mixed untuk open trip)", icon: "🚜" },
];

export function BromoTripClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header section animation
      gsap.from(".trip-header > *", {
        scrollTrigger: {
          trigger: ".trip-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: getDuration(0.6),
        ease: "power3.out",
      });

      // Destinations stagger animation
      gsap.from(".destination-card", {
        scrollTrigger: {
          trigger: ".destinations-grid",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        stagger: STAGGER.SLOW,
        duration: getDuration(0.7),
        ease: "back.out(1.2)",
      });

      // Facilities animate
      gsap.from(".facility-item", {
        scrollTrigger: {
          trigger: ".facilities-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -20,
        stagger: STAGGER.FAST,
        duration: getDuration(0.5),
        ease: "power2.out",
      });

      // Pricing cards layout animation
      gsap.from(".pricing-card-wrap", {
        scrollTrigger: {
          trigger: ".pricing-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: getDuration(0.8),
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  });

  const getWhatsAppLink = (type: "open" | "private") => {
    const tripName = "Bromo Golden Sunrise (25-26 Juli 2026)";
    const typeLabel = type === "open" ? "Open Trip (Rp 450.000/pax)" : "Private Trip (Rp 1.200.000/paket - max 4 pax)";
    const message = `Halo Admin Sunday Vibes! 👋\n\nSaya ingin mendaftar trip Bromo:\n\n*Trip:* ${tripName}\n*Tipe:* ${typeLabel}\n*Nama:* \n*Jumlah Peserta:* \n*Titik Kumpul:* [Tuban Abirama / Abiphraya / Pakah / Plumpang / Babat / Lamongan Plaza / Terminal Bunder Gresik]\n*Catatan:* \n\nMohon informasi ketersediaan slot dan cara pembayarannya. Terima kasih!`;
    return `https://wa.me/6285157319611?text=${encodeURIComponent(message)}`;
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-24 sm:space-y-32">

      {/* 1. HERO SECTION */}
      <section className="trip-header text-center max-w-4xl mx-auto space-y-6 pt-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20 animate-pulse">
          <Calendar className="w-4 h-4" />
          <span>25 - 26 Juli 2026</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1] select-none">
          Bromo Golden Sunrise <br />
          <span className="bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
            Open & Private Trip
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Nikmati petualangan tak terlupakan menyaksikan samudera awan dan golden sunrise tercantik di Gunung Bromo dengan pelayanan premium Sunday Vibes.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base font-bold shadow-[0_8px_30px_-10px_rgba(245,158,11,0.5)]">
            <a href="#pricing">Daftar Sekarang</a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-bold border-2">
            <a href="#destinations">Lihat Destinasi</a>
          </Button>
        </div>
      </section>

      {/* 2. SUMMARY STATS / OVERVIEW */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-[2rem] bg-muted/40 border border-border/80 text-center">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Durasi</p>
          <p className="text-xl sm:text-2xl font-black text-foreground">2 Hari 1 Malam</p>
        </div>
        <div className="space-y-1 border-l border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Start From</p>
          <p className="text-xl sm:text-2xl font-black text-primary">Rp 450.000</p>
        </div>
        <div className="space-y-1 border-l border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Meeting Point</p>
          <p className="text-xl sm:text-2xl font-black text-foreground">Tuban - Gresik</p>
        </div>
        <div className="space-y-1 border-l border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Max Jeep</p>
          <p className="text-xl sm:text-2xl font-black text-foreground">6 Orang / Jeep</p>
        </div>
      </section>

      {/* 3. DESTINATIONS SECTION */}
      <section id="destinations" className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Destinasi Populer Bromo</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Kami akan mengajak Anda mengunjungi 5 destinasi ikonik di kawasan Taman Nasional Bromo Tengger Semeru.
          </p>
        </div>

        <div className="destinations-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <div key={i} className="destination-card">
              <TiltCard className="h-full flex flex-col p-6 sm:p-8 rounded-[2rem] border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dest.color} flex items-center justify-center text-3xl mb-6`}>
                  {dest.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  {dest.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {dest.desc}
                </p>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* RUTE & TITIK KUMPUL (MEETING POINT) SECTION */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Rute Keberangkatan
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Titik Kumpul & Penjemputan</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Kami melayani penjemputan gratis di sepanjang jalur pantura Jawa Timur mulai dari Tuban hingga Gresik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-[2rem] border border-border bg-card hover:border-primary/30 transition-colors space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary/10 text-primary">
                <MapPin className="w-5 h-5" />
              </span>
              Tuban
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-semibold">
              <li className="flex items-center gap-2">• Tuban Abirama (Utama)</li>
              <li className="flex items-center gap-2">• GOR Abiphraya</li>
              <li className="flex items-center gap-2">• Pertigaan Pakah</li>
              <li className="flex items-center gap-2">• Kecamatan Plumpang</li>
            </ul>
          </div>

          <div className="p-6 rounded-[2rem] border border-border bg-card hover:border-primary/30 transition-colors space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary/10 text-primary">
                <MapPin className="w-5 h-5" />
              </span>
              Babat
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-semibold">
              <li className="flex items-center gap-2">• Pertigaan Babat</li>
            </ul>
          </div>

          <div className="p-6 rounded-[2rem] border border-border bg-card hover:border-primary/30 transition-colors space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary/10 text-primary">
                <MapPin className="w-5 h-5" />
              </span>
              Lamongan
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-semibold">
              <li className="flex items-center gap-2">• Lamongan Plaza</li>
            </ul>
          </div>

          <div className="p-6 rounded-[2rem] border border-border bg-card hover:border-primary/30 transition-colors space-y-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary/10 text-primary">
                <MapPin className="w-5 h-5" />
              </span>
              Gresik
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-semibold">
              <li className="flex items-center gap-2">• Terminal Bunder Gresik</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. FACILITIES SECTION */}
      <section className="facilities-section grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-muted/30 border border-border/60 rounded-[2.5rem] p-8 sm:p-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Fasilitas Terbaik
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-[1.2]">
            Semua Kebutuhan <br />
            Perjalanan Anda Terpenuhi
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Tidak perlu khawatir tentang logistik. Kami menyediakan fasilitas lengkap untuk memastikan kenyamanan Anda selama trip berlangsung dari awal sampai akhir.
          </p>
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-600 dark:text-amber-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>
              <strong>Catatan:</strong> Konsumsi pribadi di luar fasilitas, tips crew (opsional), dan tiket masuk WNA (jika ada) tidak termasuk.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FACILITIES.map((facility, i) => (
            <div
              key={i}
              className="facility-item flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <span className="text-2xl" aria-hidden="true">{facility.icon}</span>
              <span className="text-sm font-semibold text-muted-foreground">{facility.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section id="pricing" className="pricing-section space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">Pilihan Paket Trip Bromo</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Pilih cara liburan terbaik Anda. Gabung dengan rombongan lain atau nikmati privasi penuh bersama orang terdekat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Open Trip */}
          <div className="pricing-card-wrap">
            <PricingCard
              name="Open Trip Bromo"
              description="Sangat cocok untuk solo traveler, pasangan, atau grup kecil yang ingin menambah teman baru sekaligus menghemat budget."
              price="Rp 450.000 / orang"
              badge="Best Value"
              highlighted={true}
              features={[
                "Keberangkatan pasti 25-26 Juli 2026",
                "Jeep hardtop mixed (max 6 pax/jeep)",
                "Meeting point Malang / Surabaya",
                "Semua fasilitas standar termasuk",
                "Teman perjalanan baru yang seru",
              ]}
            >
              <Button size="lg" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-sm font-bold mt-auto shadow-md">
                <a href={getWhatsAppLink("open")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Daftar Open Trip
                </a>
              </Button>
            </PricingCard>
          </div>

          {/* Card 2: Private Trip */}
          <div className="pricing-card-wrap">
            <PricingCard
              name="Private Trip Bromo"
              description="Nikmati kebebasan penuh bersama keluarga atau teman terdekat tanpa terganggu jadwal dan kehadiran rombongan lain."
              price="Rp 1.200.000 / paket"
              badge="Private Package"
              highlighted={false}
              features={[
                "Maksimal 4 orang per rombongan",
                "1 Jeep hardtop khusus rombongan Anda",
                "Jadwal perjalanan lebih fleksibel",
                "Bebas tentukan waktu penjemputan",
                "Privasi penuh tanpa digabung orang lain",
              ]}
            >
              <Button size="lg" variant="outline" className="w-full rounded-full h-12 text-sm font-bold border-2 mt-auto">
                <a href={getWhatsAppLink("private")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Daftar Private Trip
                </a>
              </Button>
            </PricingCard>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="container mx-auto px-0">
        <div className="max-w-4xl mx-auto bg-stone-900 dark:bg-stone-950 rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center text-stone-100 relative overflow-hidden border border-stone-800">
          {/* Decorative ambient gradient inside the card */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-100 leading-[1.2]">
              Siap Menikmati Keindahan Bromo?
            </h2>
            <p className="text-stone-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Kuota terbatas untuk masing-masing tipe trip! Hubungi tim kami langsung via WhatsApp untuk mengamankan slot perjalanan Anda pada 25-26 Juli 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base font-bold shadow-lg">
                <a href={getWhatsAppLink("open")} target="_blank" rel="noopener noreferrer">
                  Daftar Open Trip (450K)
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-bold border-stone-700 text-stone-100 hover:bg-stone-800 hover:text-stone-50">
                <a href="https://wa.me/6285157319611" target="_blank" rel="noopener noreferrer">
                  Tanya-tanya Dulu
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
