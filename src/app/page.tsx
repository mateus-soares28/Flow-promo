'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, ArrowRight
} from 'lucide-react';

// Importando nossos componentes separados
import { SidebarItem } from '../components/SidebarItem';
import { StatusCard } from '../components/StatusCard';
import { TaskItem } from '../components/TaskItem';
import { AccountStatus } from '../components/AccountStatus';
import { useAccount } from '../components/AccountContext';

export default function DashboardPage() {
  const userName = "Mateus";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const { whatsappConnected, plan, daysRemaining, expiresAt, isExpired, offersDetected, segmentsCount, groupsCount } = useAccount();

  useEffect(() => {
    if (isExpired) router.replace('/plano');
  }, [isExpired, router]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-[#fafafa] border-r border-gray-200 flex flex-col overflow-hidden`}>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          
          <div>
            <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3 px-3">PAINEL</h3>
            <div className="space-y-1">
              <SidebarItem icon={<LayoutDashboard size={18} />} label="Visão Geral" active />
              <SidebarItem icon={<PlayCircle size={18} />} label="Tutorial" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3 px-3">OPERAÇÃO</h3>
            <div className="space-y-1">
              <SidebarItem icon={<MessageSquare size={18} />} label="WhatsApp" />
              <SidebarItem icon={<Layers size={18} />} label="Segmentos" />
              <SidebarItem icon={<Users size={18} />} label="Grupos" />
              <SidebarItem icon={<Tag size={18} />} label="Ofertas" />
              <SidebarItem icon={<Activity size={18} />} label="Monitoramento" />
              <SidebarItem icon={<Send size={18} />} label="Disparos" />
              <SidebarItem icon={<Ticket size={18} />} label="Cupons" />
              <SidebarItem icon={<MessageCircle size={18} />} label="Mensagens" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3 px-3">CONTA</h3>
            <div className="space-y-1">
              <SidebarItem icon={<DollarSign size={18} />} label="Faturamento" />
              <SidebarItem icon={<Plug size={18} />} label="Integrações" />
              <SidebarItem icon={<CreditCard size={18} />} label="Plano" />
            </div>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-black">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="bg-black text-white p-1 rounded">
                <Zap size={18} />
              </div>
              FlowPromos
            </div>
          </div>
          <AccountStatus />
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div>
              <h1 className="text-3xl font-bold mb-2">Olá, {userName}</h1>
              <p className="text-gray-500">Aqui está o resumo da sua conta FlowPromos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatusCard icon={<MessageSquare size={16}/>} title="WHATSAPP" value={whatsappConnected ? "Ativo" : "Desconectado"} valueColor={whatsappConnected ? "text-green-600" : "text-red-600"} subtitle={whatsappConnected ? "Conexão funcionando" : "Clique para conectar"} href={whatsappConnected ? undefined : "/whatsapp"} />
              <StatusCard icon={<CreditCard size={16}/>} title="PLANO ATUAL" value={plan.name} subtitle={isExpired ? "Status: Expirado" : "Status: Ativo"} />
              <StatusCard icon={<Activity size={16}/>} title="DIAS RESTANTES" value={daysRemaining} subtitle={`Vence em ${expiresAt.toLocaleDateString('pt-BR')}`} />
              <StatusCard icon={<Tag size={16}/>} title="OFERTAS DETECTADAS" value={offersDetected} subtitle="Total no período" href="/ofertas" />
              <StatusCard icon={<Layers size={16}/>} title="SEGMENTOS" value={segmentsCount} subtitle="Configurados" />
              <StatusCard icon={<Users size={16}/>} title="GRUPOS" value={groupsCount} subtitle="Recebendo ofertas" href="/grupos" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Card Primeiros Passos */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Primeiros passos</h2>
                  <span className="text-sm text-gray-500">{whatsappConnected ? '1 de 5' : '0 de 5'} concluídos</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
                  <div className="bg-gray-900 h-1.5 rounded-full transition-all" style={{ width: whatsappConnected ? '20%' : '0%' }}></div>
                </div>

                <div className="space-y-5 flex-1">
                  <TaskItem title="Assista o tutorial completo" subtitle="6 vídeos curtos sobre cada área do painel" completed={false} />
                  <TaskItem title="Conecte seu WhatsApp" subtitle="Leia o QR Code para ativar os disparos" completed={whatsappConnected} />
                  <TaskItem title="Conecte um marketplace" subtitle="Mercado Livre, Amazon ou Shopee" completed={false} />
                  <TaskItem title="Crie seu primeiro grupo de destino" subtitle="Escolha o grupo que vai receber as ofertas" completed={false} />
                  <TaskItem title="Monte sua primeira busca por palavra-chave" subtitle='Ex: nicho "Ferramentas" + palavra "Furadeira"' completed={false} />
                </div>

                {!whatsappConnected && <button onClick={() => router.push('/whatsapp')} className="mt-6 bg-gray-900 text-white flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors self-start">
                  Conectar WhatsApp <ArrowRight size={18} />
                </button>}
              </div>

              {/* Card Próximos Disparos */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-lg">Próximos disparos</h2>
                  <a href="/disparos" className="text-sm text-gray-900 underline hover:text-gray-600 font-medium">ver fila</a>
                </div>

                <div className="min-h-40 flex items-center justify-center text-center text-sm text-gray-500">
                  Nenhum disparo agendado no momento.
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}