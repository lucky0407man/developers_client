import { useState } from 'react';
import { sculptureList } from './data';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">Gallery</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <img
            src={sculpture.url}
            alt={sculpture.alt}
            className="w-full h-48 md:h-96 object-cover"
          />
          
          <div className="p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              <i>{sculpture.name}</i>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4">by {sculpture.artist}</p>
            
            <div className="p-4 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <p className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400">
                ({index + 1} of {sculptureList.length})
              </p>
              <button 
                onClick={handleMoreClick}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm md:text-base"
              >
                {showMore ? 'Hide' : 'Show'} details
              </button>
            </div>
            
            {showMore && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{sculpture.description}</p>
              </div>
            )}
            
            <button 
              onClick={handleNextClick}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Next Sculpture
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
