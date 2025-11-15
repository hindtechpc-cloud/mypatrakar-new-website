import { useState, useEffect, useCallback } from "react";
import { GetShortsNews } from "../../api";

const CACHE_KEY = "shorts_cache";
const CACHE_TIMESTAMP_KEY = "shorts_cache_time";
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

export const useShorts = () => {
  const [shorts, setShorts] = useState([]);        // raw API data
  const [articles, setArticles] = useState([]);    // formatted version
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // load shorts data (cache + API)
  const loadShorts = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const now = Date.now();
      const cached = sessionStorage.getItem(CACHE_KEY);
      const cacheTime = sessionStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (!forceRefresh && cached && cacheTime && now - cacheTime < CACHE_EXPIRY) {
        const parsed = JSON.parse(cached);
        setShorts(parsed);
        setArticles(formatArticles(parsed));
        setLastUpdated(Number(cacheTime));
        setCurrentIndex(0);
        setLoading(false);
        return;
      }

      if (forceRefresh) setRefreshing(true);

      const res = await GetShortsNews();
      const shortsData = res?.data?.response?.news || [];

      if (shortsData.length > 0) {
        setShorts(shortsData);
        setArticles(formatArticles(shortsData));

        const timestamp = Date.now();
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(shortsData));
        sessionStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.toString());
        setLastUpdated(timestamp);

        setCurrentIndex(0);
      } else {
        setError("No shorts available");
      }
    } catch (err) {
      console.error("Error fetching shorts:", err);
      setError("Failed to load shorts");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // formatter (for article view)
  const formatArticles = (shortsData) => {
    return shortsData.map((short) => ({
      urlToImage: short.news_img,
      category: "Shorts",
      title: short.news_title || "Untitled",
      updated: short.updated_at || "Just now",
      description: short.news_des?.replace(/<[^>]*>?/gm, "") || "",
      id: short.news_id || Math.random().toString(36).substring(2, 9),
    }));
  };

  // auto refresh every 30 minutes
  useEffect(() => {
    loadShorts();
    const interval = setInterval(() => loadShorts(true), CACHE_EXPIRY);
    return () => clearInterval(interval);
  }, [loadShorts]);

  // auto rotate articles
  useEffect(() => {
    if (articles.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
      }, 100000);
      return () => clearInterval(interval);
    }
  }, [articles]);

  // navigation
  const nextArticle = () => setCurrentIndex((prev) => (prev + 1) % articles.length);
  const prevArticle = () => setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);

  const handleScrollDown = () => {
    if (currentIndex < shorts.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handleScrollUp = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // last updated text
  const formatTimeSinceUpdate = (timestamp) => {
    if (!timestamp) return "Never";
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  };

  return {
    shorts,             // raw API shorts
    articles,           // formatted articles
    currentIndex,
    lastUpdated,
    loading,
    refreshing,
    error,
    loadShorts,
    setCurrentIndex,
    nextArticle,
    prevArticle,
    handleScrollDown,
    handleScrollUp,
    formatTimeSinceUpdate,
  };
};
