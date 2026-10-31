import { useEffect, useState } from 'react';
import { Sun, Moon } from "lucide-react";

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

const STORAGE_KEY = 'theme';

export default function ThemeToggle({ className = '' }) {
  const [theme, setThemeState] = useState(THEMES.LIGHT);

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    const initialTheme =
      savedTheme === THEMES.DARK ? THEMES.DARK : THEMES.LIGHT;

    document.documentElement.dataset.theme = initialTheme;
    setThemeState(initialTheme);
  }, []);

  const handleToggle = () => {
    const nextTheme =
      theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
  };

  const isDark = theme === THEMES.DARK;

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`
        btn
        btn-ghost
        btn-sm
        text-base-content
        hover:bg-base-300
        transition-colors
        ${className}
      `}
    >
      {isDark ? (
        <Sun className='text-warning h-5 w-5' />
      ) : (
        <Moon className='text-primary h-5 w-5' />
      )}
    </button>
  );
} 
