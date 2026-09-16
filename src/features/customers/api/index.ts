import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Customers } from '../types';

const BASE_URL = '/customers';

export const CustomersApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<Customers>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<Customers>(`${BASE_URL}/${id}`),

  create: (data: Partial<Customers>) =>
    apiClient.post<Customers>(BASE_URL, data),

  update: (id: string, data: Partial<Customers>) =>
    apiClient.put<Customers>(`${BASE_URL}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};