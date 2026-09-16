import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SuppliersApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useSuppliers = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['suppliers', params],
    queryFn: () => SuppliersApi.getAll(params),
  });
};

export const useSupplier = (id: string) => {
  return useQuery({
    queryKey: ['suppliers', id],
    queryFn: () => SuppliersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SuppliersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Suppliers> }) =>
      SuppliersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SuppliersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });
};

import type { Suppliers } from '../types';