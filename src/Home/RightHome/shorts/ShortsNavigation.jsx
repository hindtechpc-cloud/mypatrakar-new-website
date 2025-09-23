import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ShortsNavigation = ({ 
  currentIndex, 
  totalItems, 
  onScrollUp, 
  onScrollDown,
  isMobile = false 
}) => {
  if (totalItems <= 1) return null;

  return (
    <>
      <div className={`flex ${isMobile ? 'flex-row' : 'flex-col'} gap-3 mt-4 sm:mt-0`}>
        <button
          className={`p-3 rounded-full text-white shadow-md ${
            currentIndex === 0 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-red-600 hover:bg-red-700"
          } transition-colors`}
          onClick={onScrollUp}
          disabled={currentIndex === 0}
        >
          <FaArrowUp size={18} />
        </button>
        
        {!isMobile && (
          <div className="text-center text-xs text-gray-500 py-1">
            {currentIndex + 1} / {totalItems}
          </div>
        )}
        
        <button
          className={`p-3 rounded-full text-white shadow-md ${
            currentIndex === totalItems - 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } transition-colors`}
          onClick={onScrollDown}
          disabled={currentIndex === totalItems - 1}
        >
          <FaArrowDown size={18} />
        </button>
      </div>

      {isMobile && (
        <div className="text-center text-xs text-gray-500 mt-3">
          {currentIndex + 1} of {totalItems}
        </div>
      )}
    </>
  );
};

export default ShortsNavigation;