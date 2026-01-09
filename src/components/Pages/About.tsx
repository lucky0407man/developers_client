import { useTheme } from '../../hooks';

export default function About() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="p-3 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4 break-words">About Page</h1>
          <p className="text-xs md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-8 break-words">
            Welcome to the about page. Here you can customize your theme preferences.
          </p>
          <ThemeComponent />
        </div>
      </div>
    </div>
  );
}

function ThemeComponent() {
  const { theme, setTheme } = useTheme();

  const buttonClass = (isActive: boolean) => 
    `w-full sm:w-auto px-2 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-xs md:text-base ${
      isActive 
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
    }`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 md:p-8 border border-gray-200 dark:border-gray-700 overflow-auto">
      <h2 className="text-base md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4 break-words">Theme Settings</h2>
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6 break-words">
        Current theme: <strong className="text-gray-900 dark:text-white">{theme}</strong>
      </p>
      <div className="flex flex-col sm:flex-row gap-2 md:gap-4 flex-wrap">
        <button 
          onClick={() => setTheme('dark')}
          className={buttonClass(theme === 'dark')}
        >
          🌙 Dark
        </button>
        <button 
          onClick={() => setTheme('light')}
          className={buttonClass(theme === 'light')}
        >
          ☀️ Light
        </button>
        <button 
          onClick={() => setTheme('system')}
          className={buttonClass(theme === 'system')}
        >
          💻 System
        </button>
      </div>
    </div>
  );
}
