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

  insert into public.subscriptions (user_id, plan_id, status, started_at, expires_at)
  values (new.id, requested_plan, 'pending', now(), now() + make_interval(days => coalesce(plan_days, 30)));

  return new;
end;
$$;