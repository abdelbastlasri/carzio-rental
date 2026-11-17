import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import LangLink from '../components/LangLink';
import CarCard from '../components/CarCard';
import BookingModal from '../components/BookingModal';
import NotFound from './NotFound';
import { fleet } from '../data/fleet';
import { getAirportPage } from '../content/airport';
import {
  findSupportPageBySlug,
  getSupportPages,
  supportAlternatePaths,
  supportLanguages,
  type SupportKey,
} from '../content/support';
import { withLangPrefix, type Lang } from '../lib/i18nRouting';
import { trackEvent } from '../lib/analytics';

const WHATSAPP_URL = 'https://wa.me/212680318003';

export default function SupportPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.slice(0, 2) || 'en') as Lang;
  const page = findSupportPageBySlug(slug || '', i18n.language);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');

  const cars = useMemo(
    () => (page ? page.carIds.map((id) => fleet.find((car) => car.id === id)).filter(Boolean) : []),
    [page],
  );

  if (!page) return <NotFound />;

  const path = withLangPrefix(`/${page.slug}`, lang);
  const canonical = `https://www.carzio.ma${path}`;
  const airport = getAirportPage(lang);
  const airportPath = withLangPrefix(`/${airport.slug}`, lang);
  const otherPages = getSupportPages(i18n.language).filter((entry) => entry.key !== page.key).slice(0, 4);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AutoRental',
      name: 'Carzio',
      url: canonical,
      telephone: '+212680318003',
      email: 'contact@carzio.ma',
      priceRange: '€€',
      hasMap: 'https://www.google.com/maps/place/?q=place_id:ChIJ82tvQjOFt68R6Hm61KnRySo',
      sameAs: [
        'https://www.google.com/maps/place/?q=place_id:ChIJ82tvQjOFt68R6Hm61KnRySo',
        'https://www.instagram.com/carzio_cars',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'MAG N2, Agadir Airport',
        addressLocality: 'Agadir',
        postalCode: '80000',
        addressCountry: 'MA',
      },
      areaServed: ['Agadir', 'Taghazout', 'Tamraght', 'Essaouira', 'Marrakech'],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      inLanguage: lang,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `https://www.carzio.ma${withLangPrefix('/', lang)}` },
        { '@type': 'ListItem', position: 2, name: t('nav.ourCars'), item: `https://www.carzio.ma${withLangPrefix('/cars', lang)}` },
        { '@type': 'ListItem', position: 3, name: page.h1, item: canonical },
      ],
    },
  ];

  const handleBook = (carId: string) => {
    trackEvent('select_car', { car_id: carId, page: page.key });
    setSelectedCar(carId);
    setBookingOpen(true);
  };

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        canonical={canonical}
        image={`https://www.carzio.ma${page.image}`}
        alternateLangs={supportLanguages()}
        alternatePaths={supportAlternatePaths(page.key as SupportKey)}
        jsonLd={jsonLd}
      />

      <div className="pt-24 md:pt-28">
        <section className="relative overflow-hidden border-b border-white/5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${page.image}')` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">
            <nav aria-label="Breadcrumb" className="text-xs text-white/50">
              <LangLink to="/" className="hover:text-gold">{t('nav.home')}</LangLink>
              <span className="mx-2">/</span>
              <LangLink to="/cars" className="hover:text-gold">{t('nav.ourCars')}</LangLink>
            </nav>
            <h1 className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">{page.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleBook('')}
                className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-gold/20 transition hover:bg-gold-light"
              >
                {t('common.bookNow')}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
              >
                WhatsApp
              </a>
              <LangLink
                to="/cars"
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold/60 hover:text-gold"
              >
                {t('common.browseFleet')}
              </LangLink>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-14 md:py-20">
          <div className="space-y-10">
            {page.sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">{section.title}</h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/65 md:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {cars.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-20">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t('fleet.featuredTitle')}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/50">{t('fleet.featuredSubtitle')}</p>
            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car, index) => (
                <CarCard key={car!.id} car={car!} onBook={handleBook} index={index} />
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-4xl px-4 pb-16 md:pb-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
            {t('faq.heading')}
          </h2>
          <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950/60">
            {page.faqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white/90 transition hover:text-gold md:text-base">
                  <span>{faq.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-transform duration-200 group-open:rotate-45">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-white/60">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-20">
          <div className="grid gap-4 md:grid-cols-2">
            <LangLink
              to={airportPath.replace(`/${lang}`, '')}
              className="rounded-2xl border border-gold/25 bg-gold/10 p-6 transition hover:border-gold/50"
            >
              <h2 className="font-heading text-xl font-semibold text-white">{airport.h1}</h2>
              <p className="mt-2 text-sm text-white/60">{airport.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                {airport.cta} →
              </span>
            </LangLink>
            <LangLink
              to="/partners"
              className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 transition hover:border-gold/40"
            >
              <h2 className="font-heading text-xl font-semibold text-white">{t('partners.teaserTitle', 'Partner with Carzio')}</h2>
              <p className="mt-2 text-sm text-white/60">
                {t('partners.teaserText', 'Surf camps, hotels and travel agencies: offer your guests a car waiting at Agadir Airport.')}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                {t('partners.teaserCta', 'See the partner programme')} →
              </span>
            </LangLink>
          </div>

          {otherPages.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-xl font-semibold text-white">{t('support.moreTitle', 'More car rental guides')}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {otherPages.map((entry) => (
                  <LangLink
                    key={entry.key}
                    to={`/${entry.slug}`}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 transition hover:border-gold/40 hover:text-white"
                  >
                    {entry.h1}
                  </LangLink>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedCar={selectedCar}
        preselectedLocation="agadir"
        preselectedDropoffLocation="agadir"
      />
    </>
  );
}
