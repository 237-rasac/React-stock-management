import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/auth.store';

interface RoleRouteProps {
  allowedRoles: string[];
}

export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { user, hasRole } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles.some((role) => hasRole(role));

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};