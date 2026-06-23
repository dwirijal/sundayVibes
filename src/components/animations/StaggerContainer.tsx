'use client';

import { useRef } from 'react';
import { useStaggerReveal } from '@/hooks/useScrollReveal';
import { STAGGER } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function StaggerContainer({
  children,
  className,
  stagger = STAGGER.NORMAL,
  as: Component = 'div',
}: StaggerContainerProps) {
  const ref = useStaggerReveal<HTMLDivElement>(stagger);

  return (
    <Component ref={ref} className={cn('stagger-container', className)}>
      {children}
    </Component>
  );
}
