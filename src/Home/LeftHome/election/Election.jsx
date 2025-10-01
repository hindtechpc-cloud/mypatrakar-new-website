
import React, { useEffect, useState } from "react";
import Menu from "../shared/MenuBar";
import ElectionResults from "./ElectionResults";
import { GrPrevious, GrNext } from "react-icons/gr";
import { IoStatsChart } from "react-icons/io5";
import { BsCalendar2Event, BsArrowLeftRight } from "react-icons/bs";
import WonParty from "./WonParty";
import { GetElectionPolls, GetElectionYear } from "../../../../api";
import { ImSpinner2 } from "react-icons/im";
import KMBInfoComponent from "./KMBInfoComponent";
import ElectionResultSkeleton from "./ElectionResultSkeleton";
import CandidateResultSkeleton from "./CandidateResultSkeleton";

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

  const sessionExpiry = 30 * 60 * 1000; // 30 min

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

  // Load Polls with SessionStorage
  const loadPolls = async () => {
    try {
      setIsLoading(true);

      const cacheKey = "election_polls";
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > sessionExpiry;

        if (!isExpired && data?.length) {
          setPolls(data);
          setIsLoading(false);
          return;
        }
      }

      const res = await GetElectionPolls();
      const response = res.data.response;

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ data: response, timestamp: Date.now() })
      );

      setPolls(response);
    } catch (error) {
      console.error("Error loading polls:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load Years with SessionStorage
  const loadYears = async (pollId) => {
    try {
      setIsLoading(true);

      const cacheKey = `election_years_${pollId}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > sessionExpiry;

        if (!isExpired && data?.length) {
          setYears(data);
          setInitialYearData(data);
          setIsLoading(false);
          return;
        }
      }

      const res = await GetElectionYear(pollId);
      const response = res.data.response;

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ data: response, timestamp: Date.now() })
      );

      setYears(response);
      setInitialYearData(response);
    } catch (error) {
      console.error("Error loading years:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Set default latest year data
  const setInitialYearData = (response) => {
    if (response.length > 0) {
      const latestYear = response[0];
      setCurrentYearData(latestYear);
      setYearData(latestYear.year, latestYear.political_parties);
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
      setCurrentYearData(selectedYear);
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
  if (isLoading) {
    return(
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-[0px] shadow-lg">
        <Menu menuText={"चुनाव"} setSubcategory={setCurrentState} menu={[]} />
       <div className="mt-2">
         <ElectionResultSkeleton />
         <CandidateResultSkeleton/>
       </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-[0px] shadow-lg">
      <Menu menuText={"चुनाव"} setSubcategory={setCurrentState} menu={[]} />

      <div className="max-w-6xl mx-auto mt-[9px]">
        {/* Header Section */}
        <div className=" rounded-xl px-3  mb-6 ">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4  mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <IoStatsChart className="text-blue-800" />
                {polls[pollIndex]?.name || "Loading Election Data..."}
              </h1>
              <div className="md:flex flex-1 items-center justify-between">
                <p className="text-gray-600 mt-1 flex items-center gap-1">
                  <BsCalendar2Event className="text-blue-400" />
                  Explore historical election results and trends
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className=" hover:bg-blue-50 text-blue-800 p-3 rounded-full  transition-all duration-200 border border-blue-200 hover:shadow-lg"
                onClick={handleLeftScroll}
                aria-label="Previous election"
              >
                <GrPrevious className="text-lg" />
              </button>

              <div className="bg-gradient-to-b from-blue-900 to-blue-950 text-gray-200  px-3 py-1 rounded-full text-sm font-medium">
                {pollIndex + 1} / {polls.length}
              </div>

              <button
                className="bg-white hover:bg-blue-50 text-blue-800 p-3 rounded-full shadow-md transition-all duration-200 border border-blue-200 hover:shadow-lg"
                onClick={handleRightScroll}
                aria-label="Next election"
              >
                <GrNext className="text-lg" />
              </button>
            </div>
          </div>

          {/* Year Selector */}
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <BsArrowLeftRight className="text-blue-800" />
                <span className="font-medium">Select Election Year:</span>
              </div>
              <div>
                <KMBInfoComponent />
              </div>
            </div>
            <div className="flex items-center overflow-x-auto gap-3 py-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 scrollbar-thumb-rounded-full">
              {years?.map((year, i) => (
                <button
                  key={i}
                  className={`whitespace-nowrap px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    currentYear === year.year
                      ? "bg-gradient-to-b from-blue-900 to-blue-950 text-gray-200 shadow-lg"
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

        <ElectionResults results={topThreeParties} />
        <WonParty parties={currentYearData} />
      </div>
    </div>
  );
}
