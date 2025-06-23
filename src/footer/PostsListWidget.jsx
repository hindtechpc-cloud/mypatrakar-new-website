// PostsListWidget.jsx (Final Fixed Version)

import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import { useNavigate } from "react-router-dom";
import { newsRoadMapBottom } from "../../api";
import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";
import LoadingSkeleton from "./LoadingSkeleton"; // Ensure this exists
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
      if (res?.data?.response) {
        setArticles(res.data.response.slice(0, 4)); // limit to 4 articles
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

  if (loading) return <LoadingSkeleton count={4} />;

  if (error) {
    return (
      <div className="w-[300px] p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={loadRoadMap}
          className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-[300px] bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg h-[96] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-yellow-400 font-sans">
          #BS_Exclusive
        </h2>
        <span className="text-xs text-gray-400 flex items-center">
          <FiClock className="mr-1" /> LATEST
        </span>
      </div>

      <motion.div
        className="flex flex-col space-y-"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {articles.map((article, index) => (
          <motion.div
            key={article.news_id || index}
            className="relative pl-6 group"
            variants={itemVariants}
           
          >
            {/* Timeline dot and line */}
            <div className="absolute left-0 top-0 flex flex-col items-center h-full">
              <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-yellow-500" : "bg-gray-600"} group-hover:bg-yellow-400 transition-colors`} />
              {index !== articles.length - 1 && (
                <div className="w-px flex-1 bg-gray-600 group-hover:bg-yellow-400 transition-colors" />
              )}
            </div>

            {/* News content */}
            <div
              className="ml-2 cursor-pointer"
              onClick={() => handleNewsContent(article)}
            >
              <p className="text-xs text-gray-400 mb-1 flex items-center">
                <FiClock className="mr-1" />
                {article.date || "Recent"}
              </p>
              <h3 className="text-sm font-medium text-gray-200 group-hover:text-yellow-400 transition-colors line-clamp-2">
                {article.title || "Untitled"}
              </h3>
              <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent group-hover:via-yellow-400 transition-all" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PostsListWidget;
