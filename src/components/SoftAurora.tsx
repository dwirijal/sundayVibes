'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SoftAuroraProps {
  speed?: number;
  blur?: number;
  opacity?: number;
  colors?: string[];
  className?: string;
}

const DEFAULT_COLORS = [
  'rgba(120, 119, 198, 0.3)',
  'rgba(255, 119, 198, 0.2)',
  'rgba(120, 200, 255, 0.25)',
  'rgba(200, 150, 255, 0.2)',
];

export function SoftAurora({
  speed = 1,
  blur = 80,
  opacity = 0.6,
  colors = DEFAULT_COLORS,
  className = '',
}: SoftAuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const blobs = colors.map((color, i) => ({
      color,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 200 + Math.random() * 200,
      speedX: (0.2 + Math.random() * 0.3) * (i % 2 === 0 ? 1 : -1),
      speedY: (0.15 + Math.random() * 0.25) * (i % 2 === 0 ? -1 : 1),
      phase: Math.random() * Math.PI * 2,
    }));

    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;

      animationId = requestAnimationFrame(animate);
      time += 0.01 * speed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob) => {
        blob.x += Math.sin(time + blob.phase) * blob.speedX;
        blob.y += Math.cos(time * 0.7 + blob.phase) * blob.speedY;

        // Wrap around edges
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationId);
            animate();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    window.addEventListener('resize', resize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [speed, colors, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 ${className}`} />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  );
}
