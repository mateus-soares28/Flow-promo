'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, PlayCircle, MessageSquare, Layers, Users, 
  Tag, Activity, Send, Ticket, MessageCircle, DollarSign, 
  Plug, CreditCard, Menu, Zap, Lightbulb, Signal, Smartphone, 
  Info, Save, RefreshCw, X, LogOut, QrCode
} from 'lucide-react';

// Reutilizando os componentes que separamos na etapa anterior
import { SidebarItem } from '@/src/components/SidebarItem';
import { AccountStatus } from '@/src/components/AccountStatus';
import { useAccount } from '@/src/components/AccountContext';

export default function WhatsAppConnectionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [connectionName, setConnectionName] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showBackupMessage, setShowBackupMessage] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);
  const [feedback, setFeedback] = useState('');
  const router = useRouter();
  const { whatsappConnected, connectWhatsApp, disconnectWhatsApp } = useAccount();

  function saveConnectionName() {
    const name = connectionName.trim();
    if (!name) {
      setFeedback('Digite um nome para salvar a conexão.');
      return;
    }

    window.localStorage.setItem('flowpromos-whatsapp-name', name);
    setFeedback('Nome da conexão salvo.');
  }

  async function generateQrCode() {
    const instanceName = connectionName.trim();
    if (!instanceName) {
      setFeedback('Informe o nome da conexão antes de gerar o QR Code.');
      return;
    }

    setIsGeneratingQr(true);
    setFeedback('Solicitando um novo QR Code...');
    try {
      const response = await fetch('/api/whatsapp/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instanceName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Não foi possível gerar o QR Code.');
      setQrCode(data.base64 ?? null);
      setFeedback('QR Code gerado. Escaneie com o WhatsApp.');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Não foi possível gerar o QR Code.');
    } finally {
      setIsGeneratingQr(false);
    }
  }

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
          <AccountStatus />
        </header>

        {/* CONTEÚDO DA PÁGINA WHATSAPP */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Cabeçalho da Página */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Conexão WhatsApp</h1>
              <p className="text-gray-500 mt-1">Conecte os canais por onde as ofertas são enviadas.</p>
              
              <button type="button" onClick={() => setShowInstructions((current) => !current)} className="flex items-center gap-2 text-sm text-gray-600 font-medium mt-4 hover:text-gray-900 transition-colors">
                <Lightbulb size={16} className="text-gray-700" />
                Como funciona
              </button>
              {showInstructions && <p className="mt-3 max-w-2xl rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">Digite um nome, gere o QR Code e leia o código usando a opção Dispositivos conectados do WhatsApp.</p>}
            </div>

            {/* Banner de Backup */}
            <button type="button" onClick={() => setShowBackupMessage((current) => !current)} className="w-full bg-gray-900 p-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium shadow-sm hover:bg-gray-800 transition-colors">
              <Signal size={18} />
              Configurar conexão de backup
            </button>
            {showBackupMessage && <p className="-mt-4 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-600">A conexão de backup ficará disponível quando houver uma segunda instância configurada.</p>}

            {/* Tabs de Navegação */}
            <div className="flex items-center gap-4 pt-2">
              <button type="button" className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 border border-gray-900 text-white rounded-xl font-medium shadow-sm">
                <Smartphone size={18} />
                WhatsApp
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
                      value={connectionName}
                      onChange={(event) => setConnectionName(event.target.value)}
                      placeholder="Digite o nome do seu grupo aqui"
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-900"
                    />
                  </div>
                  <button type="button" onClick={saveConnectionName} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors border border-gray-200">
                    <Save size={18} className="text-gray-700" />
                    Salvar
                  </button>
                </div>

                {/* Modo de Conexão */}
                <div className="space-y-1.5 w-full">
                  <label className="text-sm font-medium text-gray-700">Modo de conexão</label>
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none text-gray-900">
                    <option>QR Code (Tradicional)</option>
                  </select>
                </div>
              </div>

              {/* Área do QR Code e Ações */}
              <div className="mt-10 flex flex-col items-center">
                
                {/* Placeholder do QR Code (Substitua pela imagem/gerador real depois) */}
                <div className="w-64 h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                  {qrCode ? <Image src={qrCode} alt="QR Code para conectar o WhatsApp" width={256} height={256} unoptimized className="w-full h-full object-contain" /> : <div className="text-center text-gray-400">
                    <QrCode size={48} className="mx-auto mb-2 opacity-50" />
                    <span className="text-sm font-medium">Gere o QR Code para começar</span>
                  </div>}
                </div>

                {/* Timer e Botão de Reiniciar */}
                <div className="text-center space-y-4 w-full">
                  <p className="text-sm text-gray-500">
                    Se não conectar em 117s, um novo QR code será gerado automaticamente.
                  </p>
                  <button type="button" onClick={generateQrCode} disabled={isGeneratingQr} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors mx-auto text-sm w-full sm:w-auto disabled:opacity-50">
                    <RefreshCw size={16} />
                    {isGeneratingQr ? 'Gerando QR Code...' : 'Gerar novo QR Code'}
                  </button>
                  {feedback && <p className="text-sm text-gray-600">{feedback}</p>}
                </div>

                <div className="w-full h-px bg-gray-100 my-8"></div>

                {/* Status e Logout */}
                <div className="flex flex-col items-center gap-4 w-full sm:w-80">
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${whatsappConnected ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                    <X size={14} strokeWidth={3} />
                    {whatsappConnected ? 'Ativo' : 'Desconectado'}
                  </div>

                  <button
                    type="button"
                    onClick={whatsappConnected ? disconnectWhatsApp : connectWhatsApp}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-colors ${whatsappConnected ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-green-600 text-white hover:bg-green-700'}`}
                  >
                    {whatsappConnected ? 'Desconectar WhatsApp' : 'Confirmar conexão'}
                  </button>
                  
                  <button type="button" onClick={() => { disconnectWhatsApp(); router.push('/'); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                    <LogOut size={18} className="text-gray-700" />
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