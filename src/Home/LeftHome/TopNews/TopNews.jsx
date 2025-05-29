import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "./TopNewsItems";
import { loadNewsByCategory } from "../../../../api";

const TopNews = ({ category_id, section_title }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
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

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!articles.length) return <div className="p-4">No articles found</div>;

  const featuredArticle = articles[0];
  const featuredImageUrl = `${import.meta.env.VITE_REACT_APP_API_URL_Image}${featuredArticle?.news_img_url}`;

  return (
    <div>
      <Menu menuText={section_title} menu={[]} />
      
      {/* Featured Article - Layout preserved exactly */}
      <div className="w-full">
        <NewsCard
          className="sm:flex flex-1 w-full items-start gap-4 max-w-4xl mx-auto"
          classNameToImage="md:w-2/3 md:h-48 sm:w-full w-full h-96 sm:h-96 items-end justify-end relative"
          image={featuredImageUrl}
          ctaText={featuredArticle?.news_category_name}
          classNameForContent="w-5/6"
          title={featuredArticle?.news_headline}
          description={featuredArticle?.news_description_html}
          newsId={featuredArticle?.news_id}
          news={{
            title: featuredArticle?.news_headline,
            urlToImage: featuredImageUrl,
            content: featuredArticle?.news_description_html,
          }}
        />
      </div>

      {/* News List - Layout preserved exactly */}
      <div className="w-full">
        <TopNewsItems
          topNewsItems={articles}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2"
        />
      </div>
    </div>
  );
};

TopNews.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default React.memo(TopNews);