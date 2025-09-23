const ShortsEmptyState = ({ onRetry }) => {
  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
      <div className="text-4xl mb-3">📰</div>
      <h3 className="font-semibold text-gray-800 mb-2">No Shorts Available</h3>
      <p className="text-gray-500 text-sm">There are no news shorts to display at the moment.</p>
      <button 
        onClick={onRetry}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ShortsEmptyState;