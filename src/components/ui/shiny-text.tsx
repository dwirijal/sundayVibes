'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
  shineColor?: string;
  disabled?: boolean;
}

export function ShinyText({
  text,
  className = '',
  speed = 3,
  shineColor,
  disabled = false,
}: ShinyTextProps) {
  const prefersReduced = useReducedMotion();
  const isDisabled = disabled || prefersReduced;

  return (
    <span
      className={isDisabled ? className : `shiny-text ${className}`}
      style={
        !isDisabled
          ? {
              animationDuration: `${speed}s`,
              ...(shineColor ? { '--shine-color': shineColor } as React.CSSProperties : {}),
            }
          : undefined
      }
    >
      {text}
    </span>
  );
}
