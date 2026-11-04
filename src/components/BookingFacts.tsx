import LangLink from './LangLink';
import { useTranslation } from 'react-i18next';

const items = [
  { key: 'deposit', to: '/faq/reservation', icon: 'M5 13l4 4L19 7' },
  { key: 'freeCancel', to: '/faq/reservation', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z' },
  { key: 'fiveDays', to: '/faq/assurance', icon: 'M9 12l2 2 4-4m5.618 9.014A9 9 0 1 0 12 21a9 9 0 0 0 8.618-7.986' },
  { key: 'delivery', to: '/faq/carburant-livraison', icon: 'M3 7h13m0 0a2 2 0 1 0 4 0m-4 0v10M5 17h11m0 0a2 2 0 1 0 4 0' },
];

export default function BookingFacts() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="booking-facts-title" className="mx-auto max-w-6xl px-4 pb-10">
      <h2 id="booking-facts-title" className="mb-4 font-heading text-xl font-semibold text-white">
        {t('facts.title')}
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map(({ key, to, icon }) => (
          <LangLink
            key={key}
            to={to}
            className="group rounded-2xl border border-white/10 bg-zinc-950/60 p-4 transition hover:border-gold/40 focus-visible:border-gold"
          >
            <svg
              aria-hidden="true"
              className="mb-3 h-5 w-5 text-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={icon} />
            </svg>
            <p className="text-[11px] leading-snug text-white/60 transition group-hover:text-white">
              {t(`facts.${key}`)}
            </p>
          </LangLink>
        ))}
      </div>
    </section>
  );
}
