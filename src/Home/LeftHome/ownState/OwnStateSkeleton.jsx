import React from "react";

export default function OwnStateSkeleton() {
  return (
    <div className="md:flex flex-1 items-start justify-start gap-4 md:gap-6 lg:gap-8 mt-4 animate-pulse">
      {/* Left Side */}
      <section className="flex flex-col gap-2 sm:gap-3 md:gap-4 md:w-1/2 w-full">
        <div className="bg-gray-300 w-full h-[180px] sm:h-[200px] md:h-[240px] rounded-md"></div>

        <div className="w-full bg-gray-300 h-2 rounded-full mt-1"></div>
        <div className="w-full bg-gray-300 h-2 rounded-full"></div>
        <div className="w-1/2 bg-gray-300 h-2 rounded-full"></div>

        <div className="w-full bg-gray-300 h-1.5 rounded-full mt-2"></div>
        <div className="w-full bg-gray-300 h-1.5 rounded-full"></div>
        <div className="w-full bg-gray-300 h-1.5 rounded-full"></div>
        <div className="w-1/2 bg-gray-300 h-1.5 rounded-full"></div>
      </section>

      {/* Right Side */}
      <section className="md:w-1/2 w-full flex flex-col items-start justify-start gap-3 sm:gap-4 md:gap-5 lg:gap-4 md:mt-0 mt-4">
        {[1, 2, 3, 4].map((_, index) => (
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
