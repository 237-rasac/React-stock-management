import { extractErrorMessage, extractFieldErrors, isApiError } from '@/api/interceptors';
import { useUIStore } from '@/stores/ui.store';

export class AppError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>,
    public timestamp: string = new Date().toISOString()
  ) {
    super(message);
    this.name = 'AppError';
  }

  static fromApiError(error: unknown): AppError {
    if (isApiError(error)) {
      return new AppError(error.message, error.status, error.errors, error.timestamp);
    }
    if (error instanceof Error) {
      return new AppError(error.message, 0);
    }
    return new AppError('Une erreur inattendue est survenue', 0);
  }
}

export function handleApiError(error: unknown, defaultMessage = 'Une erreur est survenue'): string {
  const message = extractErrorMessage(error) || defaultMessage;

  if (isApiError(error) && error.status === 401) {
    useUIStore.getState().addNotification({
      type: 'error',
      message: 'Session expirée, veuillez vous reconnecter',
    });
  }

  return message;
}

export function handleFormError(error: unknown): Record<string, string> {
  return extractFieldErrors(error);
}

export function showErrorToast(message: string): void {
  useUIStore.getState().addNotification({ type: 'error', message });
}

export function showSuccessToast(message: string): void {
  useUIStore.getState().addNotification({ type: 'success', message });
}

export function showWarningToast(message: string): void {
  useUIStore.getState().addNotification({ type: 'warning', message });
}

export function showInfoToast(message: string): void {
  useUIStore.getState().addNotification({ type: 'info', message });
}