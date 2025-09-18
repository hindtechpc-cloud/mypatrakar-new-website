import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Menu from "../shared/MenuBar";
import { loadNewsByCategory } from "../../../../api";
import { AdCardSkeleton } from "../../market/components/Skeleton";
import EmptyCard from "../shared/EmptyCard";
import TopNewsItems from "../TopNews/TopNewsItems";

/* ---------------- Main Component ---------------- */
const State = ({
  section_id,
  category_id,
  category = "General",
  section_type,
  web_section_id,
  section_title = "State",
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CACHE_KEY = `state_news_${category_id}`;
  const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in ms

  /* -------- Fetch News -------- */
  const fetchNews = useCallback(
    async (forceRefresh = false) => {
      try {
        setLoading(true);
        setError(null);

        if (!forceRefresh) {
          // check cache
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            const now = Date.now();

            if (now - parsed.timestamp < CACHE_DURATION) {
              setArticles(parsed.data || []);
              setLoading(false);
              return;
            }
          }
        }

        // if no cache or expired → fetch from API
        const { data } = await loadNewsByCategory(category_id);
        const freshArticles = data?.response || [];
        setArticles(freshArticles);

        // save to cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: freshArticles, timestamp: Date.now() })
        );
      } catch (err) {
        console.error("News fetch error:", err);
        setError(err.response?.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    },
    [category_id]
  );

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  /* -------- Loading -------- */
  if (loading) {
    return (
      <div>
        <Menu menuText={section_title} menu={[]} />
        <LoadingState />
      </div>
    );
  }

  /* -------- Error -------- */
  if (error) {
    return (
      <div>
        <Menu menuText={section_title} menu={[]} />
        <ErrorState error={error} onRetry={() => fetchNews(true)} />
      </div>
    );
  }

  /* -------- Main Render -------- */
  return (
    <div className="">
      <Menu menuText={section_title} menu={[]} />

      {!articles.length ? (
        <EmptyCard>Nothing to show in {section_title}</EmptyCard>
      ) : (
        <div className="md:flex flex-1 md:items-start md:justify-center gap-2 mt-0">
          <TopNewsItems
            topNewsItems={articles}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4"
            maxLength={60}
            start={0}
          />
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

ErrorState.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

/* ----------------- PropTypes ----------------- */
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
