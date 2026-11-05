import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { useCurrency } from '../lib/currency';
import CarAd from './CarAd';

interface CarCardProps {
  car: Car;
  onBook: (carId: string) => void;
  index?: number;
  overridePrice?: number;
}

const icons = {
  seats: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  doors: 'M5 4h10l4 4v12H5V4zm10 0v4h4',
  bags: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  gearbox: 'M6 4v16M18 4v16M6 9h12M6 15h12',
  ac: 'M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9',
  gps: 'M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11zm0-8a3 3 0 100-6 3 3 0 000 6z',
  screen: 'M3 5h18v11H3V5zm5 15h8m-4-4v4',
  km: 'M13 10V3L4 14h7v7l9-11h-7z',
};

function Spec({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-white/60">
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 text-gold/80"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.6}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {label}
    </span>
  );
}

export default function CarCard({ car, onBook, index = 0, overridePrice }: CarCardProps) {
  const displayPrice = overridePrice ?? car.pricePerDay;
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const typeLabel = t('carCard.type.' + car.type.toLowerCase());

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-xl shadow-black/40 transition-colors hover:border-gold/30"
    >
      <div className="relative bg-white">
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5">
          <span className="rounded-full bg-zinc-900/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
            {typeLabel}
          </span>
          <span className="rounded-full bg-zinc-900/90 px-2.5 py-1 text-[10px] font-semibold text-white/70 shadow-sm">
            {car.model}
          </span>
        </div>

        <img
          src={car.image}
          alt={`${car.name} — ${typeLabel}, ${t('carCard.orSimilar')}`}
          loading="lazy"
          width={640}
          height={360}
          className="h-44 w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-48"
        />

        <div className="absolute bottom-0 right-0 flex items-baseline gap-0.5 rounded-tl-xl bg-zinc-950 px-3 py-2 text-white">
          <span className="font-heading text-xl font-bold leading-none text-gold">{formatPrice(displayPrice)}</span>
          <span className="text-[11px] text-white/60">{t('common.perDay')}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-lg font-bold tracking-tight text-white">{car.name}</h3>
          <p className="mt-0.5 text-xs text-white/55">
            {t('carCard.orSimilar')} · {typeLabel} · {car.transmission === 'Automatic' ? t('carCard.transmission.automatic') : t('carCard.transmission.manual')}
          </p>
          <CarAd carId={car.id} compact />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 border-y border-white/[0.06] py-3">
          <Spec icon={icons.seats} label={`${car.seats} ${t('carCard.seats')}`} />
          <Spec icon={icons.doors} label={t('carCard.doors', { count: car.doors })} />
          <Spec icon={icons.bags} label={`${car.suitcases} ${t('carCard.bags')}`} />
          <Spec icon={icons.gearbox} label={car.transmission === 'Automatic' ? t('carCard.transmission.automatic') : t('carCard.transmission.manual')} />
          {car.ac && <Spec icon={icons.ac} label={t('carCard.ac')} />}
          {car.gps && <Spec icon={icons.gps} label={t('carCard.gps')} />}
          {car.touchscreen && <Spec icon={icons.screen} label={t('carCard.touchscreen')} />}
          <Spec icon={icons.km} label={`${car.km === 'Unlimited' ? t('carCard.unlimitedKm') : car.km} km`} />
        </div>

        <ul className="mt-3 space-y-1.5 text-[11px] text-white/60">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
            {t('carCard.deposit')}
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
            {t('carCard.cancellation')}
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
            {t('carCard.insurance')}
          </li>
        </ul>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => onBook(car.id)}
            className="group/cta flex w-full items-center justify-between rounded-xl bg-burgundy px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-burgundy/20 transition hover:bg-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <span>{t('carCard.bookNow')}</span>
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
