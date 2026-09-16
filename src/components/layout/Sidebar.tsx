import { NavLink, useLocation } from 'react-router';
import { useUIStore } from '@/stores/ui.store';
import {
  LayoutDashboard,
  Building2,
  Users,
  Boxes,
  Package,
  ShoppingCart,
  Truck,
  ShoppingBag,
  BarChart2,
  Bell,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

const navigation = [
  { name: 'dashboard', href: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { name: 'companies', href: '/companies', icon: Building2, label: 'Entreprises', roles: ['ADMIN'] },
  { name: 'users', href: '/users', icon: Users, label: 'Utilisateurs', roles: ['ADMIN'] },
  { name: 'categories', href: '/catalog/categories', icon: Boxes, label: 'Catégories' },
  { name: 'articles', href: '/catalog/articles', icon: Package, label: 'Articles' },
  { name: 'customers', href: '/customers', icon: Users, label: 'Clients' },
  { name: 'suppliers', href: '/suppliers', icon: Truck, label: 'Fournisseurs' },
  { name: 'customerOrders', href: '/customer-orders', icon: ShoppingCart, label: 'Commandes clients' },
  { name: 'supplierOrders', href: '/supplier-orders', icon: ShoppingBag, label: 'Commandes fournisseurs' },
  { name: 'sales', href: '/sales', icon: BarChart2, label: 'Ventes' },
  { name: 'stock', href: '/stock', icon: Boxes, label: 'Stock' },
  { name: 'notifications', href: '/notifications', icon: Bell, label: 'Notifications' },
  { name: 'settings', href: '/settings', icon: Settings, label: 'Paramètres' },
];

export const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed, sidebarOpen, setSidebarOpen, toggleSidebarCollapsed } = useUIStore();
  const location = useLocation();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const handleToggle = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      toggleSidebarCollapsed();
    }
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-20' : 'w-72'}
        ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
      `}
      aria-label="Navigation principale"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {!sidebarCollapsed && (
            <NavLink to="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
              <span className="text-2xl">📦</span>
              <span>SGS</span>
            </NavLink>
          )}
          <button
            onClick={handleToggle}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={sidebarCollapsed ? 'Étendre la barre latérale' : 'Réduire la barre latérale'}
            aria-expanded={!sidebarCollapsed}
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Navigation">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            const hasAccess = !item.roles || item.roles.some((role) => true);

            if (!hasAccess) return null;

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive: active }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                  ${active
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                  ${sidebarCollapsed ? 'justify-center' : ''}
                `}
                title={sidebarCollapsed ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <NavLink
            to="/profile"
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
              ${isActive
                ? 'bg-primary/10 text-primary dark:bg-primary/20'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed ? 'Profil' : undefined}
          >
            <User className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            {!sidebarCollapsed && <span className="font-medium">Mon profil</span>}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};