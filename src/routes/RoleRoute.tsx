import { Navigate, Outlet } from "react-router";
import { langPath } from "@/lib/lang-path";
import { useAuthStore } from "@/stores/auth.store";
import type { UserRole } from "@/features/auth/types";

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { user, hasRole } = useAuthStore();

  if (!user) {
    return <Navigate to={langPath("/login")} replace />;
  }

  const hasAccess = allowedRoles.some((role) => hasRole(role));

  if (!hasAccess) {
    return <Navigate to={langPath("/dashboard")} replace />;
  }

  return <Outlet />;
};
