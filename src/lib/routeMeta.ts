import en from '../locales/en.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import es from '../locales/es.json';
import pl from '../locales/pl.json';
import nl from '../locales/nl.json';
import { ALL_LANGS, type Lang, withLangPrefix } from './i18nRouting';
import { getAirportPage } from '../content/airport';
import { findCity } from '../data/cities';
import { getFaqCategories } from '../data/faq';
import { getAvailableLanguages, getPosts } from '../content/blog/loader';
import { getAvailableNewsLanguages, getNews } from '../content/news/loader';
import { fleet } from '../data/fleet';
import {
  getSupportPages,
  supportAlternatePaths,
  supportLanguages,
  type SupportKey,
} from '../content/support';
import {
  getComparePage,
  getOffersPage,
  getPartnersPage,
  marketingLanguages,
} from '../content/marketing';

export const SITE_ORIGIN = 'https://www.carzio.ma';
export const DEFAULT_IMAGE = `${SITE_ORIGIN}/images/hero/new-slide-7.webp`;

type Dict = Record<string, unknown>;

const LOCALES: Record<Lang, Dict> = { en, fr, de, es, pl, nl };

export interface RouteMeta {
  /** URL path served by Vercel, with language prefix except for legacy aliases. */
  path: string;
  lang: Lang;
  title: string;
  description: string;
  /** Canonical path, always language-prefixed. */
  canonicalPath: string;
  robots?: string;
  h1: string;
  intro: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  alternates: Partial<Record<Lang, string>>;
  sitemap: boolean;
  priority?: number;
  lastmod?: string;
}

function read(dict: Dict, key: string): string {
  const value = key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Dict)) {
      return (acc as Dict)[part];
    }
    return undefined;
  }, dict);
  return typeof value === 'string' ? value : '';
}

function t(lang: Lang, key: string, fallback = ''): string {
  return read(LOCALES[lang], key) || read(LOCALES.en, key) || fallback;
}

function absolute(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

function cleanTitle(value: string): string {
  return value.replace(/\s*\|.*$/, '').trim();
}

function autoRentalLd(lang: Lang, path: string, name: string, area: string[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: 'Carzio',
    url: absolute(path),
    image: DEFAULT_IMAGE,
    telephone: '+212680318003',
    email: 'contact@carzio.ma',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'MAG N2, Agadir Airport',
      addressLocality: 'Agadir',
      postalCode: '80000',
      addressCountry: 'MA',
    },
    areaServed: area,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    inLanguage: lang,
    description: name,
  };
}

function breadcrumbLd(lang: Lang, items: { name: string; path: string }[]): Record<string, unknown> {
  void lang;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

function fleetLd(lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t(lang, 'fleet.title', 'Car rental fleet'),
    numberOfItems: fleet.length,
    itemListElement: fleet.map((car, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: car.name,
        image: absolute(car.image),
        description: car.description,
        brand: { '@type': 'Brand', name: 'Carzio' },
        category: car.type,
        offers: {
          '@type': 'Offer',
          url: absolute(withLangPrefix('/cars', lang)),
          price: car.pricePerDay,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'Carzio' },
        },
      },
    })),
  };
}

function coreLanguages(): Lang[] {
  return [...ALL_LANGS];
}

function makeCoreRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];

  for (const lang of coreLanguages()) {
    const alternates = Object.fromEntries(
      coreLanguages().map((alt) => [alt, withLangPrefix('/', alt)]),
    ) as Partial<Record<Lang, string>>;

    const homePath = withLangPrefix('/', lang);
    routes.push({
      path: homePath,
      lang,
      title: t(lang, 'pages.homeTitle'),
      description: t(lang, 'pages.homeDesc'),
      canonicalPath: homePath,
      h1: cleanTitle(t(lang, 'pages.homeTitle')),
      intro: t(lang, 'pages.homeDesc'),
      jsonLd: {
        ...autoRentalLd(lang, homePath, 'Car rental in Agadir', [
          'Agadir',
          'Taghazout',
          'Tamraght',
          'Essaouira',
          'Marrakech',
          'Casablanca',
        ]),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 5.0,
          reviewCount: 126,
          bestRating: 5,
        },
      },
      alternates,
      sitemap: true,
      priority: 1,
    });

    const carsPath = withLangPrefix('/cars', lang);
    routes.push({
      path: carsPath,
      lang,
      title: t(lang, 'pages.carTitle'),
      description: t(lang, 'pages.carDesc'),
      canonicalPath: carsPath,
      h1: t(lang, 'fleet.title'),
      intro: t(lang, 'fleet.subtitle'),
      jsonLd: fleetLd(lang),
      alternates: Object.fromEntries(
        coreLanguages().map((alt) => [alt, withLangPrefix('/cars', alt)]),
      ) as Partial<Record<Lang, string>>,
      sitemap: true,
      priority: 0.9,
    });

    const airport = getAirportPage(lang);
    const airportPath = withLangPrefix(`/${airport.slug}`, lang);
    const airportAlternates = Object.fromEntries(
      coreLanguages().map((alt) => [alt, withLangPrefix(`/${getAirportPage(alt).slug}`, alt)]),
    ) as Partial<Record<Lang, string>>;
    const airportFaq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: airport.faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };
    routes.push({
      path: airportPath,
      lang,
      title: airport.title,
      description: airport.description,
      canonicalPath: airportPath,
      h1: airport.h1,
      intro: airport.intro,
      image: `${SITE_ORIGIN}/images/hero/agadir-airport-arrival.jpg`,
      jsonLd: [
        autoRentalLd(lang, airportPath, airport.h1, ['Agadir', 'Taghazout', 'Tamraght', 'Essaouira']),
        airportFaq,
        breadcrumbLd(lang, [
          { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
          { name: airport.h1, path: airportPath },
        ]),
      ],
      alternates: airportAlternates,
      sitemap: true,
      priority: 0.95,
    });

    const staticPages: { slug: string; title: string; description: string; h1: string }[] = [
      {
        slug: 'about',
        title: t(lang, 'pages.aboutTitle'),
        description: t(lang, 'pages.aboutDesc'),
        h1: cleanTitle(t(lang, 'pages.aboutTitle')),
      },
      {
        slug: 'contact',
        title: t(lang, 'pages.contactTitle'),
        description: t(lang, 'pages.contactDesc'),
        h1: cleanTitle(t(lang, 'pages.contactTitle')),
      },
      {
        slug: 'terms',
        title: t(lang, 'pages.termsTitle'),
        description: t(lang, 'pages.termsDesc'),
        h1: cleanTitle(t(lang, 'pages.termsTitle')),
      },
      {
        slug: 'privacy',
        title: t(lang, 'privacyPage.title'),
        description: t(lang, 'privacyPage.intro'),
        h1: t(lang, 'privacyPage.title'),
      },
    ];

    for (const page of staticPages) {
      const path = withLangPrefix(`/${page.slug}`, lang);
      routes.push({
        path,
        lang,
        title: page.title,
        description: page.description,
        canonicalPath: path,
        h1: page.h1 || cleanTitle(page.title),
        intro: page.description,
        jsonLd: breadcrumbLd(lang, [
          { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
          { name: page.h1 || cleanTitle(page.title), path },
        ]),
        alternates: Object.fromEntries(
          coreLanguages().map((alt) => [alt, withLangPrefix(`/${page.slug}`, alt)]),
        ) as Partial<Record<Lang, string>>,
        sitemap: true,
        priority: 0.6,
      });
    }
  }

  return routes;
}

function faqLanguages(): Lang[] {
  // FAQ content is translated in five languages. Dutch currently falls back
  // to French, so its FAQ pages are generated but kept noindex and out of
  // hreflang/sitemap until a Dutch FAQ translation exists.
  return ['en', 'fr', 'de', 'es', 'pl', 'nl'];
}

function faqAlternateLanguages(): Lang[] {
  return ['en', 'fr', 'de', 'es', 'pl'];
}

function makeFaqRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];
  const faqLangs = faqLanguages();
  for (const lang of faqLangs) {
    const hubPath = withLangPrefix('/faq', lang);
    routes.push({
      path: hubPath,
      lang,
      title: t(lang, 'faq.metaTitle'),
      description: t(lang, 'faq.metaDescription'),
      canonicalPath: hubPath,
      h1: t(lang, 'faq.heading'),
      intro: t(lang, 'faq.intro'),
      robots: lang === 'nl' ? 'noindex, follow' : undefined,
      jsonLd: breadcrumbLd(lang, [
        { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
        { name: 'FAQ', path: hubPath },
      ]),
      alternates: Object.fromEntries(
        faqAlternateLanguages().map((alt) => [alt, withLangPrefix('/faq', alt)]),
      ) as Partial<Record<Lang, string>>,
      sitemap: lang !== 'nl',
      priority: 0.7,
    });

    for (const category of getFaqCategories(lang)) {
      const path = withLangPrefix(`/faq/${category.slug}`, lang);
      routes.push({
        path,
        lang,
        title: `${category.title} | FAQ Carzio`,
        description: category.description,
        canonicalPath: path,
        h1: category.title,
        intro: category.description,
        robots: lang === 'nl' ? 'noindex, follow' : undefined,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: category.entries.map((entry) => ({
              '@type': 'Question',
              name: entry.q,
              acceptedAnswer: { '@type': 'Answer', text: entry.a },
            })),
          },
          breadcrumbLd(lang, [
            { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
            { name: 'FAQ', path: hubPath },
            { name: category.title, path },
          ]),
        ],
        alternates: Object.fromEntries(
          faqAlternateLanguages().map((alt) => [alt, withLangPrefix(`/faq/${category.slug}`, alt)]),
        ) as Partial<Record<Lang, string>>,
        sitemap: lang !== 'nl',
        priority: 0.55,
      });
    }
  }
  return routes;
}

function makeCityRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];
  const cityAlternateLangs: Lang[] = ['en', 'fr', 'de', 'es', 'pl'];
  const cityLangs: Lang[] = ['en', 'fr', 'de', 'es', 'pl', 'nl'];
  const slugs = ['agadir', 'marrakech', 'casablanca', 'taghazout', 'tamraght', 'essaouira'];

  for (const lang of cityLangs) {
    for (const slug of slugs) {
      const city = findCity(slug, lang === 'nl' ? 'fr' : lang);
      if (!city) continue;
      const path = withLangPrefix(`/location-voiture-${slug}`, lang);
      const alternates = Object.fromEntries(
        cityAlternateLangs.map((alt) => [alt, withLangPrefix(`/location-voiture-${slug}`, alt)]),
      ) as Partial<Record<Lang, string>>;
      routes.push({
        path,
        lang,
        title: city.title,
        description: city.description,
        canonicalPath: path,
        h1: cleanTitle(city.title),
        intro: city.intro[0] || city.description,
        robots: lang === 'nl' ? 'noindex, follow' : undefined,
        jsonLd: [
          autoRentalLd(lang, path, `Car rental in ${city.name}`, [city.name]),
          breadcrumbLd(lang, [
            { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
            { name: t(lang, 'nav.ourCars', 'Cars'), path: withLangPrefix('/cars', lang) },
            { name: city.name, path },
          ]),
        ],
        alternates,
        sitemap: lang !== 'nl',
        priority: 0.65,
      });
    }
  }
  return routes;
}

function makeBlogRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];
  const langs: Lang[] = ['en', 'fr', 'de', 'es', 'pl', 'nl'];

  for (const lang of langs) {
    const hubPath = withLangPrefix('/blog', lang);
    routes.push({
      path: hubPath,
      lang,
      title: t(lang, 'blog.metaTitle'),
      description: t(lang, 'blog.metaDescription'),
      canonicalPath: hubPath,
      h1: t(lang, 'blog.heading'),
      intro: t(lang, 'blog.intro'),
      jsonLd: breadcrumbLd(lang, [
        { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
        { name: 'Blog', path: hubPath },
      ]),
      alternates: Object.fromEntries(
        langs.map((alt) => [alt, withLangPrefix('/blog', alt)]),
      ) as Partial<Record<Lang, string>>,
      sitemap: true,
      priority: 0.7,
    });

    for (const post of getPosts(lang)) {
      const path = withLangPrefix(`/blog/${post.slug}`, lang);
      routes.push({
        path,
        lang,
        title: post.title,
        description: post.description,
        canonicalPath: path,
        h1: post.title,
        intro: post.description,
        image: post.image.startsWith('http') ? post.image : `${SITE_ORIGIN}${post.image}`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated || post.date,
            inLanguage: lang,
            image: post.image.startsWith('http') ? post.image : `${SITE_ORIGIN}${post.image}`,
            author: { '@type': 'Organization', name: 'Carzio' },
            publisher: { '@type': 'Organization', name: 'Carzio', logo: `${SITE_ORIGIN}/images/carzio-logo.png` },
            mainEntityOfPage: absolute(path),
          },
          breadcrumbLd(lang, [
            { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
            { name: 'Blog', path: hubPath },
            { name: post.title, path },
          ]),
        ],
        alternates: Object.fromEntries(
          getAvailableLanguages(post.slug).map((alt) => [alt, withLangPrefix(`/blog/${post.slug}`, alt)]),
        ) as Partial<Record<Lang, string>>,
        sitemap: true,
        priority: 0.6,
        lastmod: post.updated || post.date,
      });
    }
  }
  return routes;
}

function makeNewsRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];
  const langs: Lang[] = ['en', 'fr', 'de', 'es', 'pl', 'nl'];

  for (const lang of langs) {
    const hubPath = withLangPrefix('/news', lang);
    routes.push({
      path: hubPath,
      lang,
      title: t(lang, 'news.metaTitle'),
      description: t(lang, 'news.metaDescription'),
      canonicalPath: hubPath,
      h1: t(lang, 'news.heading'),
      intro: t(lang, 'news.intro'),
      jsonLd: breadcrumbLd(lang, [
        { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
        { name: 'News', path: hubPath },
      ]),
      alternates: Object.fromEntries(
        langs.map((alt) => [alt, withLangPrefix('/news', alt)]),
      ) as Partial<Record<Lang, string>>,
      sitemap: true,
      priority: 0.7,
    });

    for (const post of getNews(lang)) {
      const path = withLangPrefix(`/news/${post.slug}`, lang);
      routes.push({
        path,
        lang,
        title: post.title,
        description: post.description,
        canonicalPath: path,
        h1: post.title,
        intro: post.description,
        image: post.image.startsWith('http') ? post.image : `${SITE_ORIGIN}${post.image}`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated || post.date,
            inLanguage: lang,
            image: post.image.startsWith('http') ? post.image : `${SITE_ORIGIN}${post.image}`,
            author: { '@type': 'Organization', name: 'Carzio' },
            publisher: { '@type': 'Organization', name: 'Carzio', logo: `${SITE_ORIGIN}/images/carzio-logo.png` },
            mainEntityOfPage: absolute(path),
          },
          breadcrumbLd(lang, [
            { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
            { name: 'News', path: hubPath },
            { name: post.title, path },
          ]),
        ],
        alternates: Object.fromEntries(
          getAvailableNewsLanguages(post.slug).map((alt) => [alt, withLangPrefix(`/news/${post.slug}`, alt)]),
        ) as Partial<Record<Lang, string>>,
        sitemap: true,
        priority: 0.55,
        lastmod: post.updated || post.date,
      });
    }
  }
  return routes;
}

function makeSupportRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];
  for (const lang of supportLanguages()) {
    for (const page of getSupportPages(lang)) {
      const path = withLangPrefix(`/${page.slug}`, lang);
      routes.push({
        path,
        lang,
        title: page.title,
        description: page.description,
        canonicalPath: path,
        h1: page.h1,
        intro: page.intro,
        image: page.image.startsWith('http') ? page.image : `${SITE_ORIGIN}${page.image}`,
        jsonLd: [
          autoRentalLd(lang, path, page.h1, ['Agadir', 'Taghazout', 'Tamraght', 'Essaouira', 'Marrakech']),
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: page.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          },
          breadcrumbLd(lang, [
            { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
            { name: t(lang, 'nav.ourCars', 'Cars'), path: withLangPrefix('/cars', lang) },
            { name: page.h1, path },
          ]),
        ],
        alternates: supportAlternatePaths(page.key as SupportKey),
        sitemap: true,
        priority: 0.7,
      });
    }
  }
  return routes;
}

function makeMarketingRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];
  const langs = marketingLanguages();
  const builders = [
    { slug: 'partners', get: getPartnersPage, priority: 0.7 },
    { slug: 'compare', get: getComparePage, priority: 0.65 },
    { slug: 'offers', get: getOffersPage, priority: 0.65 },
  ];

  for (const lang of langs) {
    for (const builder of builders) {
      const content = builder.get(lang);
      const path = withLangPrefix(`/${builder.slug}`, lang);
      const alternates = Object.fromEntries(
        langs.map((alt) => [alt, withLangPrefix(`/${builder.slug}`, alt)]),
      ) as Partial<Record<Lang, string>>;
      const faqs = 'faqs' in content ? content.faqs : [];
      routes.push({
        path,
        lang,
        title: content.title,
        description: content.description,
        canonicalPath: path,
        h1: content.h1,
        intro: content.intro,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: content.title,
            description: content.description,
            url: absolute(path),
            inLanguage: lang,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          },
          breadcrumbLd(lang, [
            { name: t(lang, 'nav.home', 'Home'), path: withLangPrefix('/', lang) },
            { name: content.h1, path },
          ]),
        ],
        alternates,
        sitemap: true,
        priority: builder.priority,
      });
    }
  }
  return routes;
}

function makeLegacyRoutes(): RouteMeta[] {
  const aliases: {
    path: string;
    titleKey: string;
    descriptionKey: string;
    h1Key: string;
  }[] = [
    { path: '/', titleKey: 'pages.homeTitle', descriptionKey: 'pages.homeDesc', h1Key: 'pages.homeTitle' },
    { path: '/cars', titleKey: 'pages.carTitle', descriptionKey: 'pages.carDesc', h1Key: 'fleet.title' },
    { path: '/about', titleKey: 'pages.aboutTitle', descriptionKey: 'pages.aboutDesc', h1Key: 'pages.aboutTitle' },
    { path: '/contact', titleKey: 'pages.contactTitle', descriptionKey: 'pages.contactDesc', h1Key: 'pages.contactTitle' },
    { path: '/terms', titleKey: 'pages.termsTitle', descriptionKey: 'pages.termsDesc', h1Key: 'pages.termsTitle' },
    { path: '/privacy', titleKey: 'privacyPage.title', descriptionKey: 'privacyPage.intro', h1Key: 'privacyPage.title' },
    { path: '/faq', titleKey: 'faq.metaTitle', descriptionKey: 'faq.metaDescription', h1Key: 'faq.heading' },
    { path: '/blog', titleKey: 'blog.metaTitle', descriptionKey: 'blog.metaDescription', h1Key: 'blog.heading' },
    { path: '/news', titleKey: 'news.metaTitle', descriptionKey: 'news.metaDescription', h1Key: 'news.heading' },
  ];

  return aliases.map((alias) => {
    const canonicalPath = alias.path === '/' ? '/en' : withLangPrefix(alias.path, 'en');
    return {
      path: alias.path,
      lang: 'en' as Lang,
      title: t('en', alias.titleKey),
      description: t('en', alias.descriptionKey),
      canonicalPath,
      h1: cleanTitle(t('en', alias.h1Key)),
      intro: t('en', alias.descriptionKey),
      jsonLd:
        alias.path === '/'
          ? autoRentalLd('en', '/en', 'Car rental in Agadir', [
              'Agadir',
              'Taghazout',
              'Tamraght',
              'Essaouira',
              'Marrakech',
              'Casablanca',
            ])
          : breadcrumbLd('en', [
              { name: 'Home', path: '/en' },
              { name: cleanTitle(t('en', alias.titleKey)), path: canonicalPath },
            ]),
      alternates: {
        en: canonicalPath,
        fr: withLangPrefix(alias.path, 'fr'),
        de: withLangPrefix(alias.path, 'de'),
        es: withLangPrefix(alias.path, 'es'),
        pl: withLangPrefix(alias.path, 'pl'),
        nl: withLangPrefix(alias.path, 'nl'),
      },
      sitemap: false,
      robots: 'noindex, follow',
    } satisfies RouteMeta;
  });
}

function makeAdminRoutes(): RouteMeta[] {
  return ['/dashboard', '/bookings', '/contacts', '/pricing', '/login'].map((path) => ({
    path,
    lang: 'en',
    title: 'Carzio Admin',
    description: 'Carzio administration.',
    canonicalPath: path,
    robots: 'noindex, nofollow',
    h1: 'Carzio Admin',
    intro: 'Administration area.',
    alternates: {},
    sitemap: false,
  }));
}

let cached: RouteMeta[] | null = null;

export function getRouteMeta(): RouteMeta[] {
  if (cached) return cached;
  const routes = [
    ...makeCoreRoutes(),
    ...makeFaqRoutes(),
    ...makeCityRoutes(),
    ...makeBlogRoutes(),
    ...makeNewsRoutes(),
    ...makeSupportRoutes(),
    ...makeMarketingRoutes(),
    ...makeLegacyRoutes(),
    ...makeAdminRoutes(),
  ];
  // Keep the first occurrence of a path. Language-prefixed routes are built
  // before legacy aliases, so the canonical version always wins.
  const seen = new Set<string>();
  cached = routes.filter((route) => {
    if (seen.has(route.path)) return false;
    seen.add(route.path);
    return true;
  });
  return cached;
}
