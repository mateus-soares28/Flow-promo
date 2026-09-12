'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, Lightbulb, FileEdit, Target, 
  Save, RefreshCw, Plus, Ban, Edit2, X, ArrowRight
} from 'lucide-react';

import { SidebarItem } from '@/src/components/SidebarItem';

export default function MensagensPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Exemplo do conteúdo padrão do textarea
  const defaultTemplate = `BAIXOU DEMAISS 💸

🛍️ *{titulo}*

❌ De {preco_original}
✅ Por {preco}
Com até {desconto} OFF`;

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
              {/* Mensagens Ativo */}
              <SidebarItem icon={<MessageCircle size={18} />} label="Mensagens" active />
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

        {/* CONTEÚDO */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Cabeçalho da Página */}
            <div>
              <h1 className="text-2xl font-bold text-[#1a233a]">Mensagens</h1>
              <p className="text-gray-500 mt-1 text-sm">
                Personalize como as ofertas são enviadas nos grupos. Edite o template e configure substituição ou bloqueio de palavras.
              </p>
              
              <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors mt-4">
                <Lightbulb size={16} className="text-yellow-500" />
                Como funciona
              </button>
            </div>

            {/* SEÇÃO 1: TEMPLATE DA MENSAGEM */}
            <div className="bg-white rounded-2xl border border-gray-200 border-t-2 border-t-purple-500 shadow-sm p-6 space-y-5 mt-4">
              <div className="flex items-center gap-2">
                <FileEdit size={18} className="text-gray-500" />
                <h2 className="text-[15px] font-bold text-gray-800">Template da Mensagem</h2>
              </div>

              {/* Alerta de Informação */}
              <div className="bg-blue-50/50 border-l-4 border-blue-500 text-blue-900 p-4 rounded-r-xl text-[13px] leading-relaxed flex items-start gap-3">
                <Target size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <p>
                  Esse template só se aplica a segmentos <strong>"Mensagens pré-definidas"</strong> em Segmentos (Monitoramento de plataformas). Segmentos em <strong>"Mensagens clonadas"</strong> não usam template nenhum — a mensagem sai crua, igual ao grupo/canal de origem, só trocando o link pelo de afiliado.
                </p>
              </div>

              {/* Variáveis */}
              <div>
                <p className="text-sm text-gray-500 mb-3">
                  Monta o texto das ofertas encontradas pelo Monitoramento de plataformas. Use as variáveis abaixo:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['{titulo}', '{preco}', '{preco_original}', '{desconto}', '{precos}', '{link}', '{marketplace}'].map(tag => (
                    <span key={tag} className="bg-purple-50 text-purple-600 border border-purple-100 px-2 py-1 rounded text-xs font-mono cursor-default hover:bg-purple-100 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea 
                  rows={8}
                  defaultValue={defaultTemplate}
                  className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y font-mono text-gray-700"
                ></textarea>
                {/* Simulando a scrollbar customizada da imagem */}
                <div className="absolute right-1 top-1 bottom-1 w-2 bg-gray-100 rounded-full my-1 mr-1">
                  <div className="w-full h-1/3 bg-gray-400 rounded-full mt-2"></div>
                </div>
              </div>

              {/* Botões de Ação do Template */}
              <div className="flex items-center justify-between pt-2">
                <button className="bg-[#8b5cf6] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:bg-purple-600 transition-colors flex items-center gap-2 text-sm">
                  <Save size={16} />
                  Salvar Template
                </button>
                <button className="bg-gray-50 text-gray-600 border border-gray-200 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
                  Restaurar padrão
                </button>
              </div>
            </div>

            {/* SEÇÃO 2: SUBSTITUIÇÃO E BLOQUEIO DE PALAVRAS */}
            <div className="bg-white rounded-2xl border border-gray-200 border-t-2 border-t-amber-400 shadow-sm p-6 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <RefreshCw size={18} className="text-blue-500" />
                  <h2 className="text-[15px] font-bold text-gray-800">Substituição e Bloqueio de Palavras</h2>
                </div>
                <p className="text-[13px] text-gray-500">
                  Configure palavras para substituir automaticamente (ex: nome do grupo de origem → nome do seu grupo) ou bloquear (ofertas que contenham a palavra não são enviadas). Vale pras duas fontes — mensagens clonadas (mesmo cruas, sem template) e mensagens pré-definidas.
                </p>
              </div>

              {/* Formulário de Adição */}
              <div className="flex flex-col md:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="Palavra/texto original" 
                  className="flex-1 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input 
                  type="text" 
                  placeholder="Substituir por..." 
                  className="flex-1 p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="relative md:w-48">
                  <select className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer pl-9">
                    <option>Substituir</option>
                    <option>Bloquear</option>
                  </select>
                  <RefreshCw size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button className="bg-[#8b5cf6] text-white px-5 py-3 rounded-xl font-medium shadow-sm hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 text-sm shrink-0">
                  <Plus size={16} />
                  Adicionar
                </button>
              </div>

              {/* Lista de Regras Configuradas */}
              <div className="space-y-3 pt-2">
                
                {/* Item 1: Bloqueio */}
                <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-[#e11d48]">"@grupo PB"</span>
                    <span className="flex items-center gap-1 bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide">
                      <Ban size={10} /> Bloqueia envio
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit2 size={12} className="text-orange-500" /> Editar
                    </button>
                    <button className="p-1.5 text-red-400 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* Item 2: Substituição */}
                <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-mono text-[#e11d48]">"@grupoAM"</span>
                    <ArrowRight size={14} className="text-gray-400" />
                    <span className="font-mono text-green-600">"@grupo PB"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit2 size={12} className="text-orange-500" /> Editar
                    </button>
                    <button className="p-1.5 text-red-400 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors">
                      <X size={14} />
                    </button>
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