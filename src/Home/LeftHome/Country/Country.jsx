import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import { GetNewsSubcategories, loadNewsByCategory } from "../../../../api";
import EmptyCard from "../shared/EmptyCard";
import NewsCard from "../shared/NewsCard";
import { ArticlesPagination } from "../shared/ArticlesPagination";
import { motion } from "framer-motion";
import GameSkeleton from "../game/GameSkeleton";
import NoData from "../../NoData";

// Main Country Component
const Country = ({
  category_id,
  category = "Country",
  section_title = "Country News",
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articlList, setArticlList] = useState([]);
  const [menu, setMenu] = useState([]);

  const sessionKey = `country_news_${category_id}`;
  const sessionExpiry = 30 * 60 * 1000; // 30 minutes

  // Fetch news articles
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await loadNewsByCategory(category_id);
      const response = data?.response || [];

      // Save to sessionStorage
      const cacheData = {
        articles: response,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(sessionKey, JSON.stringify(cacheData));

      setArticles(response);
      setArticlList(response); // Default list shown = all articles
    } catch (err) {
      console.error("News fetch error:", err);
      setError(err.response?.message || "Failed to load news.");
    } finally {
      setLoading(false);
    }
  }, [category_id, sessionKey]);

  // Load subcategories
  const loadSubcategories = async () => {
    try {
      const res = await GetNewsSubcategories("", category_id);
      setMenu(res.data.response);
    } catch (error) {
      console.log("Subcategory load error:", error);
    }
  };

  // On component mount - check session cache
  useEffect(() => {
    const cached = sessionStorage.getItem(sessionKey);

    if (cached) {
      const { articles: cachedArticles, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > sessionExpiry;

      if (!isExpired && cachedArticles?.length) {
        setArticles(cachedArticles);
        setArticlList(cachedArticles); // Show cached articles
        setLoading(false);
        return;
      }
    }

    fetchNews();
  }, [fetchNews, sessionKey, sessionExpiry]);

  // Load menu on first mount
  useEffect(() => {
    loadSubcategories();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div>
        <Menu menuText={section_title || "State"} menu={[]} />
        <GameSkeleton />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div>
        <Menu menuText={section_title || "State"} menu={[]} />
        <div className="flex flex-col items-center justify-center mt-6">
          <p className="text-red-600 font-medium mb-3">{error}</p>
          <button
            onClick={fetchNews}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="w-full mt-[9px]">
      {/* Menu/Header */}
      <Menu
        menuText={section_title}
        menu={menu}
        setArticlList={(list) => {
          if (list === "all") {
            setArticlList(articles);
          } else {
            setArticlList(list);
          }
        }}
      />

      {/* No Articles */}
      {!articles.length || articlList.length <= 0 ? (
        <NoData />
      ) : (
        <div className="md:flex flex-1 md:flex-wrap md:gap-[11px] mt-[9px]">
          {articlList?.length > 0 ? (
            articlList.map((article, index) => (
              <ArticleCard
                key={article.news_id}
                article={article}
                category={article?.is_breaking === 1 ? "Breaking" : ""}
                imageUrl={article?.news_img_url}
                index={index}
                category_id={category_id}
              />
            ))
          ) : (
            <NoData />
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="relative flex items-end justify-end md:-top-2 my-1 top-1">
        <ArticlesPagination
          setArticlList={setArticlList}
          articles={articles}
          totalArticles={articles.length}
        />
      </div>
    </div>
  );
};

// Animated article card
const ArticleCard = ({ article, category, imageUrl, index,category_id }) => {
  return (
    <motion.div
      className="flex w-full transition-transform rounded-xl"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <NewsCard
        className="md:flex flex-1 md:flex-row items-start gap-5 transition-transform duration-300 overflow-hidden"
        classNameToImage="md:w-[230px] w-full md:h-[129px] sm:h-[365px] h-[228px] object-cover rounded-lg"
        classNameForContent="flex-1 text-[20px] flex flex-col justify-between"
        image={imageUrl}
        ctaText={category}
        title={article.news_headline.slice(0, 100) || "Untitled Article"}
        description={article.news_description_html}
        newsId={article.news_id}
        maxLength={100}
        category_id={category_id}
        news={{
          title: article.news_headline,
          urlToImage: imageUrl,
          content: article.news_description_html,
          news_id: article.news_id,
        }}
      />
    </motion.div>
  );
};

// PropTypes
Country.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string,
  section_title: PropTypes.string,
};

export default React.memo(Country);
Country.displayName = "Country";
