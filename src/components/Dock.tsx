'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface DockItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface DockProps {
  items: DockItem[];
  className?: string;
  position?: 'bottom' | 'top';
}

const BASE_SIZE = 48;
const MAX_SCALE = 1.5;
const EFFECT_RADIUS = 150;

function smoothScale(distance: number): number {
  if (distance >= EFFECT_RADIUS) return 1;
  const t = Math.cos((distance / EFFECT_RADIUS) * Math.PI);
  return 1 + (MAX_SCALE - 1) * ((t + 1) / 2);
}

export function Dock({ items, className, position = 'bottom' }: DockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const rafIdRef = useRef<number | null>(null);
  const clientXRef = useRef<number | null>(null);
  const isTouchingRef = useRef(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateMagnification = (clientX: number) => {
      const items = itemRefs.current;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;

      // ⚡ Bolt Optimization: Batch DOM reads to prevent Layout Thrashing
      const scales = items.map((item) => {
        if (!item) return null;
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left - rect.left + itemRect.width / 2;
        const distance = Math.abs(x - itemCenter);
        return smoothScale(distance);
      });

      // ⚡ Bolt Optimization: Batch DOM writes after all reads are complete
      items.forEach((item, index) => {
        const scale = scales[index];
        if (item && scale !== null) {
          item.style.setProperty('--dock-scale', String(scale));
        }
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      clientXRef.current = e.clientX;

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          if (clientXRef.current !== null) {
            calculateMagnification(clientXRef.current);
          }
          rafIdRef.current = null;
        });
      }
    };

    const onMouseLeave = () => {
      clientXRef.current = null;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      itemRefs.current.forEach((item) => {
        if (item) item.style.setProperty('--dock-scale', '1');
      });
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0 || prefersReducedMotion) return;
      isTouchingRef.current = true;
      clientXRef.current = e.touches[0].clientX;
      calculateMagnification(e.touches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouchingRef.current || e.touches.length === 0 || prefersReducedMotion) return;
      clientXRef.current = e.touches[0].clientX;

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          if (clientXRef.current !== null) {
            calculateMagnification(clientXRef.current);
          }
          rafIdRef.current = null;
        });
      }
    };

    const onTouchEnd = () => {
      isTouchingRef.current = false;
      clientXRef.current = null;

      itemRefs.current.forEach((item) => {
        if (item) item.style.setProperty('--dock-scale', '1');
      });
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchcancel', onTouchEnd);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [prefersReducedMotion]);

  const positionClass = position === 'top' ? 'top-4' : 'bottom-4';

  return (
    <nav
      ref={containerRef}
      className={cn(
        'fixed left-1/2 -translate-x-1/2 z-50',
        positionClass,
        'pointer-events-none',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="pointer-events-auto flex items-end gap-1 px-3 py-2 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200/50 dark:border-stone-700/50 shadow-lg shadow-stone-900/10 dark:shadow-black/20">
        {items.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              ref={(el) => { itemRefs.current[index] = el; }}
              href={item.href}
              className="group flex flex-col items-center justify-center"
              style={{
                width: BASE_SIZE,
                height: BASE_SIZE,
                transform: 'scale(var(--dock-scale, 1))',
                transformOrigin: 'bottom center',
                transition: prefersReducedMotion ? 'none' : 'transform 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
              }}
              onMouseEnter={() => !prefersReducedMotion && setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-xl transition-colors duration-200',
                  active
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                    : 'text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100'
                )}
                style={{
                  width: BASE_SIZE - 8,
                  height: BASE_SIZE - 8,
                }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium mt-0.5 transition-opacity',
                  activeIdx === index || active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                  active ? 'text-primary' : 'text-stone-500 dark:text-stone-400'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
