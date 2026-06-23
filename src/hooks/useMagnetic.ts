'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getDuration } from '@/lib/animations';

interface UseMagneticOptions {
  strength?: number;
  smoothness?: number;
}

export function useMagnetic<T extends HTMLElement>(options: UseMagneticOptions = {}) {
  const { strength = 0.3, smoothness = 0.3 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let animation: gsap.core.Tween | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(rect.width, rect.height);

      if (distance > maxDistance) {
        if (animation) animation.kill();
        animation = gsap.to(element, {
          x: 0,
          y: 0,
          duration: getDuration(smoothness),
          ease: 'elastic.out(1, 0.3)',
        });
        return;
      }

      const x = deltaX * strength;
      const y = deltaY * strength;

      if (animation) animation.kill();
      animation = gsap.to(element, {
        x,
        y,
        duration: getDuration(smoothness),
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (animation) animation.kill();
      animation = gsap.to(element, {
        x: 0,
        y: 0,
        duration: getDuration(0.5),
        ease: 'elastic.out(1, 0.5)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animation) animation.kill();
    };
  }, [strength, smoothness]);

  return ref;
}
