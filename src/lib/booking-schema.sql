-- Supabase schema for Udawalawe Wild booking enquiries.
-- Apply this in the Supabase SQL editor.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'enquiry_status') then
    create type public.enquiry_status as enum (
      'new',
      'reviewing',
      'quoted',
      'confirmed',
      'cancelled',
      'archived'
    );
  end if;
end $$;

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

-- Admin allow-list used by RLS. This is the DATABASE's source of truth for
-- who can read/update bookings — independent of any client-side env var.
create table if not exists public.admin_emails (
  email text primary key
);

insert into public.admin_emails (email) values ('dinuka@nexcy.lk')
on conflict (email) do nothing;

alter table public.admin_emails enable row level security;
-- No policies granted here on purpose: admin_emails is only ever read through
-- the security definer function below, never queried directly by clients.

create or replace function public.is_admin_email()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_emails
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.booking_enquiries enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "Anyone can submit enquiries" on public.booking_enquiries;
create policy "Anyone can submit enquiries"
  on public.booking_enquiries
  for insert
  to anon
  with check (true);

drop policy if exists "Admins can read all enquiries" on public.booking_enquiries;
create policy "Admins can read all enquiries"
  on public.booking_enquiries
  for select
  to authenticated
  using (public.is_admin_email());

drop policy if exists "Admins can update enquiries" on public.booking_enquiries;
create policy "Admins can update enquiries"
  on public.booking_enquiries
  for update
  to authenticated
  using (public.is_admin_email())
  with check (public.is_admin_email());

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "Users can upsert own profile" on public.profiles;
create policy "Users can upsert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (id = auth.uid());
