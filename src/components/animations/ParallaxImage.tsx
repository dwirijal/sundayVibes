'use client';

import { useRef } from 'react';
import { useParallax } from '@/hooks/useParallax';
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ParallaxImageProps extends Omit<ImageProps, 'ref'> {
  speed?: number;
  wrapperClassName?: string;
}

export function ParallaxImage({
  speed = 0.3,
  wrapperClassName,
  className,
  ...imageProps
}: ParallaxImageProps) {
  const ref = useParallax<HTMLDivElement>({ speed });

  return (
    <div className={cn('parallax-image-wrapper overflow-hidden', wrapperClassName)}>
      <div ref={ref} className="parallax-image-inner">
        <Image className={cn(className)} {...imageProps} />
      </div>
    </div>
  );
}
