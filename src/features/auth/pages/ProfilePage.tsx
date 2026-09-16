import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Mail, Phone, Building } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';

export const ProfilePage = () => {
  const { t } = useTranslation('auth');
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profileTitle') || 'Mon profil'}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t('profileInfo') || 'Informations personnelles'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {user?.roles.map((r) => t(`roles.${r.toLowerCase()}`) || r).join(', ') || 'Aucun rôle'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('email') || 'Email'}</p>
                <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('phone') || 'Téléphone'}</p>
                <p className="font-medium text-gray-900 dark:text-white">{user?.phone || 'Non renseigné'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};