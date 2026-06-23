'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getDuration, STAGGER } from '@/lib/animations';
import { TiltCard } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: "🎉",
    title: "Event Organizer",
    slug: "/layanan/events",
    description: "Penyelenggaraan acara profesional dari skala kecil hingga besar.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: "💻",
    title: "Digital Product",
    slug: "/layanan/digital",
    description: "Template, preset, dan tools digital siap pakai.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: "📷",
    title: "Sewa Alat Dokumentasi",
    slug: "/layanan/sewa-alat",
    description: "Kamera, drone, lighting, dan perlengkapan produksi.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: "🎨",
    title: "Jasa Design",
    slug: "/layanan/design",
    description: "Desain grafis, branding, social media, dan materi marketing.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: "⚡",
    title: "Jasa Coding",
    slug: "/layanan/coding",
    description: "Pengembangan web app, API, dan integrasi sistem.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: "🌐",
    title: "Jasa WordPress",
    slug: "/layanan/wordpress",
    description: "Setup, kustomisasi, dan maintenance website WordPress.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: "📸",
    title: "Photography",
    slug: "/layanan/photography",
    description: "Foto produk, portrait, event, dan komersial.",
    color: "bg-accent text-primary",
  },
];

export function LayananClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.layanan-header > *', {
        scrollTrigger: {
          trigger: '.layanan-header',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: getDuration(0.6),
        ease: 'power3.out',
      });

      // Service cards stagger with rotation
      gsap.from('.layanan-card', {
        scrollTrigger: {
          trigger: '.layanan-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        rotation: -3,
        stagger: STAGGER.SLOW,
        duration: getDuration(0.7),
        ease: 'back.out(1.4)',
      });

      // CTA section
      gsap.from('.layanan-cta', {
        scrollTrigger: {
          trigger: '.layanan-cta',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: getDuration(0.6),
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section className="layanan-header container mx-auto px-6 max-w-5xl text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 font-semibold text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Semua Layanan
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
          Solusi Lengkap untuk<br />
          <span className="text-primary">Kebutuhan Kreatif Anda</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Dari konsep hingga eksekusi. Pilih layanan yang Anda butuhkan atau kombinasikan beberapa untuk hasil maksimal.
        </p>
      </section>

      <section className="container mx-auto px-6 max-w-6xl">
        <div className="layanan-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <TiltCard key={service.slug} className="layanan-card">
              <Link
                href={service.slug}
                className="group flex flex-col p-8 rounded-3xl border border-border bg-card hover:shadow-xl transition-shadow duration-300 h-full"
              >
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{service.title}</h2>
                <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                <span className="text-sm font-semibold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                  Lihat Detail
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </Link>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 mt-24">
        <div className="layanan-cta max-w-4xl mx-auto bg-foreground rounded-[2.5rem] p-12 text-center text-background">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Butuh Konsultasi?</h2>
          <p className="text-stone-400 text-lg mb-8 max-w-2xl mx-auto">
            Tidak yakin layanan mana yang cocok? Hubungi kami untuk diskusi gratis.
          </p>
          <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/kontak">Hubungi Kami</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
