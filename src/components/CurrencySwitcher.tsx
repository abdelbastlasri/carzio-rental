import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENCIES, useCurrency, type CurrencyCode } from '../lib/currency';

const FLAG: Record<CurrencyCode, string> = { MAD: '🇲🇦', EUR: '🇪🇺', USD: '🇺🇸', GBP: '🇬🇧' };

export default function CurrencySwitcher() {
  const { t } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-white/70 transition hover:bg-white/5 hover:text-gold"
        aria-label={t('currency.switch')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span aria-hidden="true" className="text-base leading-none">{FLAG[currency]}</span>
        <span className="text-xs font-semibold tracking-wide">{currency}</span>
        <svg aria-hidden="true" className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div role="listbox" aria-label={t('currency.switch')} className="absolute right-0 top-full z-30 mt-1 min-w-[170px] rounded-xl border border-white/5 glass-dark py-1">
          {CURRENCIES.map(({ code, flag, label }) => (
            <button
              key={code}
              role="option"
              aria-selected={code === currency}
              onClick={() => { setCurrency(code); setOpen(false); }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                code === currency ? 'text-gold bg-gold/10' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span aria-hidden="true">{flag}</span>
              <span className="font-semibold">{code}</span>
              <span className="text-white/45 text-xs">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
