import { useEffect, useState } from 'react';

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
        btn-circle
        text-base-content
        hover:bg-base-300
        transition-colors
        ${className}
      `}
    >
      {isDark ? (
        // Sun icon — switch to light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-warning"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon — switch to dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
} 
