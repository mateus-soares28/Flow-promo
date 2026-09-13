'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createSupabaseBrowserClient } from '@/src/lib/supabase/client';
import { useAuth } from './AuthContext';

export type PlanId = 'full' | 'pro' | 'annual';

export interface PlanDetails {
  id: PlanId;
  name: string;
  durationDays: number;
  price: string;
}

export const plans: PlanDetails[] = [
  { id: 'full', name: 'Full', durationDays: 30, price: 'R$ 49,90/mes' },
  { id: 'pro', name: 'Pro', durationDays: 90, price: 'R$ 119,90/trim.' },
  { id: 'annual', name: 'Anual', durationDays: 365, price: 'R$ 399,90/ano' },
];

interface AccountState {
  whatsappConnected: boolean;
  planId: PlanId;
  subscriptionStartedAt: string;
  subscriptionExpiresAt: string;
  offersDetected: number;
  segmentsCount: number;
  groupsCount: number;
}

interface AccountContextValue {
  whatsappConnected: boolean;
  offersDetected: number;
  segmentsCount: number;
  groupsCount: number;
  plan: PlanDetails;
  daysRemaining: number;
  expiresAt: Date;
  isExpired: boolean;
  refreshAccount: () => Promise<void>;
  saveWhatsAppConnection: (name: string) => Promise<string | null>;
  connectWhatsApp: () => Promise<void>;
  disconnectWhatsApp: () => Promise<void>;
  selectPlan: (planId: PlanId) => Promise<void>;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

const initialStartedAt = new Date().toISOString();
const defaultState: AccountState = {
  whatsappConnected: false,
  planId: 'full',
  subscriptionStartedAt: initialStartedAt,
  subscriptionExpiresAt: addDays(new Date(initialStartedAt), plans[0].durationDays).toISOString(),
  offersDetected: 0,
  segmentsCount: 0,
  groupsCount: 0,
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const { user } = useAuth();
  const [state, setState] = useState<AccountState>(defaultState);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  const refreshAccount = useCallback(async () => {
    if (!user) {
      setState(defaultState);
      return;
    }

    const [subscriptionResult, whatsappResult, groupsResult, offersResult] = await Promise.all([
      supabase
        .from('subscriptions')
        .select('plan_id, started_at, expires_at, status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('whatsapp_connections')
        .select('status')
        .eq('user_id', user.id)
        .eq('is_backup', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase.from('groups').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('offers').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ]);

    const fallbackPlan = plans.find((plan) => plan.id === user.planId) ?? plans[0];
    const fallbackStartedAt = new Date().toISOString();
    const subscription = subscriptionResult.data;

    setState({
      whatsappConnected: whatsappResult.data?.status === 'connected',
      planId: (subscription?.plan_id ?? fallbackPlan.id) as PlanId,
      subscriptionStartedAt: subscription?.started_at ?? fallbackStartedAt,
      subscriptionExpiresAt: subscription?.expires_at ?? addDays(new Date(fallbackStartedAt), fallbackPlan.durationDays).toISOString(),
      offersDetected: offersResult.count ?? 0,
      segmentsCount: 0,
      groupsCount: groupsResult.count ?? 0,
    });
  }, [supabase, user]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void refreshAccount();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [refreshAccount]);

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  const value = useMemo<AccountContextValue>(() => {
    const plan = plans.find((item) => item.id === state.planId) ?? plans[0];
    const expiresAt = new Date(state.subscriptionExpiresAt);
    const millisecondsRemaining = expiresAt.getTime() - currentTime;
    const daysRemaining = Math.max(0, Math.ceil(millisecondsRemaining / 86400000));

    async function upsertWhatsApp(status: 'connected' | 'disconnected', name = 'Principal') {
      if (!user) return;

      await supabase.from('whatsapp_connections').upsert(
        {
          user_id: user.id,
          name,
          instance_name: name,
          status,
          is_backup: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,is_backup' },
      );

      setState((current) => ({ ...current, whatsappConnected: status === 'connected' }));
    }

    return {
      whatsappConnected: state.whatsappConnected,
      offersDetected: state.offersDetected,
      segmentsCount: state.segmentsCount,
      groupsCount: state.groupsCount,
      plan,
      daysRemaining,
      expiresAt,
      isExpired: daysRemaining === 0,
      refreshAccount,
      saveWhatsAppConnection: async (name: string) => {
        const trimmedName = name.trim();
        if (!user) return 'Sessao expirada. Entre novamente.';
        if (!trimmedName) return 'Digite um nome para salvar a conexao.';

        const { error } = await supabase.from('whatsapp_connections').upsert(
          {
            user_id: user.id,
            name: trimmedName,
            instance_name: trimmedName,
            status: state.whatsappConnected ? 'connected' : 'pending',
            is_backup: false,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,is_backup' },
        );

        return error ? error.message : null;
      },
      connectWhatsApp: async () => upsertWhatsApp('connected'),
      disconnectWhatsApp: async () => upsertWhatsApp('disconnected'),
      selectPlan: async (planId: PlanId) => {
        if (!user) return;

        const selectedPlan = plans.find((item) => item.id === planId) ?? plans[0];
        const startedAt = new Date();
        const expiresAt = addDays(startedAt, selectedPlan.durationDays);

        await supabase.from('subscriptions').insert({
          user_id: user.id,
          plan_id: planId,
          status: 'active',
          started_at: startedAt.toISOString(),
          expires_at: expiresAt.toISOString(),
        });

        setState((current) => ({
          ...current,
          planId,
          subscriptionStartedAt: startedAt.toISOString(),
          subscriptionExpiresAt: expiresAt.toISOString(),
        }));
      },
    };
  }, [currentTime, refreshAccount, state, supabase, user]);

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error('useAccount deve ser usado dentro de AccountProvider');
  return context;
}
