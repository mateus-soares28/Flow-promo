'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, Lightbulb, Signal, Smartphone, 
  Info, Save, RefreshCw, X, LogOut, QrCode
} from 'lucide-react';

// Reutilizando os componentes que separamos na etapa anterior
import { SidebarItem } from '@/src/components/SidebarItem';

export default function WhatsAppConnectionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-gray-900">
      {/* SIDEBAR (Mesma estrutura) */}
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
              {/* WhatsApp agora está ativo */}
              <SidebarItem icon={<MessageSquare size={18} />} label="WhatsApp" active />
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
        
        {/* HEADER (Mesma estrutura) */}
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

        {/* CONTEÚDO DA PÁGINA WHATSAPP */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Cabeçalho da Página */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Conexão WhatsApp/Telegram</h1>
              <p className="text-gray-500 mt-1">Conecte os canais por onde as ofertas são enviadas.</p>
              
              <button className="flex items-center gap-2 text-sm text-gray-600 font-medium mt-4 hover:text-gray-900 transition-colors">
                <Lightbulb size={16} className="text-yellow-500" />
                Como funciona
              </button>
            </div>

            {/* Banner de Backup */}
            <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 p-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium shadow-sm cursor-pointer hover:opacity-95 transition-opacity">
              <Signal size={18} />
              Configurar conexão de backup
            </div>

            {/* Tabs de Navegação */}
            <div className="flex items-center gap-4 pt-2">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-purple-300 text-purple-700 rounded-xl font-medium shadow-sm">
                <Smartphone size={18} />
                WhatsApp
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                <Send size={18} />
                Telegram
              </button>
            </div>

            {/* Card Principal de Conexão */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mt-2 max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900">Conectar WhatsApp</h2>
              <p className="text-gray-500 text-sm mt-1">Use a câmera do seu celular para escanear o QR code abaixo</p>

              {/* Alerta Informativo */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6 flex gap-3">
                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 leading-relaxed">
                  Depois de conectado, esse número funciona de forma autônoma — você pode desligar o computador e o celular sem parar o funcionamento. Só é importante ligar a internet do celular (wifi ou dados) pelo menos <strong>1 vez a cada 2 semanas</strong>, senão o próprio WhatsApp desvincula esse aparelho automaticamente e é preciso conectar de novo.
                </p>
              </div>

              {/* Formulário de Configuração */}
              <div className="mt-8 space-y-5">
                {/* Nome da Conexão */}
                <div className="flex gap-3 items-end">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Nome da conexão (opcional)</label>
                    <input 
                      type="text" 
                      defaultValue="conexao grupos"
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors border border-gray-200">
                    <Save size={18} className="text-purple-600" />
                    Salvar
                  </button>
                </div>

                {/* Modo de Conexão */}
                <div className="space-y-1.5 w-full">
                  <label className="text-sm font-medium text-gray-700">Modo de conexão</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none text-gray-900">
                    <option>QR Code (Tradicional)</option>
                  </select>
                </div>
              </div>

              {/* Área do QR Code e Ações */}
              <div className="mt-10 flex flex-col items-center">
                
                {/* Placeholder do QR Code (Substitua pela imagem/gerador real depois) */}
                <div className="w-64 h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center text-gray-400">
                    <QrCode size={48} className="mx-auto mb-2 opacity-50" />
                    <span className="text-sm font-medium">QR Code aqui</span>
                  </div>
                </div>

                {/* Timer e Botão de Reiniciar */}
                <div className="text-center space-y-4 w-full">
                  <p className="text-sm text-gray-500">
                    Se não conectar em 117s, um novo QR code será gerado automaticamente.
                  </p>
                  <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors mx-auto text-sm w-full sm:w-auto">
                    <RefreshCw size={16} />
                    Reiniciar conexão (gerar nova instância)
                  </button>
                </div>

                <div className="w-full h-px bg-gray-100 my-8"></div>

                {/* Status e Logout */}
                <div className="flex flex-col items-center gap-4 w-full sm:w-80">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-semibold border border-red-100">
                    <X size={14} strokeWidth={3} />
                    Desconectado
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                    <LogOut size={18} className="text-orange-600" />
                    Logout / Voltar
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}