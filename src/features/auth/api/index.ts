import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { User } from '@/types/common.types';

const BASE_URL = '/auth';

export const authApi = {
  login: (credentials: { email: string; password: string; rememberMe?: boolean }) =>
    apiClient.post<{ user: User; accessToken: string; refreshToken: string }>(`${BASE_URL}/login`, credentials),

  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    apiClient.post<{ user: User; accessToken: string; refreshToken: string }>(`${BASE_URL}/register`, data),

  logout: () =>
    apiClient.post(`${BASE_URL}/logout`),

  refresh: (refreshToken: string) =>
    apiClient.post<{ accessToken: string; refreshToken: string }>(`${BASE_URL}/refresh`, { refreshToken }),

  me: () =>
    apiClient.get<User>(`${BASE_URL}/me`),

  updateProfile: (data: Partial<User>) =>
    apiClient.put<User>(`${BASE_URL}/profile`, data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.post(`${BASE_URL}/change-password`, data),
};