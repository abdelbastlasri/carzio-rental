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
// ID confirmé en ligne : le site live émet déjà le tag Google Ads AW-18452928840
// (pagead/viewthroughconversion/18452928840). Le libellé de conversion reste à
// remplir une fois récupéré dans Google Ads (Outils → Conversions → tag).
export const GOOGLE_ADS_ID = 'AW-18452928840';
export const GOOGLE_ADS_BOOKING_LABEL = 'AW-18452928840/XXXXXXXXXXXXXXXX';

const PLACEHOLDER = 'XXXXXXXXXX';
const CONSENT_KEY = 'carzio_cookie_consent';
const ATTRIBUTION_KEY = 'carzio_attribution';

export interface Attribution {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  captured_at?: string;
}

const ATTRIBUTION_PARAMS: (keyof Attribution)[] = [
  'gclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

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

/**
 * Capture Google Ads click id and UTM parameters once, then keep them for the
 * whole visit so a booking request can be attributed to the original ad click.
 * Stored locally in the visitor's browser; no personal data is added here.
 */
export function captureAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Attribution = {};
    let hasValue = false;
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) {
        fromUrl[key] = value;
        hasValue = true;
      }
    }
    if (!hasValue) return getAttribution();

    const attribution: Attribution = {
      ...fromUrl,
      landing_page: fromUrl.landing_page || window.location.pathname,
      captured_at: new Date().toISOString(),
    };
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return null;
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
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

  captureAttribution();

  if (
    typeof window.gtag === 'function' &&
    !GOOGLE_ADS_ID.includes(PLACEHOLDER)
  ) {
    window.gtag('config', GOOGLE_ADS_ID);
  }

  document.addEventListener('click', handleDelegatedClick, true);

  // INP approximation: keep the worst interaction duration of the page and
  // send it once when the visitor leaves. No extra dependency is required.
  if ('PerformanceObserver' in window) {
    let worstInteraction = 0;
    let reported = false;
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const interaction = entry as unknown as { interactionId?: number; duration: number };
          if (interaction.interactionId && interaction.duration > worstInteraction) {
            worstInteraction = interaction.duration;
          }
        }
      });
      observer.observe({ type: 'event', buffered: true } as unknown as PerformanceObserverInit);
    } catch {
      // Event timing is not supported in every browser.
    }

    const reportInp = () => {
      if (reported || worstInteraction <= 0) return;
      reported = true;
      const rounded = Math.round(worstInteraction);
      trackEvent('web_vitals', {
        metric_name: 'INP',
        metric_value: rounded,
        metric_rating: rounded <= 200 ? 'good' : rounded <= 500 ? 'needs_improvement' : 'poor',
      });
    };
    window.addEventListener('pagehide', reportInp, { once: true });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') reportInp();
    });
  }
}
