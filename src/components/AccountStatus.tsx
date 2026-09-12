'use client';

import Link from 'next/link';
import { Hourglass } from 'lucide-react';
import { useAccount } from './AccountContext';

export function AccountStatus() {
  const { whatsappConnected, daysRemaining, isExpired } = useAccount();

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/whatsapp"
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
          whatsappConnected
            ? 'bg-green-50 text-green-700 border-green-100'
            : 'bg-red-50 text-red-600 border-red-100'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${whatsappConnected ? 'bg-green-600' : 'bg-red-600'}`} />
        {whatsappConnected ? 'Ativo' : 'Desconectado'}
      </Link>
      <Link
        href={isExpired ? '/plano' : '/faturamento'}
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
          isExpired ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'
        }`}
      >
        <Hourglass size={12} />
        {isExpired ? 'Assinatura expirada' : `${daysRemaining} dias restantes`}
      </Link>
    </div>
  );
}
