import { logger } from './logger';

/**
 * Analytics utility — supports GTM, GA4 (gtag), and Umami.
 * All calls are safe server-side (noop when `window` is undefined).
 * `ponytail:` add Facebook Pixel or TikTok Pixel when those channels are onboarded.
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    umami?: { track: (name: string, data?: Record<string, unknown>) => void };
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  try {
    if (window.dataLayer) {
      window.dataLayer.push({ event: name, ...params });
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
    if (window.umami?.track) {
      window.umami.track(name, params);
    }
  } catch (err) {
    // Swallow tracking errors — analytics must never break user flow.
    logger.warn('[analytics] trackEvent failed', { error: err instanceof Error ? err.message : String(err) });
  }
}

/** Fired when a booking/lead form is successfully submitted. */
export const trackBooking = (service: string): void =>
  trackEvent('generate_lead', { service });

/** Fired when a user initiates checkout. */
export const trackCheckout = (productId: string, price: number): void =>
  trackEvent('begin_checkout', {
    currency: 'IDR',
    value: price,
    items: productId,
  });

/** Fired when payment is confirmed (QRIS shown / webhook success). */
export const trackPurchase = (productId: string, price: number): void =>
  trackEvent('purchase', {
    currency: 'IDR',
    value: price,
    items: productId,
  });

/** Fired when a contact/info form is submitted. */
export const trackFormSubmission = (formName: string): void =>
  trackEvent('generate_lead', { form_name: formName });
