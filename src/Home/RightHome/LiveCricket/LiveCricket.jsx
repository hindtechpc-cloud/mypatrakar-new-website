// import React, { useEffect, useState, useRef } from "react";
// import Header from "../shared/Header";
// import { GetLiveCrickeScore } from "../../../../api";
// import { FaCalendarAlt, FaClock, FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from "react-icons/fa";
// import { ImSpinner8 } from "react-icons/im";
// import liveCricket from "../../../assets/live-cricket.jpg";
// import { FiSettings } from "react-icons/fi";
// import { GoDotFill } from "react-icons/go";
// import { FaBaseballBatBall } from "react-icons/fa6";

// export default function LiveCricket() {
//   const [matches, setMatches] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const scrollContainerRef = useRef(null);

//   const fetchLiveMatches = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await GetLiveCrickeScore();
//       const resData = res?.data?.data;

//       if (Array.isArray(resData) && resData.length > 0) {
//         setMatches(resData);
//       } else {
//         setMatches([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Failed to fetch live matches");
//       setMatches([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLiveMatches();
//   }, []);

//   // Scroll functions
//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
//     }
//   };

//   const checkScrollPosition = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftArrow(scrollLeft > 0);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
//     }
//   };

//   useEffect(() => {
//     const scrollContainer = scrollContainerRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener("scroll", checkScrollPosition);
//       setTimeout(checkScrollPosition, 100);
//     }
//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener("scroll", checkScrollPosition);
//       }
//     };
//   }, [matches]);

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "Dec 26, 2024";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', { 
//         month: 'short', 
//         day: 'numeric', 
//         year: 'numeric' 
//       });
//     } catch {
//       return "Dec 26, 2024";
//     }
//   };

//   // Match Card Component
//   const MatchCard = ({ match = {} }) => {
//     const innings = match?.score?.innings || [];
//     const team1 = innings[0] || {};
//     const team2 = innings[1] || {};
//     const isMatchLive = match?.status_text?.toLowerCase().includes('live') || 
//                        match?.status_text?.toLowerCase().includes('innings');

//     return (
//       <div className="flex-shrink-0 md:w-[335px] w-[295px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-3">
//           <div className="flex items-center gap-2">
//             <div className="relative">
//               <GoDotFill className={`text-red-500 text-xl ${isMatchLive ? 'animate-pulse' : ''}`} />
//             </div>
//             <h2 className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
//               Live Cricket
//             </h2>
//           </div>
//           <div className="bg-red-50 p-2 rounded-full group-hover:bg-red-100 transition-colors">
//             <FaBaseballBatBall className="text-red-500 rotate-90" size={20} />
//           </div>
//         </div>

//         {/* Teams & VS */}
//         <div className="text-center mb-4">
//           <div className="flex flex-col items-center justify-between mb-3">
//             <div className="flex-1 text-right">
//               <span className="font-bold text-gray-900 text-sm block truncate">
//                 {team1?.team || "Team A"}
//               </span>
//             </div>
            
//             <div className="mx-3">
//               <span className="bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
//                 VS
//               </span>
//             </div>
            
//             <div className="flex-1 text-left">
//               <span className="font-bold text-gray-900 text-sm block truncate">
//                 {team2?.team || "Team B"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Status Badge */}
//         <div className="mb-4">
//           <div className="inline-flex items-center gap-1 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
//             <GoDotFill className="text-red-500 text-xs" />
//             <span className="text-xs font-medium text-gray-700 truncate">
//               {match?.status_text || "Day 2: Stumps - India trail by 120 runs"}
//             </span>
//           </div>
//         </div>

//         {/* Scores */}
//         <div className="space-y-2 mb-4">
//           <div className="flex justify-between items-center bg-gradient-to-r from-red-50 to-white px-3 py-3 rounded-xl border border-red-100 shadow-sm">
//             <div className="flex items-center gap-2">
//               <FaBaseballBatBall className="text-red-400 rotate-90" size={14} />
//               <span className="text-xs font-semibold text-gray-800 truncate max-w-[80px]">
//                 {team1?.team || "Team A"}
//               </span>
//             </div>
//             <div className="text-right">
//               <span className="font-bold text-gray-900 text-sm">
//                 {team1?.runs || 0}/{team1?.wickets || 0}
//               </span>
//               <span className="text-xs text-gray-500 ml-1">
//                 ({team1?.overs || 0.0} ov)
//               </span>
//             </div>
//           </div>
          
//           <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-white px-3 py-3 rounded-xl border border-gray-200 shadow-sm">
//             <div className="flex items-center gap-2">
//               <FaBaseballBatBall className="text-gray-500 rotate-90" size={14} />
//               <span className="text-xs font-semibold text-gray-800 truncate max-w-[80px]">
//                 {team2?.team || "Team B"}
//               </span>
//             </div>
//             <div className="text-right">
//               <span className="font-bold text-gray-900 text-sm">
//                 {team2?.runs || 0}/{team2?.wickets || 0}
//               </span>
//               <span className="text-xs text-gray-500 ml-1">
//                 ({team2?.overs || 0.0} ov)
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Venue & Date */}
//         <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
//           <div className="flex items-center gap-2">
//             <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
//             <span className="truncate">{match?.venue || "Melbourne Cricket Ground"}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <FaCalendarAlt className="text-gray-400 flex-shrink-0" />
//             <span>{formatDate(match?.date)}</span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         {/* <div className="flex gap-2 mt-4">
//           <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-xs font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md">
//             Points
//           </button>
//           <button className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white text-xs font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md">
//             Schedule
//           </button>
//         </div> */}
//       </div>
//     );
//   };

//   return (
//     <div className="mt-[9px] xl:w-[335px] lg:w-[295px] w-full mx-auto">
//       <Header text="Live Cricket" />

//       {/* Matches Section */}
//       {!error && !loading && matches?.length > 0 ? (
//         <div className="relative">
//           {/* Navigation Arrows */}
//           {showLeftArrow && (
//             <button
//               onClick={scrollLeft}
//               className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 active:scale-95"
//               aria-label="Scroll left"
//             >
//               <FaChevronLeft className="text-gray-700 text-sm" />
//             </button>
//           )}
//           {showRightArrow && (
//             <button
//               onClick={scrollRight}
//               className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 active:scale-95"
//               aria-label="Scroll right"
//             >
//               <FaChevronRight className="text-gray-700 text-sm" />
//             </button>
//           )}

//           {/* Scrollable Container */}
//           <div
//             ref={scrollContainerRef}
//             className="flex overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
//           >
//             <div className="flex space-x-4 pl-2 pr-4">
//               {matches.map((match, index) => (
//                 <div key={match?.match_id || index} className="snap-start">
//                   <MatchCard match={match} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Scroll Indicator Dots */}
//           {/* {matches.length > 1 && (
//             <div className="flex justify-center space-x-1.5 mt-3">
//               {matches.map((_, index) => (
//                 <div 
//                   key={index}
//                   className="w-1.5 h-1.5 rounded-full bg-gray-300 transition-all duration-300"
//                 />
//               ))}
//             </div>
//           )} */}
//         </div>
//       ) : null}

//       {/* Loading State */}
//       {loading && (
//         <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-gray-50 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg">
//           <div className="relative">
//             <ImSpinner8 className="animate-spin text-indigo-600 text-4xl mb-4" />
//             <div className="absolute inset-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//           </div>
//           <p className="text-gray-700 font-medium mt-2">
//             Fetching live scores...
//           </p>
//           <p className="text-gray-500 text-sm mt-1">
//             Getting the latest match updates
//           </p>
//         </div>
//       )}

//       {/* Error / Empty State */}
//       {(!error || (!loading && matches.length!= 0)) && (
//         <div className="text-center">
      
//           <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
//                   <div className="flex justify-between items-center mb-3">
//           <div className="flex items-center gap-2">
//             <div className="relative">
//               <GoDotFill className={`text-red-500 text-xl`} />
//             </div>
//             <h2 className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
//               Live Cricket
//             </h2>
//           </div>
//           <div className="bg-red-50 p-2 rounded-full group-hover:bg-red-100 transition-colors">
//             <FaBaseballBatBall className="text-red-500 rotate-90" size={20} />
//           </div>
//         </div>
//             <a
//               href="https://www.cricbuzz.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block"
//             >
//               <img
//                 src={liveCricket}
//                 alt="Live cricket scores on Cricbuzz"
//                 className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
//               />
//             </a>
//             {/* <button
//               onClick={fetchLiveMatches}
//               className="mt-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md"
//             >
//               Try Again
//             </button> */}
//           </div>
//         </div>
//       )}

//       {/* Custom Scrollbar Hide */}
//       <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }




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
