import React from "react";

export default function OwnStateSkeleton() {
  return (
    <div className="md:flex flex-1 items-start justify-start gap-4 mt-4">
      <section className="flex flex-col gap-2 md:w-1/2 w-full">
        <div className="bg-gray-300 w-full h-[200px] rounded-md"></div>
          <div className="w-full bg-gray-300 h-2 rounded-full"></div>
          <div className="w-full bg-gray-300 h-2 rounded-full"></div>
          <div className="w-1/2 bg-gray-300 h-2 rounded-full"></div>
          <div className="w-full bg-gray-300 h-1.5 rounded-full mt-2"></div>
          <div className="w-full bg-gray-300 h-1.5 rounded-full"></div>
          <div className="w-full bg-gray-300 h-1.5 rounded-full"></div>
          <div className="w-1/2 bg-gray-300 h-1.5 rounded-full"></div>

      </section>
      <section className="md:w-1/2 w-full flex flex-col items-start justify-start gap-2 md:mt-0 mt-4">
       {[1, 2, 3, 4, ].map((_, index) => {
          return (
            <div key={index} className="w-full flex items-start justify-start gap-2 ">
              <div className="bg-gray-300 w-[100px] h-20 rounded-md"></div>
              <div className="w-full flex  flex-col gap-2 mt-1">
                <div className="md:w-[300px] w-full bg-gray-300  h-2 rounded-full "></div>
                <div className="md:w-[300px] w-full bg-gray-300  h-2 rounded-full"></div>
                <div className="md:w-[200px] w-1/2 bg-gray-300  h-2 rounded-full"></div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
