import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArticlesApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useArticles = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => ArticlesApi.getAll(params),
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ['articles', id],
    queryFn: () => ArticlesApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ArticlesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Articles> }) =>
      ArticlesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ArticlesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

import type { Articles } from '../types';