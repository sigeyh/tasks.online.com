import { create } from 'zustand';

interface User {
  id: number;
  phone: string;
  tier: string;
  dailyLimit: number;
  completedToday: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  incrementCompleted: () => void;
  upgradeTier: (tier: string, limit: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
  incrementCompleted: () => set((state) => ({
    user: state.user ? { ...state.user, completedToday: state.user.completedToday + 1 } : null
  })),
  upgradeTier: (tier, limit) => set((state) => ({
    user: state.user ? { ...state.user, tier, dailyLimit: limit } : null
  }))
}));
