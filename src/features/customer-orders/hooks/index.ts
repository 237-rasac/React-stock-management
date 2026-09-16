import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomerOrdersApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useCustomerOrders = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['customer-orders', params],
    queryFn: () => CustomerOrdersApi.getAll(params),
  });
};

export const useCustomerOrder = (id: string) => {
  return useQuery({
    queryKey: ['customer-orders', id],
    queryFn: () => CustomerOrdersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCustomerOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CustomerOrdersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-orders'] });
    },
  });
};

export const useUpdateCustomerOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomerOrders> }) =>
      CustomerOrdersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-orders'] });
    },
  });
};

export const useDeleteCustomerOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CustomerOrdersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-orders'] });
    },
  });
};

import type { CustomerOrders } from '../types';