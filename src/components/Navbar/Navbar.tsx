import { Link } from "react-router-dom";
import { useState } from "react";
import type { NavbarProps } from "../../types";

const Navbar = ({ activeKey, onChange }: NavbarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <header className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg border-b border-blue-800 dark:border-gray-700 z-50 px-4 md:px-6">
        <div className="max-w-7xl mx-auto w-full flex md:flex-row md:justify-between md:items-center gap-0 md:py-0 md:h-16">
          <div className="flex items-center justify-between w-full md:w-auto py-2 md:py-0">
            <Link to="/" className="text-sm md:text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-200 truncate">MyApp</Link>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden text-white hover:text-blue-100 transition-colors duration-200 text-lg ml-2 flex-shrink-0"
            >
              {isExpanded ? '✕' : '☰'}
            </button>
          </div>
          <nav className="hidden md:flex flex-row gap-3 md:gap-6 items-center py-0">
            <Link to="/" className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-xs md:text-base whitespace-nowrap">Home</Link>
            <Link to="/profile" className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-xs md:text-base whitespace-nowrap">Profiles</Link>
            <Link to="/docs" className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-xs md:text-base whitespace-nowrap">Docs</Link>
            <Link to="/about" className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-xs md:text-base whitespace-nowrap">About</Link>
            <Link to="/users" className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-xs md:text-base whitespace-nowrap">Users</Link>
          </nav>
        </div>
      </header>
      
      {/* Mobile menu dropdown */}
      {isExpanded && (
        <nav className="md:hidden bg-blue-700 dark:bg-gray-800 border-b border-blue-800 dark:border-gray-700 z-40 px-4 py-2 flex flex-col gap-2">
          <Link to="/" onClick={() => setIsExpanded(false)} className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-sm py-2">Home</Link>
          <Link to="/profile" onClick={() => setIsExpanded(false)} className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-sm py-2">Profiles</Link>
          <Link to="/docs" onClick={() => setIsExpanded(false)} className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-sm py-2">Docs</Link>
          <Link to="/about" onClick={() => setIsExpanded(false)} className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-sm py-2">About</Link>
          <Link to="/users" onClick={() => setIsExpanded(false)} className="text-white font-medium hover:text-blue-200 transition-colors duration-200 text-sm py-2">Users</Link>
        </nav>
      )}
    </>
  );
};

export default Navbar;
