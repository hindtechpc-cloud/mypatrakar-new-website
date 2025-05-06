import React, { useEffect, useState } from "react";
import Menu from "../shared/MenuBar";
import ElectionResults from "./ElectionResults";
import { GrPrevious } from "react-icons/gr";
import WonParty from "./WonParty";
import { GetElectionYear } from "../../../../api";

export default function Election() {
  const [currentState, setCurrentState] = useState("");
  const years = Array.from(
    { length: Math.floor((2024 - 1957) / 5) + 1 },
    (_, i) => 1957 + i * 5
  );
  const currentYear = new Date().getFullYear();
  const [activeYear, setActiveYear] = useState(currentYear);

  const handleScrollRight = () => {
    const index = years.indexOf(activeYear);
    if (index < years.length - 1) {
      setActiveYear(years[index + 1]); // Move to next year
    }
    const element = document.getElementById("won-party");
    if (element) {
      element.scrollBy({
        left: 70, // Moves left by 100px
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    const index = years.indexOf(activeYear);
    if (index > 0) {
      setActiveYear(years[index - 1]); // Move to previous year
    }

    const element = document.getElementById("won-party");
    if (element) {
      element.scrollBy({
        left: -70, // Moves left by 100px
        behavior: "smooth",
      });
    }
  };

  const loadYears = async () => {
    try {
      const res = await GetElectionYear("MYAWR241227001");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadYears();
  }, []);
  return (
    <div>
      <Menu menuText={"चुनाव"} setSubcategory={setCurrentState} menu={[]} />

      <div className="my-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-4">
          {/* Title */}
          <h2 className="text-gray-800 font-bold text-lg sm:text-xl md:text-2xl">
            {currentState} Lok Sabha Election Result {activeYear}
          </h2>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-sm transition"
              onClick={handleScrollLeft}
              aria-label="Scroll left"
            >
              <GrPrevious className="text-base rotate-180" />
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-sm transition"
              onClick={handleScrollRight}
              aria-label="Scroll right"
            >
              <GrPrevious className="text-base" />
            </button>
          </div>
        </div>

        {/* Year Scroll */}
        <div
          className="flex items-center overflow-x-auto gap-3 py-2 scrollbar-hide"
          id="won-party"
        >
          {years.map((year, i) => (
            <button
              key={i}
              className={`whitespace-nowrap border px-4 py-1 rounded-full text-sm font-medium transition duration-200 ${
                activeYear === year
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
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
