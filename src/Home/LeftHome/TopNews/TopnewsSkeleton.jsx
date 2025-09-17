import React from "react";

export default function TopnewsSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <section className="relative md:flex flex-1 items-start justify-start gap-2">
        <div className="md:w-1/2 w-full bg-gray-300 h-[200px] rounded-md"></div>
        <div className="md:w-1/2 w-full flex flex-col items-start justify-start gap-2 mt-1">
          <div className="w-full bg-gray-300 h-2.5 rounded-full"></div>
          <div className="w-full bg-gray-300 h-2.5 rounded-full"></div>
          <div className="w-full bg-gray-300 h-2.5 rounded-full"></div>
          <div className="w-1/2  bg-gray-300 h-2.5 rounded-full"></div>
          <div className="w-full bg-gray-300 h-1.5 rounded-full mt-2"></div>
          <div className="w-full bg-gray-300 h-1.5 rounded-full"></div>
          {/* <div className="w-full bg-gray-300 h-1.5 rounded-full"></div> */}
          <div className="w-full bg-gray-300 h-1.5 rounded-full"></div>
          <div className="md:w-1/2 w-full bg-gray-300 h-1.5 rounded-full"></div>
        </div>
      </section>
      <section className="w-full sm:flex flex-1 sm:flex-wrap  items-start justify-start gap-2">
        {[1, 2, 3, 4, 5, 6].map((_, index) => {
          return (
            <div key={index} className="flex items-start justify-start gap-2 md:mt-0 mt-2">
              <div className="bg-gray-300 w-[100px] h-20 rounded-md"></div>
              <div className="w-full flex  flex-col gap-2 mt-1">
                <div className="md:w-[300px] sm:w-[200px] w-full bg-gray-300  h-2 rounded-full "></div>
                <div className="md:w-[300px] sm:w-[200px] w-full bg-gray-300  h-2 rounded-full"></div>
                <div className="md:w-[200px]  w-1/2 bg-gray-300  h-2 rounded-full"></div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
