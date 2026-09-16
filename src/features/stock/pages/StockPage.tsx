import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export const StockPage = () => {
  const { t } = useTranslation('stock');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title') || 'Stock'}</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('listTitle') || 'Liste'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Page stock - À implémenter
          </p>
        </CardContent>
      </Card>
    </div>
  );
};