import React from "react";

export const Skeleton = ({ className = "", count = 1 }) => {
  // If multiple skeletons are needed (for count > 1)
  if (count > 1) {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className={`bg-gray-200 animate-pulse rounded-xl ${className}`}
          />
        ))}
      </>
    );
  }

  return (
    <div className={`bg-gray-200 animate-pulse rounded-xl ${className}`} />
  );
};

// Specific skeleton card for ads
export const AdCardSkeleton = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
      {/* Image skeleton */}
      <div className="h-48 sm:h-52 bg-gray-200 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
        
        {/* Info grid skeleton */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        
        {/* Button skeleton */}
        <div className="mt-4 h-8 w-24 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};