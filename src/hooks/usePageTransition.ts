'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getDuration } from '@/lib/animations';

export function usePageTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(ref.current, {
        opacity: 0,
        y: 20,
        duration: getDuration(0.6),
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, { scope: ref });

  return ref;
}

