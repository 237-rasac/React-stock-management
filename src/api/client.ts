import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import type { ApiError } from "./interceptors";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Session-invalid detection.
 *
 * This backend signals a missing/expired/invalid JWT with **403 and an empty
 * body** (Spring Security's default `AccessDeniedHandler` output), not 401:
 * verified by probing the live server with no token and with a bogus token.
 * A *business* 403 (authenticated but not allowed) always carries a JSON body
 * with a `message`, so an empty-body 403 is a reliable "your session is dead"
 * signal that the client can react to.
 *
 * ⚠ Deployed dev note: the backend also omits CORS headers on these 403s, so
 * when the frontend talks to the API cross-origin (no Vite proxy), the browser
 * hides the response entirely and this never runs — one more reason the dev
 * proxy (VITE_API_URL=/api) is the recommended wiring.
 */
function isSessionInvalid(error: AxiosError): boolean {
  const status = error.response?.status;
  if (status === 401) return true;
  if (status === 403) {
    const data = error.response?.data as unknown;
    if (data === null || data === undefined || data === "") return true;
    if (typeof data === "string" && data.trim() === "") return true;
  }
  return false;
}

/**
 * API client (P0.4) — swagger v1.0 has no refresh endpoint: the JWT is the
 * only credential. On a 401 the session is purged and the user is sent to
 * /login (the token cannot be renewed client-side).
 */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      // NOTE: no `withCredentials`. Auth is a Bearer JWT in the Authorization
      // header (see the request interceptor) — cookies are never used. Sending
      // credentials puts the request in CORS "credentialed" mode, which the
      // browser only honors when the backend replies
      // `Access-Control-Allow-Credentials: true` (it does not) — every call
      // then fails as a CORS error even though the server answered.
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Results of the session probe land here — normalize and reject.
        if (
          (error.config as { __sessionProbe?: boolean } | undefined)
            ?.__sessionProbe
        ) {
          return Promise.reject(this.normalizeError(error));
        }

        // Session possibly invalid (401, or the backend's empty-body 403).
        // A business 403 ALSO has an empty body on this backend (e.g. creating
        // an article with an invalid categoryId), so before purging the
        // session, confirm with a bare /auth/me probe: only a failing probe
        // proves the token is dead. /auth/me callers are excluded (they treat
        // auth failures themselves).
        if (
          isSessionInvalid(error) &&
          !error.config?.url?.includes("/auth/me")
        ) {
          return this.handlePossibleAuthFailure(error);
        }

        return Promise.reject(this.normalizeError(error));
      },
    );
  }

  /**
   * Confirm an ambiguous (empty-body) 403 with a bare /auth/me call before
   * destroying the session. If the probe succeeds the token is still valid —
   * the original error was a business 403 and must NOT log the user out.
   */
  private async handlePossibleAuthFailure(error: AxiosError): Promise<never> {
    try {
      await this.client.get("/auth/me", {
        __sessionProbe: true,
      } as AxiosRequestConfig & { __sessionProbe?: boolean });
      // Probe OK → session alive; surface the original business error only.
    } catch {
      this.handleAuthFailure();
    }
    throw this.normalizeError(error);
  }

  private handleAuthFailure(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_STORAGE);

    // Keep the URL language segment across the hard redirect.
    const seg = window.location.pathname.split("/")[1];
    const langPrefix = ["fr", "en"].includes(seg) ? `/${seg}` : "";
    const loginPath = `${langPrefix}/login`;
    if (window.location.pathname !== loginPath) {
      window.location.href = loginPath;
    }
  }

  private normalizeError(error: AxiosError): ApiError {
    if (error.response) {
      // The backend's own message wins. When the body is empty (this backend
      // sends empty-bodied 401/403 from the security layer), substitute proper
      // French copy instead of axios's "Request failed with status code N".
      const backendMessage = (
        error.response.data as { message?: string } | null
      )?.message;
      const status = error.response.status;
      const fallbackByStatus: Partial<Record<number, string>> = {
        401: "Session expirée ou identifiants invalides.",
        403: "Accès refusé par le serveur.",
      };
      return {
        status,
        message: backendMessage || fallbackByStatus[status] || error.message,
        errors: (
          error.response.data as { errors?: Record<string, string[]> } | null
        )?.errors,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: 0,
      message: error.message || "Network error",
      timestamp: new Date().toISOString(),
    };
  }

  public getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
export default apiClient.getClient();
