import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Users } from '../types';

const BASE_URL = '/users';

export const UsersApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<Users>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<Users>(`${BASE_URL}/${id}`),

  create: (data: Partial<Users>) =>
    apiClient.post<Users>(BASE_URL, data),

  update: (id: string, data: Partial<Users>) =>
    apiClient.put<Users>(`${BASE_URL}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};