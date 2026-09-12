'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, Lightbulb, ShoppingBag, 
  Clock, Package, ShoppingCart, TrendingUp
} from 'lucide-react';

import { SidebarItem } from '@/src/components/SidebarItem';

export default function FaturamentoPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
              <SidebarItem icon={<Send size={18} />} label="Disparos" />
              <SidebarItem icon={<Ticket size={18} />} label="Cupons" />
              <SidebarItem icon={<MessageCircle size={18} />} label="Mensagens" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3 px-3">CONTA</h3>
            <div className="space-y-1">
              {/* Faturamento Ativo */}
              <SidebarItem icon={<DollarSign size={18} />} label="Faturamento" active />
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

        {/* CONTEÚDO */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* Cabeçalho da Página */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Faturamento</h1>
                <p className="text-gray-500 mt-1 text-sm">
                  Comissão confirmada por venda real e volume de atividade, mês a mês.
                </p>
              </div>
              
              <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm cursor-pointer">
                <option>Mês atual</option>
                <option>Mês passado</option>
              </select>
            </div>

            <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors">
              <Lightbulb size={16} className="text-yellow-500" />
              Como funciona
            </button>

            {/* GRID DE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              
              {/* Card 1: Shopee Conf */}
              <div className="bg-white rounded-xl border border-gray-200 border-t-[3px] border-t-teal-400 shadow-sm p-5 flex flex-col justify-between h-36">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <ShoppingBag size={14} className="text-blue-400" />
                  Comissão confirmada (Shopee)
                </div>
                <div>
                  <h2 className="text-[28px] font-bold text-[#1a233a] leading-none">R$ 0,00</h2>
                  <p className="text-[11px] text-gray-400 mt-2 leading-tight">0 pedido(s) confirmado(s) via API oficial</p>
                </div>
              </div>

              {/* Card 2: Shopee Análise */}
              <div className="bg-white rounded-xl border border-gray-200 border-t-[3px] border-t-teal-400 shadow-sm p-5 flex flex-col justify-between h-36">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <Clock size={14} className="text-gray-400" />
                  Em análise (Shopee)
                </div>
                <div>
                  <h2 className="text-[28px] font-bold text-[#1a233a] leading-none">R$ 0,00</h2>
                  <p className="text-[11px] text-gray-400 mt-2 leading-tight">0 pedido(s) ainda não aprovado(s)</p>
                </div>
              </div>

              {/* Card 3: Amazon Conf */}
              <div className="bg-white rounded-xl border border-gray-200 border-t-[3px] border-t-amber-400 shadow-sm p-5 flex flex-col justify-between h-36">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <Package size={14} className="text-amber-700" />
                  Comissão confirmada (Amazon)
                </div>
                <div>
                  <h2 className="text-[28px] font-bold text-[#1a233a] leading-none">R$ 0,00</h2>
                  <p className="text-[11px] text-gray-400 mt-2 leading-tight">0 pedido(s) confirmado(s) via painel oficial</p>
                </div>
              </div>

              {/* Card 4: ML Conf */}
              <div className="bg-white rounded-xl border border-gray-200 border-t-[3px] border-t-yellow-400 shadow-sm p-5 flex flex-col justify-between h-36">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <ShoppingCart size={14} className="text-gray-400" />
                  Comissão confirmada (Mercado Livre)
                </div>
                <div>
                  <h2 className="text-[28px] font-bold text-[#1a233a] leading-none">R$ 0,00</h2>
                  <p className="text-[11px] text-gray-400 mt-2 leading-tight">0 venda(s) aprovada(s) via painel de afiliados</p>
                </div>
              </div>

              {/* Card 5: ML Análise */}
              <div className="bg-white rounded-xl border border-gray-200 border-t-[3px] border-t-yellow-400 shadow-sm p-5 flex flex-col justify-between h-36">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <Clock size={14} className="text-gray-400" />
                  Em análise (Mercado Livre)
                </div>
                <div>
                  <h2 className="text-[28px] font-bold text-[#1a233a] leading-none">R$ 0,00</h2>
                  <p className="text-[11px] text-gray-400 mt-2 leading-tight">0 venda(s) ainda não aprovada(s)</p>
                </div>
              </div>

              {/* Card 6: Disparos */}
              <div className="bg-white rounded-xl border border-gray-200 border-t-[3px] border-t-amber-400 shadow-sm p-5 flex flex-col justify-between h-36">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <Send size={14} className="text-red-400" />
                  Disparos
                </div>
                <div>
                  <h2 className="text-[28px] font-bold text-[#1a233a] leading-none">0</h2>
                  <p className="text-[11px] text-gray-400 mt-2 leading-tight">volume de envio, não venda confirmada</p>
                </div>
              </div>

              {/* Card 7: Monitoramentos Ativos */}
              <div className="bg-white rounded-xl border border-gray-200 border-t-[3px] border-t-[#1a233a] shadow-sm p-5 flex flex-col justify-between h-36">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <Activity size={14} className="text-gray-600" />
                  Monitoramentos ativos
                </div>
                <div>
                  <h2 className="text-[28px] font-bold text-[#1a233a] leading-none">2</h2>
                  <p className="text-[11px] text-gray-400 mt-2 leading-tight">buscando ofertas automaticamente</p>
                </div>
              </div>

            </div>

            {/* SEÇÃO DO GRÁFICO */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm mt-6">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <TrendingUp size={18} className="text-purple-400" />
                  Comissão real (Shopee + Amazon + Mercado Livre) — 2026
                </div>
                <select className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm cursor-pointer">
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </div>
              
              {/* Mockup do Gráfico Visual */}
              <div className="p-6 overflow-x-auto">
                <div className="min-w-[800px] h-[300px] relative flex">
                  
                  {/* Eixo Y */}
                  <div className="flex flex-col justify-between text-xs text-gray-500 pr-4 pb-6 text-right w-12 shrink-0">
                    <span>R$ 4</span>
                    <span>R$ 3</span>
                    <span>R$ 2</span>
                    <span>R$ 1</span>
                    <span>R$ 0</span>
                  </div>

                  {/* Grid e Eixo X */}
                  <div className="flex-1 relative border-l border-b border-gray-300 flex">
                    {/* Linhas Horizontais tracejadas */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      <div className="w-full h-0 border-t border-dashed border-gray-200"></div>
                      <div className="w-full h-0 border-t border-dashed border-gray-200"></div>
                      <div className="w-full h-0 border-t border-dashed border-gray-200"></div>
                      <div className="w-full h-0 border-t border-dashed border-gray-200"></div>
                      <div className="w-full h-0"></div> {/* Linha base já tem borda sólida */}
                    </div>
                    
                    {/* Linhas Verticais e Labels Eixo X */}
                    {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map((mes, idx) => (
                      <div key={idx} className="flex-1 relative flex flex-col justify-end">
                        <div className="absolute inset-y-0 right-0 w-0 border-r border-dashed border-gray-200 pointer-events-none"></div>
                        <div className="h-1.5 w-0 border-l border-gray-300 absolute -bottom-1.5 left-1/2"></div>
                        <span className="text-xs text-gray-500 absolute -bottom-7 w-full text-center">{mes}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}