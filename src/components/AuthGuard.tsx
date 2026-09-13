'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const isAuthPage = pathname.startsWith('/auth');

  useEffect(() => {
    if (!isLoading && !isAuthPage && !isAuthenticated) router.replace('/auth');
  }, [isAuthenticated, isAuthPage, isLoading, router]);

  if (isLoading || (!isAuthPage && !isAuthenticated)) return null;
  return children;
}
