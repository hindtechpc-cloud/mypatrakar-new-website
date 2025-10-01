import React from "react";

const GameSkeleton = () => {
  return (
    <div className="grid gap-6 my-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="animate-pulse flex flex-col md:flex-row gap-4 "
        >
          {/* Image skeleton */}
          <div className="md:w-[230px] w-full md:h-[129px] sm:h-[365px] h-[228px] bg-gray-300 rounded-lg"></div>

          {/* Content skeleton */}
          <div className="flex flex-col justify-start gap-3 w-full md:w-1/2 mt-2 md:mt-1">
            <div className="h-2 bg-gray-300 rounded w-full"></div>
            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
            <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameSkeleton;
