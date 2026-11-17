import { useTranslation } from 'react-i18next';
import LangLink from './LangLink';
import { getAirportPage } from '../content/airport';
import { getSupportPages } from '../content/support';

export default function RelatedGuides() {
  const { t, i18n } = useTranslation();
  const guides = getSupportPages(i18n.language).slice(0, 4);
  const airport = getAirportPage(i18n.language);

  return (
    <section className="mx-auto max-w-3xl px-4 pb-16">
      <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6">
        <h2 className="font-heading text-xl font-semibold text-white">
          {t('support.moreTitle', 'More car rental guides')}
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {guides.map((guide) => (
            <LangLink
              key={guide.key}
              to={`/${guide.slug}`}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:border-gold/40 hover:text-gold"
            >
              {guide.h1}
            </LangLink>
          ))}
          <LangLink
            to={`/${airport.slug}`}
            className="rounded-lg border border-gold/25 bg-gold/10 px-3 py-2 text-sm font-medium text-gold transition hover:bg-gold/20"
          >
            {airport.h1}
          </LangLink>
          <LangLink
            to="/cars"
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:border-gold/40 hover:text-gold"
          >
            {t('nav.ourCars')}
          </LangLink>
        </div>
      </div>
    </section>
  );
}
