'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, Lightbulb, Download, 
  CheckCircle2, ShoppingBag, Package, Circle, ShoppingCart, Flame
} from 'lucide-react';

import { SidebarItem } from '@/src/components/SidebarItem';

export default function IntegracoesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('shopee');

  const platforms = [
    { id: 'shopee', name: 'Shopee', iconColor: 'text-orange-500', Icon: ShoppingBag, connected: false },
    { id: 'aliexpress', name: 'AliExpress', iconColor: 'text-red-500', Icon: ShoppingBag, connected: false },
    { id: 'amazon', name: 'Amazon', iconColor: 'text-amber-800', Icon: Package, connected: false },
    { id: 'cea', name: 'CeA', iconColor: 'text-blue-600', Icon: Circle, connected: true },
    { id: 'magalu', name: 'Magalu', iconColor: 'text-blue-500', Icon: Circle, connected: true },
    { id: 'mercadolivre', name: 'Mercado Livre', iconColor: 'text-gray-400', Icon: ShoppingCart, connected: false },
    { id: 'awin', name: 'Awin', iconColor: 'text-orange-600', Icon: Flame, connected: false },
  ];

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
              <SidebarItem icon={<DollarSign size={18} />} label="Faturamento" />
              {/* Integrações Ativo */}
              <SidebarItem icon={<Plug size={18} />} label="Integrações" active />
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
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Cabeçalho da Página */}
            <div>
              <h1 className="text-2xl font-bold text-[#1a233a]">Configurações de plataformas</h1>
              <p className="text-gray-500 mt-1 text-sm">
                Selecione uma plataforma, informe suas credenciais de afiliado e salve.
              </p>
            </div>

            {/* Banner da Extensão e Instruções */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
              <button className="w-full bg-gradient-to-r from-purple-500 to-teal-400 text-white py-3 px-4 rounded-xl flex items-center gap-2 font-semibold shadow-sm hover:opacity-95 transition-opacity">
                <Download size={18} />
                Baixar extensão OfertaFlux
              </button>
              
              <p className="text-[13px] text-gray-500 leading-relaxed">
                <strong>Como instalar no Chrome:</strong> baixe e extraia o .zip → abra <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">chrome://extensions</code> → ative <strong>"Modo do desenvolvedor"</strong> (canto superior direito) → clique em <strong>"Carregar sem compactação"</strong> e selecione a pasta extraída. Depois entre no site do marketplace já logado, clique no ícone da extensão, depois em "Capturar" e cole o código no campo de sessão da plataforma aqui embaixo.
              </p>
            </div>

            {/* Botão Como Funciona */}
            <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors">
              <Lightbulb size={16} className="text-yellow-500" />
              Como funciona
            </button>

            {/* Abas de Plataformas */}
            <div className="flex flex-wrap items-center gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setActiveTab(platform.id)}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 bg-white border ${
                    activeTab === platform.id 
                      ? 'border-purple-500 text-purple-700 shadow-[0_0_0_1px_rgba(168,85,247,1)]' 
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <platform.Icon size={16} className={platform.iconColor} />
                  {platform.name}
                  
                  {/* Indicador de Conexão Ativa */}
                  {platform.connected && (
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5">
                      <CheckCircle2 size={16} className="text-green-500 fill-green-500/10" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Formulário de Credenciais */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
              
              {/* Campos (Dinâmicos conforme a aba, aqui exemplificando o padrão Shopee das imagens) */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">
                    ID de Afiliado (App ID)
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: 18335940995" 
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">
                    Chave secreta
                  </label>
                  <input 
                    type="text" 
                    placeholder="Sua chave secreta" 
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Botão Salvar */}
              <button className="w-full bg-gradient-to-r from-purple-500 to-teal-400 text-white py-3.5 px-4 rounded-xl font-bold shadow-sm hover:opacity-95 transition-opacity mt-4">
                Salvar
              </button>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}