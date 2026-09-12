'use client';

import { createContext, useContext, useState } from 'react';

interface StoredUser {
  name: string;
  email: string;
  password: string;
  planId: string;
}

interface AuthContextValue {
  user: StoredUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => string | null;
  signup: (name: string, email: string, password: string, planId: string, purchaseConfirmed: boolean) => string | null;
  logout: () => void;
}

const USERS_KEY = 'flowpromos-users';
const SESSION_KEY = 'flowpromos-session';

function readUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) ?? '[]') as StoredUser[];
  } catch {
    return [];
  }
}

function readSession(): StoredUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const session = window.localStorage.getItem(SESSION_KEY);
    return session ? (JSON.parse(session) as StoredUser) : null;
  } catch {
    return null;
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(readSession);

  function login(email: string, password: string) {
    const foundUser = readUsers().find(
      (storedUser) => storedUser.email === email.trim().toLowerCase() && storedUser.password === password,
    );

    if (!foundUser) return 'E-mail ou senha inválidos.';

    window.localStorage.setItem(SESSION_KEY, JSON.stringify(foundUser));
    setUser(foundUser);
    return null;
  }

  function signup(name: string, email: string, password: string, planId: string, purchaseConfirmed: boolean) {
    if (!purchaseConfirmed) return 'Confirme a compra do plano para liberar o acesso.';
    if (name.trim().length < 2) return 'Informe seu nome completo.';
    if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes('@')) return 'Informe um e-mail válido.';
    if (readUsers().some((storedUser) => storedUser.email === normalizedEmail)) return 'Este e-mail já possui cadastro.';

    const newUser = { name: name.trim(), email: normalizedEmail, password, planId };
    window.localStorage.setItem(USERS_KEY, JSON.stringify([...readUsers(), newUser]));
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return null;
  }

  function logout() {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
