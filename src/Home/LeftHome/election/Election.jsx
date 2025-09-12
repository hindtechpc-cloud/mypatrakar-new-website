// import React, { useEffect, useState } from "react";
// import Menu from "../shared/MenuBar";
// import ElectionResults from "./ElectionResults";
// import { GrPrevious } from "react-icons/gr";
// import WonParty from "./WonParty";
// import { GetElectionPolls, GetElectionYear } from "../../../../api";

// export default function Election() {
//   const [currentYear, setCurrentYear] = useState();
//   const [state, setCurrentState] = useState();
//   const [polls, setPolls] = useState([]);
//   const [pollIndex, setPollIndex] = useState(1);
//   const [years, setYears] = useState([]);
//   const [parties, setParties] = useState([]);
//   const [topThreeParties, setTopThreeParties] = useState([]);
//   console.log(topThreeParties)
//   const handleLeftScroll = () => {
//     setPollIndex((prevIndex) => (prevIndex === 0 ? polls.length - 1 : prevIndex - 1));
//   };
//   const handleRightScroll = () => {
//     setPollIndex((prevIndex) => (prevIndex === polls.length - 1 ? 0 : prevIndex + 1));
//   };

//   const loadPolls = async () => {
//     try {
//       const res = await GetElectionPolls();
//       console.log(res);
//       setPolls(res.data.response);
//     } catch (error) {
//       console.log(error);
//       console.error("Error loading polls:", error);
//     }
//   };

//   const loadYears = async (pollId) => {
//     try {
//       const res = await GetElectionYear(pollId);
//       console.log(res);
//       setYears(res.data.response);
//       if (res.data.response.length > 0) {
//         const partiesData = res.data.response[0].political_parties;
//         setParties(partiesData);
//         const sortedParties = [...partiesData].sort((a, b) => b.votes - a.votes);
//         setTopThreeParties(sortedParties.slice(0, 3));
//       }
//     } catch (error) {
//       console.error("Error loading years:", error);
//     }
//   };

//   useEffect(() => {
//     loadPolls();
//   }, []);

//   useEffect(() => {
//     if (polls.length > 0) {
//       loadYears(polls[pollIndex].poll_id);
//     }
//   }, [polls, pollIndex]);

//   const handleCurrentYear = (year) => {
//     setCurrentYear(year);
//     const selectedYear = years.find((result) => result.year === year);
//     setParties(selectedYear ? selectedYear.political_parties : []);
//     if (selectedYear) {
//       const sortedParties = [...selectedYear.political_parties].sort((a, b) => b.votes - a.votes);
//       setTopThreeParties(sortedParties.slice(0, 3));
//     }
//   };

//   return (
//     <div>
//       <Menu menuText={"चुनाव"} setSubcategory={setCurrentState} menu={[]} />

//       <div className="my-3">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-4">
//           <h2 className="text-gray-800 font-bold text-lg sm:text-xl md:text-2xl">
//             {polls[pollIndex]?.name || "Loading..."}
//           </h2>
//           <div className="flex items-center gap-3">
//             <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-sm transition" onClick={handleLeftScroll} aria-label="Scroll left">
//               <GrPrevious className="text-base rotate-180" />
//             </button>
//             <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-sm transition" onClick={handleRightScroll} aria-label="Scroll right">
//               <GrPrevious className="text-base" />
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center overflow-x-auto gap-3 py-2 scrollbar-hide" id="won-party">
//           {years.map((year, i) => (
//             <button key={i} className={`whitespace-nowrap border px-4 py-1 rounded-full text-sm font-medium transition duration-200 ${currentYear === year.year ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`} onClick={() => handleCurrentYear(year.year)}>
//               {year.year}
//             </button>
//           ))}
//         </div>
//       </div>

//       <ElectionResults results={topThreeParties} />
//       <WonParty parties={parties} />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Menu from "../shared/MenuBar";
import ElectionResults from "./ElectionResults";
import { GrPrevious, GrNext } from "react-icons/gr";
import { IoStatsChart } from "react-icons/io5";
import { BsCalendar2Event, BsArrowLeftRight } from "react-icons/bs";
import WonParty from "./WonParty";
import { GetElectionPolls, GetElectionYear } from "../../../../api";
import { ImSpinner2 } from "react-icons/im";

export default function Election() {
  const [currentYear, setCurrentYear] = useState();
  const [state, setCurrentState] = useState();
  const [polls, setPolls] = useState([]);
  const [pollIndex, setPollIndex] = useState(0);
  const [currentYearData, setCurrentYearData] = useState();
  const [years, setYears] = useState([]);
  const [parties, setParties] = useState([]);
  const [topThreeParties, setTopThreeParties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLeftScroll = () => {
    setPollIndex((prevIndex) =>
      prevIndex === 0 ? polls.length - 1 : prevIndex - 1
    );
  };

  const handleRightScroll = () => {
    setPollIndex((prevIndex) =>
      prevIndex === polls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const loadPolls = async () => {
    try {
      setIsLoading(true);
      const res = await GetElectionPolls();
      setPolls(res.data.response);
    } catch (error) {
      console.error("Error loading polls:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadYears = async (pollId) => {
    try {
      setIsLoading(true);
      const res = await GetElectionYear(pollId);
      setYears(res.data.response);

      if (res.data.response.length > 0) {
        // By default -> latest year
        const latestYear = res.data.response[0];
        setCurrentYearData(latestYear);
        setYearData(latestYear.year, latestYear.political_parties);
      }
    } catch (error) {
      console.error("Error loading years:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setYearData = (year, partiesData) => {
    setCurrentYear(year);
    setParties(partiesData || []);
    if (partiesData) {
      const sortedParties = [...partiesData].sort((a, b) => b.votes - a.votes);
      setTopThreeParties(sortedParties.slice(0, 3));
    }
  };

  const handleCurrentYear = (year) => {
    const selectedYear = years.find((result) => result.year === year);
    if (selectedYear) {
      // console.log(selectedYear)
      setCurrentYearData(selectedYear)
      setYearData(selectedYear.year, selectedYear.political_parties);
    }
  };

  useEffect(() => {
    loadPolls();
  }, []);

  useEffect(() => {
    if (polls.length > 0) {
      loadYears(polls[pollIndex]?.poll_id);
    }
  }, [polls, pollIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6">
      <Menu menuText={"चुनाव"} setSubcategory={setCurrentState} menu={[]} />

      <div className="max-w-6xl mx-auto mt-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <IoStatsChart className="text-blue-600" />
                {polls[pollIndex]?.name || "Loading Election Data..."}
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-1">
                <BsCalendar2Event className="text-blue-400" />
                Explore historical election results and trends
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="bg-white hover:bg-blue-50 text-blue-600 p-3 rounded-full shadow-md transition-all duration-200 border border-blue-200 hover:shadow-lg"
                onClick={handleLeftScroll}
                aria-label="Previous election"
              >
                <GrPrevious className="text-lg" />
              </button>

              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {pollIndex + 1} / {polls.length}
              </div>

              <button
                className="bg-white hover:bg-blue-50 text-blue-600 p-3 rounded-full shadow-md transition-all duration-200 border border-blue-200 hover:shadow-lg"
                onClick={handleRightScroll}
                aria-label="Next election"
              >
                <GrNext className="text-lg" />
              </button>
            </div>
          </div>

          {/* Year Selector */}
          <div className="mb-2">
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <BsArrowLeftRight className="text-blue-500" />
              <span className="font-medium">Select Election Year:</span>
            </div>
            <div className="flex items-center overflow-x-auto gap-3 py-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 scrollbar-thumb-rounded-full">
              {years.map((year, i) => (
                <button
                  key={i}
                  className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    currentYear === year.year
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 shadow-sm"
                  }`}
                  onClick={() => handleCurrentYear(year.year)}
                >
                  {year.year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className=" text-center">
              <ImSpinner2 className="animate-spin text-red-500" size={50} />
            </div>
          </div>
        ) : (
          <>
            <ElectionResults results={topThreeParties} />
            <WonParty parties={currentYearData} />
          </>
        )}
      </div>
    </div>
  );
}
