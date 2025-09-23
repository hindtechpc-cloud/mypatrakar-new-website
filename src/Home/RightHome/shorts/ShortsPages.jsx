// import {
//   FaArrowUp,
//   FaArrowDown,
//   FaShareAlt,
//   FaArrowCircleLeft,
//   FaSync,
// } from "react-icons/fa";
// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { NewsContext } from "../../../context/NewsContext";
// import { WebThemeContext } from "../../../context/ThemeContext";
// import { GetShortsNews } from "../../../../api";
// import HtmlToPlainText from "../../../utils/HtmlToPlainText";
// import { encryptData } from "../../../utils/cryptoHelper";
// import ShortsClap from "./ShortsClap";
// import { checkAuth } from "../../../utils/checkAuth";
// import SkeletonCard from "./SkeletonCard";

// const ShortsPages = () => {
//   const { setNews } = useContext(NewsContext);
//   const { webTheme } = useContext(WebThemeContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const user = JSON.parse(sessionStorage.getItem("user"));

//   const [shorts, setShorts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const handleNewsContent = (news) => {
//     setNews(news);
//     navigate(`/read-news/shorts/${encryptData(news.short_news_id)}`);
//   };

//   const handleScrollDown = () => {
//     if (currentIndex < shorts.length - 1) {
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   const handleScrollUp = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   const loadShorts = async (forceRefresh = false) => {
//     // Check if we have cached data and it's not expired (30 minutes)
//     const cachedShorts = sessionStorage.getItem('cachedShorts');
//     const cacheTimestamp = sessionStorage.getItem('shortsCacheTimestamp');
//     const now = new Date().getTime();
//     const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    
//     if (cachedShorts && cacheTimestamp && !forceRefresh && (now - parseInt(cacheTimestamp)) < thirtyMinutes) {
//       // Use cached data
//       setShorts(JSON.parse(cachedShorts));
//       setLastUpdated(parseInt(cacheTimestamp));
//       setLoading(false);
//       return;
//     }

//     // Otherwise fetch new data
//     setLoading(true);
//     if (forceRefresh) setRefreshing(true);

//     try {
//       const res = await GetShortsNews("MYAWR241227001");
//       if (res) {
//         const shortsData = res.data.response.news;
//         setShorts(shortsData);
        
//         // Cache the data with timestamp
//         const timestamp = new Date().getTime();
//         sessionStorage.setItem('cachedShorts', JSON.stringify(shortsData));
//         sessionStorage.setItem('shortsCacheTimestamp', timestamp.toString());
//         setLastUpdated(timestamp);
//       }
//     } catch (error) {
//       console.error("Error fetching shorts:", error);
      
//       // Fallback to cached data if available
//       if (cachedShorts) {
//         setShorts(JSON.parse(cachedShorts));
//       }
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleRefresh = () => {
//     loadShorts(true);
//   };

//   const formatTimeSinceUpdate = (timestamp) => {
//     if (!timestamp) return "Never";
    
//     const now = new Date().getTime();
//     const diff = now - timestamp;
//     const minutes = Math.floor(diff / 60000);
    
//     if (minutes < 1) return "Just now";
//     if (minutes < 60) return `${minutes} min ago`;
    
//     const hours = Math.floor(minutes / 60);
//     return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//   };

//   useEffect(() => {
//     loadShorts();
//   }, []);

//   const currentShort = shorts[currentIndex];

//   return (
//     <div className="max-w-md mx-auto px-4 py-4">
//       {/* Header with back button and refresh */}
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition duration-300"
//         >
//           <FaArrowCircleLeft size={23} />
//         </button>
        
//         <div className="flex items-center gap-3">
//           {lastUpdated && (
//             <span className="text-xs text-gray-500">
//               Updated: {formatTimeSinceUpdate(lastUpdated)}
//             </span>
//           )}
//           <button
//             onClick={handleRefresh}
//             disabled={refreshing}
//             className={`p-2 rounded-full ${refreshing 
//               ? "bg-gray-200 text-gray-500" 
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             } transition duration-300`}
//           >
//             <FaSync className={refreshing ? "animate-spin" : ""} />
//           </button>
//         </div>
//       </div>

//       <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-3 items-center justify-center mt-4">
//         {/* Shorts Card */}
//         {loading ? (
//           <SkeletonCard />
//         ) : shorts.length > 0 ? (
//           <div className="h-[75vh] max-h-[600px] w-full sm:w-[350px] flex items-center justify-center">
//             <div className="bg-white w-full h-full rounded-2xl shadow-lg pb-3 relative border border-gray-100 flex flex-col overflow-hidden">
//               {/* Header Image Section */}
//               <div className="relative rounded-t-2xl h-48 overflow-hidden">
//                 <img
//                   src={webTheme["web-logo"]}
//                   alt="Source"
//                   className="w-10 h-10 rounded-full object-cover absolute m-3 z-10 border-2 border-white shadow-sm"
//                 />
//                 <img
//                   src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
//                     currentShort?.news_img
//                   }`}
//                   alt={currentShort.news_title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.src = "https://via.placeholder.com/350x200?text=Image+Not+Found";
//                   }}
//                 />
//                 <div className="absolute bottom-3 right-3">
//                   <ShortsClap
//                     news_id={currentShort.short_news_id}
//                     user_id={user?.user_id}
//                   />
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-4 flex-1 flex flex-col overflow-auto">
//                 <h2 className="font-bold text-lg mb-2 text-gray-800">
//                   {currentShort.news_title}
//                 </h2>
//                 <div className="flex items-center text-sm text-gray-500 mb-3">
//                   <span className="text-red-600 font-semibold">
//                     {currentShort.location}
//                   </span>
//                   <span className="mx-2">•</span>
//                   <span>{currentShort.publishedAt}</span>
//                 </div>
//                 <div className="text-gray-600 text-sm mb-4 flex-1 overflow-auto">
//                   {currentShort.news_des?.length > 300 ? (
//                     (
//                       <HtmlToPlainText htmlContent={currentShort.news_des} />
//                     ).slice(
//                       0,
//                       (
//                         <HtmlToPlainText
//                           htmlContent={currentShort.news_des}
//                         />
//                       ).lastIndexOf(" ", 300)
//                     ) + "..."
//                   ) : (
//                     <HtmlToPlainText htmlContent={currentShort.news_des} />
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                   <button
//                     className="bg-red-600 text-white text-sm font-medium py-2 px-5 rounded-full hover:bg-red-700 transition-colors shadow-sm"
//                     onClick={() => handleNewsContent(currentShort)}
//                   >
//                     Read Full Article
//                   </button>
//                   <button className="text-gray-500 hover:text-gray-600 p-2">
//                     <FaShareAlt size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="h-[75vh] max-h-[600px] w-full sm:w-[350px] flex items-center justify-center">
//             <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
//               <div className="text-4xl mb-3">📰</div>
//               <h3 className="font-semibold text-gray-800 mb-2">No Shorts Available</h3>
//               <p className="text-gray-500 text-sm">There are no news shorts to display at the moment.</p>
//               <button 
//                 onClick={() => loadShorts(true)}
//                 className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Scroll Buttons */}
//         {shorts.length > 1 && (
//           <div className="flex sm:flex-col gap-3 mt-4 sm:mt-0">
//             <button
//               className={`p-3 rounded-full text-white shadow-md ${
//                 currentIndex === 0 
//                   ? "bg-gray-400 cursor-not-allowed" 
//                   : "bg-red-600 hover:bg-red-700"
//               } transition-colors`}
//               onClick={handleScrollUp}
//               disabled={currentIndex === 0}
//             >
//               <FaArrowUp size={18} />
//             </button>
//             <div className="text-center text-xs text-gray-500 py-1 hidden sm:block">
//               {currentIndex + 1} / {shorts.length}
//             </div>
//             <button
//               className={`p-3 rounded-full text-white shadow-md ${
//                 currentIndex === shorts.length - 1
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-red-600 hover:bg-red-700"
//               } transition-colors`}
//               onClick={handleScrollDown}
//               disabled={currentIndex === shorts.length - 1}
//             >
//               <FaArrowDown size={18} />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Progress indicator for mobile */}
//       {shorts.length > 1 && (
//         <div className="text-center text-xs text-gray-500 mt-3 sm:hidden">
//           {currentIndex + 1} of {shorts.length}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShortsPages;


import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NewsContext } from "../../../context/NewsContext";
import { useShorts } from "../../../hooks/useShorts";
import SkeletonCard from "./SkeletonCard";
import ShortsHeader from "./ShortsHeader";
import ShortsCard from "./ShortsCard";
import ShortsEmptyState from "./ShortsEmptyState";
import ShortsNavigation from "./ShortsNavigation";

const ShortsPages = () => {
  const { setNews } = useContext(NewsContext);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const {
    shorts,             // raw shorts
    articles,           // formatted shorts (optional if needed)
    currentIndex,
    loading,
    refreshing,
    lastUpdated,
    loadShorts,
    handleScrollDown,
    handleScrollUp,
    formatTimeSinceUpdate,
  } = useShorts();

  const currentShort = shorts[currentIndex]; // ya articles[currentIndex] agar formatted dikhana ho

  return (
    <div className="max-w-md mx-auto px-4 py-4">
      {/* Header with refresh + last updated */}
      <ShortsHeader
        lastUpdated={lastUpdated}
        onRefresh={() => loadShorts(true)}
        refreshing={refreshing}
        formatTimeSinceUpdate={formatTimeSinceUpdate}
      />

      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-3 items-center justify-center mt-4">
        {/* Shorts Card */}
        {loading ? (
          <SkeletonCard />
        ) : shorts.length > 0 ? (
          <div className="h-[600px] max-h-[600px] w-full sm:w-[360px] flex items-center justify-center">
            <ShortsCard short={currentShort} user={user} />
          </div>
        ) : (
          <div className="h-[75vh] max-h-[600px] w-full sm:w-[350px] flex items-center justify-center">
            <ShortsEmptyState onRetry={() => loadShorts(true)} />
          </div>
        )}

        {/* Navigation Controls (desktop) */}
        <ShortsNavigation
          currentIndex={currentIndex}
          totalItems={shorts.length}
          onScrollUp={handleScrollUp}
          onScrollDown={handleScrollDown}
          isMobile={false}
        />
      </div>

      {/* Mobile Progress Indicator */}
      {/* <ShortsNavigation
        currentIndex={currentIndex}
        totalItems={shorts.length}
        onScrollUp={handleScrollUp}
        onScrollDown={handleScrollDown}
        isMobile={true}
      /> */}
    </div>
  );
};

export default ShortsPages;
