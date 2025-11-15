
import React, { useEffect, useState, useRef } from "react";
import Header from "../shared/Header";
import { GetLiveCrickeScore } from "../../../../api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import MatchCard from "./MatchCard";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";

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

      setMatches(Array.isArray(resData) ? resData : []);
    } catch (err) {
      setError(err.message || "Failed to fetch live matches");
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  // scroll functions
  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 340, behavior: "smooth" });

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
    return () => scrollContainer?.removeEventListener("scroll", checkScrollPosition);
  }, [matches]);

  return (
    <div className="mt-[9px] xl:w-[335px] lg:w-[295px] w-full mx-auto">
      <Header text="Live Cricket" />

      {!error && !loading && matches?.length > 0 ? (
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
            >
              <FaChevronLeft className="text-gray-700 text-sm" />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
            >
              <FaChevronRight className="text-gray-700 text-sm" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            <div className="flex space-x-4 pl-2 pr-4">
              {matches.map((match, i) => (
                <div key={match?.match_id || i} className="snap-start">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {loading && <LoadingState />}
      {loading && matches.length<= 0 && <EmptyState />}
      {/* Hide scrollbar */}
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
