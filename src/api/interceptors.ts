import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface RequestConfig extends AxiosRequestConfig {
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error &&
    'timestamp' in error
  );
};

export const extractErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const extractFieldErrors = (error: unknown): Record<string, string> => {
  if (isApiError(error) && error.errors) {
    const fieldErrors: Record<string, string> = {};
    Object.entries(error.errors).forEach(([field, messages]) => {
      fieldErrors[field] = messages[0];
    });
    return fieldErrors;
  }
  return {};
};