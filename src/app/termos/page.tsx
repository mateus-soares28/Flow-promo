import Link from 'next/link';

const sections = [
  ['1. Cadastro e conta', 'Para utilizar o FlowPromos, você deve ter 18 anos ou mais, fornecer dados verdadeiros, manter suas credenciais em sigilo e utilizar apenas uma conta ativa.'],
  ['2. Descrição do serviço', 'A plataforma oferece automação de ofertas, conversão de links de afiliados, integrações com marketplaces, WhatsApp e canais de comunicação, sempre sujeitas à disponibilidade das APIs de terceiros.'],
  ['3. Período de teste e assinatura', 'Os planos podem incluir 7 dias de teste e garantia de reembolso conforme a oferta apresentada no checkout. A assinatura é renovada de acordo com o ciclo escolhido até que seja cancelada pelo usuário.'],
  ['4. Uso aceitável', 'É proibido utilizar a plataforma para spam, fraude, conteúdo ilegal, violação de direitos de terceiros, compartilhamento de acesso ou tentativa de burlar limites e mecanismos de segurança.'],
  ['5. Plataformas de terceiros', 'Telegram, WhatsApp, marketplaces e processadores de pagamento possuem regras próprias. Restrições, indisponibilidades ou bloqueios aplicados por esses serviços estão fora do controle do FlowPromos.'],
  ['6. Responsabilidades', 'O usuário é responsável pelos dados fornecidos, pelo conteúdo publicado e pelo cumprimento das regras das plataformas integradas. O serviço é disponibilizado conforme sua disponibilidade técnica.'],
  ['7. Alterações e encerramento', 'Podemos atualizar estes termos e suspender contas que violem suas regras, forneçam dados falsos ou deixem de pagar a assinatura. Alterações relevantes serão comunicadas pelos canais cadastrados.'],
  ['8. Contato', 'Dúvidas sobre estes termos podem ser encaminhadas para suporte@flowpromos.com ou juridico@flowpromos.com.'],
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
        <Link href="/auth?mode=signup" className="text-sm font-medium text-emerald-600 hover:underline">Voltar para cadastro</Link>
        <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.2em]  text-slate-600">FlowPromos</p>
        <h1 className="mt-3 text-3xl font-bold">Termos de Uso</h1>
        <p className="mt-3 text-sm text-slate-500">Última atualização: 13 de setembro de 2026</p>
        <p className="mt-8 leading-7 text-slate-600">Estes termos regem o acesso e uso da plataforma FlowPromos. Ao criar uma conta ou utilizar nossos serviços, você declara que leu e concorda com as condições abaixo.</p>
        <div className="mt-10 space-y-8">{sections.map(([title, text]) => <section key={title}><h2 className="text-lg font-semibold">{title}</h2><p className="mt-2 leading-7 text-slate-600">{text}</p></section>)}</div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500"><Link href="/privacidade" className="text-emerald-600 hover:underline">Leia também a Política de Privacidade</Link></div>
      </article>
    </main>
  );
}