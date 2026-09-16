import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomersApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useCustomers = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => CustomersApi.getAll(params),
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => CustomersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CustomersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customers> }) =>
      CustomersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CustomersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

import type { Customers } from '../types';