// import React, { useCallback, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import Menu from "../shared/MenuBar";
// import NewsCard from "../shared/NewsCard";
// import { loadNewsByCategory } from "../../../../api";
// import { AdCardSkeleton } from "../../market/components/Skeleton";
// import EmptyCard from "../shared/EmptyCard";

// const Game = ({
//   category_id,
//   category = "General",
//   section_title = "Game News",
// }) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchNews = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { data } = await loadNewsByCategory(category_id);
//       console.log(data)
//       setArticles(data?.response || []);
//     } catch (err) {
//       console.error("News fetch error:", err);
//       setError(err.response?.message || "Failed to load news");
//     } finally {
//       setLoading(false);
//     }
//   }, [category_id]);

//   useEffect(() => {
//     fetchNews();
//   }, [fetchNews]);

//   if (loading) {
//     return <LoadingState />;
//   }

//   if (error) {
//     return <ErrorState error={error} onRetry={fetchNews} />;
//   }

//   return (
//     <div className="">
//       <Menu menuText={section_title || "Game"} menu={[]} />
//       {!articles.length ? (
//         <EmptyCard>Nothing to show in {section_title}</EmptyCard>
//       ) : (
//         <div className="flex flex-col items-center gap-6 py-4">
//           {articles.map((article) => (
//             <ArticleCard
//               key={article.news_id}
//               article={article}
//               category={category}
//               imageUrl={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
//                 article?.news_img_url
//               }`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // Sub-components for better organization
// const LoadingState = () => (
//   <div className="p-4 flex justify-center items-center ">
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {[...Array(3)].map((_, i) => (
//         <AdCardSkeleton key={i} />
//       ))}
//     </div>
//   </div>
// );

// const ErrorState = ({ error, onRetry }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//     {[...Array(3)].map((_, i) => (
//       <AdCardSkeleton key={i} />
//     ))}
//   </div>
// );

// const ArticleCard = ({ article, category, imageUrl }) => {
//   return (
//     <NewsCard
//       className="md:flex flex-1 items-start gap-4 max-w-4xl mx-auto"
//       classNameToImage="md:w-80 md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
//       classNameForContent="md:w-5/6 w-full"
//       image={imageUrl}
//       ctaText={category}
//       title={article.news_headline || "Untitled Article"}
//       description={article.news_description_html}
//       newsId={article.news_id}
//       news={{
//         title: article.news_headline,
//         urlToImage: imageUrl,
//         content: article.news_description_html,
//         news_id: article.news_id,
//       }}
//     />
//   );
// };

// Game.propTypes = {
//   category_id: PropTypes.string.isRequired,
//   category: PropTypes.string,
//   section_title: PropTypes.string,
// };

// export default React.memo(Game);

import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import { loadNewsByCategory } from "../../../../api";
import { AdCardSkeleton } from "../../market/components/Skeleton";
import EmptyCard from "../shared/EmptyCard";

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

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchNews} />;
  }

  return (
    <div className="w-full">
      {/* Menu/Header */}
      <Menu menuText={section_title || "Game"} menu={[]} />

      {/* No Articles */}
      {!articles.length ? (
        <EmptyCard>Nothing to show in {section_title}</EmptyCard>
      ) : (
        <div className="flex flex-wrap gap-3 p-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.news_id}
              article={article}
              category={category}
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
    <div className="flex w-full transition-transform   rounded-xl ">
      <NewsCard
        className="flex flex-col md:flex-row items-start gap-2 transition-transform duration-300  overflow-hidden"
        classNameToImage="w-full md:w-64 h-60 md:h-40 object-cover rounded-xl"
        classNameForContent="flex-1 text-lg flex flex-col justify-between p-2"
        image={imageUrl}
        ctaText={category}
        title={article.news_headline.slice(0,100) || "Untitled Article"}
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
