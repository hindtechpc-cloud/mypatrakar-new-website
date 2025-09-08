import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import TopNewsItems from "../TopNews/TopNewsItems";
import { loadNewsByCategory } from "../../../../api";
import { AdCardSkeleton } from "../../market/components/Skeleton";
import EmptyCard from "../shared/EmptyCard";

// Main Country Component
const Country = ({
  category_id,
  category = "Country",
  section_title = "Country News",
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await loadNewsByCategory(category_id);
      setArticles(data?.response || []);
    } catch (err) {
      console.error("News fetch error:", err);
      setError(err.response?.message || "Failed to load news.");
    } finally {
      setLoading(false);
    }
  }, [category_id]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if(loading ||error){
 <div>
  <Menu menuText={section_title || "State"} menu={[]} />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <AdCardSkeleton key={i} />
              ))}
            </div>
 </div>
  }
  return (
    <div className="">
      <Menu menuText={section_title} menu={[]} />
{/* 
      {loading && <LoadingState />}
      {error && <ErrorState error={error} onRetry={fetchNews} />} */}
      {!loading && !error && !articles.length&& (
        <EmptyCard>Nothing to show in {section_title}</EmptyCard>
      )}
      {!loading && !error && articles.length > 0 && (
        <CountryNewsList articles={articles} />
      )}
    </div>
  );
};





// Memoized News List Component (named inner function to fix ESLint warning)
const CountryNewsListComponent = ({ articles }) => (
  <div className="container mx-auto px-4 py-6">
    {articles.map((article) => (
      <div key={article.news_id} className="mb-10">
        <TopNewsItems
          topNewsItems={[article]}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        />
      </div>
    ))}
  </div>
);

CountryNewsListComponent.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const CountryNewsList = React.memo(CountryNewsListComponent);
CountryNewsList.displayName = "CountryNewsList";

// Main PropTypes
Country.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string,
  section_title: PropTypes.string,
};

export default React.memo(Country);
Country.displayName = "Country";
