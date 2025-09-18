
import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "./TopNewsItems";
import { loadNewsByCategory } from "../../../../api";
import { AdCardSkeleton } from "../../market/components/Skeleton";
import EmptyCard from "../shared/EmptyCard";
import TopnewsSkeleton from "./TopnewsSkeleton";

const TopNews = ({ category_id, section_title }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Ref to avoid duplicate API calls
  const fetchedRef = useRef(false);

  const fetchNews = useCallback(async () => {
    if (fetchedRef.current) return; // already fetched -> skip
    fetchedRef.current = true;

    try {
      setLoading(true);

      // ✅ cache check
      const cacheKey = `news_${category_id}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      if (cachedData) {
        setArticles(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const { data } = await loadNewsByCategory(category_id);
      const news = data?.response || [];

      setArticles(news);

      // ✅ save to cache (sessionStorage)
      sessionStorage.setItem(cacheKey, JSON.stringify(news));
    } catch (err) {
      console.log("News fetch error:", err);
      setError(err.response?.message || "Failed to load news");
    } finally {
      setLoading(false);
    }
  }, [category_id]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const featuredArticle = articles[0];

  return (
    <div>
      <Menu menuText={section_title || "TopNews"} menu={[]} />

      {loading && (
        
        <TopnewsSkeleton />)}

      {!loading && !articles.length && (
        <EmptyCard> Nothing to show in {section_title}</EmptyCard>
      )}

      {!loading && articles.length > 0 && (
        <div className="w-full mt-[12px]">
          {/* Featured Article */}
          <div className="w-full flex items-start justify-start">
            <NewsCard
              className="sm:flex flex-1 w-full items-start justify-start gap-3 mx-auto"
              classNameToImage="sm:w-[425px] md:h-[208px]  w-full h-96 sm:h-96 items-end justify-end relative rounded"
              image={featuredArticle?.news_img_url}
              ctaText={featuredArticle?.news_category_name}
              classNameForContent="w-5/6"
              title={featuredArticle?.news_headline}
              description={featuredArticle?.news_description_html}
              newsId={featuredArticle?.news_id}
              maxLength={160}
              news={{
                title: featuredArticle?.news_headline,
                urlToImage: featuredArticle?.news_img_url,
                content: featuredArticle?.news_description_html,
              }}
            />
          </div>

          {/* News List */}
          <div className="w-full mt-2">
            <TopNewsItems
              topNewsItems={articles}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 "
              maxLength={60}
            />
          </div>
        </div>
      )}
    </div>
  );
};

TopNews.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default React.memo(TopNews);
