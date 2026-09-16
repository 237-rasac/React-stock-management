import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Notifications } from '../types';

const BASE_URL = '/notifications';

export const NotificationsApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<Notifications>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<Notifications>(`${BASE_URL}/${id}`),

  markAsRead: (id: string) =>
    apiClient.post(`${BASE_URL}/${id}/read`),

  markAllAsRead: () =>
    apiClient.post(`${BASE_URL}/read-all`),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};