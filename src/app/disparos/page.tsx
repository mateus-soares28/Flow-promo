'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, Lightbulb, Pin, Repeat, 
  Image as ImageIcon, RefreshCw, History, Plus
} from 'lucide-react';

import { SidebarItem } from '@/src/components/SidebarItem';
import { AccountStatus } from '@/src/components/AccountStatus';

type TabType = 'manual' | 'semiauto' | 'fixada';

export default function DisparosPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('manual');

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-[#fafafa] border-r border-gray-200 flex flex-col overflow-hidden shrink-0`}>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3 px-3">PAINEL</h3>
            <div className="space-y-1">
              <SidebarItem icon={<LayoutDashboard size={18} />} label="Visão Geral" />
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
              {/* Disparos ativo */}
              <SidebarItem icon={<Send size={18} />} label="Disparos" active />
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
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Cabeçalho da Página */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Disparos</h1>
              <p className="text-gray-500 mt-1 text-sm">
                Componha uma mensagem e envie pros seus grupos de WhatsApp e/ou canal do Telegram — na hora, agendada pra depois, ou de forma recorrente.
              </p>
              
              <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors mt-4">
                <Lightbulb size={16} className="text-yellow-500" />
                Como funciona
              </button>
            </div>

            {/* TABS (Botões de Navegação) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => setActiveTab('manual')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-medium text-sm transition-colors ${
                  activeTab === 'manual' 
                    ? 'border-purple-500 text-purple-700 bg-white shadow-sm' 
                    : 'border-transparent text-gray-600 hover:bg-gray-100 bg-white shadow-sm border-gray-200'
                }`}
              >
                <Send size={18} className={activeTab === 'manual' ? 'text-purple-600' : 'text-blue-500'} />
                Disparo manual
              </button>

              <button 
                onClick={() => setActiveTab('semiauto')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-medium text-sm transition-colors ${
                  activeTab === 'semiauto' 
                    ? 'border-purple-500 text-purple-700 bg-white shadow-sm' 
                    : 'border-transparent text-gray-600 hover:bg-gray-100 bg-white shadow-sm border-gray-200'
                }`}
              >
                <Repeat size={18} className="text-blue-500" />
                Disparo semi-automático
              </button>

              <button 
                onClick={() => setActiveTab('fixada')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-medium text-sm transition-colors ${
                  activeTab === 'fixada' 
                    ? 'border-purple-500 text-purple-700 bg-white shadow-sm' 
                    : 'border-transparent text-gray-600 hover:bg-gray-100 bg-white shadow-sm border-gray-200'
                }`}
              >
                <Pin size={18} className="text-red-500" />
                Mensagem Fixada
              </button>
            </div>

            {/* CONTEÚDO DAS ABAS */}
            <div className="pt-2">
              
              {/* --- ABA 1: DISPARO MANUAL --- */}
              {activeTab === 'manual' && (
                <div className="bg-white border-t-2 border-t-purple-500 border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
                  
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <span role="img" aria-label="pencil">📝</span> Mensagem
                    </label>
                    <textarea 
                      rows={5}
                      placeholder="Insira a mensagem que deseja enviar. Ela pode conter emojis, links e formatação. Exemplo: Olá, tudo bem? Eu estou usando *OfertaFlux*!"
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-gray-700"
                    ></textarea>
                    <div className="flex items-center justify-between mt-2">
                      <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 font-medium">
                        Mostrar preview da mensagem
                      </button>
                      <span className="text-xs text-gray-400">0 / 1000</span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <ImageIcon size={16} className="text-green-500" /> Anexar imagem (opcional)
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer">
                      <ImageIcon size={24} className="mb-2 text-gray-300" />
                      <span className="text-sm">Clique para escolher uma imagem</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Segmento de envio (opcional)</label>
                      <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>— Selecionar grupos manualmente —</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Conexões (opcional, filtra os grupos abaixo)</label>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200">conexão grupos</span>
                        <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200">Conexão 2</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Grupos</label>
                    {/* Lista de grupos viria aqui */}
                  </div>
                </div>
              )}

              {/* --- ABA 2: DISPARO SEMI-AUTOMÁTICO --- */}
              {activeTab === 'semiauto' && (
                <div className="space-y-8">
                  <button className="bg-gradient-to-r from-purple-500 to-teal-400 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:opacity-95 transition-opacity flex items-center gap-2">
                    <Plus size={18} />
                    Nova mensagem recorrente
                  </button>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Mensagens recorrentes configuradas</h3>
                    <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                      <div className="bg-blue-50 p-3 rounded-2xl mb-4">
                        <Repeat size={28} className="text-blue-500" />
                      </div>
                      <p className="text-gray-400 text-sm">Nenhuma mensagem recorrente configurada ainda.</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 border-t-2 border-t-teal-400 rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <span role="img" aria-label="scroll">📜</span> Histórico de Envios
                      </h3>
                      <button className="flex items-center gap-2 text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 font-medium">
                        <RefreshCw size={14} /> Atualizar
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">Nenhum envio registrado ainda.</p>
                  </div>
                </div>
              )}

              {/* --- ABA 3: MENSAGEM FIXADA --- */}
              {activeTab === 'fixada' && (
                <div className="space-y-8">
                  
                  <div className="bg-blue-50/50 border-l-4 border-blue-400 text-blue-900 p-4 rounded-r-xl text-sm leading-relaxed">
                    <span role="img" aria-label="pin" className="mr-1">📌</span> 
                    Não conseguimos fixar a mensagem de verdade no WhatsApp (o ícone de fixado no topo do chat) — isso só o <strong>administrador ou o criador do grupo</strong> consegue fazer manualmente. Mas o sistema reenvia essa mensagem automaticamente no intervalo escolhido, sempre marcando <strong>@todos</strong>, pra ela nunca se perder entre as outras.
                  </div>

                  <button className="bg-gradient-to-r from-purple-500 to-teal-400 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:opacity-95 transition-opacity flex items-center gap-2">
                    <Plus size={18} />
                    Nova mensagem fixada
                  </button>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Mensagens fixadas ativas</h3>
                    <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                      <div className="bg-red-50 p-3 rounded-2xl mb-4">
                        <Pin size={28} className="text-red-500" />
                      </div>
                      <p className="text-gray-400 text-sm">Nenhuma mensagem fixada ativa ainda.</p>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}