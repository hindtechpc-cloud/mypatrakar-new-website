// import React, { useEffect, useState, useCallback } from "react";
// import { loadNewsByCategory } from "../../../api";
// import ArticleListItem from "../search/ArticleListItem";
// import GameSkeleton from "../LeftHome/game/GameSkeleton";

// /**
//  * ✅ CategoryNews Component
//  * - Loads news by sub-category ID
//  * - Caches results in sessionStorage for 10 minutes
//  * - Avoids unnecessary API calls
//  * - Auto-clears old cache
//  */
// export default function CategoryNews({ category_id }) {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const SESSION_EXPIRY = 10 * 60 * 1000; // 10 minutes

//   // ✅ Clears expired cache globally every 10 mins
//   useEffect(() => {
//     const clearTimer = setInterval(() => {
//       sessionStorage.clear();
//       console.log("🧹 Session cleared after 10 minutes");
//     }, SESSION_EXPIRY);

//     return () => clearInterval(clearTimer);
//   }, []);

//   /**
//    * ✅ Function: Fetch news (with session caching)
//    */
//   const fetchCategoryNews = useCallback(async () => {
//     if (!category_id) return;

//     const sessionKey = `news_${category_id}`;
//     const cachedData = sessionStorage.getItem(sessionKey);
//     const cachedTime = sessionStorage.getItem(`${sessionKey}_time`);
//     const now = Date.now();

//     // ✅ Use cache if it exists and is not expired
//     if (cachedData && cachedTime && now - cachedTime < SESSION_EXPIRY) {
//       console.log(`⚡ Using cached news for category: ${category_id}`);
//       setArticles(JSON.parse(cachedData));
//       setLoading(false);
//       return;
//     }

//     // 🔄 Otherwise fetch from API
//     try {
//       console.log(`📡 Fetching news for category: ${category_id}`);
//       setLoading(true);
//       setError("");

//       const res = await loadNewsByCategory(category_id);
//       console.log(res)
//       const data = res?.data?.response || [];

//       // ✅ Cache data with timestamp
//       sessionStorage.setItem(sessionKey, JSON.stringify(data));
//       sessionStorage.setItem(`${sessionKey}_time`, now.toString());

//       setArticles(data);
//     } catch (err) {
//       console.error("❌ Error loading category news:", err);
//       setError("Failed to load news. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }, [category_id]);

//   useEffect(() => {
//     fetchCategoryNews();
//   }, [fetchCategoryNews]);

//   // 🔁 Optional manual reload
//   const handleReload = () => {
//     sessionStorage.removeItem(`news_${category_id}`);
//     sessionStorage.removeItem(`news_${category_id}_time`);
//     fetchCategoryNews();
//   };

//   return (
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg md:text-xl font-semibold text-gray-900">
//           📰 Category News
//         </h2>
//         <button
//           onClick={handleReload}
//           className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//         >
//           Reload
//         </button>
//       </div>

//       <section>
//         {loading ? (
//           <GameSkeleton />
//         ) : error ? (
//           <div className="text-red-600 text-center py-4">{error}</div>
//         ) : articles.length > 0 ? (
//           <div className="space-y-4">
//             {articles.map((article) => (
//               <ArticleListItem key={article.news_id} article={article} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-600 py-10">
//             No news available in this category.
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
import React, { useEffect, useState, useCallback } from "react";
import { loadNewsByCategory } from "../../../api";
import ArticleListItem from "../search/ArticleListItem";
import GameSkeleton from "../LeftHome/game/GameSkeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CategoryNews({ category_id }) {
  const [articles, setArticles] = useState([]); // all articles
  const [visibleArticles, setVisibleArticles] = useState([]); // paginated view
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const SESSION_EXPIRY = 10 * 60 * 1000; // 10 minutes
  const ITEMS_PER_PAGE = 2; // 🔧 frontend pagination items per page

  // 🧹 Clear all session every 10 minutes
  useEffect(() => {
    const clearTimer = setInterval(() => {
      sessionStorage.clear();
      console.log("🧹 Session cleared after 10 minutes");
    }, SESSION_EXPIRY);
    return () => clearInterval(clearTimer);
  }, []);

  /**
   * ✅ Fetch news from API (cache + expiry logic)
   */
  const fetchCategoryNews = useCallback(async () => {
    if (!category_id) return;

    const sessionKey = `news_${category_id}`;
    const cachedData = sessionStorage.getItem(sessionKey);
    const cachedTime = sessionStorage.getItem(`${sessionKey}_time`);
    const now = Date.now();

    if (cachedData && cachedTime && now - cachedTime < SESSION_EXPIRY) {
      console.log(`⚡ Using cached data for category: ${category_id}`);
      const data = JSON.parse(cachedData);
      setArticles(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      setLoading(false);
      return;
    }

    try {
      console.log(`📡 Fetching from API: category ${category_id}`);
      setLoading(true);
      setError("");

      const res = await loadNewsByCategory(category_id);
      const data = res?.data?.response || [];

      // 🗄️ Cache data + timestamp
      sessionStorage.setItem(sessionKey, JSON.stringify(data));
      sessionStorage.setItem(`${sessionKey}_time`, now.toString());

      setArticles(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } catch (err) {
      console.error("❌ Error loading category news:", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [category_id]);

  // 🧠 On mount / category change
  useEffect(() => {
    fetchCategoryNews();
  }, [fetchCategoryNews]);

  // 📄 Page Change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 👆 auto scroll to top
  };

  // 🧩 Slice the visible articles when articles or page change
  useEffect(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setVisibleArticles(articles.slice(start, end));
  }, [articles, page]);

  // 🔁 Manual reload
  const handleReload = () => {
    sessionStorage.removeItem(`news_${category_id}`);
    sessionStorage.removeItem(`news_${category_id}_time`);
    fetchCategoryNews();
  };

  return (
    <div className="p-4">
      {/* <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          📰 Category News
        </h2>
        <button
          onClick={handleReload}
          className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Reload
        </button>
      </div> */}

      <section>
        {loading ? (
          <GameSkeleton />
        ) : error ? (
          <div className="text-red-600 text-center py-4">{error}</div>
        ) : visibleArticles.length > 0 ? (
          <>
            <div className="space-y-4">
              {visibleArticles.map((article) => (
                <ArticleListItem key={article.news_id} article={article} />
              ))}
            </div>

            {/* ✅ Pagination Component */}
            <div className="flex justify-end mt-6">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#374151",
                      backgroundColor: "#d1d5db80",
                      borderRadius: "8px",
                      border: "1px solid #fff",
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      fontWeight: "bold",
                    },
                    "& .MuiPaginationItem-root:hover": {
                      backgroundColor: "#9ca3af",
                      color: "black",
                    },
                  }}
                />
              </Stack>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 py-10">
            No news available in this category.
          </div>
        )}
      </section>
    </div>
  );
}
