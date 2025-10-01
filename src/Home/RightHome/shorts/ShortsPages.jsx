

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NewsContext } from "../../../context/NewsContext";
import { useShorts } from "../../../hooks/useShorts";
import SkeletonCard from "./SkeletonCard";
import ShortsHeader from "./ShortsHeader";
import ShortsCard from "./ShortsCard";
import ShortsEmptyState from "./ShortsEmptyState";
import ShortsNavigation from "./ShortsNavigation";
import { useWebThemeContext } from "../../../context/WebThemeContext";

const ShortsPages = () => {
  const { setNews } = useContext(NewsContext);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
    const { webTheme } = useWebThemeContext();

  const {
    shorts,             // raw shorts
    articles,           // formatted shorts (optional if needed)
    currentIndex,
    loading,
    refreshing,
    lastUpdated,
    loadShorts,
    handleScrollDown,
    handleScrollUp,
    formatTimeSinceUpdate,
  } = useShorts();

  const currentShort = shorts[currentIndex]; // ya articles[currentIndex] agar formatted dikhana ho

  return (
    <div className="max-w-md mx-auto px-4 py-4">
      {/* Header with refresh + last updated */}
      <ShortsHeader
        lastUpdated={lastUpdated}
        onRefresh={() => loadShorts(true)}
        refreshing={refreshing}
        formatTimeSinceUpdate={formatTimeSinceUpdate}
      />

      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-3 items-center justify-center mt-4">
        {/* Shorts Card */}
        {loading ? (
          <SkeletonCard />
        ) : shorts.length > 0 ? (
          <div className="h-[600px] max-h-[600px] w-full sm:w-[360px] flex items-center justify-center">
            <ShortsCard short={currentShort} user={user} />
          </div>
        ) : (
          <div className="h-[75vh] max-h-[600px] w-full sm:w-[350px] flex items-center justify-center">
            <ShortsEmptyState onRetry={() => loadShorts(true)} />
          </div>
        )}

        {/* Navigation Controls (desktop) */}
        <ShortsNavigation
          currentIndex={currentIndex}
          totalItems={shorts.length}
          onScrollUp={handleScrollUp}
          onScrollDown={handleScrollDown}
          isMobile={false}
          webTheme={webTheme}
        />
      </div>

      {/* Mobile Progress Indicator */}
      {/* <ShortsNavigation
        currentIndex={currentIndex}
        totalItems={shorts.length}
        onScrollUp={handleScrollUp}
        onScrollDown={handleScrollDown}
        isMobile={true}
      /> */}
    </div>
  );
};

export default ShortsPages;
