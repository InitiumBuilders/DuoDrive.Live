'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
const Ctx = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    let initial: Theme = 'dark';
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const queryTheme = url.searchParams.get('theme');
      if (queryTheme === 'light' || queryTheme === 'dark') {
        initial = queryTheme as Theme;
        try { localStorage.setItem('duodrive-theme', initial); } catch {}
      } else {
        const saved = localStorage.getItem('duodrive-theme') as Theme | null;
        if (saved === 'light' || saved === 'dark') initial = saved;
      }
    }
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('duodrive-theme', next); } catch {}
  };

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative w-12 h-7 rounded-full hairline overflow-hidden ${className}`}
      style={{ background: 'var(--surface)' }}
    >
      <span
        className="absolute top-0.5 w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] flex items-center justify-center text-[10px]"
        style={{
          left: theme === 'dark' ? '2px' : 'calc(100% - 26px)',
          background: theme === 'dark'
            ? 'radial-gradient(circle at 30% 30%, #5CFFD2, #9F7CFF)'
            : 'radial-gradient(circle at 30% 30%, #FFB454, #D6307A)',
          boxShadow: '0 0 16px var(--hairline-strong)',
        }}
      >
        {theme === 'dark' ? '🌙' : '☀'}
      </span>
    </button>
  );
}
