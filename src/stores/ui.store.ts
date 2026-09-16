import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;

  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;

  notifications: Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; message: string }>;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  mobileMenuOpen: false,
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  activeModal: null,
  openModal: (activeModal) => set({ activeModal }),
  closeModal: () => set({ activeModal: null }),

  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id: crypto.randomUUID() }],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));