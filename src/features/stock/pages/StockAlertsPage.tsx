import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const StockAlertsPage = () => {
  const { t } = useTranslation('stock');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('alertsTitle') || 'Alertes de stock'}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('alertsListTitle') || 'Liste des alertes'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Page stock alerts - À implémenter
          </p>
        </CardContent>
      </Card>
    </div>
  );
};