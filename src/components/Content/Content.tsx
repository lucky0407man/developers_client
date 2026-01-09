import React from "react";
import type { ContentProps } from "../../types/types";


const Content: React.FC<ContentProps> = ({ selectedItem }) => {
  return (
    <div className="flex-1 h-full overflow-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 p-3 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 break-words">{selectedItem}</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 border border-gray-200 dark:border-gray-700 overflow-auto">
          <p className="text-xs md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed break-words">
            Welcome to the {selectedItem} section. This is a dynamic content area that displays different information based on your selection. 
            Another way is to change the percentage of the flex property of the flex items to create different layouts for different screen sizes. 
            Note that we also have to include flex-wrap: wrap; on the flex container for this example to work:
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700 overflow-auto">
            <p className="text-xs md:text-sm text-blue-900 dark:text-blue-100 break-words">💡 Tip: Click on different items in the sidebar to explore more content!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;