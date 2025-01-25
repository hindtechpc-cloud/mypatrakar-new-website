import React from "react";
import Menu from "../shared/MenuBar";
import ElectionResults from "./ElectionResults";
import { GrPrevious } from "react-icons/gr";
import WonParty from "./WonParty";

export default function Election() {
  return (
    <div>
      <Menu
        menuText={"चुनाव"}
        menu={["All", "मध्य प्रदेश", "उत्तर प्रदेश", "बिहार", "छत्तीसगढ़"]}
      ></Menu>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-gray-800 font-semibold text-xl ">
            Bahraich Lok Sabha Electoin Result 1957 to 2024
          </h2>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button className="bg-gray-300 text-gray-500 text-sm font-semibold p-2 rounded-full shadow-md hover:bg-gray-400 transition-all  hover:text-gray-600">
            <GrPrevious className="text-lg" />
          </button>
          <button className="bg-gray-300  text-sm font-semibold text-gray-500 p-2 rounded-full shadow-md hover:bg-gray-400 transition-all hover:text-gray-600">
            <GrPrevious className="text-lg rotate-180" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between overflow-x-auto gap-5 hide-scroll my-2">
        {Array.from({ length: Math.floor((2024 - 1957) / 5) + 1 }, (_, i) => {
          const year = 1957 + i * 5;
          const isCurrentYear = year === new Date().getFullYear();

          return (
            <p
              key={i}
              className={`text-gray-800 border rounded-full py-1 px-4 ${
                isCurrentYear ? "bg-blue-500 text-white" : ""
              }`}
            >
              {year}
            </p>
          );
        })}
      </div>

      <ElectionResults
        results={{
          red: 20,
          green: 50,
          orange: 30,
        }}
      />
      <WonParty />
    </div>
  );
}
