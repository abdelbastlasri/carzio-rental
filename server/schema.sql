-- Supabase SQL – run this in the Supabase SQL Editor

CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  car_name TEXT NOT NULL,
  total_price NUMERIC NOT NULL DEFAULT 0,
  days INTEGER NOT NULL DEFAULT 1,
  pickup_location TEXT,
  dropoff_location TEXT,
  pickup_date TEXT,
  dropoff_date TEXT,
  pickup_time TEXT,
  dropoff_time TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  flight_number TEXT,
  extras JSONB DEFAULT '[]',
  special_requests TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
