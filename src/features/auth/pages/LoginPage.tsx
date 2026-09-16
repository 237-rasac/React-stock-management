import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSchema, type AuthFormData } from '../schemas';
import { useLogin } from '../hooks';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export const LoginPage = () => {
  const { t } = useTranslation('auth');
  const { mutate: login, isPending, error } = useLogin();
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = (data: AuthFormData) => {
    setServerError(null);
    login(data, {
      onError: (err) => {
        setServerError(err.message || t('errors.invalidCredentials'));
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t('subtitle')}</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" required>{t('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                error={errors.email?.message}
                {...register('email')}
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" required>{t('password')}</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  {t('forgotPassword')}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
                disabled={isPending}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('rememberMe')} className="rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('rememberMe')}</span>
              </label>
            </div>

            <Button type="submit" className="w-full" loading={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                t('loginButton')
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('registerLink').split(' ')[0]}{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              {t('registerLink').split(' ').slice(1).join(' ')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};