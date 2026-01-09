import { createContext, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme, setEffectiveTheme } from '../store/slices/themeSlice';
import type { Theme, ThemeContextValue } from '../types/types';
import type { ThemeProviderProps } from '../types/types';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(state => state.theme.mode) as Theme;

  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved && saved !== themeMode) {
      dispatch(setTheme(saved));
    }
  }, [themeMode, dispatch]);

  // Update effective theme and document classes
  useEffect(() => {
    const newEffectiveTheme = themeMode === 'system' ? getSystemTheme() : themeMode;
    dispatch(setEffectiveTheme(newEffectiveTheme));

    const root = document.documentElement;
    if (newEffectiveTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [themeMode, dispatch]);

  // Listen for system theme changes
  useEffect(() => {
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => {
        const newEffectiveTheme = mediaQuery.matches ? 'dark' : 'light';
        dispatch(setEffectiveTheme(newEffectiveTheme));
        
        const root = document.documentElement;
        if (newEffectiveTheme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.remove('dark');
          root.classList.add('light');
        }
      };

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [themeMode, dispatch]);

  const value: ThemeContextValue = {
    theme: themeMode,
    setTheme: (newTheme: Theme) => {
      dispatch(setTheme(newTheme));
      localStorage.setItem('theme', newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
