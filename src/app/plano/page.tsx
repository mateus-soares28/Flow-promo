'use client';

import { useState } from 'react';
import { Check, CreditCard, Zap } from 'lucide-react';
import { useAccount, plans, PlanId } from '@/src/components/AccountContext';
import { AccountStatus } from '@/src/components/AccountStatus';
import { SidebarItem } from '@/src/components/SidebarItem';

export default function PlanoPage() {
  const { plan: currentPlan, selectPlan } = useAccount();
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(currentPlan.id);

  function handleSelectPlan() {
    selectPlan(selectedPlan);
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-gray-900">
      <aside className="w-64 bg-[#fafafa] border-r border-gray-200 shrink-0">
        <div className="py-6 px-4 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3 px-3">PAINEL</h3>
            <SidebarItem icon={<Zap size={18} />} label="Visão Geral" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3 px-3">CONTA</h3>
            <SidebarItem icon={<CreditCard size={18} />} label="Plano" active />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="bg-black text-white p-1 rounded"><Zap size={18} /></div>
            FlowPromos
          </div>
          <AccountStatus />
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold">Escolha seu plano</h1>
            <p className="text-gray-500 mt-2">Selecione uma assinatura para continuar usando o FlowPromos.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              {plans.map((plan) => {
                const selected = selectedPlan === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`text-left bg-white rounded-xl border-2 p-6 transition-colors ${selected ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">{plan.name}</h2>
                      {selected && <Check size={20} />}
                    </div>
                    <p className="text-2xl font-bold mt-6">{plan.price}</p>
                    <p className="text-sm text-gray-500 mt-2">Acesso por {plan.durationDays} dias</p>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleSelectPlan}
              className="mt-8 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Ativar plano {plans.find((plan) => plan.id === selectedPlan)?.name}
            </button>

            <p className="text-sm text-gray-500 mt-4">Plano atual: <strong>{currentPlan.name}</strong>. A ativação reinicia a contagem de dias.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
