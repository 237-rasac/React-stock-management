import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data);
      navigate('/dashboard');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data);
      navigate('/dashboard');
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      navigate('/login');
    },
  });
};

export const useCurrentUser = () => {
  const { user, isAuthenticated, setUser } = useAuthStore();

  return { user, isAuthenticated, setUser };
};