'use client';

import { useEffect, useRef } from 'react';
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

export function useStaggerPageTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const children = gsap.utils.toArray(ref.current.children) as HTMLElement[];

    gsap.from(children, {
      opacity: 0,
      y: 30,
      duration: getDuration(0.5),
      stagger: 0.1,
      ease: 'power3.out',
      delay: getDuration(0.2),
    });
  }, { scope: ref });

  return ref;
}
