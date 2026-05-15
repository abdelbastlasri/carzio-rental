export interface StoredBooking {
  id: string;
  carName: string;
  totalPrice: number;
  days: number;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  dropoffTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  flightNumber: string;
  extras: string[];
  specialRequests: string;
  submittedAt: string;
}

const STORAGE_KEY = 'carzio_bookings';

export function getBookings(): StoredBooking[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: StoredBooking): void {
  const bookings = getBookings();
  bookings.unshift(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function clearBookings(): void {
  localStorage.removeItem(STORAGE_KEY);
}
