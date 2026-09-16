import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Sales } from '../types';

const BASE_URL = '/sales';

export const SalesApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<Sales>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<Sales>(`${BASE_URL}/${id}`),

  create: (data: Partial<Sales>) =>
    apiClient.post<Sales>(BASE_URL, data),

  update: (id: string, data: Partial<Sales>) =>
    apiClient.put<Sales>(`${BASE_URL}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};