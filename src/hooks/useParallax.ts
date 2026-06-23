'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getDuration } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export function useParallax<T extends HTMLElement>(options: UseParallaxOptions = {}) {
  const { speed = 0.5, direction = 'vertical' } = options;
  const ref = useRef<T>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const property = direction === 'vertical' ? 'y' : 'x';
    const distance = 100 * speed;

    gsap.to(ref.current, {
      [property]: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: ref });

  return ref;
}

export function useMouseParallax<T extends HTMLElement>(strength = 0.05) {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      setPosition({
        x: deltaX * strength,
        y: deltaY * strength,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return { ref, position };
}

export function useTilt<T extends HTMLElement>(maxTilt = 15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const rotateY = (deltaX / 100) * maxTilt;
      const rotateX = -(deltaY / 100) * maxTilt;

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: getDuration(0.3),
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: getDuration(0.5),
        ease: 'elastic.out(1, 0.5)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return ref;
}
