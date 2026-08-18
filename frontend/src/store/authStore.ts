import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  phone: string;
  fullName: string;
  county: string;
  country: string;
  gender: string;
  tier: string;
  dailyLimit: number;
  completedToday: number;
  balance: number;
  registeredAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  incrementCompleted: () => void;
  upgradeTier: (tier: string, limit: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      incrementCompleted: () =>
        set((state) => ({
          user: state.user
            ? { ...state.user, completedToday: state.user.completedToday + 1 }
            : null,
        })),
      upgradeTier: (tier, limit) =>
        set((state) => ({
          user: state.user ? { ...state.user, tier, dailyLimit: limit } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
