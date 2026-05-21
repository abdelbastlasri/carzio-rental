export interface Car {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  image: string;
  seats: number;
  doors: number;
  suitcases: number;
  transmission: string;
  ac: boolean;
  km: string;
  model: string;
  description: string;
  extras: Extra[];
}

export interface Extra {
  name: string;
  price: number;
  perDay: boolean;
}

export interface Location {
  id: string;
  name: string;
  airport: string;
  mapUrl: string;
  transportFee: number;
}

export interface PricingRule {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  multiplier: number;
  car_id: string | null;
  active: boolean;
  created_at: string;
}

export interface BookingRecord {
  id: string;
  car_name?: string;
  total_price?: number;
  days?: number;
  pickup_location?: string;
  dropoff_location?: string;
  pickup_date?: string;
  dropoff_date?: string;
  pickup_time?: string;
  dropoff_time?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_age?: number;
  flight_number?: string;
  extras?: string[];
  special_requests?: string;
  transport_fee?: number;
  payment_method?: string;
  confirmation_method?: string;
  no_deposit_agreed?: boolean;
  status: 'pending' | 'confirmed' | 'rejected';
  submitted_at?: string;
}

export interface Review {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  avatar: string;
}
