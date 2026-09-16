import apiClient from '@/api/client';
import type { PaginatedResponse, RequestParams } from '@/types/api.types';
import type { Dashboard } from '../types';

const BASE_URL = '/dashboard';

export const DashboardApi = {
  getKPIs: () =>
    apiClient.get<any>(`${BASE_URL}/kpis`),

  getChartData: (params?: RequestParams) =>
    apiClient.get<any>(`${BASE_URL}/charts`, { params }),
};