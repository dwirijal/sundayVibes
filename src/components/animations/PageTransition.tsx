'use client';

import { usePageTransition } from '@/hooks/usePageTransition';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const ref = usePageTransition();

  return (
    <div ref={ref} className={cn('page-transition', className)}>
      {children}
    </div>
  );
}
