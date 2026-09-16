import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { CustomerOrders } from '../types';

const BASE_URL = '/customer-orders';

export const CustomerOrdersApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<CustomerOrders>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<CustomerOrders>(`${BASE_URL}/${id}`),

  create: (data: Partial<CustomerOrders>) =>
    apiClient.post<CustomerOrders>(BASE_URL, data),

  update: (id: string, data: Partial<CustomerOrders>) =>
    apiClient.put<CustomerOrders>(`${BASE_URL}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};