-- Run once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds the booking columns used by the site (insurance / full risk / flight).
-- Status: executed by the owner on 2026-11-03 (\"Success. No rows returned.\").
-- The API also tolerates a partial migration: it retries the insert without
-- whichever column is missing, so no booking is ever lost either way.

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS insurance_type        TEXT    DEFAULT 'standard',
  ADD COLUMN IF NOT EXISTS insurance_price       NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS insurance_franchise   INTEGER,
  ADD COLUMN IF NOT EXISTS insurance_band        TEXT,
  ADD COLUMN IF NOT EXISTS full_insurance        BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS full_insurance_price  NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS flight_number         TEXT,
  ADD COLUMN IF NOT EXISTS special_requests      TEXT,
  ADD COLUMN IF NOT EXISTS extras                JSONB   DEFAULT '[]'::jsonb;
