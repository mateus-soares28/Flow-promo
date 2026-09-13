import Link from 'next/link';

const sections = [
  ['1. Dados coletados', 'Podemos coletar nome, e-mail, telefone, CPF, dados de uso, configurações da automação, registros de acesso e informações de consentimento. Dados de cartão são processados pelo provedor de pagamento.'],
  ['2. Como usamos os dados', 'Usamos os dados para criar e proteger sua conta, prestar o serviço, processar pagamentos, enviar comunicações transacionais, oferecer suporte, prevenir fraudes e cumprir obrigações legais.'],
  ['3. Base legal', 'O tratamento pode se apoiar na execução do contrato, no cumprimento de obrigações legais, no consentimento e no legítimo interesse para segurança, prevenção de fraude e relacionamento com o cliente.'],
  ['4. Compartilhamento', 'Compartilhamos apenas o necessário com provedores de hospedagem, pagamento, mensageria, segurança, análise, Telegram e demais serviços indispensáveis à operação. Não vendemos dados pessoais para marketing.'],
  ['5. Segurança e retenção', 'Adotamos controles técnicos e organizacionais para proteger os dados. As informações são mantidas pelo período necessário à prestação do serviço e às obrigações legais, e depois eliminadas ou anonimizadas quando aplicável.'],
  ['6. Seus direitos', 'Você pode solicitar confirmação, acesso, correção, eliminação, portabilidade, revogação de consentimento e revisão de decisões automatizadas, conforme a LGPD.'],
  ['7. Cookies e comunicações', 'Utilizamos cookies essenciais e, quando aplicável, cookies de preferência e análise. O telefone informado pode receber mensagens de onboarding, suporte e cobrança; comunicações de marketing podem ser interrompidas mediante solicitação.'],
  ['8. Contato', 'Para exercer seus direitos ou tirar dúvidas, escreva para privacidade@flowpromos.com ou suporte@flowpromos.com.'],
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
        <Link href="/auth?mode=signup" className="text-sm font-medium text-emerald-600 hover:underline">Voltar para cadastro</Link>
        <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.2em]  text-slate-600">FlowPromos</p>
        <h1 className="mt-3 text-3xl font-bold">Política de Privacidade</h1>
        <p className="mt-3 text-sm text-slate-500">Última atualização: 13 de setembro de 2026</p>
        <p className="mt-8 leading-7 text-slate-600">Esta política explica como coletamos, usamos, armazenamos e protegemos dados pessoais quando você utiliza a plataforma FlowPromos, em conformidade com a LGPD.</p>
        <div className="mt-10 space-y-8">{sections.map(([title, text]) => <section key={title}><h2 className="text-lg font-semibold">{title}</h2><p className="mt-2 leading-7 text-slate-600">{text}</p></section>)}</div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500"><Link href="/termos" className="text-emerald-600 hover:underline">Leia também os Termos de Uso</Link></div>
      </article>
    </main>
  );
}