alter type public.subscription_status add value if not exists 'pending';

alter table public.subscriptions
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists stripe_checkout_session_id text;

create unique index if not exists subscriptions_stripe_checkout_session_idx
  on public.subscriptions (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

create unique index if not exists subscriptions_stripe_subscription_idx
  on public.subscriptions (stripe_subscription_id)
  where stripe_subscription_id is not null;

