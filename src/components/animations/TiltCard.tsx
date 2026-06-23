'use client';

import { useRef } from 'react';
import { useTilt } from '@/hooks/useParallax';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 15 }: TiltCardProps) {
  const ref = useTilt<HTMLDivElement>(maxTilt);

  return (
    <div
      ref={ref}
      className={cn('tilt-card', className)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
