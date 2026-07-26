-- Placeholder schema for Udawalawe Wild booking enquiries.
-- This is a design reference; it is not applied automatically.
-- Apply through Lovable Cloud migrations when the database is enabled.

create type enquiry_status as enum (
  'new',
  'reviewing',
  'quoted',
  'confirmed',
  'cancelled',
  'archived'
);

create table if not exists public.booking_enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- guest details
  guest_name        text not null,
  guest_email       text not null,
  guest_whatsapp    text not null,
  guest_hotel       text,
  guest_country     text,

  -- trip details
  safari_date       date,
  adults            int  not null default 1,
  children          int  not null default 0,
  safari_type       text,
  pickup_location   text,
  dropoff_location  text,
  special_requests  text,

  -- status / internal
  status            enquiry_status not null default 'new',
  assigned_partner  text,
  internal_notes    text,
  quoted_amount     numeric(10,2),
  quoted_currency   text
);

-- GRANTs and RLS policies to be added when Lovable Cloud is enabled.
-- This table must never be exposed to anon in production.