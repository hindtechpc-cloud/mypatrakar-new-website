import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import { loadNewsByCategory } from "../../../../api";
import { AdCardSkeleton } from "../../market/components/Skeleton";
import EmptyCard from "../shared/EmptyCard";

/* ----------------- Cache Helpers ----------------- */
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

/* ----------------- Main Component ----------------- */
const Game = ({
  category_id,
  category = "General",
  section_title = "Game News",
}) => {
  const [articlList, setArticlList] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = `game_${category_id}`;
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

  if (loading) {
    return (
      <div>
        <Menu
          menuText={section_title || "State"}
          menu={[]}
          setArticlList={setArticlList}
          articles={articles}
          totalArticles={articles.length}
        />
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchNews} />;
  }

  return (
    <div className="w-full mt-[9px]">
      {/* Menu/Header */}
      <Menu
        menuText={section_title || "Game"}
        menu={[]}
        setArticlList={setArticlList}
        articles={articles}
        totalArticles={articles.length}
      />

      {/* No Articles */}
      {!articles.length ? (
        <EmptyCard>Nothing to show in {section_title}</EmptyCard>
      ) : (
        <div className="flex flex-wrap gap-[11px] mt-[9px]">
          {articlList.length > 0
  ? articlList.map((article) => (
      <ArticleCard
        key={article.news_id}
        article={article}
        category={article?.is_breaking == 1 ? "Breaking" : ""}
        imageUrl={article?.news_img_url}
      />
    ))
  : articles.slice(0, 4).map((article) => (
      <ArticleCard
        key={article.news_id}
        article={article}
        category={article?.is_breaking == 1 ? "Breaking" : ""}
        imageUrl={article?.news_img_url}
      />
    ))}

        </div>
      )}
    </div>
  );
};

/* ----------------- Sub-components ----------------- */
const LoadingState = () => (
  <div className="p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <AdCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-6 gap-4">
    <p className="text-red-600 font-semibold text-center">{error}</p>
    <button
      onClick={onRetry}
      className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
    >
      Retry
    </button>
  </div>
);

const ArticleCard = ({ article, category, imageUrl }) => {
  return (
    <div className="flex w-full transition-transform rounded-xl ">
      <NewsCard
        className="flex flex-col md:flex-row items-start gap-5 transition-transform duration-300 overflow-hidden"
        classNameToImage="w-[230px] h-[129px] object-cover rounded-lg"
        classNameForContent="flex-1 text-[20px] flex flex-col justify-between"
        image={imageUrl}
        ctaText={category}
        title={article.news_headline.slice(0, 100) || "Untitled Article"}
        description={article.news_description_html}
        newsId={article.news_id}
        maxLength={100}
        news={{
          title: article.news_headline,
          urlToImage: imageUrl,
          content: article.news_description_html,
          news_id: article.news_id,
        }}
      />
    </div>
  );
};

/* ----------------- PropTypes ----------------- */
Game.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string,
  section_title: PropTypes.string,
};

export default React.memo(Game);
