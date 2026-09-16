import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

class ApiClient {
  private client: AxiosInstance;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshAccessToken();
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.client(originalRequest);
          } catch {
            this.handleAuthFailure();
            return Promise.reject(error);
          }
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private async refreshAccessToken(): Promise<string> {
    if (!this.refreshTokenPromise) {
      this.refreshTokenPromise = this.performTokenRefresh();
    }

    try {
      const token = await this.refreshTokenPromise;
      return token;
    } finally {
      this.refreshTokenPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken }, { withCredentials: true });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    localStorage.setItem('access_token', accessToken);
    if (newRefreshToken) {
      localStorage.setItem('refresh_token', newRefreshToken);
    }

    return accessToken;
  }

  private handleAuthFailure(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  private normalizeError(error: AxiosError): ApiError {
    if (error.response) {
      return {
        status: error.response.status,
        message: (error.response.data as any)?.message || error.message,
        errors: (error.response.data as any)?.errors,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: 0,
      message: error.message || 'Network error',
      timestamp: new Date().toISOString(),
    };
  }

  public getClient(): AxiosInstance {
    return this.client;
  }

  public setAuthToken(token: string | null): void {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient.getClient();