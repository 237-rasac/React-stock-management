import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
  companyId?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setAuth: (data: { user: User; accessToken: string; refreshToken: string }) => void;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: ({ user, accessToken, refreshToken }) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, accessToken, refreshToken, isAuthenticated: true, error: null });
      },

      setUser: (user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
        set({ user, isAuthenticated: !!user });
      },

      setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        set({ accessToken, refreshToken });
      },

      logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      hasRole: (role) => {
        const { user } = get();
        return user?.roles.includes(role) ?? false;
      },

      hasPermission: (permission) => {
        const { user } = get();
        return user?.permissions.includes(permission) ?? false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);