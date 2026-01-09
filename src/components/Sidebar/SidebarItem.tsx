import React from "react";
import type { SidebarItemProps } from "../../types";

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`px-3 md:px-4 py-2 md:py-3 rounded-lg cursor-pointer font-medium transition-all duration-200 text-sm md:text-base truncate ${
        isSelected
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
      title={item}
    >
      {item}
    </div>
  );
};

export default SidebarItem;