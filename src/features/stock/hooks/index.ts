import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { StockApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useStock = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['stock', params],
    queryFn: () => StockApi.getAll(params),
  });
};

export const useStockItem = (id: string) => {
  return useQuery({
    queryKey: ['stock', id],
    queryFn: () => StockApi.getById(id),
    enabled: !!id,
  });
};

export const useStockMovements = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['stock', 'movements', params],
    queryFn: () => StockApi.getMovements(params),
  });
};

export const useStockAlerts = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['stock', 'alerts', params],
    queryFn: () => StockApi.getAlerts(params),
  });
};

export const useAdjustStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { quantity: number; reason: string } }) =>
      StockApi.adjust(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] });
    },
  });
};