import React from "react";

export default function SmallNewsCardSkeleton() {
  return (
    <div className="w-full flex items-start justify-start gap-2 sm:gap-3 md:gap-2">
      <div className="bg-gray-300 w-[170px] h-[74px]  sm:h-[74px] md:h-[70px] rounded-md"></div>

      <div className="w-full flex flex-col gap-2 sm:gap-3 mt-1">
        <div className="md:w-[200px] w-full bg-gray-300 h-2 rounded-full"></div>
        <div className="md:w-[200px] w-full bg-gray-300 h-2 rounded-full"></div>
        <div className="md:w-[150px] w-1/2 bg-gray-300 h-2 rounded-full"></div>
      </div>
    </div>
  );
}
