/**
 * Animation utilities and presets
 * Common animation configurations for GSAP and anime.js
 */

// Duration constants (in seconds for GSAP, ms for anime.js)
export const DURATION = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
} as const;

// Easing presets
export const EASING = {
  // GSAP easings
  POWER1_OUT: 'power1.out',
  POWER2_OUT: 'power2.out',
  POWER3_OUT: 'power3.out',
  POWER4_OUT: 'power4.out',
  BACK_OUT: 'back.out(1.7)',
  ELASTIC_OUT: 'elastic.out(1, 0.5)',
  BOUNCE_OUT: 'bounce.out',

  // anime.js easings
  EASE_OUT_QUAD: 'easeOutQuad',
  EASE_OUT_CUBIC: 'easeOutCubic',
  EASE_OUT_QUART: 'easeOutQuart',
  EASE_OUT_EXPO: 'easeOutExpo',
  EASE_OUT_BACK: 'easeOutBack',
  EASE_OUT_ELASTIC: 'easeOutElastic',
  EASE_OUT_BOUNCE: 'easeOutBounce',
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

// Parallax calculation helper
export function calculateParallax(
  scrollY: number,
  speed: number = 0.5,
  offset: number = 0
): number {
  return (scrollY * speed) + offset;
}

// 3D tilt calculation based on mouse position
export function calculateTilt(
  mouseX: number,
  mouseY: number,
  elementCenterX: number,
  elementCenterY: number,
  maxTilt: number = 15
): { rotateX: number; rotateY: number } {
  const deltaX = mouseX - elementCenterX;
  const deltaY = mouseY - elementCenterY;

  const rotateY = (deltaX / 100) * maxTilt;
  const rotateX = -(deltaY / 100) * maxTilt;

  return {
    rotateX: Math.max(-maxTilt, Math.min(maxTilt, rotateX)),
    rotateY: Math.max(-maxTilt, Math.min(maxTilt, rotateY)),
  };
}

// Magnetic effect calculation
export function calculateMagnetic(
  mouseX: number,
  mouseY: number,
  elementCenterX: number,
  elementCenterY: number,
  strength: number = 0.3
): { x: number; y: number } {
  const deltaX = mouseX - elementCenterX;
  const deltaY = mouseY - elementCenterY;

  return {
    x: deltaX * strength,
    y: deltaY * strength,
  };
}
