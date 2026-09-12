'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, Lightbulb, Plus, ShoppingBag, 
  ShoppingCart, Package, Edit2, Trash2, Microscope, Link2, 
  Bot, Check, Clock
} from 'lucide-react';

import { SidebarItem } from '@/src/components/SidebarItem';
import { AccountStatus } from '@/src/components/AccountStatus';

export default function MonitoramentoPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [view, setView] = useState<'lista' | 'novo'>('lista');
  
  // Estados para os toggles dos cards mockados
  const [shopeeActive, setShopeeActive] = useState(true);
  const [mlActive, setMlActive] = useState(true);

  // Estados do formulário de novo monitoramento
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

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
              <SidebarItem icon={<Tag size={18} />} label="Ofertas" />
              {/* Monitoramento ativo */}
              <SidebarItem icon={<Activity size={18} />} label="Monitoramento" active />
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
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Cabeçalho da Página */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Monitoramento de plataformas</h1>
                <p className="text-gray-500 mt-1 text-sm">
                  Busque ofertas direto no Mercado Livre, Shopee e Amazon e dispare automaticamente pro segmento escolhido — sem precisar clonar nada de fora.
                </p>
                <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors mt-4">
                  <Lightbulb size={16} className="text-yellow-500" />
                  Como funciona
                </button>
              </div>
              
              {view === 'lista' && (
                <button 
                  onClick={() => setView('novo')}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:opacity-95 transition-opacity flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus size={18} />
                  Novo monitoramento
                </button>
              )}
            </div>

            {/* CONDICIONAL: LISTA OU FORMULÁRIO */}
            {view === 'lista' ? (
              /* --- TELA DE LISTAGEM (IMAGEM 1) --- */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                
                {/* Card Shopee */}
                <div className="bg-white rounded-2xl border border-gray-200 border-l-4 border-l-teal-400 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 tracking-wider">PLATAFORMA</span>
                      <div className="flex items-center gap-2 mt-1">
                        <ShoppingBag size={18} className="text-orange-500" />
                        <h3 className="font-bold text-gray-900">Shopee</h3>
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <button 
                      onClick={() => setShopeeActive(!shopeeActive)}
                      className={`w-11 h-6 rounded-full flex items-center transition-colors px-1 ${shopeeActive ? 'bg-purple-500 justify-end' : 'bg-gray-300 justify-start'}`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                      <Check size={12} /> 0 sucessos
                    </span>
                    <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                      <Trash2 size={12} /> 172 erros
                    </span>
                  </div>

                  <div className="space-y-3 pt-2 text-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Nicho</span>
                      <span className="font-medium text-gray-900">Blusa</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Intervalo</span>
                      <span className="font-medium text-gray-900">30 minutos</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Horário de funcionamento</span>
                      <span className="font-medium text-gray-900">08:00 – 22:00</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Segmento</span>
                      <span className="font-medium text-gray-900">Moda</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Categoria</span>
                      <span className="font-medium text-gray-900">Roupas Femininas</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-500">Próximo envio em</span>
                      <span className="font-medium text-gray-900">Em breve...</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">Ainda não rodou</span>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Mercado Livre */}
                <div className="bg-white rounded-2xl border border-gray-200 border-l-4 border-l-teal-400 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 tracking-wider">PLATAFORMA</span>
                      <div className="flex items-center gap-2 mt-1">
                        <ShoppingCart size={18} className="text-yellow-500" />
                        <h3 className="font-bold text-gray-900">Mercado Livre</h3>
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <button 
                      onClick={() => setMlActive(!mlActive)}
                      className={`w-11 h-6 rounded-full flex items-center transition-colors px-1 ${mlActive ? 'bg-purple-500 justify-end' : 'bg-gray-300 justify-start'}`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                      <Check size={12} /> 0 sucessos
                    </span>
                    <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                      <Trash2 size={12} /> 172 erros
                    </span>
                  </div>

                  <div className="space-y-3 pt-2 text-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Categoria (Destaques)</span>
                      <span className="font-medium text-gray-900">Beleza e Cuidado Pessoal</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Intervalo</span>
                      <span className="font-medium text-gray-900">30 minutos</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Horário de funcionamento</span>
                      <span className="font-medium text-gray-900">08:00 – 22:00</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Segmento</span>
                      <span className="font-medium text-gray-900">Moda</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Categoria</span>
                      <span className="font-medium text-gray-900">Roupas Femininas</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-500">Próximo envio em</span>
                      <span className="font-medium text-gray-900">Em breve...</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">Ainda não rodou</span>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* --- TELA DE FORMULÁRIO (IMAGENS 2 e 3) --- */
              <div className="bg-white rounded-2xl border border-gray-200 border-t-4 border-t-purple-500 shadow-sm p-8 mt-4">
                
                <div className="flex items-center gap-2 mb-8">
                  <Microscope size={20} className="text-gray-500" />
                  <h2 className="text-lg font-bold text-gray-900">Novo monitoramento de plataforma</h2>
                </div>

                <div className="space-y-6">
                  {/* Plataforma */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Plataforma — <span className="font-normal text-gray-500">selecione uma, duas ou as três</span>
                    </label>
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" checked={selectedPlatforms.includes('ml')} onChange={() => togglePlatform('ml')} className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500" />
                        <ShoppingCart size={18} className="text-yellow-500" />
                        <span className="text-sm font-medium text-gray-800">Mercado Livre</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" checked={selectedPlatforms.includes('shopee')} onChange={() => togglePlatform('shopee')} className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500" />
                        <ShoppingBag size={18} className="text-orange-500" />
                        <span className="text-sm font-medium text-gray-800">Shopee</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" checked={selectedPlatforms.includes('amazon')} onChange={() => togglePlatform('amazon')} className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500" />
                        <Package size={18} className="text-amber-700" />
                        <span className="text-sm font-medium text-gray-800">Amazon</span>
                      </label>
                    </div>
                  </div>

                  {/* Categoria */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Categoria (opcional, só organizacional)</label>
                    <select className="w-full md:w-1/2 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Todas as categorias</option>
                    </select>
                  </div>

                  {/* Nicho de busca */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nicho de busca</label>
                    <input 
                      type="text" 
                      placeholder="Ex: surf, chuteira de futebol,"
                      className="w-full md:w-1/2 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-1"
                    />
                    <p className="text-xs text-gray-500">
                    </p>
                  </div>

                  {/* Segmento para disparo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Segmento para disparo</label>
                    <select className="w-full md:w-1/2 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Escolha o segmento onde será enviada a oferta</option>
                    </select>
                  </div>

                  {/* Grid de 2 colunas: Desconto, Intervalo, Horários */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Desconto mínimo</label>
                      <input 
                        type="number" 
                        defaultValue={10}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Intervalo de monitoramento</label>
                      <select className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>30 minutos</option>
                        <option>1 hora</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Horário de início</label>
                      <div className="relative">
                        <input 
                          type="time" 
                          defaultValue="08:00"
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Horário de término</label>
                      <div className="relative">
                        <input 
                          type="time" 
                          defaultValue="22:00"
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Limite personalizado */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Limite personalizado de mensagens por dia (opcional)</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 30"
                      className="w-full md:w-1/2 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-1"
                    />
                    <p className="text-xs text-gray-500">
                      Deixe em branco pra sem limite diário (só o teto de segurança por verificação). Se preenchido, o motor espalha esse total ao longo do dia priorizando os horários de pico: 07:00-08:30, 11:00-14:00, 17:30-19:30 e 21:00-22:30
                    </p>
                  </div>

                  {/* Checkboxes Especiais */}
                  <div className="space-y-4 pt-2">
                    <label className="flex items-center gap-3 p-4 border border-blue-100 bg-blue-50/50 rounded-xl cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500" />
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Link2 size={16} className="text-gray-400" />
                        <span className="font-semibold">Usar link preview</span> 
                        <span className="text-gray-500">— mostra a prévia do link quando a oferta não tem imagem própria.</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500" />
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Bot size={16} className="text-purple-500" />
                        <span className="font-semibold">Usar IA para gerar gatilhos (BETA)</span> 
                        <span className="text-gray-500">— expande o nicho em subnichos de busca automaticamente.</span>
                      </div>
                    </label>
                  </div>

                  {/* Mensagem Personalizada */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem personalizada (opcional)</label>
                    <textarea 
                      rows={4}
                      placeholder="Escreva a mensagem que será enviada com cada oferta encontrada. Deixe em branco para usar o padrão."
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    ></textarea>
                  </div>

                  {/* Botões Finais */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm">
                      <Check size={18} />
                      Criar monitoramento
                    </button>
                    <button 
                      onClick={() => setView('lista')}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium shadow-sm hover:bg-gray-200 transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}