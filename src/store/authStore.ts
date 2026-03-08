import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'DELIVERY_MAN' | 'USER';

interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Start with null, we can mock a login later
  isLoading: true,
  setUser: (user) => set({ user }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
