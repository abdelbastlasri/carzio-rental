import { useTranslation } from 'react-i18next';
import { getCarAd } from '../data/carAds';

interface CarAdProps {
  carId: string;
  /** compact mode for dense UIs (fleet cards): hides bullets, keeps the pitch */
  compact?: boolean;
}

export default function CarAd({ carId, compact = false }: CarAdProps) {
  const { i18n } = useTranslation();
  const ad = getCarAd(carId, i18n.language);
  if (!ad) return null;

  if (compact) {
    return <p className="mt-2 text-[11px] leading-snug text-white/50">{ad.pitch}</p>;
  }

  return (
    <div>
      <p className="mt-1.5 text-[11.5px] leading-snug text-white/55">{ad.pitch}</p>
      <ul className="mt-2 grid gap-1">
        {ad.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-1.5 text-[10.5px] leading-snug text-white/60">
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-gold"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
