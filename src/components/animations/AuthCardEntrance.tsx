'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getDuration } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AuthCardEntranceProps {
  children: React.ReactNode;
  className?: string;
}

/** Subtle fade-up on mount for auth surfaces (login/register).
 *  Restrained on purpose — trust pages shouldn't feel busy. */
export function AuthCardEntrance({ children, className }: AuthCardEntranceProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: getDuration(0.6),
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
