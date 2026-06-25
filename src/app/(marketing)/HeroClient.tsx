'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getDuration } from '@/lib/animations';
import { TiltCard } from '@/components/animations';

interface HeroClientProps {
  homepageGlobal?: {
    heroHeadline?: React.ReactNode;
    heroSubheadline?: string;
  };
}

export function HeroClient({ homepageGlobal }: HeroClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: getDuration(0.2) });

      // Badge reveal
      tl.from('.hero-badge', {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: getDuration(0.5),
        ease: 'back.out(1.7)',
      });

      // Headline reveal
      tl.from('.hero-headline', {
        opacity: 0,
        y: 40,
        duration: getDuration(0.7),
        ease: 'power3.out',
      }, '-=0.2');

      // Subheadline
      tl.from('.hero-subheadline', {
        opacity: 0,
        y: 30,
        duration: getDuration(0.5),
        ease: 'power2.out',
      }, '-=0.3');

      // CTA buttons
      tl.from('.hero-cta > *', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: getDuration(0.4),
        ease: 'power2.out',
      }, '-=0.2');

      // Trust markers
      tl.from('.hero-trust > *', {
        opacity: 0,
        x: -20,
        stagger: 0.05,
        duration: getDuration(0.4),
        ease: 'power2.out',
      }, '-=0.1');

      // Central badge
      tl.from('.hero-center-badge', {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
        duration: getDuration(0.8),
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.8');

      // Floating cards stagger
      tl.from('.hero-float-card', {
        opacity: 0,
        scale: 0.8,
        y: 40,
        stagger: 0.15,
        duration: getDuration(0.6),
        ease: 'back.out(1.7)',
      }, '-=0.5');

      // Background blobs
      gsap.from('.hero-blob', {
        scale: 0,
        opacity: 0,
        duration: getDuration(2),
        stagger: 0.3,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, { scope: containerRef });

  // Floating cards parallax on mouse move
  useGSAP(() => {
    if (!floatingRef.current) return;

    const cards = floatingRef.current.querySelectorAll('.hero-float-card');

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        cards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const deltaX = (e.clientX - centerX) * 0.02 * (i + 1);
          const deltaY = (e.clientY - centerY) * 0.02 * (i + 1);

          gsap.to(card, {
            x: deltaX,
            y: deltaY,
            duration: getDuration(0.5),
            ease: 'power2.out',
          });
        });

        ticking = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: floatingRef });

  return (
    <>
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent dark:bg-stone-800/50 -z-10 [clip-path:polygon(20%_0%,100%_0%,100%_100%,0%_100%)]" />
      <div className="hero-blob absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[50px] mix-blend-multiply dark:mix-blend-screen -z-10" style={{ animationDuration: '8s' }} />
      <div className="hero-blob absolute bottom-[10%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-secondary/10 blur-[50px] mix-blend-multiply dark:mix-blend-screen -z-10" style={{ animationDuration: '12s' }} />

      <div ref={containerRef} className="container mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* Left: Copy */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 font-semibold text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            One-stop creative platform
          </div>

          <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[1.05] mb-6">
            {homepageGlobal?.heroHeadline || (
              <>
                Karya terbaik,<br />
                <span className="text-primary">tanpa pusing.</span>
              </>
            )}
          </h1>

          <p className="hero-subheadline text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
            {homepageGlobal?.heroSubheadline || "Dari konsep event hingga foto produk yang siap publish. Sunday Vibes menyatukan seluruh kebutuhan kreatif dan teknis Anda dalam satu ekosistem yang terintegrasi, transparan, dan profesional."}
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] hover:-translate-y-1 transition-all duration-300">
              <Link href="/layanan">Eksplorasi Layanan</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold border-2 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors duration-300">
              <Link href="/portfolio">Lihat Portfolio</Link>
            </Button>
          </div>

          {/* Trust Markers */}
          <div className="hero-trust mt-12 flex items-center gap-6 pt-8 border-t border-stone-200 dark:border-stone-800 w-full">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-stone-900 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-500 z-[4] relative">
                  {i === 4 ? '+50' : ''}
                </div>
              ))}
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Dipercaya oleh 50+ klien lokal & nasional
            </div>
          </div>
        </div>

        {/* Right: Signature Visual */}
        <div ref={floatingRef} className="relative flex items-center justify-center h-[500px] lg:h-[600px] w-full">
          {/* Central Badge */}
          <TiltCard className="hero-center-badge relative z-20 w-72 h-72 sm:w-80 sm:h-80 bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-stone-100 dark:border-stone-800 flex items-center justify-center p-12 hover:shadow-[0_30px_80px_-15px_rgba(245,158,11,0.15)] transition-shadow duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-transparent rounded-[2.5rem] opacity-50" />
            <Image
              src="/assets/logo-black-transparent.webp"
              alt="Sunday Vibes"
              width={200}
              height={200}
              className="dark:invert object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
              priority
            />
          </TiltCard>

          {/* Floating Service Cards */}
          <Link href="/layanan/digital" className="hero-float-card absolute top-[10%] right-[10%] z-30 bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 hover:scale-105 transition-transform cursor-pointer block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4 4 4-4"></path></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Digital Products</div>
                <div className="text-xs text-muted-foreground">Ready to publish</div>
              </div>
            </div>
          </Link>

          <Link href="/foto" className="hero-float-card absolute bottom-[20%] left-[5%] z-30 bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 hover:scale-105 transition-transform cursor-pointer block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Photography</div>
                <div className="text-xs text-muted-foreground">Professional Studio</div>
              </div>
            </div>
          </Link>

          <Link href="/layanan/coding" className="hero-float-card absolute top-[60%] right-[-5%] z-30 bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 hover:scale-105 transition-transform cursor-pointer hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-foreground dark:bg-background flex items-center justify-center text-background dark:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Web & App</div>
                <div className="text-xs text-muted-foreground">Custom Dev</div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </>
  );
}
