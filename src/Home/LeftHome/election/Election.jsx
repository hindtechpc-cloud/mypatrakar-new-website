import React, { useEffect, useState } from "react";
import Menu from "../shared/MenuBar";
import ElectionResults from "./ElectionResults";
import { GrPrevious } from "react-icons/gr";
import WonParty from "./WonParty";
import { GetElectionPolls, GetElectionYear } from "../../../../api";

export default function Election() {
  const [currentYear, setCurrentYear] = useState();
  const [state, setCurrentState] = useState();
  const [polls, setPolls] = useState([]);
  const [pollIndex, setPollIndex] = useState(0);
  const [years, setYears] = useState([]);
  const [parties, setParties] = useState([]);
  const [topThreeParties, setTopThreeParties] = useState([]);

  const handleLeftScroll = () => {
    setPollIndex((prevIndex) => (prevIndex === 0 ? polls.length - 1 : prevIndex - 1));
  };

  const handleRightScroll = () => {
    setPollIndex((prevIndex) => (prevIndex === polls.length - 1 ? 0 : prevIndex + 1));
  };

  const loadPolls = async () => {
    try {
      const res = await GetElectionPolls();
      setPolls(res.data.response);
    } catch (error) {
      console.error("Error loading polls:", error);
    }
  };

  const loadYears = async (pollId) => {
    try {
      const res = await GetElectionYear(pollId);
      setYears(res.data.response);
      if (res.data.response.length > 0) {
        const partiesData = res.data.response[0].political_parties;
        setParties(partiesData);
        const sortedParties = [...partiesData].sort((a, b) => b.votes - a.votes);
        setTopThreeParties(sortedParties.slice(0, 3));
      }
    } catch (error) {
      console.error("Error loading years:", error);
    }
  };

  useEffect(() => {
    loadPolls();
  }, []);

  useEffect(() => {
    if (polls.length > 0) {
      loadYears(polls[pollIndex].poll_id);
    }
  }, [polls, pollIndex]);

  const handleCurrentYear = (year) => {
    setCurrentYear(year);
    const selectedYear = years.find((result) => result.year === year);
    setParties(selectedYear ? selectedYear.political_parties : []);
    if (selectedYear) {
      const sortedParties = [...selectedYear.political_parties].sort((a, b) => b.votes - a.votes);
      setTopThreeParties(sortedParties.slice(0, 3));
    }
  };

  return (
    <div>
      <Menu menuText={"चुनाव"} setSubcategory={setCurrentState} menu={[]} />

      <div className="my-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-4">
          <h2 className="text-gray-800 font-bold text-lg sm:text-xl md:text-2xl">
            {polls[pollIndex]?.name || "Loading..."}
          </h2>
          <div className="flex items-center gap-3">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-sm transition" onClick={handleLeftScroll} aria-label="Scroll left">
              <GrPrevious className="text-base rotate-180" />
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-sm transition" onClick={handleRightScroll} aria-label="Scroll right">
              <GrPrevious className="text-base" />
            </button>
          </div>
        </div>

        <div className="flex items-center overflow-x-auto gap-3 py-2 scrollbar-hide" id="won-party">
          {years.map((year, i) => (
            <button key={i} className={`whitespace-nowrap border px-4 py-1 rounded-full text-sm font-medium transition duration-200 ${currentYear === year.year ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`} onClick={() => handleCurrentYear(year.year)}>
              {year.year}
            </button>
          ))}
        </div>
      </div>

      <ElectionResults results={topThreeParties} />
      <WonParty parties={parties} />
    </div>
  );
}
