import { Moon, Sun, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/providers/ThemeProvider";

export const ThemeSwitcher = () => {
  const { t } = useTranslation("common");
  const { mode, setMode } = useTheme();

  const themes = [
    { value: "light", label: t("layout.themeLight"), icon: Sun },
    { value: "dark", label: t("layout.themeDark"), icon: Moon },
    { value: "system", label: t("layout.themeSystem"), icon: Monitor },
  ] as const;

  return (
    <div className="relative group">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-[9px] text-content-secondary transition-colors hover:bg-surface-hover"
        aria-label={t("layout.changeTheme")}
        aria-expanded="false"
        aria-haspopup="true"
      >
        {mode === "light" && <Sun className="h-5 w-5 text-accent-500" />}
        {mode === "dark" && <Moon className="h-5 w-5" />}
        {mode === "system" && <Monitor className="h-5 w-5" />}
      </button>

      <div className="invisible absolute right-0 top-full z-50 mt-2 w-40 translate-y-1 rounded-[14px] border border-border bg-surface py-1.5 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {themes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={`flex w-full items-center gap-2 px-4 py-2 text-[13.6px] transition-colors ${mode === value ? "bg-accent-500/15 text-content" : "text-content-secondary hover:bg-surface-hover hover:text-content"}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{label}</span>
            {mode === value && (
              <span className="ml-auto text-accent-500">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
