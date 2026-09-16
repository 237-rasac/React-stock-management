import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoriesApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useCategories = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => CategoriesApi.getAll(params),
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => CategoriesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CategoriesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Categories> }) =>
      CategoriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CategoriesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

import type { Categories } from '../types';