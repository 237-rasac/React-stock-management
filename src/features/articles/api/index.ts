import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Articles } from '../types';

const BASE_URL = '/articles';

export const ArticlesApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<Articles>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<Articles>(`${BASE_URL}/${id}`),

  create: (data: Partial<Articles>) =>
    apiClient.post<Articles>(BASE_URL, data),

  update: (id: string, data: Partial<Articles>) =>
    apiClient.put<Articles>(`${BASE_URL}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};