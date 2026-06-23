'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getDuration, STAGGER } from '@/lib/animations';

export function HeroAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: getDuration(0.3) });

      // Badge reveal
      tl.from('.hero-badge', {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: getDuration(0.5),
        ease: 'back.out(1.7)',
      });

      // Headline - word by word
      tl.from('.hero-headline > *', {
        opacity: 0,
        y: 50,
        rotateX: -45,
        stagger: 0.08,
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

  return containerRef;
}

export function FloatingCards() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const cards = ref.current.querySelectorAll('.hero-float-card');

    const handleMouseMove = (e: MouseEvent) => {
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
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return ref;
}
