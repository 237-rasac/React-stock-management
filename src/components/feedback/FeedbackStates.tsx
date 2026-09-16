import { cn } from '@/lib/utils';
import { Loader2, AlertCircle, CheckCircle, XCircle, FileText } from 'lucide-react';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const LoadingState = ({ size = 'md', text = 'Chargement...', className }: LoadingStateProps) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-8', className)}>
      <Loader2 className={cn(sizes[size], 'animate-spin text-primary')} aria-hidden="true" />
      <p className={cn(textSizes[size], 'text-gray-500 dark:text-gray-400')}>{text}</p>
    </div>
  );
};

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12 px-4', className)}>
      {icon && <div className="text-gray-300 dark:text-gray-600 mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
      {description && <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorState = ({ title = 'Une erreur est survenue', message, onRetry, retryLabel = 'Réessayer', className }: ErrorStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12 px-4', className)}>
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Loader2 className="h-4 w-4" aria-hidden="true" />
          {retryLabel}
        </button>
      )}
    </div>
  );
};

interface SuccessStateProps {
  title: string;
  message?: string;
  className?: string;
}

export const SuccessState = ({ title, message, className }: SuccessStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12 px-4', className)}>
      <CheckCircle className="h-12 w-12 text-green-500 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
      {message && <p className="text-gray-500 dark:text-gray-400 max-w-sm">{message}</p>}
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="h-12 px-4 text-left">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-6 space-y-4', className)}>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
    </div>
  );
};