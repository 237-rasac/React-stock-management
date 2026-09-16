import { createBrowserRouter, lazy } from 'react-router';
import { ProtectedRoute, RoleRoute } from '@/routes';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const ArticlesPage = lazy(() => import('@/features/articles/pages/ArticlesPage').then((m) => ({ default: m.ArticlesPage })));
const ArticleDetailsPage = lazy(() => import('@/features/articles/pages/ArticleDetailsPage').then((m) => ({ default: m.ArticleDetailsPage })));
const CustomersPage = lazy(() => import('@/features/customers/pages/CustomersPage').then((m) => ({ default: m.CustomersPage })));
const CustomerDetailsPage = lazy(() => import('@/features/customers/pages/CustomerDetailsPage').then((m) => ({ default: m.CustomerDetailsPage })));
const SuppliersPage = lazy(() => import('@/features/suppliers/pages/SuppliersPage').then((m) => ({ default: m.SuppliersPage })));
const SupplierDetailsPage = lazy(() => import('@/features/suppliers/pages/SupplierDetailsPage').then((m) => ({ default: m.SupplierDetailsPage })));
const CustomerOrdersPage = lazy(() => import('@/features/customer-orders/pages/CustomerOrdersPage').then((m) => ({ default: m.CustomerOrdersPage })));
const CustomerOrderDetailsPage = lazy(() => import('@/features/customer-orders/pages/CustomerOrderDetailsPage').then((m) => ({ default: m.CustomerOrderDetailsPage })));
const SupplierOrdersPage = lazy(() => import('@/features/supplier-orders/pages/SupplierOrdersPage').then((m) => ({ default: m.SupplierOrdersPage })));
const SupplierOrderDetailsPage = lazy(() => import('@/features/supplier-orders/pages/SupplierOrderDetailsPage').then((m) => ({ default: m.SupplierOrderDetailsPage })));
const SalesPage = lazy(() => import('@/features/sales/pages/SalesPage').then((m) => ({ default: m.SalesPage })));
const StockPage = lazy(() => import('@/features/stock/pages/StockPage').then((m) => ({ default: m.StockPage })));
const StockMovementsPage = lazy(() => import('@/features/stock/pages/StockMovementsPage').then((m) => ({ default: m.StockMovementsPage })));
const StockAlertsPage = lazy(() => import('@/features/stock/pages/StockAlertsPage').then((m) => ({ default: m.StockAlertsPage })));
const NotificationsPage = lazy(() => import('@/features/notifications/pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));
const CompaniesPage = lazy(() => import('@/features/companies/pages/CompaniesPage').then((m) => ({ default: m.CompaniesPage })));
const UsersPage = lazy(() => import('@/features/users/pages/UsersPage').then((m) => ({ default: m.UsersPage })));
const CategoriesPage = lazy(() => import('@/features/categories/pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage })));
const ProfilePage = lazy(() => import('@/features/auth/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('@/features/auth/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));

const AppLayout = lazy(() => import('@/components/layout/AppLayout').then((m) => ({ default: m.AppLayout })));

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'companies', element: <CompaniesPage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'catalog/categories', element: <CategoriesPage /> },
          { path: 'catalog/articles', element: <ArticlesPage /> },
          { path: 'catalog/articles/:id', element: <ArticleDetailsPage /> },
          { path: 'customers', element: <CustomersPage /> },
          { path: 'customers/:id', element: <CustomerDetailsPage /> },
          { path: 'suppliers', element: <SuppliersPage /> },
          { path: 'suppliers/:id', element: <SupplierDetailsPage /> },
          { path: 'customer-orders', element: <CustomerOrdersPage /> },
          { path: 'customer-orders/:id', element: <CustomerOrderDetailsPage /> },
          { path: 'supplier-orders', element: <SupplierOrdersPage /> },
          { path: 'supplier-orders/:id', element: <SupplierOrderDetailsPage /> },
          { path: 'sales', element: <SalesPage /> },
          { path: 'stock', element: <StockPage /> },
          { path: 'stock/movements', element: <StockMovementsPage /> },
          { path: 'stock/alerts', element: <StockAlertsPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);

import { Navigate } from 'react-router';