import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getStripeClient } from '@/src/lib/stripe';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Configure as credenciais administrativas do Supabase.');
  return createClient(url, key);
}

export async function POST(request: Request) {
  const signature = (await headers()).get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return NextResponse.json({ error: 'Webhook Stripe não configurado.' }, { status: 400 });

  try {
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const planId = session.metadata?.plan_id;
    if (event.type === 'checkout.session.completed' && userId && planId) {
      const supabase = getAdminClient();
      const durationDays = planId === 'annual' ? 365 : planId === 'pro' ? 90 : 30;
      const { error: subscriptionError } = await supabase.from('subscriptions').update({
        status: 'active',
        plan_id: planId,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
        stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
        expires_at: new Date(Date.now() + durationDays * 86400000).toISOString(),
      }).eq('user_id', userId).eq('stripe_checkout_session_id', session.id);
      if (subscriptionError) throw subscriptionError;
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Assinatura inválida.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}