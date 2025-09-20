import React from "react";

export default function NewsSkeleton() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 animate-pulse my-4">
      {/* Left side — Big news */}
      <div className="">
        <div className="relative md:w-[365px] w-full md:h-[471px] sm:h-[365px] bg-gray-300 h-[228px] rounded overflow-hidden  shadow-2xl  ">
        <div className="absolute bottom-6 left-6 right-6 space-y-2 px-1">
          <div className="h-6 sm:h-7 bg-gray-300 rounded w-5/6"></div>
          <div className="h-6 sm:h-7 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12"></div>
          <div className="h-4 bg-gray-200 rounded w-9/12"></div>
          <div className="h-4 bg-gray-200 rounded w-8/12"></div>
        </div>
        </div>
      </div>

      {/* Right side — List news */}
      <section className="md:w-1/2 w-full flex flex-col items-start justify-start gap-3 sm:gap-4 md:gap-5 lg:gap-4 md:mt-0 mt-4">
        {[1, 2, 3, 4,5].map((_, index) => (
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
