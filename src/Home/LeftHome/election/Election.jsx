import React, { useState } from "react";
import Menu from "../shared/MenuBar";
import ElectionResults from "./ElectionResults";
import { GrPrevious } from "react-icons/gr";
import WonParty from "./WonParty";

export default function Election() {
  const [currentState,setCurrentState]=useState("")
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

  return (
    <div>
      <Menu
        menuText={"चुनाव"}
        setSubcategory={setCurrentState}
        menu={[]}
      />
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-gray-800 font-semibold text-xl">
            {currentState} Lok Sabha Election Result {" "}{activeYear}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="bg-gray-300 text-gray-500 text-sm font-semibold p-2 rounded-full shadow-md hover:bg-gray-400 transition-all hover:text-gray-600"
            onClick={handleScrollLeft}
          >
            <GrPrevious className="text-lg rotate-180" />
          </button>
          <button
            className="bg-gray-300 text-gray-500 text-sm font-semibold p-2 rounded-full shadow-md hover:bg-gray-400 transition-all hover:text-gray-600"
            onClick={handleScrollRight}
          >
            <GrPrevious className="text-lg" />
          </button>
        </div>
      </div>
      <div
        className="flex items-center justify-between overflow-x-auto gap-5 hide-scroll my-2"
        id="won-party"
      >
        {years.map((year, i) => (
          <p
            key={i}
            className={`text-gray-800 border rounded-full py-1 px-4 cursor-pointer ${
              activeYear === year ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setActiveYear(year)}
          >
            {year}
          </p>
        ))}
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
