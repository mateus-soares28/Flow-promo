create extension if not exists "pgcrypto";

create type public.app_role as enum ('user', 'admin');
create type public.subscription_status as enum ('active', 'expired', 'canceled');
create type public.whatsapp_connection_status as enum ('connected', 'disconnected', 'pending');
create type public.dispatch_status as enum ('scheduled', 'sent', 'failed', 'canceled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.plans (
  id text primary key,
  name text not null,
  duration_days integer not null check (duration_days > 0),
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'BRL',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint plans_known_ids check (id in ('full', 'pro', 'annual'))
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null references public.plans(id),
  status public.subscription_status not null default 'active',
  started_at timestamptz not null default now(),
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscriptions_valid_period check (expires_at > started_at)
);

create table public.whatsapp_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  instance_name text,
  status public.whatsapp_connection_status not null default 'pending',
  is_backup boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index whatsapp_connections_one_primary_per_user
  on public.whatsapp_connections (user_id, is_backup);

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  external_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text,
  price_cents integer check (price_cents is null or price_cents >= 0),
  marketplace text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.dispatches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  offer_id uuid references public.offers(id) on delete set null,
  group_id uuid references public.groups(id) on delete set null,
  status public.dispatch_status not null default 'scheduled',
  scheduled_at timestamptz,
  sent_at timestamptz,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.plans (id, name, duration_days, price_cents)
values
  ('full', 'Full', 30, 4990),
  ('pro', 'Pro', 90, 11990),
  ('annual', 'Anual', 365, 39990)
on conflict (id) do update set
  name = excluded.name,
  duration_days = excluded.duration_days,
  price_cents = excluded.price_cents,
  is_active = true;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

create trigger whatsapp_connections_set_updated_at
before update on public.whatsapp_connections
for each row execute function public.set_updated_at();

create trigger groups_set_updated_at
before update on public.groups
for each row execute function public.set_updated_at();

create trigger offers_set_updated_at
before update on public.offers
for each row execute function public.set_updated_at();

create trigger dispatches_set_updated_at
before update on public.dispatches
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_plan text := coalesce(new.raw_user_meta_data ->> 'plan_id', 'full');
  plan_days integer;
begin
  if requested_plan not in ('full', 'pro', 'annual') then
    requested_plan := 'full';
  end if;

  select duration_days into plan_days from public.plans where id = requested_plan;

  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)),
    new.email
  );

  insert into public.subscriptions (user_id, plan_id, started_at, expires_at)
  values (new.id, requested_plan, now(), now() + make_interval(days => coalesce(plan_days, 30)));

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.whatsapp_connections enable row level security;
alter table public.groups enable row level security;
alter table public.offers enable row level security;
alter table public.dispatches enable row level security;

create policy "Plans are readable"
on public.plans for select
using (is_active = true);

create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy "Users can read own subscriptions"
on public.subscriptions for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can insert own subscriptions"
on public.subscriptions for insert
to authenticated
with check (user_id = auth.uid() or public.is_admin());

create policy "Users can update own subscriptions"
on public.subscriptions for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "Users can read own whatsapp connections"
on public.whatsapp_connections for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can insert own whatsapp connections"
on public.whatsapp_connections for insert
to authenticated
with check (user_id = auth.uid() or public.is_admin());

create policy "Users can update own whatsapp connections"
on public.whatsapp_connections for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "Users can delete own whatsapp connections"
on public.whatsapp_connections for delete
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can read own groups"
on public.groups for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can insert own groups"
on public.groups for insert
to authenticated
with check (user_id = auth.uid() or public.is_admin());

create policy "Users can update own groups"
on public.groups for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "Users can delete own groups"
on public.groups for delete
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can read own offers"
on public.offers for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can insert own offers"
on public.offers for insert
to authenticated
with check (user_id = auth.uid() or public.is_admin());

create policy "Users can update own offers"
on public.offers for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

create policy "Users can delete own offers"
on public.offers for delete
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can read own dispatches"
on public.dispatches for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can insert own dispatches"
on public.dispatches for insert
to authenticated
with check (
  (user_id = auth.uid() or public.is_admin())
  and (dispatches.offer_id is null or exists (select 1 from public.offers where offers.id = dispatches.offer_id and (offers.user_id = auth.uid() or public.is_admin())))
  and (dispatches.group_id is null or exists (select 1 from public.groups where groups.id = dispatches.group_id and (groups.user_id = auth.uid() or public.is_admin())))
);

create policy "Users can update own dispatches"
on public.dispatches for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (
  (user_id = auth.uid() or public.is_admin())
  and (dispatches.offer_id is null or exists (select 1 from public.offers where offers.id = dispatches.offer_id and (offers.user_id = auth.uid() or public.is_admin())))
  and (dispatches.group_id is null or exists (select 1 from public.groups where groups.id = dispatches.group_id and (groups.user_id = auth.uid() or public.is_admin())))
);

create policy "Users can delete own dispatches"
on public.dispatches for delete
to authenticated
using (user_id = auth.uid() or public.is_admin());

grant usage on schema public to anon, authenticated;
grant select on public.plans to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update on public.subscriptions to authenticated;
grant select, insert, update, delete on public.whatsapp_connections to authenticated;
grant select, insert, update, delete on public.groups to authenticated;
grant select, insert, update, delete on public.offers to authenticated;
grant select, insert, update, delete on public.dispatches to authenticated;
grant execute on function public.is_admin() to authenticated;
