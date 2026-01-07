/**
 * Constants for the application
 */

export const APP_NAME = 'My App';
export const APP_VERSION = '0.1.0';

export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  DOCS: '/docs',
  ABOUT: '/about',
} as const;

export const THEME_STORAGE_KEY = 'app-theme';

export const DEFAULT_THEME = 'light' as const;
