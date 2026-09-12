'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const isAuthPage = pathname.startsWith('/auth');

  useEffect(() => {
    if (!isAuthPage && !isAuthenticated) router.replace('/auth');
  }, [isAuthenticated, isAuthPage, router]);

  if (!isAuthPage && !isAuthenticated) return null;
  return children;
}
