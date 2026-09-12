'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, Lightbulb, Search
} from 'lucide-react';

import { SidebarItem } from '@/src/components/SidebarItem';

export default function OfertasPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'ofertas' | 'cupons'>('ofertas');

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-[#fafafa] border-r border-gray-200 flex flex-col overflow-hidden`}>
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
              {/* Ofertas agora está ativo */}
              <SidebarItem icon={<Tag size={18} />} label="Ofertas" active />
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
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full text-xs font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
              Desconectado
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-gray-900 text-white rounded-full text-xs font-medium">
              ⌛ 12 dias restantes
            </span>
          </div>
        </header>

        {/* CONTEÚDO DA PÁGINA OFERTAS */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Cabeçalho */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ofertas</h1>
              <p className="text-gray-500 mt-1">
                Ofertas capturadas por clonagem ou busca. Envie para seus grupos ou reenvie manualmente.
              </p>
            </div>

            {/* Como funciona */}
            <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors pt-2">
              <Lightbulb size={16} className="text-yellow-500" />
              Como funciona
            </button>

            {/* Tabs de Navegação */}
            <div className="flex items-center gap-4 pt-2 border-b border-gray-100 pb-6">
              <button 
                onClick={() => setActiveTab('ofertas')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium shadow-sm border transition-colors ${
                  activeTab === 'ofertas' 
                    ? 'bg-white border-purple-300 text-purple-700' 
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Tag size={18} className={activeTab === 'ofertas' ? 'text-yellow-500' : 'text-gray-400'} />
                Ofertas
              </button>
              
              <button 
                onClick={() => setActiveTab('cupons')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium shadow-sm border transition-colors ${
                  activeTab === 'cupons' 
                    ? 'bg-white border-purple-300 text-purple-700' 
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Ticket size={18} className={activeTab === 'cupons' ? 'text-pink-500' : 'text-gray-400'} />
                Cupons Ativos
              </button>
            </div>

            {/* ABA: OFERTAS */}
            {activeTab === 'ofertas' && (
              <div className="space-y-6">
                {/* Card de Busca (com borda superior verde-água) */}
                <div className="bg-white rounded-xl border border-gray-200 border-t-4 border-t-teal-400 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Search size={18} className="text-blue-500" />
                    <h3 className="font-semibold text-gray-800 text-sm">Buscar ofertas no Mercado Livre</h3>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <input 
                      type="text" 
                      placeholder="Ex: notebook, tênis nike..." 
                      className="w-full flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                    <select className="w-full md:w-auto px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[200px]">
                      <option value="">Sem segmento</option>
                    </select>
                    <button className="w-full md:w-auto bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-sm">
                      Buscar
                    </button>
                  </div>
                </div>

                <p className="text-gray-400 text-sm">Carregando ofertas...</p>
              </div>
            )}

            {/* ABA: CUPONS ATIVOS */}
            {activeTab === 'cupons' && (
              <div className="bg-[#fafafa] rounded-2xl border-2 border-dashed border-gray-200 p-16 flex flex-col items-center justify-center gap-4 text-center mt-4">
                <Ticket size={40} className="text-pink-500" />
                <p className="text-gray-400 text-sm max-w-md">
                  Nenhum cupom ativo no momento. Cupons capturados das ofertas clonadas aparecem aqui por 24h.
                </p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}