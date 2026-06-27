'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_PRESETS, STAGGER, getDuration } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseScrollRevealOptions {
  animation?: keyof typeof ANIMATION_PRESETS;
  stagger?: number;
  delay?: number;
  start?: string;
  end?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    animation = 'fadeInUp',
    stagger = 0,
    delay = 0,
    start = 'top 80%',
    end = 'bottom 20%',
    once = true,
  } = options;

  const ref = useRef<T>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const preset = ANIMATION_PRESETS[animation];
    const elements = ref.current.children.length > 0
      ? gsap.utils.toArray(ref.current.children) as HTMLElement[]
      : [ref.current];

    gsap.set(elements, { ...preset, opacity: 0 });

    gsap.to(elements, {
      ...preset,
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: getDuration(preset.duration),
      delay: getDuration(delay),
      stagger: stagger > 0 ? stagger : 0,
      ease: preset.ease,
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });
  }, { scope: ref });

  return ref;
}

export function useFadeInUp<T extends HTMLElement>(delay = 0) {
  return useScrollReveal<T>({ animation: 'fadeInUp', delay });
}

export function useFadeInDown<T extends HTMLElement>(delay = 0) {
  return useScrollReveal<T>({ animation: 'fadeInDown', delay });
}

export function useScaleIn<T extends HTMLElement>(delay = 0) {
  return useScrollReveal<T>({ animation: 'scaleIn', delay });
}

export function useStaggerReveal<T extends HTMLElement>(stagger = STAGGER.NORMAL) {
  return useScrollReveal<T>({ animation: 'fadeInUp', stagger });
}
