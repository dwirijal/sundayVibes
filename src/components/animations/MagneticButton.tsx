'use client';

import { forwardRef } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends ButtonProps {
  strength?: number;
  smoothness?: number;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, strength = 0.3, smoothness = 0.3, ...props }, ref) => {
    const magneticRef = useMagnetic<HTMLButtonElement>({ strength, smoothness });

    return (
      <Button
        ref={(node) => {
          magneticRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn('magnetic-button', className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';
