import React from "react";

export default function EnterTainmentSkelton() {
  return (
    <div className="md:flex flex-1  items-start justify-start mt-4 gap-4">
      <section className=" w-full flex gap-4 md:mb-0 mb-4">
        <div className="md:w-[300px] w-full  h-[400px] bg-gray-300   rounded-xl">
          <section className="relative top-[200px] left-5 flex flex-col gap-2">
            <div className="rounded-full w-[100px] h-9 mb-3 bg-gray-400/25 flex items-center justify-center">
              {/* <div className="rounded-xl w-[70px] h-3 bg-gray-300"></div> */}
            </div>

            <div className="rounded-xl w-[200px] h-3 bg-gray-400/25"></div>
            <div className="rounded-xl w-[200px] h-3 bg-gray-400/25"></div>
            <div className="rounded-xl w-[200px] h-3 bg-gray-400/25"></div>
            <div className="rounded-xl w-[150px] h-3 bg-gray-400/25"></div>
            <div className="rounded-xl w-[50px] h-3 bg-gray-400/25 mt-3"></div>
          </section>
        </div>
      </section>
      <section className="md:w-1/2 w-full flex flex-col items-start justify-start gap-4 ">
        {[1, 2, 3, 4].map((_, index) => {
          return (
            <div
              className="relative flex items-start justify-start gap-2 "
              key={index}
            >
              <div className="rounded-xl w-[130px] h-[90px] bg-gray-300"></div>
              <div className="md:w-[300px] w-[200px] pt-1 flex flex-col gap-2">
                <div className="rounded-xl w-full h-2 bg-gray-300"></div>
                <div className="rounded-xl w-full h-2 bg-gray-300"></div>
                <div className="rounded-xl w-full h-2 bg-gray-300"></div>
                <div className="rounded-xl md:w-[200px] w-[100px] h-2 bg-gray-300"></div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
