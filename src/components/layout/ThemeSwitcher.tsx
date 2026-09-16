import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

export const ThemeSwitcher = () => {
  const { mode, setMode } = useTheme();

  const themes = [
    { value: 'light', label: 'Clair', icon: Sun },
    { value: 'dark', label: 'Sombre', icon: Moon },
    { value: 'system', label: 'Système', icon: Monitor },
  ] as const;

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Changer de thème"
        aria-expanded="false"
        aria-haspopup="true"
      >
        {mode === 'light' && <Sun className="h-5 w-5 text-yellow-500" />}
        {mode === 'dark' && <Moon className="h-5 w-5 text-blue-400" />}
        {mode === 'system' && <Monitor className="h-5 w-5 text-gray-500" />}
      </button>

      <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {themes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={`flex w-full items-center gap-2 px-4 py-2 transition-colors ${mode === value ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{label}</span>
            {mode === value && <span className="ml-auto text-primary">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};