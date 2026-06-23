# Static Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 6 static service pages (Events, Design, Sewa Alat, Digital, Coding, WordPress) using a consistent "Hero + Packages + Booking CTA" structure.

**Architecture:** We will create individual Next.js Server Components for each service page. We will hardcode the text content based on the PRD for Phase 1 to get the layout and structure perfect.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, Tailwind CSS v4, Shadcn UI.

## Global Constraints
- Use existing Tailwind configuration and custom CSS variables from `src/app/globals.css`.
- Use the standard `Button` component from `src/components/ui/button.tsx`.
- Ensure mobile responsiveness (mobile-first approach).
- All CTA buttons must use `next/link` to point to `/booking?service=<slug>`.

---

### Task 1: Event Organizer Page Implementation

**Files:**
- Modify: `src/app/layanan/events/page.tsx`

**Interfaces:**
- Produces: The static `/layanan/events` page route.

- [ ] **Step 1: Implement the Hero, Packages, and CTA sections**

Overwrite `src/app/layanan/events/page.tsx` with the complete layout.

```tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function EventsPage() {
  const packages = [
    {
      name: "Bronze",
      price: "Mulai Rp 5.000.000",
      description: "Cocok untuk acara skala kecil seperti ulang tahun atau intimate gathering.",
      features: ["Konsultasi Konsep", "Venue Sourcing", "Rundown Acara", "1 Crew Event"],
    },
    {
      name: "Silver",
      price: "Mulai Rp 15.000.000",
      description: "Pilihan tepat untuk seminar, workshop, atau acara corporate menengah.",
      features: ["Semua di Bronze", "Vendor Management", "Desain Publikasi Dasar", "3 Crew Event", "Laporan Kegiatan"],
      isPopular: true,
    },
    {
      name: "Gold",
      price: "Custom",
      description: "Layanan end-to-end untuk acara besar, konser, atau pameran.",
      features: ["Semua di Silver", "Sponsorship Management", "Talent Management", "Full Tim Dokumentasi", "Dedicated Project Manager"],
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">🎉</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Event Organizer</h1>
        <p className="text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
          Layanan penyelenggaraan acara profesional dari skala kecil hingga besar. Kami mengurus detailnya, Anda menikmati acaranya.
        </p>
      </section>

      {/* Packages Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket</h2>
          <p className="text-stone-500">Pilih paket yang sesuai dengan skala acara Anda.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-primary shadow-xl shadow-primary/10 bg-white dark:bg-stone-900' : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Paling Diminati
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-stone-500 mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? '' : 'border-2'}`}>
                <Link href="/booking?service=events" className="w-full">Pilih Paket</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-stone-900 dark:bg-stone-100 rounded-[2.5rem] p-12 text-center text-white dark:text-stone-900">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Punya Konsep Acara Sendiri?</h2>
          <p className="text-stone-300 dark:text-stone-600 text-lg mb-8 max-w-2xl mx-auto">
            Isi form konsultasi kami dengan detail tanggal, tipe acara, budget, dan lokasi. Tim kami akan segera menghubungi Anda dengan penawaran terbaik.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg">
            <Link href="/booking?service=events">Konsultasi Sekarang</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layanan/events/page.tsx
git commit -m "feat: implement events service static page"
```

---

### Task 2: Design & Web Service Page Implementation

**Files:**
- Modify: `src/app/layanan/design/page.tsx`

**Interfaces:**
- Produces: The static `/layanan/design` page route.

- [ ] **Step 1: Implement the Design Service Page**

Overwrite `src/app/layanan/design/page.tsx`.

```tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function DesignPage() {
  const packages = [
    {
      name: "Sosmed Kit",
      price: "Mulai Rp 1.500.000",
      description: "Desain konten bulanan untuk Instagram/TikTok agar feed brand Anda konsisten.",
      features: ["15 Feed Design", "10 Story Design", "Copywriting Dasar", "2x Revisi Minor"],
    },
    {
      name: "Brand Identity",
      price: "Mulai Rp 3.500.000",
      description: "Pembuatan identitas visual komplit untuk brand baru atau rebranding.",
      features: ["Logo Design", "Color Palette", "Typography", "Brand Guidelines", "3 Mockup Implementasi"],
      isPopular: true,
    },
    {
      name: "Print & Merch",
      price: "Custom",
      description: "Desain kemasan, brosur, banner, hingga merchandise perusahaan.",
      features: ["Desain Packaging", "Desain Seragam", "Company Profile", "Siap Cetak (Hi-Res)", "Source File"],
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">🎨</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Jasa Design</h1>
        <p className="text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
          Desain grafis, branding, social media, dan materi marketing yang tidak generik untuk memperkuat identitas brand Anda.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pilihan Paket Desain</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-secondary shadow-xl shadow-secondary/10 bg-white dark:bg-stone-900' : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Paling Diminati
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-stone-500 mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                    <Check className="w-5 h-5 text-secondary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'border-2'}`}>
                <Link href="/booking?service=design" className="w-full">Pilih Paket</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-stone-900 dark:bg-stone-100 rounded-[2.5rem] p-12 text-center text-white dark:text-stone-900">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Isi Brief Desain Anda</h2>
          <p className="text-stone-300 dark:text-stone-600 text-lg mb-8 max-w-2xl mx-auto">
            Ceritakan kebutuhan visual Anda dan unggah referensi style yang diinginkan. Kami siap mewujudkannya.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-lg">
            <Link href="/booking?service=design">Isi Brief Sekarang</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layanan/design/page.tsx
git commit -m "feat: implement design service static page"
```

---

### Task 3: Sewa Alat & Digital Products Page Implementation

**Files:**
- Modify: `src/app/layanan/sewa-alat/page.tsx`
- Modify: `src/app/layanan/digital/page.tsx`

**Interfaces:**
- Produces: The static `/layanan/sewa-alat` and `/layanan/digital` page routes.

- [ ] **Step 1: Implement the Sewa Alat Page**

Overwrite `src/app/layanan/sewa-alat/page.tsx`.

```tsx
import { Button } from "@/components/ui/button";
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
        <p className="text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
          Sewa kamera, drone, lighting, dan perlengkapan produksi dengan jaminan kualitas dan ketersediaan real-time.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Paket Sewa Populer</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-blue-500 shadow-xl shadow-blue-500/10 bg-white dark:bg-stone-900' : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Paling Diminati
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-stone-500 mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                    <Check className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border-2'}`}>
                <Link href="/booking?service=sewa-alat" className="w-full">Sewa Sekarang</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Implement the Digital Products Page**

Overwrite `src/app/layanan/digital/page.tsx`.

```tsx
import { Button } from "@/components/ui/button";
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
        <p className="text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
          Template, preset, dan tools digital terbaik untuk meningkatkan produktivitas dan kualitas karya Anda.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((pkg) => (
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-amber-500 shadow-xl shadow-amber-500/10 bg-white dark:bg-stone-900' : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Bestseller
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-stone-500 mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-amber-500 text-white hover:bg-amber-600' : 'border-2'}`}>
                <Link href="#" className="w-full">Beli Sekarang</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layanan/sewa-alat/page.tsx src/app/layanan/digital/page.tsx
git commit -m "feat: implement sewa alat and digital product static pages"
```

---

### Task 4: Coding & WordPress Page Implementation

**Files:**
- Create: `src/app/layanan/coding/page.tsx`
- Create: `src/app/layanan/wordpress/page.tsx`

**Interfaces:**
- Produces: The static `/layanan/coding` and `/layanan/wordpress` page routes.

- [ ] **Step 1: Create the Coding Page**

Create `src/app/layanan/coding/page.tsx`.

```tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function CodingPage() {
  const packages = [
    {
      name: "Landing Page",
      price: "Mulai Rp 2.500.000",
      description: "Halaman web statis super cepat untuk promosi produk atau company profile.",
      features: ["Custom Design (Tailwind)", "SEO Friendly", "Form Integrasi", "Hosting 1 Tahun"],
    },
    {
      name: "Web Application",
      price: "Mulai Rp 8.000.000",
      description: "Aplikasi web full-stack dengan database dan autentikasi user.",
      features: ["Next.js (App Router)", "Database Setup", "User Authentication", "Dashboard Admin", "API Integration"],
      isPopular: true,
    },
    {
      name: "Maintenance & API",
      price: "Custom",
      description: "Integrasi sistem third-party atau perbaikan aplikasi yang sudah ada.",
      features: ["Bug Fixing", "Payment Gateway (Midtrans)", "WhatsApp API", "Performance Optimization", "SLA Response Time"],
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <section className="container mx-auto px-6 max-w-4xl text-center mb-24">
        <div className="w-20 h-20 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">💻</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Jasa Coding & Web Dev</h1>
        <p className="text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
          Pengembangan aplikasi web modern, pembuatan API, dan integrasi sistem menggunakan stack Next.js dan Node.js.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-green-500 shadow-xl shadow-green-500/10 bg-white dark:bg-stone-900' : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Tech Stack Modern
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-stone-500 mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-green-500 text-white hover:bg-green-600' : 'border-2'}`}>
                <Link href="/booking?service=coding" className="w-full">Konsultasi Project</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Create the WordPress Page**

Create `src/app/layanan/wordpress/page.tsx`.

```tsx
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
        <p className="text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
          Setup, kustomisasi, pengembangan toko online, dan maintenance website WordPress profesional.
        </p>
      </section>

      <section className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`relative flex flex-col p-8 rounded-3xl border ${pkg.isPopular ? 'border-sky-500 shadow-xl shadow-sky-500/10 bg-white dark:bg-stone-900' : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950'}`}>
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Siap Jualan
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
              <p className="text-stone-500 mb-6 text-sm flex-grow">{pkg.description}</p>
              <div className="text-3xl font-black text-foreground mb-8">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                    <Check className="w-5 h-5 text-sky-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" variant={pkg.isPopular ? "default" : "outline"} className={`w-full rounded-full ${pkg.isPopular ? 'bg-sky-500 text-white hover:bg-sky-600' : 'border-2'}`}>
                <Link href="/booking?service=wordpress" className="w-full">Pilih Paket</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Test Build**

Run: `npm run build` or `bun run build`
Ensure no TypeErrors occur.

- [ ] **Step 4: Commit**

```bash
git add src/app/layanan/coding/page.tsx src/app/layanan/wordpress/page.tsx
git commit -m "feat: implement coding and wordpress service static pages"
```
