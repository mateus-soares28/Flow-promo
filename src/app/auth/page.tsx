'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CreditCard, Eye, EyeOff, LockKeyhole, Mail, Phone, ShieldCheck, UserRound, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { plans } from '@/src/components/AccountContext';
import { useAuth } from '@/src/components/AuthContext';
import { createSupabaseBrowserClient } from '@/src/lib/supabase/client';

type AuthMode = 'login' | 'signup' | 'forgot-password' | 'reset-password';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup, resetPassword, updatePassword } = useAuth();
  const [mode, setMode] = useState<AuthMode>(() => {
    const requestedMode = searchParams.get('mode');
    return requestedMode === 'reset-password' || requestedMode === 'signup' ? requestedMode : 'login';
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  const [signupStep, setSignupStep] = useState<'plan' | 'details'>('plan');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(() => searchParams.get('payment') === 'required' ? 'Seu pagamento ainda não foi confirmado. Conclua a assinatura para liberar o painel.' : '');
  const [success, setSuccess] = useState(() => searchParams.get('payment') === 'success' ? 'Pagamento recebido. Após a confirmação, entre para acessar seu painel.' : '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      createSupabaseBrowserClient().auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) setError(error.message);
        else setMode('reset-password');
      });
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const message = await login(email, password);
        if (message) {
          setError(message);
          return;
        }
        router.replace('/');
        return;
      }

      if (mode === 'signup') {
        if (signupStep === 'plan') {
          setSignupStep('details');
          return;
        }

        if (password !== passwordConfirmation) {
          setError('As senhas precisam ser iguais.');
          return;
        }
        if (!termsAccepted) {
          setError('Aceite os Termos de Uso e a Política de Privacidade para continuar.');
          return;
        }

        const message = await signup(name, email, password, selectedPlan, true);
        if (message) {
          setError(message);
          return;
        }

        const checkoutResponse = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId: selectedPlan }),
        });
        const checkout = await checkoutResponse.json() as { url?: string; error?: string };
        if (!checkoutResponse.ok || !checkout.url) {
          setError(checkout.error ?? 'Não foi possível abrir o pagamento.');
          return;
        }
        window.location.assign(checkout.url);
        return;
      }

      if (mode === 'forgot-password') {
        const message = await resetPassword(email);
        if (message) {
          setError(message);
          return;
        }
        setSuccess('Enviamos o link de recuperacao para seu e-mail.');
        return;
      }

      const message = await updatePassword(password);
      if (message) {
        setError(message);
        return;
      }
      setSuccess('Senha atualizada. Voce ja pode entrar.');
      setMode('login');
      setPassword('');
    } finally {
      setIsSubmitting(false);
    }
  }

  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';
  const isForgotPassword = mode === 'forgot-password';
  const isResetPassword = mode === 'reset-password';
  const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan) ?? plans[0];

  function switchToSignup() {
    setMode('signup');
    setSignupStep('plan');
    setError('');
    setSuccess('');
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-[0.92fr_1.08fr] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <section className="relative overflow-hidden bg-gray-900 text-white p-8 lg:p-12 flex flex-col justify-between min-h-65 lg:min-h-155">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-2xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-black text-white"><Zap size={20} /></div>
              Flow<span className="text-teal-400">Promos</span>
            </div>
            <div className="mt-16 max-w-sm lg:mt-24">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">Automação que acompanha seu ritmo</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight lg:text-4xl">Mais ofertas no ar. Menos trabalho repetitivo.</h2>
              <p className="mt-5 text-sm leading-6 text-slate-300">Centralize canais, grupos e campanhas em um painel criado para transformar oportunidades em vendas.</p>
            </div>
          </div>
          <div className="relative z-10 mt-12 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-semibold text-teal-300">7 dias</p><p className="mt-1 text-gray-400">de garantia</p></div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="text-2xl font-semibold text-teal-300">24/7</p><p className="mt-1 text-gray-400">automação ativa</p></div>
          </div>
        </section>

        <section className="p-6 sm:p-9 lg:p-14">
          <div className="mb-9 flex gap-7 border-b border-slate-200">
            <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess(''); }} className={`pb-3 text-sm font-semibold border-b-2 ${isLogin ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'}`}>Entrar</button>
            <button type="button" onClick={switchToSignup} className={`pb-3 text-sm font-semibold border-b-2 ${isSignup ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'}`}>Criar acesso</button>
          </div>

          <div className="max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            {isLogin && 'Acesse seu painel'}
            {isSignup && (signupStep === 'plan' ? 'Escolha seu plano' : 'Crie sua conta')}
            {isForgotPassword && 'Recupere sua senha'}
            {isResetPassword && 'Crie uma nova senha'}
          </h1>
          <p className="text-slate-500 text-sm mt-3">
            {isLogin && 'Entre com seu e-mail e senha.'}
            {isSignup && (signupStep === 'plan' ? 'Comece com 7 dias de garantia e cancele quando quiser.' : 'Preencha seus dados para ativar seu acesso.')}
            {isForgotPassword && 'Receba um link seguro para redefinir a senha.'}
            {isResetPassword && 'Digite sua nova senha para concluir a recuperacao.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-5">
            {isSignup && signupStep === 'details' && <label className="block text-sm font-medium">Nome completo
              <span className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3"><UserRound size={17} className="text-gray-400" /><input required value={name} onChange={(event) => setName(event.target.value)} className="w-full py-3 outline-none" placeholder="Como podemos chamar voce?" /></span>
            </label>}
            {(!isSignup || signupStep === 'details') && !isResetPassword && <label className="block text-sm font-medium">E-mail
              <span className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3"><Mail size={17} className="text-gray-400" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full py-3 outline-none" placeholder="voce@empresa.com" /></span>
            </label>}
            {!isForgotPassword && (!isSignup || signupStep === 'details') && <label className="block text-sm font-medium">Senha
              <span className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3"><LockKeyhole size={17} className="text-gray-400" /><input required type={passwordVisible ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full py-3 outline-none" placeholder="Minimo de 6 caracteres" /><button type="button" onClick={() => setPasswordVisible((visible) => !visible)} aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'} className="text-gray-400 hover:text-gray-700">{passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}</button></span>
            </label>}

            {isSignup && signupStep === 'plan' && <div>
              <div className="grid sm:grid-cols-3 gap-3">{plans.map((plan) => <button key={plan.id} type="button" onClick={() => setSelectedPlan(plan.id)} className={`text-left p-4 rounded-xl border transition-colors ${selectedPlan === plan.id ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500' : 'border-gray-200 bg-white hover:border-gray-400'}`}><strong>{plan.name}</strong><span className="block text-lg font-bold mt-3">{plan.price}</span><span className="block text-xs text-gray-500 mt-1">Acesso por {plan.durationDays} dias</span></button>)}</div>
            </div>}

            {isSignup && signupStep === 'details' && <>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block text-sm font-medium">CPF
                  <span className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3"><CreditCard size={17} className="text-gray-400" /><input required value={cpf} onChange={(event) => setCpf(event.target.value)} className="w-full py-3 outline-none" placeholder="000.000.000-00" /></span>
                </label>
                <label className="block text-sm font-medium">Celular / WhatsApp
                  <span className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3"><Phone size={17} className="text-gray-400" /><input required value={phone} onChange={(event) => setPhone(event.target.value)} className="w-full py-3 outline-none" placeholder="(00) 00000-0000" /></span>
                </label>
              </div>
              <label className="block text-sm font-medium">Confirmar senha
                <span className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3"><LockKeyhole size={17} className="text-gray-400" /><input required type={passwordConfirmationVisible ? 'text' : 'password'} value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} className="w-full py-3 outline-none" placeholder="Repita a senha" /><button type="button" onClick={() => setPasswordConfirmationVisible((visible) => !visible)} aria-label={passwordConfirmationVisible ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'} className="text-gray-400 hover:text-gray-700">{passwordConfirmationVisible ? <EyeOff size={18} /> : <Eye size={18} />}</button></span>
              </label>
              <div className="rounded-xl bg-slate-900 text-white p-4 flex items-center justify-between"><div><p className="text-xs text-slate-300">Plano selecionado</p><strong>{selectedPlanDetails.name}</strong></div><strong>{selectedPlanDetails.price}</strong></div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600"><CreditCard size={19} className="text-teal-600" /><span>O pagamento será processado com segurança pelo Stripe. Os dados do cartão não passam pelo FluxoPromos.</span></div>
              <label className="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} className="mt-1" /><span>Li e concordo com os <Link href="/termos" target="_blank" className="text-teal-600 underline">Termos de Uso</Link> e a <Link href="/privacidade" target="_blank" className="text-teal-600 underline">Política de Privacidade</Link>.</span></label>
              <p className="flex items-center gap-2 text-xs text-gray-500"><ShieldCheck size={16} className="text-teal-600" /> 7 dias de garantia e cancelamento direto pelo painel.</p>
            </>}

            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">{error}</p>}
            {success && <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">{success}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-60">
              {isLogin && 'Entrar no dashboard'}
              {isSignup && (signupStep === 'plan' ? 'Continuar' : 'Continuar para pagamento')}
              {isForgotPassword && 'Enviar link seguro'}
              {isResetPassword && 'Atualizar senha'}
              <ArrowRight size={18} />
            </button>
          </form>

          {isLogin && <button type="button" onClick={() => { setMode('forgot-password'); setError(''); setSuccess(''); }} className="text-sm text-gray-500 underline mt-5">Esqueci minha senha</button>}
          {isForgotPassword && <button type="button" onClick={() => { setMode('login'); setError(''); setSuccess(''); }} className="text-sm text-gray-500 underline mt-5">Voltar para login</button>}
          {isSignup && signupStep === 'details' && <button type="button" onClick={() => { setSignupStep('plan'); setError(''); }} className="text-sm text-gray-500 underline mt-5 flex items-center gap-1"><ArrowLeft size={15} /> Voltar para planos</button>}
          {isSignup && <p className="text-xs text-gray-400 mt-6 flex gap-2"><Check size={15} /> Pagamento protegido. O acesso é liberado após a confirmação.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
