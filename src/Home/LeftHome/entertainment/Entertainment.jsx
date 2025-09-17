import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "../shared/MenuBar";
import TopNewsItems from "../TopNews/TopNewsItems";
import { AdCardSkeleton } from "../../market/components/Skeleton";
import EmptyCard from "../shared/EmptyCard";
import { loadNewsByCategory } from "../../../../api";
import EnterTainmentSkelton from "./EnterTainmentSkelton";

// Helper functions for cache
const setCache = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
  sessionStorage.setItem(`${key}_time`, Date.now().toString());
};

const getCache = (key, maxAge = 1800000) => {
  const cached = sessionStorage.getItem(key);
  const cacheTime = sessionStorage.getItem(`${key}_time`);

  if (!cached || !cacheTime) return null;

  const age = Date.now() - parseInt(cacheTime, 10);
  if (age > maxAge) {
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(`${key}_time`);
    return null;
  }

  return JSON.parse(cached);
};

const Entertainment = ({
  category_id,
  category = "मनोरंजन",
  section_title = "मनोरंजन",
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = `entertainment_${category_id}`;
      const cached = getCache(cacheKey);

      if (cached) {
        setArticles(cached);
        setLoading(false);
        return;
      }

      const { data } = await loadNewsByCategory(category_id);
      const freshData = data?.response || [];
      setArticles(freshData);
      setCache(cacheKey, freshData);
    } catch (err) {
      console.error("News fetch error:", err);
      setError(err.response?.message || "Failed to load news");
    } finally {
      setLoading(false);
    }
  }, [category_id]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading || error) {
    return (
      <div>
        <Menu menuText={section_title || "State"} menu={[]} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <EnterTainmentSkelton />
     </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Menu menuText={section_title} menu={[]} />

      {!articles.length ? (
        <EmptyCard>Nothing to show in {section_title}</EmptyCard>
      ) : (
        <div className="flex flex-col items-start justify-start mt-4">
          <motion.div
            className="md:flex flex-1 items-start gap-4 w-full "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Featured Entertainment Card */}
            <AnimatePresence mode="wait">
              <FeaturedEntertainmentCard articles={articles} key="featured" />
            </AnimatePresence>

            {/* News Items Section */}
            <motion.div
              className="sm:my-0  w-full flex items-start"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <TopNewsItems
                topNewsItems={articles}
                className="flex flex-col items-start justify-center gap-4"
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Enhanced Featured Entertainment Card with Animations
const FeaturedEntertainmentCard = ({ articles }) => {
  if (!articles.length) return null;

  return (
    <motion.div
      className="relative md:w-96 w-full h-96 rounded-2xl overflow-hidden shadow-2xl mb-4 md:mb-0 "
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.img
        src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
          articles[0]?.news_img_url
        }`}
        alt={articles[0].news_headline}
        className="w-full h-full object-cover"
        loading="lazy"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <motion.button
          className="bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {articles[0].news_category_name || "Entertainment"}
        </motion.button>
        <motion.p
          className="text-white font-bold text-xl mt-3 leading-tight line-clamp-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {articles[0].news_headline}
        </motion.p>
        <motion.div
          className="flex items-center mt-3 text-gray-200 text-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {new Date(articles[0].created_at).toLocaleDateString()}
        </motion.div>
      </div>
    </motion.div>
  );
};

Entertainment.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string,
  section_title: PropTypes.string,
};

export default React.memo(Entertainment);
