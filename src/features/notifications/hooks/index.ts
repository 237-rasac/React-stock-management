import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationsApi } from '../api';
import type { RequestParams } from '@/types/api.types';

export const useNotifications = (params?: RequestParams) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => NotificationsApi.getAll(params),
  });
};

export const useNotification = (id: string) => {
  return useQuery({
    queryKey: ['notifications', id],
    queryFn: () => NotificationsApi.getById(id),
    enabled: !!id,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: NotificationsApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: NotificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: NotificationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};