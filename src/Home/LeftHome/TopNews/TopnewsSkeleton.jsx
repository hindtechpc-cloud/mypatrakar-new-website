import React from "react";
import SmallNewsCardSkeleton from "../shared/SmallNewsCardSkeleton";

export default function TopnewsSkeleton() {
  return (
    <div className="my-4 flex flex-col gap-6 animate-pulse">
      {/* Featured News Skeleton */}
      <section className="flex flex-col md:flex-row gap-4 w-full">
        {/* Image */}
        <div className="md:w-[365px] md:h-[205px] w-full sm:h-[365px] h-[228px]   bg-gray-300 rounded-xl"></div>

        {/* Text */}
        <div className="flex flex-col gap-3 w-full md:w-1/2 mt-1">
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
          <div key={index}>
            <SmallNewsCardSkeleton />
          </div>
        ))}
      </section>
    </div>
  );
}
