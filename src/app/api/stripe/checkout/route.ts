import { NextResponse } from 'next/server';
import { plans } from '@/src/components/AccountContext';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { getStripeClient } from '@/src/lib/stripe';

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return NextResponse.json({ error: 'Sessão expirada. Entre novamente.' }, { status: 401 });

    const body = await request.json() as { planId?: string };
    const plan = plans.find((item) => item.id === body.planId) ?? plans[0];
    const stripe = getStripeClient();
    const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      payment_method_collection: 'always',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'brl',
          unit_amount: Math.round(Number(plan.price.replace(/[^0-9,]/g, '').replace(',', '.')) * 100),
          recurring: { interval: plan.id === 'annual' ? 'year' : plan.id === 'pro' ? 'month' : 'month', interval_count: plan.id === 'pro' ? 3 : 1 },
          product_data: { name: `FluxoPromos ${plan.name}` },
        },
      }],
      subscription_data: {
        trial_period_days: 7,
        metadata: { user_id: user.id, plan_id: plan.id },
      },
      metadata: { user_id: user.id, plan_id: plan.id },
      success_url: `${origin}/auth?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/auth?mode=signup&checkout=canceled`,
    });

    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .update({ stripe_checkout_session_id: session.id, plan_id: plan.id })
      .eq('user_id', user.id)
      .eq('status', 'pending');
    if (subscriptionError) throw subscriptionError;
    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Não foi possível iniciar o pagamento.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}