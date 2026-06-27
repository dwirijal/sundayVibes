'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getDuration } from '@/lib/animations';
import HeroBackground from '@/components/HeroBackground';
import HeroContent from '@/components/HeroContent';
import HeroActions from '@/components/HeroActions';

interface HeroClientProps {
  homepageGlobal?: {
    heroHeadline?: React.ReactNode;
    heroSubheadline?: string;
  };
}

export function HeroClient({ homepageGlobal }: HeroClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: getDuration(0.2) });

      tl.from('.hero-badge', {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: getDuration(0.5),
        ease: 'back.out(1.7)',
      });

      tl.from('.hero-headline', {
        opacity: 0,
        y: 40,
        duration: getDuration(0.7),
        ease: 'power3.out',
      }, '-=0.2');

      tl.from('.hero-subheadline', {
        opacity: 0,
        y: 30,
        duration: getDuration(0.5),
        ease: 'power2.out',
      }, '-=0.3');

      tl.from('.hero-cta > *', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: getDuration(0.4),
        ease: 'power2.out',
      }, '-=0.2');

      tl.from('.hero-trust > *', {
        opacity: 0,
        x: -20,
        stagger: 0.05,
        duration: getDuration(0.4),
        ease: 'power2.out',
      }, '-=0.1');

      tl.from('.hero-center-badge', {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
        duration: getDuration(0.8),
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.8');

      tl.from('.hero-float-card', {
        opacity: 0,
        scale: 0.8,
        y: 40,
        stagger: 0.15,
        duration: getDuration(0.6),
        ease: 'back.out(1.7)',
      }, '-=0.5');

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
    <HeroBackground>
      <div ref={containerRef} className="container mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <HeroContent
          heroHeadline={homepageGlobal?.heroHeadline}
          heroSubheadline={homepageGlobal?.heroSubheadline}
        />
        <HeroActions ref={floatingRef} />
      </div>
    </HeroBackground>
  );
}
