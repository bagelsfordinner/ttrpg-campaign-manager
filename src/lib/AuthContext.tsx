'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { Session, User } from '@supabase/supabase-js';

type AuthContextType = User | null;

const AuthContext = createContext<AuthContextType>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => setUser(data.user));
    supabase.auth.onAuthStateChange((_: string, session: Session | null) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
