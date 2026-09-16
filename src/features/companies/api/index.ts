import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Companies } from '../types';

const BASE_URL = '/companies';

export const CompaniesApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<Companies>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<Companies>(`${BASE_URL}/${id}`),

  create: (data: Partial<Companies>) =>
    apiClient.post<Companies>(BASE_URL, data),

  update: (id: string, data: Partial<Companies>) =>
    apiClient.put<Companies>(`${BASE_URL}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};