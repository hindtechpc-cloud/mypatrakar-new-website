const LoadingSkeleton = ({ count = 4 }) => {
  return (
    <div className="w-[300px] bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
      <div className="h-6 w-1/2 bg-gray-700 rounded mb-6 animate-pulse"></div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex mb-6">
          <div className="w-3 h-3 rounded-full bg-gray-700 mt-1"></div>
          <div className="ml-4 flex-1">
            <div className="h-3 w-1/3 bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
            <div className="h-px w-full bg-gray-700 mt-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;