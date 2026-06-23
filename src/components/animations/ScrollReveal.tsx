'use client';

import { useRef } from 'react';
import { useScrollReveal, type UseScrollRevealOptions } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps extends UseScrollRevealOptions {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function ScrollReveal({
  children,
  className,
  as: Component = 'div',
  ...options
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLElement>(options);

  return (
    <Component ref={ref} className={cn('scroll-reveal', className)}>
      {children}
    </Component>
  );
}

export function FadeInUp({
  children,
  className,
  delay = 0,
  ...props
}: Omit<ScrollRevealProps, 'animation'> & { delay?: number }) {
  return (
    <ScrollReveal animation="fadeInUp" delay={delay} className={className} {...props}>
      {children}
    </ScrollReveal>
  );
}

export function FadeInDown({
  children,
  className,
  delay = 0,
  ...props
}: Omit<ScrollRevealProps, 'animation'> & { delay?: number }) {
  return (
    <ScrollReveal animation="fadeInDown" delay={delay} className={className} {...props}>
      {children}
    </ScrollReveal>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  ...props
}: Omit<ScrollRevealProps, 'animation'> & { delay?: number }) {
  return (
    <ScrollReveal animation="scaleIn" delay={delay} className={className} {...props}>
      {children}
    </ScrollReveal>
  );
}
