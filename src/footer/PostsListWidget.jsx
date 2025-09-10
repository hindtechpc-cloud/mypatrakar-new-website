// // PostsListWidget.jsx (Final Fixed Version)

// import { useContext, useEffect, useState } from "react";
// import { NewsContext } from "../context/NewsContext";
// import { useNavigate } from "react-router-dom";
// import { newsRoadMapBottom } from "../../api";
// import { motion } from "framer-motion";
// import { FiClock } from "react-icons/fi";
// import LoadingSkeleton from "./LoadingSkeleton"; // Ensure this exists
// import { encryptData } from "../utils/cryptoHelper";

// const PostsListWidget = () => {
//   const { setNews } = useContext(NewsContext);
//   const navigate = useNavigate();

//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleNewsContent = (news) => {
//     setNews(news);
//     navigate(`/read-news/${encodeURIComponent(news.title)}/${encryptData(news.news_id)}`);
//   };

//   const loadRoadMap = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await newsRoadMapBottom("");
//       if (res?.data?.response) {
//         setArticles(res.data.response.slice(0, 4)); // limit to 4 articles
//       } else {
//         setError("No articles found");
//       }
//     } catch (err) {
//       setError("Failed to load latest news");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRoadMap();
//   }, []);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//   };

//   if (loading) return <LoadingSkeleton count={4} />;

//   if (error) {
//     return (
//       <div className="w-[300px] p-4 bg-red-50 rounded-lg">
//         <p className="text-red-600 text-sm">{error}</p>
//         <button
//           onClick={loadRoadMap}
//           className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="w-[300px] bg-white/5 backdrop-blur-sm rounded p-6 border border-gray-700/50 shadow-lg h-[330px] overflow-y-auto">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold text-yellow-400 font-sans">
//           #BS_Exclusive
//         </h2>
//         <span className="text-xs text-gray-400 flex items-center">
//           <FiClock className="mr-1" /> LATEST
//         </span>
//       </div>

//       <motion.div
//         className="flex flex-col space-y-"
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//       >
//         {articles.map((article, index) => (
//           <motion.div
//             key={article.news_id || index}
//             className="relative pl-6 group"
//             variants={itemVariants}
           
//           >
//             {/* Timeline dot and line */}
//             <div className="absolute left-0 top-0 flex flex-col items-center h-full">
//               <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-yellow-500" : "bg-gray-600"} group-hover:bg-yellow-400 transition-colors`} />
//               {index !== articles.length - 1 && (
//                 <div className="w-px flex-1 bg-gray-600 group-hover:bg-yellow-400 transition-colors" />
//               )}
//             </div>

//             {/* News content */}
//             <div
//               className="ml-2 cursor-pointer"
//               onClick={() => handleNewsContent(article)}
//             >
//               <p className="text-xs text-gray-400 mb-1 flex items-center">
//                 <FiClock className="mr-1" />
//                 {article.date || "Recent"}
//               </p>
//               <h3 className="text-sm font-medium text-gray-200 group-hover:text-yellow-400 transition-colors line-clamp-2">
//                 {article.title || "Untitled"}
//               </h3>
//               <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent group-hover:via-yellow-400 transition-all" />
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default PostsListWidget;


import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import { useNavigate } from "react-router-dom";
import { newsRoadMapBottom } from "../../api";
import { motion } from "framer-motion";
import { FiClock, FiRefreshCw } from "react-icons/fi";
import LoadingSkeleton from "./LoadingSkeleton";
import { encryptData } from "../utils/cryptoHelper";

const PostsListWidget = () => {
  const { setNews } = useContext(NewsContext);
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNewsContent = (news) => {
    setNews(news);
    navigate(`/read-news/${encodeURIComponent(news.title)}/${encryptData(news.news_id)}`);
  };

  const loadRoadMap = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await newsRoadMapBottom("");
      // console.log(res)
      if (res?.data?.response) {
        setArticles(res.data.response.slice(0, 3)); // limit to 4 articles
      } else {
        setError("No articles found");
      }
    } catch (err) {
      setError("Failed to load latest news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoadMap();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="w-[300px] bg-gradient-to-br from-blue-900/70 to-blue-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/30 shadow-2xl h-auto min-h-[330px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-yellow-400 font-sans">
            #BS_Exclusive
          </h2>
          <span className="text-xs text-blue-300 flex items-center">
            <FiClock className="mr-1" /> LATEST
          </span>
        </div>
        <LoadingSkeleton count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[300px] bg-gradient-to-br from-red-900/20 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 shadow-2xl h-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-yellow-400 font-sans">
            #BS_Exclusive
          </h2>
          <span className="text-xs text-blue-300 flex items-center">
            <FiClock className="mr-1" /> LATEST
          </span>
        </div>
        <div className="text-center py-6">
          <div className="text-red-400 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-200 text-sm mb-4">{error}</p>
          <button
            onClick={loadRoadMap}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all duration-300 flex items-center justify-center mx-auto"
          >
            <FiRefreshCw className="mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[300px] bg-gradient-to-br from-blue-900/70 to-blue-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/30 shadow-2xl sm:w-[300px] h-[330px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-yellow-400 font-sans">
          #BS_Exclusive
        </h2>
        <span className="text-xs text-blue-300 flex items-center">
          <FiClock className="mr-1" /> LATEST
        </span>
      </div>

      <motion.div
        className="flex flex-col space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {articles.map((article, index) => (
          <motion.div
            key={article.news_id || index}
            className="relative pl-6 group cursor-pointer"
            variants={itemVariants}
            onClick={() => handleNewsContent(article)}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          > 
          
            {/* Timeline dot and line */}
            <div className="absolute left-0 top-0 flex flex-col items-center h-full">
              <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-yellow-500 ring-2 ring-yellow-200" : "bg-blue-500"} group-hover:bg-yellow-400 group-hover:scale-110 transition-all duration-300 z-10`} />
              {index !== articles.length - 1 && (
                <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-500 to-blue-700 group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all duration-300 mt-1" />
              )}
            </div>

            {/* News content */}
            <div className="ml-2">
              <p className="text-xs text-blue-200 mb-1 flex items-center">
                <FiClock className="mr-1" />
                {article.date || "Recent"}
              </p>
              <h3 className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2 leading-tight">
                {article.title || "Untitled"}
              </h3>
              <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-blue-600/50 to-transparent group-hover:via-yellow-400 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {articles.length === 0 && !loading && (
        <div className="text-center py-6">
          <div className="text-blue-300 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-blue-200 text-sm">No articles available</p>
        </div>
      )}
    </div>
  );
};

export default PostsListWidget;