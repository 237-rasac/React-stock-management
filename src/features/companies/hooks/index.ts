import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CompaniesApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useCompanies = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['companies', params],
    queryFn: () => CompaniesApi.getAll(params),
  });
};

export const useCompany = (id: string) => {
  return useQuery({
    queryKey: ['companies', id],
    queryFn: () => CompaniesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CompaniesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Companies> }) =>
      CompaniesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CompaniesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

import type { Companies } from '../types';