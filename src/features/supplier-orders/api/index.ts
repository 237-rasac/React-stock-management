import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { SupplierOrders } from '../types';

const BASE_URL = '/supplier-orders';

export const SupplierOrdersApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<SupplierOrders>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<SupplierOrders>(`${BASE_URL}/${id}`),

  create: (data: Partial<SupplierOrders>) =>
    apiClient.post<SupplierOrders>(BASE_URL, data),

  update: (id: string, data: Partial<SupplierOrders>) =>
    apiClient.put<SupplierOrders>(`${BASE_URL}/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`${BASE_URL}/${id}`),
};