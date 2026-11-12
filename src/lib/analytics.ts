/**
 * Google Analytics 4 / Google Ads event helpers.
 *
 * The site loads gtag.js in index.html for GA4. These helpers add the
 * booking funnel events and, once the real IDs are filled in, the Google Ads
 * conversion tag. Until then the placeholders are skipped so no invalid tag is
 * sent to Google.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Replace these two values when the Google Ads account is ready. */
export const GOOGLE_ADS_ID = 'AW-XXXXXXXXXX';
export const GOOGLE_ADS_BOOKING_LABEL = 'AW-XXXXXXXXXX/XXXXXXXXXXXXXXXX';

const PLACEHOLDER = 'XXXXXXXXXX';
const CONSENT_KEY = 'carzio_cookie_consent';

let initialised = false;

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

export function updateConsent(granted: boolean): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const value = granted ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
}

export function storedConsent(): 'granted' | 'denied' | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage can be blocked in private mode; consent still applies to this page.
  }
  updateConsent(value === 'granted');
}

export function trackBookingConversion(params: {
  value: number;
  currency?: string;
  carName?: string;
  days?: number;
}): void {
  const currency = params.currency || 'EUR';
  trackEvent('generate_lead', {
    currency,
    value: params.value,
    items: params.carName
      ? [{ item_name: params.carName, item_category: 'car_rental', quantity: params.days || 1 }]
      : undefined,
    booking_source: 'website',
  });

  if (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    !GOOGLE_ADS_BOOKING_LABEL.includes(PLACEHOLDER) &&
    !GOOGLE_ADS_ID.includes(PLACEHOLDER)
  ) {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_BOOKING_LABEL,
      value: params.value,
      currency,
    });
  }
}

function handleDelegatedClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  const anchor = target?.closest('a');
  if (!anchor) return;

  const href = anchor.getAttribute('href') || '';
  if (!href) return;

  if (href.startsWith('tel:')) {
    trackEvent('phone_click', { phone_number: href.replace('tel:', '') });
    return;
  }

  if (href.includes('wa.me') || href.includes('whatsapp.com')) {
    trackEvent('whatsapp_click', { link_url: href });
    return;
  }

  if (
    href.includes('g.page/r/') ||
    href.includes('search.google.com/local/writereview') ||
    href.includes('google.com/maps/place')
  ) {
    trackEvent('review_click', { link_url: href });
  }
}

export function initAnalytics(): void {
  if (typeof window === 'undefined' || initialised) return;
  initialised = true;

  const consent = storedConsent();
  if (consent) updateConsent(consent === 'granted');

  if (
    typeof window.gtag === 'function' &&
    !GOOGLE_ADS_ID.includes(PLACEHOLDER)
  ) {
    window.gtag('config', GOOGLE_ADS_ID);
  }

  document.addEventListener('click', handleDelegatedClick, true);
}
