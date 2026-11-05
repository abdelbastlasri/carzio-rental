import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type CurrencyCode = 'MAD' | 'EUR' | 'USD' | 'GBP';

export const CURRENCIES: { code: CurrencyCode; flag: string; label: string }[] = [
  { code: 'MAD', flag: '🇲🇦', label: 'Dirham' },
  { code: 'EUR', flag: '🇪🇺', label: 'Euro' },
  { code: 'USD', flag: '🇺🇸', label: 'Dollar US' },
  { code: 'GBP', flag: '🇬🇧', label: 'Pound Sterling' },
];

/**
 * Fixed business rates — MAD is the admin/pricing base used for display
 * (never the billed currency, billing stays in EUR):
 *   1 EUR = 10 MAD, 1 USD = 9 MAD, 1 GBP = 11.5 MAD
 * Derived: MAD = EUR × 10; USD = MAD / 9; GBP = MAD / 11.5
 * Rounding: nearest whole number (< .5 down, ≥ .5 up), no decimals on price cards.
 */
export const CONVERSION_FROM_MAD: Record<CurrencyCode, number> = {
  MAD: 1,
  EUR: 0.1,          // 10 MAD per EUR
  USD: 1 / 9,
  GBP: 1 / 11.5,
};

const STORAGE_KEY = 'carzioCurrency';

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (next: CurrencyCode) => void;
  formatPrice: (eurAmount: number) => string;
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'MAD',
  setCurrency: () => {},
  formatPrice: (eur) => fmtPrice(eur, 'MAD'),
  currencySymbol: 'DH',
});

function roundHalfUp(x: number): number {
  return Math.floor(x + 0.5);
}

function toMad(eurAmount: number): number {
  return roundHalfUp(eurAmount * 10);
}

export function convertFromEur(eurAmount: number, currency: CurrencyCode): number {
  const mad = toMad(eurAmount);
  if (currency === 'MAD') return mad;
  return roundHalfUp(mad * CONVERSION_FROM_MAD[currency]);
}

function symbolOf(code: CurrencyCode): string {
  switch (code) {
    case 'MAD': return 'DH';
    case 'EUR': return '€';
    case 'USD': return '$';
    case 'GBP': return '£';
  }
}

function fmtPrice(eurAmount: number, currency: CurrencyCode): string {
  const converted = convertFromEur(eurAmount, currency);
  const locale = currency === 'MAD' ? 'fr-MA' : currency === 'EUR' ? 'fr-FR' : currency === 'GBP' ? 'en-GB' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(converted);
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      return saved === 'EUR' || saved === 'USD' || saved === 'GBP' || saved === 'MAD' ? saved : 'MAD';
    } catch {
      return 'MAD';
    }
  });

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
  }, []);

  const formatPrice = useCallback(
    (eurAmount: number) => fmtPrice(eurAmount, currency),
    [currency],
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, currencySymbol: symbolOf(currency) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
