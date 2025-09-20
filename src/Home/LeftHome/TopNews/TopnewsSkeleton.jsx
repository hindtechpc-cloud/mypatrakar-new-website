import React from "react";

export default function TopnewsSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-6 animate-pulse">
      {/* Featured News Skeleton */}
      <section className="flex flex-col md:flex-row gap-4 w-full">
        {/* Image */}
        <div className="w-full md:w-1/2 h-56 md:h-60 bg-gray-300 rounded-xl"></div>

        {/* Text */}
        <div className="flex flex-col gap-3 w-full md:w-1/2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>

          <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
      </section>

      {/* News List Skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
         <div
            key={index}
            className="w-full flex items-start justify-start gap-2 sm:gap-3 md:gap-2"
          >
            <div className="bg-gray-300 w-[120px] sm:w-[140px] md:w-24 h-[60px] sm:h-[70px] md:h-[70px] rounded-md"></div>

            <div className="w-full flex flex-col gap-2 sm:gap-3 mt-1">
              <div className="md:w-[250px] w-full bg-gray-300 h-2 rounded-full"></div>
              <div className="md:w-[250px] w-full bg-gray-300 h-2 rounded-full"></div>
              <div className="md:w-[200px] w-1/2 bg-gray-300 h-2 rounded-full"></div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
