'use client';

import { useRef } from 'react';
import { animate } from 'animejs';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ButtonEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function ButtonEffect({ children, className }: ButtonEffectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    if (prefersReducedMotion || !wrapperRef.current) return;
    animate(wrapperRef.current, { scale: 1.05, easing: 'easeOutQuad', duration: 200 });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !wrapperRef.current) return;
    animate(wrapperRef.current, { scale: 1, easing: 'easeOutQuad', duration: 200 });
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  );
}
