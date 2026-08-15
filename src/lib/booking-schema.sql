-- ============================================================
-- Udawalawe Wild — Supabase schema
-- Run in the Supabase SQL editor (idempotent — safe to re-run).
-- ============================================================

create extension if not exists pgcrypto;

-- ── Enum: enquiry status ─────────────────────────────────────
do $$
begin
  if not exists (select 1 from pg_type where typname = 'enquiry_status') then
    create type public.enquiry_status as enum (
      'new', 'reviewing', 'quoted', 'confirmed', 'cancelled', 'archived'
    );
  end if;
end $$;

-- ── Enum: admin role ─────────────────────────────────────────
do $$
begin
  if not exists (select 1 from pg_type where typname = 'admin_role') then
    create type public.admin_role as enum ('admin', 'superadmin');
  end if;
end $$;

-- ============================================================
-- TABLE: booking_enquiries
-- ============================================================
create table if not exists public.booking_enquiries (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  -- Guest identity
  guest_name       text not null,
  guest_email      text not null,
  guest_whatsapp   text,                        -- optional
  guest_hotel      text,

  -- Geo (from ipapi.co at booking time — best-effort)
  guest_country    text,                        -- e.g. "Germany"
  guest_country_code text,                      -- ISO 3166-1 alpha-2, e.g. "DE"
  guest_ip         text,                        -- IPv4 or IPv6  ← SENSITIVE
  guest_city       text,                        -- e.g. "Berlin" ← SENSITIVE

  -- Trip
  safari_date      date,
  adults           int not null default 1,
  children         int not null default 0,
  safari_type      text,
  pickup_location  text,
  dropoff_location text,
  special_requests text,

  -- Internal admin fields
  status           public.enquiry_status not null default 'new',
  assigned_partner text,
  internal_notes   text,
  quoted_amount    numeric(10,2),
  quoted_currency  text
);

-- Migrations: add new columns if re-running on existing DB
alter table if exists public.booking_enquiries
  alter column guest_whatsapp drop not null;
alter table if exists public.booking_enquiries
  add column if not exists guest_ip           text,
  add column if not exists guest_country_code text,
  add column if not exists guest_city         text;

-- ============================================================
-- TABLE: profiles  (one row per Supabase Auth user)
-- ============================================================
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  role       public.admin_role not null default 'admin',
  created_at timestamptz not null default now()
);

-- Migration: if profiles already exists with text role, alter it
-- (safe no-op if already admin_role type)
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name   = 'profiles'
      and column_name  = 'role'
      and data_type    = 'text'
  ) then
    alter table public.profiles
      alter column role drop default,
      alter column role type public.admin_role using role::public.admin_role,
      alter column role set default 'admin'::public.admin_role;
  end if;
end $$;

-- ============================================================
-- TABLE: admin_login_logs  (audit trail for every login attempt)
-- ============================================================
create table if not exists public.admin_login_logs (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),

  -- Who
  user_id        uuid references auth.users(id) on delete set null,
  email          text not null,
  role           text,                          -- role at time of login

  -- Login result
  success        boolean not null default false,
  failure_reason text,

  -- Where from (geo-IP — same fetchGeoInfo() used for bookings)
  login_ip       text,
  login_country  text,
  login_country_code text,
  login_city     text,

  -- Browser fingerprint
  user_agent     text
);

-- ============================================================
-- VIEW: booking_enquiries_admin_view
-- Regular admins read this view — IP and city are masked to NULL.
-- ============================================================
create or replace view public.booking_enquiries_admin_view as
  select
    id, created_at, updated_at,
    guest_name, guest_email, guest_whatsapp, guest_hotel,
    guest_country, guest_country_code,
    null::text as guest_ip,      -- masked for regular admins
    null::text as guest_city,    -- masked for regular admins
    safari_date, adults, children, safari_type,
    pickup_location, dropoff_location, special_requests,
    status, assigned_partner, internal_notes,
    quoted_amount, quoted_currency
  from public.booking_enquiries;

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Returns the current user's role from profiles table
create or replace function public.get_my_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role::text from public.profiles where id = auth.uid();
$$;

-- Returns true if the current JWT belongs to a superadmin
create or replace function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role = 'superadmin' from public.profiles where id = auth.uid()), false);
$$;

-- Returns true if the current JWT belongs to any admin (admin or superadmin)
create or replace function public.is_any_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- booking_enquiries: guests can insert, admins can read/update
alter table public.booking_enquiries enable row level security;

drop policy if exists "Guests can submit enquiries"  on public.booking_enquiries;
create policy "Guests can submit enquiries"
  on public.booking_enquiries for insert to anon
  with check (true);

drop policy if exists "Admins can read enquiries" on public.booking_enquiries;
create policy "Admins can read enquiries"
  on public.booking_enquiries for select to authenticated
  using (public.is_any_admin());

drop policy if exists "Admins can update enquiries" on public.booking_enquiries;
create policy "Admins can update enquiries"
  on public.booking_enquiries for update to authenticated
  using (public.is_any_admin())
  with check (public.is_any_admin());

-- profiles: users can read/write their own row
alter table public.profiles enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select to authenticated
  using (id = auth.uid());

drop policy if exists "Users can upsert own profile" on public.profiles;
create policy "Users can upsert own profile"
  on public.profiles for insert to authenticated
  with check (id = auth.uid());

-- admin_login_logs: any authenticated user (admin) can insert; only superadmin can read all
alter table public.admin_login_logs enable row level security;

drop policy if exists "Admins can insert login logs" on public.admin_login_logs;
create policy "Admins can insert login logs"
  on public.admin_login_logs for insert to authenticated
  with check (true);

drop policy if exists "Superadmins can read all login logs" on public.admin_login_logs;
create policy "Superadmins can read all login logs"
  on public.admin_login_logs for select to authenticated
  using (public.is_superadmin());

drop policy if exists "Admins can read own login logs" on public.admin_login_logs;
create policy "Admins can read own login logs"
  on public.admin_login_logs for select to authenticated
  using (user_id = auth.uid());

-- ============================================================
-- SEED: admin accounts
-- ============================================================
-- IMPORTANT: Since cross-schema queries caused permission errors,
-- we'll use the foolproof UUID method.
--
-- Steps:
--   1. Go to Authentication > Users in your Supabase dashboard
--   2. Find the UUIDs for these three users
--   3. Replace the placeholder UUIDs below with the real ones
--   4. Run just this INSERT block
--
insert into public.profiles (id, role) values
  ('510082bc-7c5e-49d2-85c4-ed3d9b02c7a2', 'superadmin'),
  ('33fc3e49-0dc0-4dcd-ac5a-fe8a98c3e5c8', 'admin'),
  ('9773d7c1-274b-4aff-a648-116735222674', 'admin')
on conflict (id) do update set role = excluded.role;

