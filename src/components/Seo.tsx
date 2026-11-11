import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { detectLangFromPath, stripLangPrefix, withLangPrefix, ALL_LANGS } from '../lib/i18nRouting';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  lang?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  robots?: string;
  image?: string;
  type?: string;
  /** Languages that actually exist for this page. Defaults to all five. */
  alternateLangs?: ('en' | 'fr' | 'de' | 'es' | 'pl')[];
}

export default function Seo({
  title,
  description,
  canonical,
  lang,
  jsonLd,
  robots = 'index, follow',
  image,
  type = 'website',
  alternateLangs = [...ALL_LANGS],
}: SeoProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = lang || i18n.language || 'en';
    const prefix = detectLangFromPath(window.location.pathname) || 'en';

    document.documentElement.lang = currentLang;

    document.title = title;

    const setMeta = (name: string, content: string, attr = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const origin = window.location.origin;
    const callerPath = (canonical || window.location.href).replace(/^https?:\/\/[^/]+/, '');
    const basePath = stripLangPrefix(callerPath) || '/';
    const canonicalHref = `${origin}${withLangPrefix(basePath, prefix)}`;

    setMeta('description', description);
    setMeta('robots', robots);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalHref);

    // hreflang set: one link per existing language, plus x-default (unprefixed).
    document.querySelectorAll('link[data-carzio-hreflang]').forEach((el) => el.remove());
    for (const alt of alternateLangs) {
      const a = document.createElement('link');
      a.setAttribute('rel', 'alternate');
      a.setAttribute('hreflang', alt);
      a.setAttribute('href', `${origin}${withLangPrefix(basePath, alt)}`);
      a.setAttribute('data-carzio-hreflang', 'true');
      document.head.appendChild(a);
    }
    // x-default points at the default-language version of the same page, so it
    // never contradicts the canonical URL (the unprefixed root used to point
    // at "/" while "/" itself canonicalised to "/en").
    const x = document.createElement('link');
    x.setAttribute('rel', 'alternate');
    x.setAttribute('hreflang', 'x-default');
    x.setAttribute('href', `${origin}${withLangPrefix(basePath, 'en')}`);
    x.setAttribute('data-carzio-hreflang', 'true');
    document.head.appendChild(x);

    const socialImage = image || 'https://www.carzio.ma/images/hero/new-slide-7.webp';
    const localeMap: Record<string, string> = {
      en: 'en_GB',
      fr: 'fr_FR',
      de: 'de_DE',
      es: 'es_ES',
      pl: 'pl_PL',
    };
    const socialLocale = localeMap[currentLang.slice(0, 2)] || 'en_GB';

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonicalHref, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:site_name', 'Carzio', 'property');
    setMeta('og:image', socialImage, 'property');
    setMeta('og:locale', socialLocale, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', socialImage);

    const existing = document.getElementById('carzio-jsonld');
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'carzio-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const ld = document.getElementById('carzio-jsonld');
      if (ld) ld.remove();
    };
  }, [title, description, canonical, lang, jsonLd, robots, image, type, alternateLangs, i18n.language]);

  return null;
}
