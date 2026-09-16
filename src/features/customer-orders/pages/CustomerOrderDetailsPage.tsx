import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const CustomerOrderDetailsPage = () => {
  const { t } = useTranslation('customer-orders');
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/customer-orders" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('detailTitle') || 'Détails'}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commande client #{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Page customer order details - À implémenter
          </p>
        </CardContent>
      </Card>
    </div>
  );
};