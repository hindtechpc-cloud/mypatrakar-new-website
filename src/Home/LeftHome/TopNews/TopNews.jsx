import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "./TopNewsItems";
import { loadNewsByCategory } from "../../../../api";
import { AdCardSkeleton } from "../../market/components/Skeleton";
import EmptyCard from "../shared/EmptyCard";

const TopNews = ({ category_id, section_title }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    // console.log(section_title)
    try {
      setLoading(true);
      const { data } = await loadNewsByCategory(category_id);
      console.log(data);
      setArticles(data?.response || []);
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

  // if (loading)
  //   return (
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //       {[...Array(3)].map((_, i) => (
  //         <AdCardSkeleton key={i} />
  //       ))}
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //       {[...Array(3)].map((_, i) => (
  //         <AdCardSkeleton key={i} />
  //       ))}
  //     </div>
  //   );
  // if (!articles.length)
  //   return (
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //       {[...Array(3)].map((_, i) => (
  //         <AdCardSkeleton key={i} />
  //       ))}
  //     </div>
  //   );

  const featuredArticle = articles[0];
  const featuredImageUrl = `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
    featuredArticle?.news_img_url
  }`;
  console.log(featuredImageUrl);
  if (loading || error) {
    <div>
      <Menu menuText={section_title || "State"} menu={[]} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <AdCardSkeleton key={i} />
        ))}
      </div>
    </div>;
  }
  return (
    <div className="">
      <Menu menuText={section_title || "TopNews"} menu={[]} />
      {!articles.length && (
        <EmptyCard> Nothing to show in {section_title}</EmptyCard>
      )}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <AdCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        articles.length > 0 && (
          <div className="w-full">
            {/* <Menu menuText={section_title || "TopNews"} menu={[]} /> */}

            {/* Featured Article - Layout preserved exactly */}
            <div className="w-full flex items-start justify-start">
              <NewsCard
                className="sm:flex flex-1 w-full items-start justify-start gap-4 max-w-xl mx-auto"
                classNameToImage="md:w-2/3 md:h-48 sm:w-full w-full h-96 sm:h-96 items-end justify-end relative"
                image={featuredImageUrl}
                ctaText={featuredArticle?.news_category_name}
                classNameForContent="w-5/6"
                title={featuredArticle?.news_headline}
                description={featuredArticle?.news_description_html}
                newsId={featuredArticle?.news_id}
                news={{
                  title: featuredArticle?.news_headline,
                  urlToImage: featuredArticle?.news_img_url,
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
        )
      )}
    </div>
  );
};

TopNews.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default React.memo(TopNews);
