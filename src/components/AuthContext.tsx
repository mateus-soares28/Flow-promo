'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/src/lib/supabase/client';

interface AppUser {
  id: string;
  name: string;
  email: string;
  planId: string;
  role: 'user' | 'admin';
}

interface AuthContextValue {
  user: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAccessGranted: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (name: string, email: string, password: string, planId: string, purchaseConfirmed: boolean) => Promise<string | null>;
  resetPassword: (email: string) => Promise<string | null>;
  updatePassword: (password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

function toAppUser(user: User | null): AppUser | null {
  if (!user?.email) return null;
  return {
    id: user.id,
    email: user.email,
    name: typeof user.user_metadata.full_name === 'string' ? user.user_metadata.full_name : user.email,
    planId: typeof user.user_metadata.plan_id === 'string' ? user.user_metadata.plan_id : 'full',
    role: 'user',
  };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  const syncAuthUser = useCallback(async (authUser: User | null) => {
    const appUser = toAppUser(authUser);
    setUser(appUser);
    if (!appUser) {
      setIsAccessGranted(false);
      setIsLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', appUser.id)
      .maybeSingle();
    const isAdmin = profile?.role === 'admin';
    setUser({ ...appUser, role: isAdmin ? 'admin' : 'user' });
    if (isAdmin) {
      setIsAccessGranted(true);
      setIsLoading(false);
      return;
    }

    const { data } = await supabase
      .from('subscriptions')
      .select('status, expires_at')
      .eq('user_id', appUser.id)
      .eq('status', 'active')
      .gt('expires_at', new Date().toISOString())
      .limit(1)
      .maybeSingle();
    setIsAccessGranted(Boolean(data));
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) void syncAuthUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) void syncAuthUser(session?.user ?? null);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase, syncAuthUser]);

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) return 'E-mail ou senha invalidos.';
    return null;
  }

  async function signup(name: string, email: string, password: string, planId: string, purchaseConfirmed: boolean) {
    if (!purchaseConfirmed) return 'Confirme a compra do plano para liberar o acesso.';
    if (name.trim().length < 2) return 'Informe seu nome completo.';
    if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes('@')) return 'Informe um e-mail valido.';

    const { error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          full_name: name.trim(),
          plan_id: planId,
        },
      },
    });

    if (error) return error.message.includes('already registered') ? 'Este e-mail ja possui cadastro.' : error.message;
    return null;
  }

  async function resetPassword(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes('@')) return 'Informe um e-mail valido.';

    const redirectTo = typeof window === 'undefined' ? undefined : `${window.location.origin}/auth?mode=reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, { redirectTo });

    return error ? error.message : null;
  }

  async function updatePassword(password: string) {
    if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';

    const { error } = await supabase.auth.updateUser({ password });
    return error ? error.message : null;
  }

  async function logout() {
    await supabase.auth.signOut({ scope: 'global' });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: Boolean(user), isAccessGranted, login, signup, resetPassword, updatePassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
