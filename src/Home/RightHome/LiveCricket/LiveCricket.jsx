import React, { useEffect, useState, useRef } from "react";
import Header from "../shared/Header";
import { GetLiveCrickeScore } from "../../../../api";
import { FaCalendarAlt, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import liveCricket from "../../../assets/live-cricket.png";

export default function LiveCricket() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const fetchLiveMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await GetLiveCrickeScore();
      const resData = res?.data?.data;

      if (Array.isArray(resData) && resData.length > 0) {
        setMatches(resData);
      } else {
        setMatches([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch live matches");
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      setTimeout(checkScrollPosition, 100);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [matches]);

  // Match Card
  const MatchCard = ({ match = {} }) => {
    const innings = match?.score?.innings || [];

    return (
      <div className="flex-shrink-0 w-80 bg-white/90 backdrop-blur-md rounded border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 mr-4">
        {/* Header */}
        <div className="p-2">
          <div className="flex justify-between items-center">
            <span className="text-[13px] font-semibold truncate drop-shadow-sm">
              {match?.teams || "Unknown Match"}
            </span>
 
          </div>
        </div>

        {/* Teams/Innings */}
        <div className="px-4 py-2">
          {innings.length > 0 ? (
            innings.map((inn, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-1 border-b last:border-b-0 border-gray-100"
              >
                <span className="font-semibold text-gray-800 text-sm">
                  {inn?.team || `Team ${idx + 1}`}
                </span>
                <span className="text-[13px] text-gray-700 font-medium">
                  {inn?.runs || 0}/{inn?.wickets || 0} ({inn?.overs || 0} ov)
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">No score yet</p>
          )}

          {/* Match Time + Status */}
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-[11px] text-gray-500">
              <FaClock className="text-gray-400 text-[10px]" />
              <span>{match?.match_time || "Today, 08:00 PM"}</span>
            </div>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                match?.match_status?.toLowerCase().includes("live")
                  ? "bg-green-100 text-green-800 animate-pulse"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {match?.match_status || "Upcoming"}
            </span>
          </div>

          {/* Venue */}
          {match?.venue && (
            <div className="mt-2 text-[11px] text-gray-500 leading-snug">
              {match.venue}
            </div>
          )}
        </div>

        {/* Bottom Tabs */}
        <div className="flex border-t border-gray-200">
          <button className="flex-1 py-2 text-center text-xs font-medium text-blue-600 border-r border-gray-200 hover:bg-gray-50">
            POINTS
          </button>
          <button className="flex-1 py-2 text-center text-xs font-medium text-gray-600 hover:bg-gray-50">
            SCHEDULE
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-[9px] xl:w-[335px] lg:w-[295px] w-full mx-auto">
      <Header text="Live Cricket" />

      {/* Matches Section */}
      {!error && !loading && matches?.length > 0 ? (
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full w-7 h-7 flex items-center justify-center shadow border border-gray-200 transition-all duration-200 hover:scale-110"
            >
              <FaChevronLeft className="text-gray-700 text-xs" />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full w-7 h-7 flex items-center justify-center shadow border border-gray-200 transition-all duration-200 hover:scale-110"
            >
              <FaChevronRight className="text-gray-700 text-xs" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-3 scrollbar-hide scroll-smooth"
          >
            <div className="flex space-x-3 pl-2">
              {matches.map((match, index) => (
                <MatchCard key={match?.match_id || index} match={match} />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 shadow-md">
          <ImSpinner8 className="animate-spin text-indigo-600 text-3xl mb-3" />
          <p className="text-gray-700 text-sm font-medium">
            Fetching live scores...
          </p>
        </div>
      )}

      {/* Error / Empty → Show Cricbuzz Image */}
      {(error || (!loading && matches.length === 0)) && (
        <div className="text-center">
          <a
            href="https://www.cricbuzz.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={liveCricket}
              alt="Live cricket fallback"
              className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition"
            />
          </a>
        </div>
      )}

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
