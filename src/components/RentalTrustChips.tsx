import { useTranslation } from 'react-i18next';

const trustKeys = ['blog.trustDeposit', 'blog.trustCancellation', 'blog.trustInsurance'];

export default function RentalTrustChips({ className = '' }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <ul className={`flex flex-wrap items-center gap-2 text-xs ${className}`}>
      {trustKeys.map((key) => (
        <li
          key={key}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white/70"
        >
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {t(key)}
        </li>
      ))}
    </ul>
  );
}
