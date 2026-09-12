'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, Check, LockKeyhole, Mail, UserRound, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { plans, useAccount } from '@/src/components/AccountContext';
import { useAuth } from '@/src/components/AuthContext';

type AuthMode = 'login' | 'signup';

export default function AuthPage() {
  const router = useRouter();
  const { selectPlan } = useAccount();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (mode === 'login') {
      const message = login(email, password);
      if (message) {
        setError(message);
        return;
      }
    } else {
      const message = signup(name, email, password, selectedPlan, purchaseConfirmed);
      if (message) {
        setError(message);
        return;
      }
      selectPlan(selectedPlan as 'full' | 'pro' | 'annual');
    }

    router.replace('/');
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-[0.9fr_1.1fr] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <section className="bg-gray-900 text-white p-8 lg:p-12 flex flex-col justify-between min-h-[260px] lg:min-h-[620px]">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="bg-white text-gray-900 p-1 rounded"><Zap size={18} /></div>
              FlowPromos
            </div>
            <p className="text-gray-300 text-sm mt-10 max-w-xs">Controle suas ofertas, conexões e disparos em um só lugar.</p>
          </div>
          <div className="hidden lg:block text-sm text-gray-400">Acesso liberado após a confirmação do plano.</div>
        </section>

        <section className="p-8 lg:p-12">
          <div className="flex gap-6 border-b border-gray-200 mb-8">
            <button type="button" onClick={() => { setMode('login'); setError(''); }} className={`pb-3 text-sm font-semibold border-b-2 ${mode === 'login' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'}`}>Entrar</button>
            <button type="button" onClick={() => { setMode('signup'); setError(''); }} className={`pb-3 text-sm font-semibold border-b-2 ${mode === 'signup' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'}`}>Criar acesso</button>
          </div>

          <h1 className="text-2xl font-bold">{mode === 'login' ? 'Acesse seu painel' : 'Ative seu acesso'}</h1>
          <p className="text-gray-500 text-sm mt-2">{mode === 'login' ? 'Use os dados liberados após a compra do plano.' : 'Escolha o plano e crie o usuário para o teste.'}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {mode === 'signup' && <label className="block text-sm font-medium">Nome completo
              <span className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3"><UserRound size={17} className="text-gray-400" /><input required value={name} onChange={(event) => setName(event.target.value)} className="w-full py-3 outline-none" placeholder="Como podemos chamar você?" /></span>
            </label>}
            <label className="block text-sm font-medium">E-mail
              <span className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3"><Mail size={17} className="text-gray-400" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full py-3 outline-none" placeholder="voce@empresa.com" /></span>
            </label>
            <label className="block text-sm font-medium">Senha
              <span className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3"><LockKeyhole size={17} className="text-gray-400" /><input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full py-3 outline-none" placeholder="Mínimo de 6 caracteres" /></span>
            </label>

            {mode === 'signup' && <>
              <div>
                <p className="text-sm font-medium mb-2">Plano comprado</p>
                <div className="grid sm:grid-cols-3 gap-2">{plans.map((plan) => <button key={plan.id} type="button" onClick={() => setSelectedPlan(plan.id)} className={`text-left p-3 rounded-lg border text-sm ${selectedPlan === plan.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}><strong>{plan.name}</strong><span className="block text-xs text-gray-500 mt-1">{plan.durationDays} dias</span></button>)}</div>
              </div>
              <label className="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" checked={purchaseConfirmed} onChange={(event) => setPurchaseConfirmed(event.target.checked)} className="mt-1" /><span>Confirmo que a compra do plano foi aprovada.</span></label>
            </>}

            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">{error}</p>}
            <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800">{mode === 'login' ? 'Entrar no dashboard' : 'Criar acesso liberado'} <ArrowRight size={18} /></button>
          </form>

          {mode === 'signup' && <p className="text-xs text-gray-400 mt-6 flex gap-2"><Check size={15} /> Modo de teste: a confirmação da compra é simulada localmente.</p>}
        </section>
      </div>
    </main>
  );
}
