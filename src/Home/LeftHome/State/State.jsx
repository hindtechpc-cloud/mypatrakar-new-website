import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import { loadNewsByCategory } from "../../../../api";

const State = ({
  section_id,
  category_id,
  category,
  section_type,
  web_section_id,
  section_title,
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

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-500">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        {error}
        <button
          onClick={fetchNews}
          className="ml-2 text-blue-600 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No articles found for this state
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <Menu menuText={section_title || "State"} menu={[]} />

      <ul className="flex flex-col items-center gap-4 mt-4">
        {articles.length > 0 &&
          articles.map((featuredArticle) => {
            return (
              <li key={featuredArticle.section_id}>
                <NewsCard
                  className="sm:flex flex-1 items-start justify-start gap-4 max-w-4xl mx-auto"
                  classNameToImage="md:w-full md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
                  image={
                    featuredArticle?.news_img_url
                      ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                          featuredArticle.news_img_url
                        }`
                      : "https://via.placeholder.com/800x400?text=No+Image"
                  }
                  ctaText={category || "General"}
                  title={featuredArticle.news_headline || "Untitled Article"}
                  description={featuredArticle.news_description_html}
                  newsId={featuredArticle.news_id}
                  news={{
                    title: featuredArticle.news_headline,
                    urlToImage: featuredArticle?.news_img_url
                      ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                          featuredArticle.news_img_url
                        }`
                      : "https://via.placeholder.com/800x400?text=No+Image",
                    content: featuredArticle.news_description_html,
                    news_id: featuredArticle.news_id,
                  }}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

State.propTypes = {
  section_id: PropTypes.string,
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string,
  section_type: PropTypes.string,
  web_section_id: PropTypes.string,
  section_title: PropTypes.string,
};

State.defaultProps = {
  section_title: "State",
};

export default React.memo(State);
