import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SalesApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useSales = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['sales', params],
    queryFn: () => SalesApi.getAll(params),
  });
};

export const useSale = (id: string) => {
  return useQuery({
    queryKey: ['sales', id],
    queryFn: () => SalesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SalesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    },
  });
};

export const useUpdateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Sales> }) =>
      SalesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    },
  });
};

export const useDeleteSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SalesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    },
  });
};

import type { Sales } from '../types';