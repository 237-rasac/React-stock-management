import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
] as const;

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Changer de langue"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <Globe className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span className="hidden md:inline font-medium text-gray-700 dark:text-gray-300">{currentLang.label}</span>
        <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" aria-hidden="true" />
      </button>

      <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map(({ code, label, flag }) => (
          <button
            key={code}
            onClick={() => i18n.changeLanguage(code)}
            className={`flex w-full items-center gap-2 px-4 py-2 transition-colors ${i18n.language === code ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <span className="text-lg">{flag}</span>
            <span>{label}</span>
            {i18n.language === code && <span className="ml-auto text-primary">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};