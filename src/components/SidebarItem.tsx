import React from 'react';
import Link from 'next/link';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
  const routes: Record<string, string> = {
    'Visão Geral': '/',
    WhatsApp: '/whatsapp',
    Grupos: '/grupos',
    Ofertas: '/ofertas',
    Monitoramento: '/monitoramento',
    Disparos: '/disparos',
    Mensagens: '/mensagens',
    Faturamento: '/faturamento',
    Integrações: '/integracoes',
    Plano: '/plano',
  };

  const className = `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${active ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`;
  const route = routes[label];

  if (!route) {
    return (
      <button className={className} type="button">
        {icon}
        {label}
      </button>
    );
  }

  return (
    <Link className={className} href={route}>
      {icon}
      {label}
    </Link>
  );
}