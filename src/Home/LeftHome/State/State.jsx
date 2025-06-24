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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-[Syne]">
      <Menu menuText={section_title || "State"} menu={[]} />

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-pulse text-gray-500 text-lg">
            Loading news...
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 mt-10">
          <p>{error}</p>
          <button
            onClick={fetchNews}
            className="mt-2 text-blue-600 underline hover:text-blue-800 transition"
          >
            Retry
          </button>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          No articles found for this state.
        </div>
      ) : (
        <div className="flex flex-col  md:items-center md:justify-center gap-6 mt-3">
          {articles?.map((article) => (
            <NewsCard
              key={article.news_id}
              className="flex flex-col md:flex-row items-center md:items-start justify-start  gap-5 w-full  "
              classNameToImage="w-full md:w-[400px] h- aspect-video object-cover rounded-lg"
              image={article?.news_img_url}
              ctaText={category || "General"}
              title={article.news_headline || "Untitled Article"}
              description={article.news_description_html}
              newsId={article.news_id}
              classNameForContent={"w-full md:w-2/3 flex flex-col items-start justify-start gap-"}
              news={{
                title: article.news_headline,
                urlToImage: article?.news_img_url
                  ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                      article.news_img_url
                    }`
                  : "https://via.placeholder.com/800x400?text=No+Image",
                content: article.news_description_html,
                news_id: article.news_id,
              }}
            />
          ))}
        </div>
      )}
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
