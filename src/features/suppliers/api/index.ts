import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Suppliers } from '../types';

const BASE_URL = '/suppliers';

export const SuppliersApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<Suppliers>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<Suppliers>(`${BASE_URL}/${id}`),

  create: (data: Partial<Suppliers>) =>
    apiClient.post<Suppliers>(BASE_URL, data),

  update: (id: string, data: Partial<Suppliers>) =>
    apiClient.put<Suppliers>(`${BASE_URL}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};