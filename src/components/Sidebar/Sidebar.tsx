import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import type { SidebarProps } from "../../types";

const Sidebar: React.FC<SidebarProps> = ({ items, onSelect, selectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-20 right-4 z-40 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200"
        title="Toggle sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`${
        isOpen ? 'flex' : 'hidden'
      } md:flex flex-col fixed md:relative w-64 h-full md:h-auto overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 z-30 left-0 top-16 md:top-auto bottom-16 md:bottom-auto`}>
        <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate">Menu</h3>
        </div>
        <nav className="space-y-1 p-2 overflow-y-auto flex-1">
          {items.map((item) => (
            <SidebarItem
              key={item}
              item={item}
              isSelected={item === selectedItem}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;