import { useEffect } from 'react';
import { getAirportPage } from '../content/airport';
import { ALL_LANGS, type Lang } from '../lib/i18nRouting';

const LANG_MAP: Record<string, Lang> = {
  en: 'en',
  fr: 'fr',
  de: 'de',
  es: 'es',
  pl: 'pl',
  nl: 'nl',
};

const FALLBACK_LABELS: Record<Lang, string> = {
  en: 'Continue in English',
  fr: 'Continuer en français',
  de: 'Auf Deutsch weiter',
  es: 'Continuar en español',
  pl: 'Kontynuuj po polsku',
  nl: 'Doorgaan in het Nederlands',
};

/**
 * Language bridge for the Google Business Profile website link.
 * A tourist coming from Google Maps gets the airport page in their language,
 * with the original UTM parameters preserved for GA4 attribution.
 */
export default function MapsRedirect() {
  const params = new URLSearchParams(window.location.search);
  const requested = (params.get('lang') || '').slice(0, 2);
  const browser = (navigator.language || 'en').slice(0, 2);
  const lang: Lang = LANG_MAP[requested] || LANG_MAP[browser] || 'en';
  const airport = getAirportPage(lang);

  const forwarded = new URLSearchParams();
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid']) {
    const value = params.get(key);
    if (value) forwarded.set(key, value);
  }

  const suffix = forwarded.toString();
  const target = `/${lang}/${airport.slug}${suffix ? `?${suffix}` : ''}`;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = 'Carzio — Car rental at Agadir Airport';
    window.location.replace(target);
  }, [lang, target]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-4 py-24 text-white">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">Carzio · Agadir Airport</p>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight md:text-4xl">
        Car rental at Agadir Airport
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        Choose your language to continue. You will be redirected automatically.
      </p>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {ALL_LANGS.map((code) => {
          const page = getAirportPage(code);
          return (
            <a
              key={code}
              href={`/${code}/${page.slug}${suffix ? `?${suffix}` : ''}`}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-gold/50 hover:text-gold"
            >
              {FALLBACK_LABELS[code]}
            </a>
          );
        })}
      </div>
      <a href="https://wa.me/212680318003" className="mt-6 text-sm font-semibold text-[#25D366]">
        WhatsApp · +212 680 318003
      </a>
    </main>
  );
}
