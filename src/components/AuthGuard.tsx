'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAccessGranted, isLoading } = useAuth();
  const isPublicPage = pathname.startsWith('/auth') || pathname === '/termos' || pathname === '/privacidade';

  useEffect(() => {
    if (!isLoading && !isPublicPage && !isAuthenticated) router.replace('/auth');
    if (!isLoading && !isPublicPage && isAuthenticated && !isAccessGranted) router.replace('/auth?payment=required');
  }, [isAccessGranted, isAuthenticated, isLoading, isPublicPage, router]);

  if (isLoading || (!isPublicPage && (!isAuthenticated || !isAccessGranted))) return null;
  return children;
}
