import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUIStore } from '@/stores/ui.store';
import { useThemeStore } from '@/stores/theme.store';

export const AppLayout = () => {
  const { sidebarOpen, sidebarCollapsed, mobileMenuOpen } = useUIStore();
  const { resolvedTheme } = useThemeStore();

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${resolvedTheme === 'dark' ? 'dark' : ''}`}>
      <Sidebar />
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}
          ${mobileMenuOpen ? 'pl-0' : ''}
        `}
      >
        <Header />
        <main className="p-4 lg:p-6 min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => useUIStore.getState().setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};