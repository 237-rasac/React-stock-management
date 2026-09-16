import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Moon, Sun, Monitor, Globe } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useTranslation as useI18nTranslation } from 'react-i18next';

export const SettingsPage = () => {
  const { t } = useTranslation('auth');
  const { mode, setMode } = useTheme();
  const { i18n } = useI18nTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settingsTitle') || 'Paramètres'}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t('appearance') || 'Apparence'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('theme') || 'Thème'}
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'light', label: t('light') || 'Clair', icon: Sun },
                { value: 'dark', label: t('dark') || 'Sombre', icon: Moon },
                { value: 'system', label: t('system') || 'Système', icon: Monitor },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setMode(value as 'light' | 'dark' | 'system')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    mode === value
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('language') || 'Langue'}
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { code: 'fr', label: 'Français', flag: '🇫🇷' },
                { code: 'en', label: 'English', flag: '🇺🇸' },
              ].map(({ code, label, flag }) => (
                <button
                  key={code}
                  onClick={() => i18n.changeLanguage(code)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    i18n.language === code
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="text-2xl block mb-2">{flag}</span>
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};