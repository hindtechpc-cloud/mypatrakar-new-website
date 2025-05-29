import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import { loadNewsByCategory } from "../../../../api";

const Game = ({
  category_id,
  category = "General",
  section_title = "Game News",
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await loadNewsByCategory(category_id);
      setArticles(data?.response || []);
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

  const getImageUrl = (imagePath) => {
    return imagePath 
      ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${imagePath}`
      : "https://via.placeholder.com/800x400?text=No+Image";
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchNews} />;
  }

  if (!articles.length) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-4">
      <Menu menuText={section_title} menu={[]} />
      
      <div className="flex flex-col items-center gap-6 py-4">
        {articles.map((article) => (
          <ArticleCard 
            key={article.news_id}
            article={article}
            category={category}
            getImageUrl={getImageUrl}
          />
        ))}
      </div>
    </div>
  );
};

// Sub-components for better organization
const LoadingState = () => (
  <div className="p-4 flex justify-center items-center h-64">
    <div className="animate-pulse text-gray-500">Loading news...</div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="p-4 text-red-500 text-center">
    {error}
    <button
      onClick={onRetry}
      className="ml-2 text-blue-600 hover:underline"
    >
      Retry
    </button>
  </div>
);

const EmptyState = () => (
  <div className="p-4 text-center text-gray-500">
    {" "}
  </div>
);

const ArticleCard = ({ article, category, getImageUrl }) => {
  const imageUrl = getImageUrl(article.news_img_url);
  
  return (
    <NewsCard
      className="md:flex flex-1 items-start gap-4 max-w-4xl mx-auto"
      classNameToImage="md:w-80 md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
      classNameForContent="md:w-5/6 w-full"
      image={imageUrl}
      ctaText={category}
      title={article.news_headline || "Untitled Article"}
      description={article.news_description_html}
      newsId={article.news_id}
      news={{
        title: article.news_headline,
        urlToImage: imageUrl,
        content: article.news_description_html,
        news_id: article.news_id,
      }}
    />
  );
};

Game.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string,
  section_title: PropTypes.string,
};

export default React.memo(Game);