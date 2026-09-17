import { useEffect } from "react";
import { authApi, isUnauthorized } from "../api";
import { useAuthStore } from "@/stores/auth.store";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Auth bootstrap (P0.4) — runs once on app mount inside ProtectedRoute:
 *
 * 1. No stored JWT → mark bootstrapped immediately (render login redirect).
 * 2. Stored JWT   → GET /auth/me to validate it and hydrate the user.
 *    - 200 → setUser(mapped user), authenticated.
 *    - 401 → token expired/revoked → purge it, render login redirect.
 *    - Network/server error → keep the persisted user (optimistic UI) but
 *      still mark bootstrapped so the app is usable offline-ish.
 *
 * ProtectedRoute gates on `isBootstrapping`, so no protected route renders
 * until the session is resolved — closing the "stale user in store" hole.
 */
export function useAuthBootstrap(): void {
  const { setUser, setBootstrapping } = useAuthStore();

  useEffect(() => {
    let cancelled = false;

    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      // Fresh visitor (or purged session) — nothing to restore.
      useAuthStore.setState({ hasBootstrapped: true });
      return;
    }

    setBootstrapping(true);
    authApi
      .me()
      .then((user) => {
        if (cancelled) return;
        if (user) {
          setUser(user);
        } else {
          // 401: the interceptor purges storage + redirects on API calls, but
          // /auth/me swallows its own 401 → purge here so nothing stale stays.
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          setUser(null);
        }
      })
      .catch((error) => {
        // The backend answers 403-with-empty-body for a missing/expired token
        // (Spring Security default), not 401. That case IS "logged out": purge
        // the stale session instead of keeping the persisted user, otherwise
        // the shell renders authenticated while every API call fails.
        if (isUnauthorized(error)) {
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          localStorage.removeItem(STORAGE_KEYS.AUTH_STORAGE);
          useAuthStore.setState({ user: null, isAuthenticated: false });
          return;
        }
        // Genuine network/server failure: keep the persisted user for
        // optimistic UI; token remains for retry when connectivity returns.
      })
      .finally(() => {
        if (!cancelled) {
          useAuthStore.setState({
            isBootstrapping: false,
            hasBootstrapped: true,
          });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
