import { Menu, Bell, Moon, Sun, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useUIStore } from '@/stores/ui.store';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const { user, logout } = useAuthStore();
  const { setMobileMenuOpen, mobileMenuOpen } = useUIStore();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LanguageSwitcher />

          <div className="relative">
            <button
              className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" aria-hidden="true" />
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="relative group">
            <button
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <span className="hidden lg:block font-medium text-gray-700 dark:text-gray-300">
                {user?.firstName} {user?.lastName}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="font-medium text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <User className="h-4 w-4" aria-hidden="true" />
                Profil
              </button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Moon className="h-4 w-4" aria-hidden="true" />
                Apparence
              </button>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};