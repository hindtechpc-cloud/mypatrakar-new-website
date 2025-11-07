import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "../shared/MenuBar";
import TopNewsItems from "../TopNews/TopNewsItems";
import EmptyCard from "../shared/EmptyCard";
import { GetNewsSubcategories, loadNewsByCategory } from "../../../../api";
import { ArticlesPagination } from "../shared/ArticlesPagination";
import NoData from "../../NoData";
import EnterTainmentSkelton from "./EnterTainmentSkelton";

// Cache Helpers
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

const Entertain = ({
  category_id,
  category = "मनोरंजन",
  section_title = "मनोरंजन",
}) => {
  const [articles, setArticles] = useState([]);
  const [articlList, setArticlList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menu, setMenu] = useState([]);

  const cacheKey = `entertainment_${category_id}`;

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const cached = getCache(cacheKey);
      if (cached) {
        setArticles(cached);
        setArticlList(cached);
        setLoading(false);
        return;
      }

      const { data } = await loadNewsByCategory(category_id);
      const freshData = data?.response || [];
      setArticles(freshData);
      setArticlList(freshData);
      setCache(cacheKey, freshData);
    } catch (err) {
      console.error("News fetch error:", err);
      setError(err.response?.message || "Failed to load news");
    } finally {
      setLoading(false);
    }
  }, [category_id, cacheKey]);

  const loadSubcategories = async () => {
    try {
      const res = await GetNewsSubcategories("", category_id);
      setMenu(res.data.response);
    } catch (error) {
      console.log("Subcategories fetch error:", error);
    }
  };

  useEffect(() => {
    fetchNews();
    loadSubcategories();
  }, [fetchNews]);

  // Handler to keep articlList always an array and handle "all" properly
  const handleSetArticlList = (list) => {
    if (list === "all") {
      setArticlList(articles);
    } else {
      setArticlList(Array.isArray(list) ? list : []);
    }
  };

  if (loading) {
    return (
      <div>
        <Menu menuText={section_title || "State"} menu={[]} />
        <EnterTainmentSkelton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <Menu menuText={section_title || "State"} menu={[]} />
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchNews}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Menu
        menuText={section_title}
        menu={menu}
        setArticlList={handleSetArticlList}
      />

      {articles.length <= 0 || articlList.length <= 0 ? (
        <NoData />
      ) : (
        <div className="">
          <div className="flex flex-col items-start justify-start my-[9px] ">
            <motion.div
              className="md:flex flex-1 items-start gap-[33px] w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Featured Entertainment Card */}
              <AnimatePresence mode="wait">
                <FeaturedEntertainmentCard
                  articles={articlList}
                  key="featured"
                />
              </AnimatePresence>

              {/* News Items Section */}
              <motion.div
                className=" md:w-1/2 w-full flex items-start md:mt-0 mt-[14px]"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <TopNewsItems
                  topNewsItems={articlList}
                  className="flex flex-col items-start justify-center md:gap-[22px] gap-[15px]"
                  start={1}
                  category_id={category_id}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      <div className="relative flex items-end justify-end -top-7">
        <ArticlesPagination
          setArticlList={setArticlList}
          articles={articles}
          totalArticles={articles.length}
        />
      </div>
    </div>
  );
};

// Featured Card
const FeaturedEntertainmentCard = ({ articles }) => {
  const article = articles[0];

  return (
    <motion.div
      className="relative md:w-[365px] w-full md:h-[471px] sm:h-[365px] h-[228px] rounded overflow-hidden shadow-2xl"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.img
        src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
          article?.news_img_url
        }`}
        alt={article?.news_headline}
        className="w-full h-full object-cover rounded"
        loading="lazy"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        {article?.is_breaking === 1 && (
          <motion.button
            className="bg-red-600 text-white text-xs font-semibold px-3 py-[6px] rounded shadow-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Breaking
          </motion.button>
        )}
        <motion.h2
          className="text-white font-bold text-xl mt-3 leading-tight line-clamp-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {article?.news_headline}
        </motion.h2>
      </div>
    </motion.div>
  );
};

Entertain.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string,
  section_title: PropTypes.string,
};

export default React.memo(Entertain);
