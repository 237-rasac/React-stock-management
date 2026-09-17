import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router";
import { langPath } from "@/lib/lang-path";

/**
 * Auth hooks (P0.4) — login via the swagger contract (no refresh token;
 * logout is client-side token purge).
 */

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: async (credentials: { login: string; motDePasse: string }) => {
      try {
        return await authApi.login(credentials);
      } catch (error) {
        // LoginPage surfaces login failures inline — flag as handled so the
        // global MutationCache doesn't double-toast. The ORIGINAL error object
        // is re-thrown untouched: axios rejections here are plain ApiError
        // objects (see client.ts normalizeError) whose `message` carries the
        // backend copy — wrapping them via String() would degrade it to
        // "[object Object]".
        throw Object.assign(
          error instanceof Object ? error : new Error(String(error)),
          { handled: true },
        );
      }
    },
    onSuccess: (user) => {
      setAuth(user);
      navigate(langPath("/dashboard"));
    },
  });
};

/** Logout is client-side only — /auth/logout is not in swagger v1.0. */
export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  return {
    mutate: () => {
      authApi.logout();
      logout();
      navigate(langPath("/login"));
    },
  };
};

/**
 * Profile data comes straight from the store (hydrated by /auth/me in
 * useAuthBootstrap and setAuth on login). No separate query needed until
 * a profile-update endpoint ships.
 */
export const useCurrentUser = () => {
  const user = useAuthStore((s) => s.user);
  return { user, isAuthenticated: !!user };
};
