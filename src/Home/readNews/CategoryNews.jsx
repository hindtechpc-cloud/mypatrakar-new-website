import React, { useEffect, useState, useCallback } from "react";
import { loadNewsByCategory } from "../../../api";
import ArticleListItem from "../search/ArticleListItem";
import GameSkeleton from "../LeftHome/game/GameSkeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

/**
 * ✅ CategoryNews Component (Industry Ready)
 * - Smart session cache with category_id + expiry check
 * - Auto-refresh cache after expiry or category change
 * - Frontend pagination
 */
export default function CategoryNews({ category_id }) {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const SESSION_EXPIRY = 10 * 60 * 1000; // 10 min
  const ITEMS_PER_PAGE = 5;

  // 🧹 Auto clear all session every 10 mins
  useEffect(() => {
    const clearTimer = setInterval(() => {
      sessionStorage.clear();
      console.log("🧹 Cleared sessionStorage (global) after 10 mins");
    }, SESSION_EXPIRY);
    return () => clearInterval(clearTimer);
  }, []);

  /**
   * ✅ Fetch Category News (with cache)
   */
  const fetchCategoryNews = useCallback(async () => {
    if (!category_id) return;

    const sessionKey = `news_cache_${category_id}`;
    const timeKey = `${sessionKey}_time`;

    const cached = sessionStorage.getItem(sessionKey);
    const cachedTime = sessionStorage.getItem(timeKey);
    const now = Date.now();

    // ✅ Check if cache exists & valid
    if (cached && cachedTime && now - cachedTime < SESSION_EXPIRY) {
      const parsedCache = JSON.parse(cached);

      // 🧠 Only use cache if category_id matches
      if (parsedCache.category_id === category_id) {
        console.log(`⚡ Using cache for category_id: ${category_id}`);
        setArticles(parsedCache.articles);
        setTotalPages(Math.ceil(parsedCache.articles.length / ITEMS_PER_PAGE));
        setLoading(false);
        return;
      }
    }

    // ❌ Cache missing / expired / mismatch → fetch from API
    try {
      console.log(`📡 Fetching from API for category_id: ${category_id}`);
      setLoading(true);
      setError("");

      const res = await loadNewsByCategory(category_id);
      const data = res?.data?.response || [];

      // 🗄️ Store in cache with category_id
      const payload = { category_id, articles: data };
      sessionStorage.setItem(sessionKey, JSON.stringify(payload));
      sessionStorage.setItem(timeKey, now.toString());

      setArticles(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } catch (err) {
      console.error("❌ Error loading category news:", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [category_id]);

  // 🚀 Fetch on mount / category change
  useEffect(() => {
    fetchCategoryNews();
  }, [fetchCategoryNews]);

  // 🧩 Pagination logic
  useEffect(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setVisibleArticles(articles.slice(start, end));
  }, [articles, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 50, behavior: "smooth" });
  };

  // 🔁 Manual Reload
  const handleReload = () => {
    const sessionKey = `news_cache_${category_id}`;
    sessionStorage.removeItem(sessionKey);
    sessionStorage.removeItem(`${sessionKey}_time`);
    fetchCategoryNews();
  };

  return (
    <div className="p-4">
      {/* Optional Header */}
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

            {/* Pagination */}
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
