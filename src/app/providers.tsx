import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};