'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace('/auth');
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
    >
      <LogOut size={16} />
      Sair
    </button>
  );
}
