import LangLink from '../components/LangLink';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { findCity } from '../data/cities';

const CITY_SLUGS = ['agadir', 'marrakech', 'casablanca', 'taghazout', 'tamraght', 'essaouira'] as const;

interface CityPageProps {
  citySlug: string;
}

export default function CityPage({ citySlug }: CityPageProps) {
  const { t, i18n } = useTranslation();
  const city = findCity(citySlug, i18n.language);

  if (!city) {
    return (
      <div className="pt-32 text-center text-white">
        <p>{t('city.notFound')}</p>
        <LangLink to="/" className="mt-3 inline-block text-gold underline">
          {t('city.backToHome')}
        </LangLink>
      </div>
    );
  }

  const canonical = `https://www.carzio.ma/location-voiture-${city.slug}`;
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: 'https://www.carzio.ma/' },
      { '@type': 'ListItem', position: 2, name: 'Voitures', item: 'https://www.carzio.ma/cars' },
      { '@type': 'ListItem', position: 3, name: city.title, item: canonical },
    ],
  };

  const otherCities = CITY_SLUGS.filter((slug) => slug !== city.slug);
  const otherNames: Record<string, string> = {
    agadir: 'Agadir', marrakech: 'Marrakech', casablanca: 'Casablanca', taghazout: 'Taghazout', tamraght: 'Tamraght', essaouira: 'Essaouira',
  };

  return (
    <>
      <Seo
        title={city.title}
        description={city.description}
        canonical={canonical}
        jsonLd={[breadcrumbs]}
      />
      <div className="pt-28 md:pt-32">
        <section className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-black" />
          <div className="relative z-10 mx-auto max-w-6xl px-4">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">{city.region}</p>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              {city.title.split('|')[0].trim()}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">{city.intro[0]}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/212680318003?text=${encodeURIComponent(t('city.waMessage', { city: city.name }))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
              >
                {t('city.askQuote')}
              </a>
              <LangLink
                to="/cars"
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-gold"
              >
                {t('city.seeCars')}
              </LangLink>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="space-y-4 text-sm leading-relaxed text-white/60">
              {city.intro.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-8 font-heading text-lg font-semibold text-white">{t('city.seeHighlights')} {city.name}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {city.highlights.map((item) => (
                <li key={item.name} className="rounded-xl border border-white/10 bg-zinc-950/60 p-4">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-xs leading-snug text-white/60">{item.detail}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-heading text-lg font-semibold text-white">{t('city.distances')}</h2>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-left text-[11px] uppercase tracking-wider text-white/50">
                  <tr>
                    <th scope="col" className="px-4 py-2">{t('city.dest')}</th>
                    <th scope="col" className="px-4 py-2">{t('city.distance')}</th>
                    <th scope="col" className="px-4 py-2">{t('city.time')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {city.routes.map((route) => (
                    <tr key={route.to}>
                      <th scope="row" className="px-4 py-2.5 font-medium text-white/80">{route.to}</th>
                      <td className="px-4 py-2.5 text-white/60">{route.distance}</td>
                      <td className="px-4 py-2.5 text-white/60">{route.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950/60 p-6">
              <h2 className="font-heading text-lg font-semibold text-white">
                {t('city.pickupTitle')} {city.name}
              </h2>
              <p className="mt-2 text-sm text-white/60">{city.pickup}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">{city.fee}</span>
                <span className="text-xs text-white/55">{city.feeNote}</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 p-6">
              <h2 className="font-heading text-lg font-semibold text-white">{t('city.goodToKnow')}</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                {city.localTips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(t('city.included', { returnObjects: true }) as unknown as string[]).map((item: string) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-white/70">
                  <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-heading text-lg font-semibold text-white">{t('city.faqs')}</h2>
              <dl className="mt-3 divide-y divide-white/5">
                {city.faqs.map((faq) => (
                  <div key={faq.q} className="py-3">
                    <dt className="text-sm font-medium text-white/90">{faq.q}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-white/60">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/60 p-6">
              <h2 className="font-heading text-lg font-semibold text-white">{t('city.guides')}</h2>
              <p className="mt-2 text-sm text-white/60">{t('city.guidesIntro')}</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <LangLink to="/blog/reserver-voiture-agadir-guide" className="text-gold underline underline-offset-4">
                    {t('faq.guideBooking')}
                  </LangLink>
                </li>
                <li>
                  <LangLink to="/blog/assurance-location-voiture-maroc" className="text-gold underline underline-offset-4">
                    {t('faq.guideInsurance')}
                  </LangLink>
                </li>
                <li>
                  <LangLink to="/blog/age-permis-conducteurs-location-maroc" className="text-gold underline underline-offset-4">
                    {t('faq.guideAge')}
                  </LangLink>
                </li>
              </ul>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-gold/20 bg-zinc-950/80 p-6 lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">{t('city.deposit')}</p>
            <p className="mt-1 font-heading text-3xl font-bold text-gold">{t('city.priceHook')}</p>
            <p className="mt-2 text-xs text-white/55">{t('city.minimum')}</p>
            <a
              href="https://wa.me/212680318003"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block rounded-lg bg-burgundy px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-900"
            >
              {t('city.bookWhatsapp')}
            </a>
            <LangLink
              to="/cars"
              className="mt-2 block rounded-lg border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white transition hover:border-gold"
            >
              {t('city.compareCars')}
            </LangLink>
            <p className="mt-4 text-center text-[11px] text-white/55">{t('city.responseLine')}</p>
          </aside>
        </section>

        <section className="border-t border-white/5 py-10">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
              {t('city.weDeliverToo')}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {otherCities.map((slug) => (
                <LangLink
                  key={slug}
                  to={`/location-voiture-${slug}`}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:border-gold hover:text-white"
                >
                  {otherNames[slug]}
                </LangLink>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
