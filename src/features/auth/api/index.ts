import apiClient from "@/api/client";
import { API_ENDPOINTS, STORAGE_KEYS } from "@/lib/constants";
import { toAuthUser, toAuthUserFromMe } from "./mappers";
import type {
  AuthUser,
  CurrentUserResponseDTO,
  LoginResponseDTO,
} from "../types";

/**
 * Auth API — pinned to swagger.json (P0.4):
 *   POST /api/auth/login → LoginResponse { token, user }   (200 | 403)
 *   GET  /api/auth/me    → CurrentUserResponse             (200 | 401)
 *
 * swagger v1.0 has NO /auth/refresh and NO /auth/logout — the JWT is the
 * only credential and logout is purely client-side (token purge).
 * /auth/register is admin-only user creation → Users feature (P3.3).
 *
 * Token storage: the token is written ONLY to localStorage (`STORAGE_KEYS.
 * ACCESS_TOKEN`) — the single source of truth the axios interceptor reads.
 * The user object goes to the zustand store (persisted for fast hydration).
 */

/** Storage write helper — keeps the key in one place (constants.ts). */
function storeToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
}

export const authApi = {
  /** Login and persist the token; returns the mapped domain user. */
  login: async (credentials: {
    login: string;
    motDePasse: string;
  }): Promise<AuthUser> => {
    const res = await apiClient.post<LoginResponseDTO>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    storeToken(res.data.token);
    return toAuthUser(res.data.user);
  },

  /**
   * Bootstrap the session from a stored JWT on app mount (ProtectedRoute
   * awaits this before rendering protected routes).
   * 401 → null (treated as logged-out, not an error).
   */
  me: async (): Promise<AuthUser | null> => {
    try {
      const res = await apiClient.get<CurrentUserResponseDTO>(
        API_ENDPOINTS.AUTH.ME,
      );
      return toAuthUserFromMe(res.data);
    } catch (error) {
      if (isUnauthorized(error)) return null;
      throw error;
    }
  },

  /** Client-side logout: purge the token (no backend endpoint in swagger). */
  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

/**
 * True when an error means "no valid session": a 401, or the backend's
 * 403-with-empty-body signal for a missing/expired JWT (see api/client.ts
 * isSessionInvalid). Exported for useAuthBootstrap's stale-session purge.
 */
export function isUnauthorized(error: unknown): boolean {
  // The backend answers 401 with a JSON body, but signals a *missing/expired*
  // JWT with 403 and an EMPTY body (Spring Security default). Both mean "no
  // valid session"; a business 403 always carries a message body.
  const apiErr = error as { status?: number; message?: string };
  if (apiErr?.status === 401) return true;
  if (apiErr?.status === 403) {
    return (
      !apiErr.message ||
      apiErr.message.trim() === "" ||
      apiErr.message.includes("Access Denied")
    );
  }
  return false;
}
