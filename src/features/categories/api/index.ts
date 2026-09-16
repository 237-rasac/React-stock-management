import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Categories } from '../types';

const BASE_URL = '/categories';

export const CategoriesApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<Categories>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<Categories>(`${BASE_URL}/${id}`),

  create: (data: Partial<Categories>) =>
    apiClient.post<Categories>(BASE_URL, data),

  update: (id: string, data: Partial<Categories>) =>
    apiClient.put<Categories>(`${BASE_URL}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};