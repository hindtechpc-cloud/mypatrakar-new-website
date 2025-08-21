import React from "react";

const NewsSkeleton = () => {
  return (
    <div className="flex gap-4 animate-pulse p-4 bg-white shadow-sm rounded-xl border border-gray-200 max-w-4xl mx-auto mb-6">
      {/* Image skeleton */}
      <div className="w-32 h-24 bg-gray-200 rounded-md flex-shrink-0" />

      {/* Text skeleton */}
      <div className="flex flex-col justify-between flex-1 space-y-3">
        {/* Title skeleton */}
        <div className="w-3/4 h-5 bg-gray-200 rounded" />
        
        {/* Description lines */}
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-5/6 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default NewsSkeleton;
