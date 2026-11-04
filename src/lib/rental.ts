/**
 * Rental duration rules.
 *
 * A rental is billed in 24h blocks. The minimum is 3 blocks (72 hours).
 * A started block is billed in full, so 73 hours = 4 days.
 */

export const MIN_RENTAL_DAYS = 3;
export const MIN_RENTAL_HOURS = MIN_RENTAL_DAYS * 24;
export const FULL_INSURANCE_MIN_DAYS = 5;

/** Local date -> "YYYY-MM-DD" (never UTC: avoids the day-shift bug). */
export function toISO(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function todayISO(): string {
  return toISO(new Date());
}

/** "YYYY-MM-DD" -> local Date at midnight. */
export function fromISO(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year || 1970, (month || 1) - 1, day || 1);
}

export function addDaysISO(iso: string, days: number): string {
  const date = fromISO(iso);
  date.setDate(date.getDate() + days);
  return toISO(date);
}

/** Whole calendar days between two ISO dates. */
export function diffDays(from: string, to: string): number {
  return Math.round((fromISO(to).getTime() - fromISO(from).getTime()) / 86_400_000);
}

function minutesOfDay(time?: string): number {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/**
 * Real duration in hours. When no return time is given, the pickup time is
 * used for the return, which matches the "same hour" rule.
 */
export function rentalHours(
  pickupDate: string,
  dropoffDate: string,
  pickupTime?: string,
  dropoffTime?: string,
): number {
  if (!pickupDate || !dropoffDate) return 0;
  const start = fromISO(pickupDate);
  start.setMinutes(start.getMinutes() + minutesOfDay(pickupTime));
  const end = fromISO(dropoffDate);
  end.setMinutes(end.getMinutes() + minutesOfDay(dropoffTime || pickupTime));
  return (end.getTime() - start.getTime()) / 3_600_000;
}

/** 24h blocks, rounded up, never below the 3-day minimum. */
export function billedDays(
  pickupDate: string,
  dropoffDate: string,
  pickupTime?: string,
  dropoffTime?: string,
): number {
  const hours = rentalHours(pickupDate, dropoffDate, pickupTime, dropoffTime);
  if (hours <= 0) return 0;
  return Math.max(MIN_RENTAL_DAYS, Math.ceil(hours / 24));
}

export function isValidRental(
  pickupDate: string,
  dropoffDate: string,
  pickupTime?: string,
  dropoffTime?: string,
): boolean {
  return rentalHours(pickupDate, dropoffDate, pickupTime, dropoffTime) >= MIN_RENTAL_HOURS - 1 / 60;
}

export function hasStartedBlock(
  pickupDate: string,
  dropoffDate: string,
  pickupTime?: string,
  dropoffTime?: string,
): boolean {
  const hours = rentalHours(pickupDate, dropoffDate, pickupTime, dropoffTime);
  return hours > 0 && hours % 24 !== 0;
}

export type InsuranceBand = 'low' | 'high';

/**
 * Standard insurance is always included. The excess depends on the daily
 * rate: cars at 39 EUR/day or less carry a 5 000 MAD excess, cars at
 * 40 EUR/day or more carry an 8 000 MAD excess.
 */
export const INSURANCE_BANDS: Record<InsuranceBand, { excess: number; fullPerDay: number }> = {
  low: { excess: 5000, fullPerDay: 10 },
  high: { excess: 8000, fullPerDay: 15 },
};

export function insuranceQuote(band: InsuranceBand, days: number, full: boolean) {
  const rule = INSURANCE_BANDS[band];
  const eligible = days >= FULL_INSURANCE_MIN_DAYS;
  return {
    eligible,
    excess: rule.excess,
    fullPerDay: rule.fullPerDay,
    fullPrice: eligible && full ? rule.fullPerDay * days : 0,
  };
}
