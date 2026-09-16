import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SupplierOrdersApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useSupplierOrders = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['supplier-orders', params],
    queryFn: () => SupplierOrdersApi.getAll(params),
  });
};

export const useSupplierOrder = (id: string) => {
  return useQuery({
    queryKey: ['supplier-orders', id],
    queryFn: () => SupplierOrdersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateSupplierOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SupplierOrdersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-orders'] });
    },
  });
};

export const useUpdateSupplierOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SupplierOrders> }) =>
      SupplierOrdersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-orders'] });
    },
  });
};

export const useDeleteSupplierOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SupplierOrdersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-orders'] });
    },
  });
};

import type { SupplierOrders } from '../types';