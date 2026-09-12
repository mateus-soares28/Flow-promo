'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type PlanId = 'full' | 'pro' | 'annual';

export interface PlanDetails {
  id: PlanId;
  name: string;
  durationDays: number;
  price: string;
}

export const plans: PlanDetails[] = [
  { id: 'full', name: 'Full', durationDays: 30, price: 'R$ 49,90/mês' },
  { id: 'pro', name: 'Pro', durationDays: 90, price: 'R$ 119,90/trim.' },
  { id: 'annual', name: 'Anual', durationDays: 365, price: 'R$ 399,90/ano' },
];

interface AccountState {
  whatsappConnected: boolean;
  planId: PlanId;
  subscriptionStartedAt: string;
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
  connectWhatsApp: () => void;
  disconnectWhatsApp: () => void;
  selectPlan: (planId: PlanId) => void;
}

const STORAGE_KEY = 'flowpromos-account';
const defaultState: AccountState = {
  whatsappConnected: false,
  planId: 'full',
  subscriptionStartedAt: new Date().toISOString().slice(0, 10),
  offersDetected: 0,
  segmentsCount: 0,
  groupsCount: 0,
};

const AccountContext = createContext<AccountContextValue | null>(null);

function getInitialState(): AccountState {
  if (typeof window === 'undefined') return defaultState;

  try {
    const storedState = window.localStorage.getItem(STORAGE_KEY);
    return storedState ? { ...defaultState, ...JSON.parse(storedState) } : defaultState;
  } catch {
    return defaultState;
  }
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AccountState>(getInitialState);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  const value = useMemo(() => {
    const plan = plans.find((item) => item.id === state.planId) ?? plans[0];
    const startedAt = new Date(state.subscriptionStartedAt);
    const expiresAt = new Date(startedAt);
    expiresAt.setDate(expiresAt.getDate() + plan.durationDays);
    const millisecondsRemaining = expiresAt.getTime() - currentTime;
    const daysRemaining = Math.max(0, Math.ceil(millisecondsRemaining / 86400000));

    return {
      whatsappConnected: state.whatsappConnected,
      offersDetected: state.offersDetected,
      segmentsCount: state.segmentsCount,
      groupsCount: state.groupsCount,
      plan,
      daysRemaining,
      expiresAt,
      isExpired: daysRemaining === 0,
      connectWhatsApp: () => setState((current) => ({ ...current, whatsappConnected: true })),
      disconnectWhatsApp: () => setState((current) => ({ ...current, whatsappConnected: false })),
      selectPlan: (planId: PlanId) =>
        setState((current) => ({
          ...current,
          planId,
          subscriptionStartedAt: new Date().toISOString(),
        })),
    };
  }, [currentTime, state]);

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error('useAccount deve ser usado dentro de AccountProvider');
  return context;
}
