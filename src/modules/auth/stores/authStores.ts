import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PartialUser {
  username: string;
}

interface AuthState {
  user: PartialUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: PartialUser, token:string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem('accessToken', token);
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        localStorage.removeItem('accessToken');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
