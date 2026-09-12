'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, RefreshCw, Edit2, Lightbulb, 
  Link2, Smartphone, Signal, Search, FileText
} from 'lucide-react';

import { SidebarItem } from '@/src/components/SidebarItem';

export default function GruposPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Estados principais
  const [activeTab, setActiveTab] = useState<'visao_geral' | 'mudar_descricao'>('visao_geral');
  const [connectionType, setConnectionType] = useState<'principal' | 'backup'>('principal');
  const [descriptionMode, setDescriptionMode] = useState<'varios' | 'um_a_um'>('varios');
  
  // Estados dos formulários e seleção
  const [searchTerm, setSearchTerm] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // Exemplo de lista de grupos
  const mockGroups = [
    { id: 'oferta-flux', name: 'Oferta flux', members: 2 }
  ];

  const toggleGroupSelection = (id: string) => {
    setSelectedGroups(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedGroups(mockGroups.map(g => g.id));
  };

  const handleClearSelection = () => {
    setSelectedGroups([]);
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
              <SidebarItem icon={<Users size={18} />} label="Grupos" active />
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
              <h1 className="text-2xl font-bold text-gray-900">Grupos de WhatsApp</h1>
              <p className="text-gray-500 mt-1">
                Todos os grupos que seu número participa. Para vincular grupos a um segmento, vá em <a href="#" className="text-purple-600 font-medium hover:underline">Segmentos</a>.
              </p>
            </div>

            {/* Botão de Atualização Geral */}
            <button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium shadow-sm hover:opacity-95 transition-opacity">
              <RefreshCw size={18} />
              Atualizar grupos
            </button>

            {/* Tabs Principais */}
            <div className="flex items-center gap-4 pt-2 border-b border-gray-200 pb-6">
              <button 
                onClick={() => setActiveTab('visao_geral')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-sm border transition-colors ${
                  activeTab === 'visao_geral' 
                    ? 'bg-white border-purple-300 text-purple-700' 
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Users size={18} />
                Visão geral
              </button>
              
              <button 
                onClick={() => setActiveTab('mudar_descricao')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-sm border transition-colors ${
                  activeTab === 'mudar_descricao' 
                    ? 'bg-white border-purple-300 text-purple-700' 
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Edit2 size={18} />
                Mudar descrição
              </button>
            </div>

            {/* ABA: VISÃO GERAL */}
            {activeTab === 'visao_geral' && (
              <div className="space-y-6 pt-2">
                <button className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors">
                  <Lightbulb size={16} className="text-yellow-500" />
                  Como funciona
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded">FREE</span>
                    <h2 className="text-lg font-bold text-gray-900">Grupos gratuitos autorizados para clonagem</h2>
                  </div>
                  
                  <p className="text-gray-500 text-sm">
                    Escolha seu grupo e categoria para clonar — grupos e categorias já pré-definidos e autorizados pra clonagem.
                  </p>

                  <button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium shadow-sm hover:opacity-95 transition-opacity mt-2">
                    <Link2 size={18} />
                    Ver grupos e categorias
                  </button>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-2">Conexão</label>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-purple-300 text-purple-700 rounded-xl font-medium shadow-sm">
                      <Smartphone size={18} />
                      Principal
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
                      <Signal size={18} />
                      Backup
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ABA: MUDAR DESCRIÇÃO */}
            {activeTab === 'mudar_descricao' && (
              <div className="space-y-6 pt-2">
                
                {/* Texto explicativo */}
                <p className="text-sm text-gray-500">
                  Só aparecem aqui os grupos onde o número conectado é <strong className="text-gray-700">admin</strong> — é o WhatsApp que exige isso pra deixar mudar a descrição, não uma regra nossa.
                </p>

                {/* Seleção de Conexão */}
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-2">Conexão</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setConnectionType('principal')}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-sm border transition-colors ${
                        connectionType === 'principal' 
                          ? 'bg-white border-purple-300 text-purple-700' 
                          : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <Smartphone size={18} />
                      Principal
                    </button>
                    <button 
                      onClick={() => setConnectionType('backup')}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-sm border transition-colors ${
                        connectionType === 'backup' 
                          ? 'bg-white border-purple-300 text-purple-700' 
                          : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <Signal size={18} />
                      Backup
                    </button>
                  </div>
                </div>

                {/* Sub-tabs de Modo */}
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setDescriptionMode('varios')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-sm border transition-colors ${
                      descriptionMode === 'varios' 
                        ? 'bg-white border-purple-300 text-purple-700' 
                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <FileText size={18} />
                    Mesma descrição pra vários
                  </button>

                  <button 
                    onClick={() => setDescriptionMode('um_a_um')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-sm border transition-colors ${
                      descriptionMode === 'um_a_um' 
                        ? 'bg-white border-purple-300 text-purple-700' 
                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Edit2 size={18} />
                    Editar um a um
                  </button>
                </div>

                {/* Campo de Busca */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600" size={18} />
                  <input 
                    type="text"
                    placeholder="Buscar grupo pelo nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-900 shadow-sm"
                  />
                </div>

                {/* Ações de Seleção */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 font-medium">
                    <button onClick={handleSelectAll} className="text-gray-900 hover:underline">
                      Selecionar todos
                    </button>
                    <button onClick={handleClearSelection} className="text-gray-900 hover:underline">
                      Limpar seleção
                    </button>
                  </div>
                  <span className="text-gray-400">
                    {selectedGroups.length} selecionado(s)
                  </span>
                </div>

                {/* Lista de Grupos */}
                <div className="space-y-3">
                  {mockGroups.map((group) => (
                    <div key={group.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox"
                          checked={selectedGroups.includes(group.id)}
                          onChange={() => toggleGroupSelection(group.id)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{group.name}</h4>
                          <span className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                            <Users size={12} />
                            {group.members} membros
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Campo da Nova Descrição */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 block">
                    Nova descrição (vai substituir a atual em todos os {selectedGroups.length} grupo(s) selecionado(s))
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Digite a nova descrição..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-900 shadow-sm resize-none"
                  />
                </div>

                {/* Ações Finais */}
                <div className="flex items-center gap-3 pt-2">
                  <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm hover:opacity-95 transition-opacity flex items-center gap-2 text-sm">
                    <FileText size={16} />
                    Aplicar a {selectedGroups.length} grupo(s)
                  </button>

                  <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                    <RefreshCw size={16} className="text-blue-500" />
                    Recarregar
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}