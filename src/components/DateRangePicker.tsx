import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  addDaysISO,
  billedDays,
  fromISO,
  hasStartedBlock,
  isValidRental,
  MIN_RENTAL_DAYS,
  FULL_INSURANCE_MIN_DAYS,
  todayISO,
  toISO,
} from '../lib/rental';

export interface DateRangeValue {
  pickupDate: string;
  dropoffDate: string;
  pickupTime?: string;
  dropoffTime?: string;
}

interface DateRangePickerProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  pricePerDay?: number;
  variant?: 'popover' | 'inline';
  showTimes?: boolean;
  error?: string;
}

const INTL_LOCALES: Record<string, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  de: 'de-DE',
  es: 'es-ES',
  pl: 'pl-PL',
};

export default function DateRangePicker({
  value,
  onChange,
  pricePerDay,
  variant = 'popover',
  showTimes = true,
  error,
}: DateRangePickerProps) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => {
    const base = value.pickupDate || todayISO();
    return `${base.slice(0, 7)}-01`;
  });
  const rootRef = useRef<HTMLDivElement>(null);

  const locale = INTL_LOCALES[i18n.language] || 'en-GB';
  const today = todayISO();
  const start = value.pickupDate;
  const end = value.dropoffDate;
  const days = billedDays(start, end, value.pickupTime, value.dropoffTime);
  const valid = isValidRental(start, end, value.pickupTime, value.dropoffTime);
  const startedBlock = hasStartedBlock(start, end, value.pickupTime, value.dropoffTime);

  const formatShort = (iso: string) =>
    new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(fromISO(iso));

  const formatLong = (iso: string) =>
    new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(fromISO(iso));

  const monthLabel = useMemo(() => {
    const label = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(fromISO(cursor));
    return label.charAt(0).toUpperCase() + label.slice(1);
  }, [cursor, locale]);

  const weekdays = useMemo(() => {
    // 1 Jan 2024 is a Monday, so this gives Monday-first initials.
    return Array.from({ length: 7 }, (_, index) =>
      new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(new Date(2024, 0, 1 + index)),
    );
  }, [locale]);

  const cells = useMemo(() => {
    const first = fromISO(cursor);
    const year = first.getFullYear();
    const month = first.getMonth();
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    const total = new Date(year, month + 1, 0).getDate();
    const list: (string | null)[] = Array.from({ length: offset }, () => null);
    for (let day = 1; day <= total; day += 1) {
      list.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    }
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [cursor]);

  const canGoBack = cursor.slice(0, 7) > today.slice(0, 7);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) setCursor(`${(value.pickupDate || todayISO()).slice(0, 7)}-01`);
    // Only re-centre when the panel opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const shiftMonth = (direction: number) => {
    const date = fromISO(cursor);
    date.setMonth(date.getMonth() + direction);
    setCursor(toISO(new Date(date.getFullYear(), date.getMonth(), 1)));
  };

  const pickDay = (iso: string) => {
    if (iso < today) return;
    // No start yet, or a click too close to the current start: start a new range.
    if (!start || iso < addDaysISO(start, MIN_RENTAL_DAYS)) {
      onChange({ ...value, pickupDate: iso, dropoffDate: addDaysISO(iso, MIN_RENTAL_DAYS) });
      return;
    }
    onChange({ ...value, pickupDate: start, dropoffDate: iso });
  };

  const reset = () => {
    onChange({ ...value, pickupDate: today, dropoffDate: addDaysISO(today, MIN_RENTAL_DAYS) });
    setCursor(`${today.slice(0, 7)}-01`);
  };

  const setPickupTime = (time: string) => {
    // The return defaults to the same hour, so a 3-day rental is exactly 72h.
    onChange({ ...value, pickupTime: time, dropoffTime: time });
  };

  const summary = start && end ? `${formatShort(start)} → ${formatShort(end)}` : '';
  const priceFormatter = useMemo(
    () => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
    [locale],
  );
  const price = pricePerDay && days > 0 ? pricePerDay * days : null;

  const panel = (
    <div
      className={
        variant === 'popover'
          ? 'absolute left-1/2 top-full z-50 mt-2 w-[calc(100vw-24px)] -translate-x-1/2 sm:left-0 sm:right-auto sm:w-[400px] sm:translate-x-0'
          : 'relative w-full'
      }
    >
      <div
        role="dialog"
        aria-modal="false"
        aria-label={t('dateRange.label')}
        className="rounded-2xl border border-white/10 bg-zinc-900 p-3 shadow-2xl shadow-black/60 sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={!canGoBack}
            aria-label={t('dateRange.previousMonth')}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:text-white/15"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p className="font-heading text-sm font-semibold text-white">{monthLabel}</p>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label={t('dateRange.nextMonth')}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7 gap-0.5 sm:gap-1">
          {weekdays.map((label, index) => (
            <span
              key={`${label}-${index}`}
              aria-hidden="true"
              className="flex h-7 items-center justify-center text-[10px] font-semibold uppercase tracking-wider text-white/55"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5 sm:gap-1" role="group" aria-label={t('dateRange.label')}>
          {cells.map((iso, index) => {
            if (!iso) return <span key={`empty-${index}`} className="h-11 w-11 max-[359px]:h-9 max-[359px]:w-9 sm:h-9 sm:w-9" />;
            const isPast = iso < today;
            const isStart = iso === start;
            const isEnd = iso === end;
            const inRange = Boolean(start && end && iso > start && iso < end);
            const isToday = iso === today;
            const disabled = isPast;

            const classes = [
              'relative flex h-11 w-11 touch-manipulation items-center justify-center rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 max-[359px]:h-9 max-[359px]:w-9 sm:h-9 sm:w-9',
              disabled ? 'cursor-not-allowed text-white/15' : 'text-white/80 hover:bg-white/10',
              inRange && !disabled ? 'bg-gold/15 text-white hover:bg-gold/25' : '',
              isStart || isEnd ? 'bg-gold font-semibold text-black shadow-lg shadow-gold/30 hover:bg-gold-light' : '',
              isToday && !isStart && !isEnd ? 'ring-1 ring-gold/40' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={iso}
                type="button"
                onClick={() => pickDay(iso)}
                disabled={disabled}
                aria-label={formatLong(iso)}
                aria-pressed={isStart || isEnd}
                aria-current={isToday ? 'date' : undefined}
                className={classes}
              >
                {Number(iso.slice(8, 10))}
                {(isStart || isEnd) && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-black/60" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
          {start && end ? (
            <div className="flex flex-wrap items-center justify-between gap-2" aria-live="polite">
              <p className="text-sm text-white/70">{summary}</p>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                  {t('dateRange.days', { count: days })}
                </span>
                {price !== null && (
                  <span className="font-heading text-sm font-bold text-white">{priceFormatter.format(price)}</span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/55">{t('dateRange.selectStart')}</p>
          )}

          {start && end && !valid && (
            <p className="text-xs text-gold">{t('dateRange.minDays')}</p>
          )}

          {startedBlock && (
            <p className="text-[11px] text-white/55">{t('dateRange.billedNote')}</p>
          )}

          {days > 0 && (
            <p className={`flex items-center gap-1.5 text-[11px] ${days >= FULL_INSURANCE_MIN_DAYS ? 'text-gold' : 'text-white/55'}`}>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {days >= FULL_INSURANCE_MIN_DAYS ? t('dateRange.insuranceAvailable') : t('dateRange.insuranceFrom')}
            </p>
          )}

          {showTimes && (
            <div className="space-y-1.5 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <label className="text-[11px] text-white/50">
                  {t('dateRange.pickupTime')}
                  <input
                    type="time"
                    name="pickupTime"
                    autoComplete="off"
                    value={value.pickupTime || ''}
                    onChange={(event) => setPickupTime(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-black px-2.5 py-1.5 text-sm text-white focus:border-gold focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  />
                </label>
                <label className="text-[11px] text-white/50">
                  {t('dateRange.dropoffTime')}
                  <input
                    type="time"
                    name="dropoffTime"
                    autoComplete="off"
                    value={value.dropoffTime || ''}
                    onChange={(event) => onChange({ ...value, dropoffTime: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-black px-2.5 py-1.5 text-sm text-white focus:border-gold focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  />
                </label>
              </div>
              <p className="text-[10px] text-white/55">{t('dateRange.timeHint')}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={reset}
              className="text-xs text-white/55 underline underline-offset-4 transition hover:text-white/70 focus-visible:outline-none focus-visible:rounded focus-visible:ring-1 focus-visible:ring-gold"
            >
              {t('dateRange.reset')}
            </button>
            {variant === 'popover' && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-burgundy px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-burgundy/30 transition hover:bg-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              >
                {t('dateRange.apply')}
              </button>
            )}
          </div>
        </div>

        {error && <p role="alert" className="mt-2 text-xs text-gold">{error}</p>}
      </div>
    </div>
  );

  if (variant === 'inline') {
    return (
      <div ref={rootRef} className="w-full">
        {panel}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={start && end ? `${t('dateRange.label')} : ${summary}` : t('dateRange.label')}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border bg-black px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
          error ? 'border-gold' : 'border-zinc-700'
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <svg className="h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={`truncate ${start && end ? 'text-white' : 'text-white/55'}`}>
            {start && end ? summary : t('dateRange.placeholder')}
          </span>
        </span>
        {start && end && (
          <span className="shrink-0 rounded-md bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold">
            {t('dateRange.days', { count: days })}
          </span>
        )}
      </button>
      {open && panel}
    </div>
  );
}
