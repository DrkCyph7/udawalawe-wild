-- Supabase schema for Udawalawe Wild booking enquiries.
-- Apply this in the Supabase SQL editor.

create extension if not exists pgcrypto;

create type public.enquiry_status as enum (
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

  guest_name        text not null,
  guest_email       text not null,
  guest_whatsapp    text not null,
  guest_hotel       text,
  guest_country     text,

  safari_date       date,
  adults            int  not null default 1,
  children          int  not null default 0,
  safari_type       text,
  pickup_location   text,
  dropoff_location  text,
  special_requests  text,

  status            public.enquiry_status not null default 'new',
  assigned_partner  text,
  internal_notes    text,
  quoted_amount     numeric(10,2),
  quoted_currency   text
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

alter table public.booking_enquiries enable row level security;
alter table public.profiles enable row level security;

create policy "Anyone can submit enquiries"
  on public.booking_enquiries
  for insert
  to anon
  with check (true);

create policy "Admins can read all enquiries"
  on public.booking_enquiries
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Admins can update enquiries"
  on public.booking_enquiries
  for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

create policy "Users can upsert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (id = auth.uid());
