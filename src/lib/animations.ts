/**
 * Animation utilities and presets
 * Common animation configurations for GSAP
 */

// Duration constants (in seconds for GSAP)
const DURATION = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
} as const;

// Easing presets
const EASING = {
  POWER2_OUT: 'power2.out',
  POWER3_OUT: 'power3.out',
  BACK_OUT: 'back.out(1.7)',
} as const;

// Animation presets for GSAP
export const ANIMATION_PRESETS = {
  fadeInUp: {
    opacity: 0,
    y: 40,
    duration: DURATION.NORMAL,
    ease: EASING.POWER3_OUT,
  },
  fadeInDown: {
    opacity: 0,
    y: -40,
    duration: DURATION.NORMAL,
    ease: EASING.POWER3_OUT,
  },
  fadeInLeft: {
    opacity: 0,
    x: -40,
    duration: DURATION.NORMAL,
    ease: EASING.POWER3_OUT,
  },
  fadeInRight: {
    opacity: 0,
    x: 40,
    duration: DURATION.NORMAL,
    ease: EASING.POWER3_OUT,
  },
  scaleIn: {
    opacity: 0,
    scale: 0.8,
    duration: DURATION.NORMAL,
    ease: EASING.BACK_OUT,
  },
  rotateIn: {
    opacity: 0,
    rotation: -10,
    scale: 0.9,
    duration: DURATION.SLOW,
    ease: EASING.POWER3_OUT,
  },
  blurIn: {
    opacity: 0,
    filter: 'blur(10px)',
    duration: DURATION.SLOW,
    ease: EASING.POWER2_OUT,
  },
} as const;

// Stagger configurations
export const STAGGER = {
  FAST: 0.05,
  NORMAL: 0.1,
  SLOW: 0.15,
  VERY_SLOW: 0.2,
} as const;

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Get animation duration respecting reduced motion preference
export function getDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}
