import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import TopNewsItems from "../TopNews/TopNewsItems";
import { AdCardSkeleton } from "../../market/components/Skeleton";
// import { news } from "../../../navigation/news";

const Entertainment = ({
  category_id,
  category = "मनोरंजन",
  section_title = "मनोरंजन",
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

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchNews} />;
  if (!articles.length) return <EmptyState />;

  return (
    <div className="w-full">
      <Menu menuText={section_title} menu={[]} />

      <div className="flex flex-col items-start justify-start">
        <div className="md:flex flex-1 items-start gap-8 w-full">
          {/* Featured Entertainment Card */}
          <FeaturedEntertainmentCard  articles={articles}/>

          {/* News Items Section */}
          <div className="sm:my-0 my-3 w-full flex items-start">
            <TopNewsItems
              topNewsItems={articles}
              className="flex gap-4 flex-col items-start justify-between"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const LoadingState = () => (
  <div className="p-4 flex justify-center items-center ">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <AdCardSkeleton key={i} />
          ))}
        </div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <AdCardSkeleton key={i} />
          ))}
        </div>
);

const EmptyState = () => (
  <div className="p-4 text-center text-gray-500">
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <AdCardSkeleton key={i} />
          ))}
        </div>
  </div>
);

const FeaturedEntertainmentCard = ({articles}) => (
  <div className="relative md:w-96 w-full h-96 rounded-lg overflow-hidden shadow-xl my">
    <img
      src={
        articles[0].news_image_url != null
          ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${articles[0].news_image_url}`
          : "https://via.placeholder.com/800x400?text=No+Image"
      }
      alt={articles[0].news_headline}
      className="w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center">
      <button className="bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:bg-red-800 transition-all">
        {articles[0].category}
      </button>
      <p className="text-white font-semibold text-lg mt-2">
               {articles[0].news_headline}

      </p>
    </div>
  </div>
);

Entertainment.propTypes = {
  category_id: PropTypes.string.isRequired,
  category: PropTypes.string,
  section_title: PropTypes.string,
};

export default React.memo(Entertainment);

// Mock API function (should be imported from your API file)
async function loadNewsByCategory() {
  return { data: { response: [] } };
}
