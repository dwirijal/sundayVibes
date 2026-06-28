'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BlobCursorProps {
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  zIndex?: number;
  className?: string;
}

export function BlobCursor({
  fillColor = 'rgba(245, 158, 11, 0.5)',
  trailCount = 3,
  sizes = [40, 60, 35],
  zIndex = 50,
  className = '',
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = useReducedMotion();

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          x: x - rect.left - (sizes[i] ?? 40) / 2,
          y: y - rect.top - (sizes[i] ?? 40) / 2,
          duration: i === 0 ? 0.15 : 0.3 + i * 0.15,
          ease: i === 0 ? 'power3.out' : 'power1.out',
        });
      });
    },
    [sizes],
  );

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;
    const el = containerRef.current;
    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('touchmove', handleMove);
    };
  }, [handleMove, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={{ zIndex }}>
      <svg className="absolute w-0 h-0">
        <filter id="blob-merge">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
        </filter>
      </svg>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ filter: 'url(#blob-merge)' }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { blobsRef.current[i] = el; }}
            className="absolute rounded-full will-change-transform"
            style={{
              width: sizes[i],
              height: sizes[i],
              backgroundColor: fillColor,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
}
