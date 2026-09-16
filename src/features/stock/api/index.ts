import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Stock } from '../types';

const BASE_URL = '/stock';

export const StockApi = {
  getAll: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<Stock>>(`${BASE_URL}`, { params }),

  getById: (id: string) =>
    apiClient.get<Stock>(`${BASE_URL}/${id}`),

  getMovements: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<any>>(`${BASE_URL}/movements`, { params }),

  getAlerts: (params?: RequestParams) =>
    apiClient.get<PaginatedResponse<any>>(`${BASE_URL}/alerts`, { params }),

  adjust: (id: string, data: { quantity: number; reason: string }) =>
    apiClient.post(`${BASE_URL}/${id}/adjust`, data),
};