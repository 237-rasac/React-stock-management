import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import { globalResources } from './resources';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    defaultNS: 'common',
    ns: ['common', 'auth', 'dashboard', 'articles', 'customers', 'suppliers', 'orders', 'stock', 'sales', 'notifications', 'users', 'companies', 'categories'],

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    resources: globalResources,
  });

export default i18n;