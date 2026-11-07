-- Draft foundation. Apply only to a fresh development Supabase project.
-- No client access until reviewed read/write policies are added and tested.
begin;
create table public.areas (
 id uuid primary key default gen_random_uuid(),
 name text not null check(length(trim(name)) between 1 and 120),
 state text not null default 'Maharashtra' check(state = 'Maharashtra'),
 published boolean not null default false
);
create table public.vendors (
 id uuid primary key default gen_random_uuid(),
 area_id uuid not null references public.areas(id),
 name text not null check(length(trim(name)) between 1 and 120),
 landmark text check(length(landmark)<=300),
 latitude double precision check(latitude between -90 and 90),
 longitude double precision check(longitude between -180 and 180),
 location_consented_at timestamptz,
 published boolean not null default false,
 sharing boolean not null default false,
 created_at timestamptz not null default now(),
 check((latitude is null) = (longitude is null)),
 check(not sharing or (latitude is not null and location_consented_at is not null))
);
create table public.offerings (
 id uuid primary key default gen_random_uuid(),
 vendor_id uuid not null references public.vendors(id),
 name text not null check(length(trim(name)) between 1 and 120),
 category text not null check(category in ('snacks','chai','breakfast','meals')),
 price_inr numeric(10,2) check(price_inr >= 0),
 sold_out boolean not null default false,
 updated_at timestamptz not null default now()
);
create table public.selling_sessions (
 id uuid primary key default gen_random_uuid(),
 vendor_id uuid not null references public.vendors(id),
 confirmed_at timestamptz not null default now(),
 ends_at timestamptz not null,
 expires_at timestamptz not null,
 ended_at timestamptz,
 check(ends_at > confirmed_at),
 check(expires_at > confirmed_at and expires_at <= ends_at),
 check(expires_at <= confirmed_at + interval '2 hours'),
 check(ended_at is null or ended_at >= confirmed_at)
);
create index vendors_area_idx on public.vendors(area_id);
create index offerings_vendor_idx on public.offerings(vendor_id);
create index sessions_vendor_expiry_idx on public.selling_sessions(vendor_id,expires_at);
alter table public.areas enable row level security;
alter table public.vendors enable row level security;
alter table public.offerings enable row level security;
alter table public.selling_sessions enable row level security;
revoke all on public.areas,public.vendors,public.offerings,public.selling_sessions from anon,authenticated;
comment on table public.vendors is 'Public business fields only. No private home address, account identity or phone number.';
commit;
