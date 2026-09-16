import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useDashboardKPIs = () => {
  return useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: () => DashboardApi.getKPIs(),
  });
};

export const useDashboardCharts = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['dashboard', 'charts', params],
    queryFn: () => DashboardApi.getChartData(params),
  });
};