import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const NotificationsPage = () => {
  const { t } = useTranslation('notifications');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title') || 'Notifications'}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('listTitle') || 'Liste'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Page notifications - À implémenter
          </p>
        </CardContent>
      </Card>
    </div>
  );
};