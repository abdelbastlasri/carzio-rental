import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Fleet from '../components/Fleet';
import Reviews from '../components/Reviews';
import BookingModal from '../components/BookingModal';
import LangLink from '../components/LangLink';
import { airportAlternatePaths, getAirportPage } from '../content/airport';
import { trackEvent } from '../lib/analytics';

const ALTERNATE_PATHS = airportAlternatePaths();
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=CARZIO+Car+Rental+Agadir+Airport';
const WHATSAPP_URL = 'https://wa.me/212680318003';

export default function AirportPage() {
  const { i18n } = useTranslation();
  const content = getAirportPage(i18n.language);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');

  useEffect(() => {
    trackEvent('view_airport_page', {
      language: i18n.language,
      slug: content.slug,
    });
  }, [i18n.language, content.slug]);

  const handleBook = (carId: string) => {
    setSelectedCar(carId);
    setBookingOpen(true);
  };

  const jsonLd = useMemo(() => {
    const path = typeof window !== 'undefined' ? window.location.pathname : `/${content.slug}`;
    const pageUrl = `https://www.carzio.ma${path}`;

    const autoRental = {
      '@context': 'https://schema.org',
      '@type': 'AutoRental',
      name: 'Carzio',
      url: pageUrl,
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
      areaServed: ['Agadir', 'Taghazout', 'Tamraght', 'Essaouira', 'Marrakech', 'Casablanca'],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    };

    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    };

    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `https://www.carzio.ma/${i18n.language}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: content.h1,
          item: pageUrl,
        },
      ],
    };

    return [autoRental, faq, breadcrumbs];
  }, [content, i18n.language]);

  return (
    <>
      <Seo
        title={content.title}
        description={content.description}
        image="https://www.carzio.ma/images/hero/agadir-airport-arrival.jpg"
        alternateLangs={['en', 'fr', 'de', 'es', 'pl']}
        alternatePaths={ALTERNATE_PATHS}
        jsonLd={jsonLd}
      />

      <div className="pt-24 md:pt-28">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero/agadir-airport-arrival.jpg')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Agadir Al Massira · AGA</p>
            <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              {content.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              {content.intro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleBook('')}
                className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-gold/20 transition hover:bg-gold-light"
              >
                {content.cta}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-gold/60 hover:text-gold"
              >
                WhatsApp
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {content.trust.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold"
                >
                  <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pickup steps */}
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
            {content.stepsTitle}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {content.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-heading text-lg font-bold text-gold">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fleet */}
        <Fleet onBook={handleBook} featured />

        {/* Price + insurance */}
        <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-16 md:grid-cols-2 md:pb-20">
          <div className="rounded-2xl border border-gold/20 bg-zinc-950/70 p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-white">{content.priceTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{content.priceText}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-gold">
              <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5">0 MAD</span>
              <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5">24/7</span>
              <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5">AGA</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-white">{content.insuranceTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{content.insuranceText}</p>
            <div className="mt-5">
              <LangLink
                to="/faq"
                className="text-sm font-medium text-gold underline underline-offset-4 hover:text-gold-light"
              >
                {content.faqTitle}
              </LangLink>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <Reviews />

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
            {content.faqTitle}
          </h2>
          <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950/60">
            {content.faqs.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white/90 transition hover:text-gold md:text-base">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-white/60">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Map / address */}
        <section className="mx-auto max-w-7xl px-4 pb-16 md:pb-20">
          <div className="grid gap-6 rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <h2 className="font-heading text-xl font-semibold text-white">{content.mapTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{content.mapText}</p>
              <p className="mt-2 text-sm text-white/50">{content.pickupText}</p>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-burgundy px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-900"
            >
              {content.directions}
              <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8m9 0v9" />
              </svg>
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/5 bg-gradient-to-b from-zinc-900/30 to-black px-4 py-16 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
            {content.pickupTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/60">{content.whatsappText}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => handleBook('')}
              className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-gold-light"
            >
              {content.cta}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
            >
              WhatsApp
            </a>
          </div>
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
