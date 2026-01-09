import { useState } from 'react';

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer className="sticky bottom-0 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-black dark:to-gray-900 text-white border-t border-gray-700 dark:border-gray-600 z-50 px-3 md:px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex md:flex-row md:justify-between md:items-center gap-2 md:gap-0 py-2 md:py-4">
          <p className="text-gray-300 text-xs md:text-sm flex-1 truncate">© 2026 MyApp. All rights reserved.</p>
          <div className="hidden md:flex flex-row gap-4 md:gap-6">
            <button className="text-gray-300 hover:text-white transition-colors duration-200 text-xs md:text-base whitespace-nowrap">Privacy</button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200 text-xs md:text-base whitespace-nowrap">Terms</button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200 text-xs md:text-base whitespace-nowrap">Contact</button>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-200 text-lg flex-shrink-0"
          >
            {isExpanded ? '✕' : '☰'}
          </button>
        </div>
        {isExpanded && (
          <div className="md:hidden flex flex-col gap-1 pb-2 border-t border-gray-700 overflow-y-auto max-h-32">
            <button className="text-gray-300 hover:text-white transition-colors duration-200 text-xs md:text-sm text-left py-2 truncate">Privacy</button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200 text-xs md:text-sm text-left py-2 truncate">Terms</button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200 text-xs md:text-sm text-left py-2 truncate">Contact</button>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
