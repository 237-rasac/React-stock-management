import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useUsers = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => UsersApi.getAll(params),
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => UsersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Users> }) =>
      UsersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UsersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

import type { Users } from '../types';