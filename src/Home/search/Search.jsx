import { useContext, useEffect, useState, useCallback } from "react";
import {
  GetNewsCategories,
  GetNewsSubcategories,
  GetSearchPageTopAds,
  NewsSortBy,
} from "../../../api";
import { WebThemeContext } from "../../context/ThemeContext";
import {
  FaSearch,
  FaTimes,
  FaFilter,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import DropdownFilters from "./DropdownFilters";
import HeaderAd from "../../TopBar/HeaderAd";
import NewsFeed from "../readNews/newsfeed/NewsFeed";

const defaultFilters = {
  searchTerm: "",
  category: "",
  subcategory: "",
  location: "",
  sortBy: "",
};

export default function Search() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [topAds, setTopAds] = useState({});
  const [filters, setFilters] = useState(defaultFilters);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchHistory, setSearchHistory] = useState([]);

  const { webTheme } = useContext(WebThemeContext);

  const fetchFilteredNews = useCallback(
    async (page = 1, isNewSearch = false) => {
      setIsLoading(true);
      try {
        const payload = {
          search_term: filters.searchTerm || undefined,
          category_id: filters.category || undefined,
          sub_category_id: filters.subcategory || undefined,
          location_id: filters.location || undefined,
          sort_by: filters.sortBy || undefined,
          page: page,
        };

        // Clean undefined/empty values
        const cleanPayload = Object.fromEntries(
          Object.entries(payload).filter(
            ([_, v]) => v !== undefined && v !== ""
          )
        );

        const res = await NewsSortBy("MYAWR241227001", cleanPayload);

        if (!res?.data?.response) {
          throw new Error("Invalid response format");
        }

        const newArticles = res.data.response;
        const estimatedTotalPages = Math.ceil(
          (res.data.total_count || newArticles.length) / 10
        ); // Default to 10 items per page

        setArticles(newArticles);
        setTotalPages(estimatedTotalPages);
        setCurrentPage(page);

        if (isNewSearch) {
          setSearchHistory((prev) => [
            ...prev,
            {
              filters: { ...filters },
              page: 1,
              articles: newArticles,
            },
          ]);
        }

        setError("");
      } catch (err) {
        console.error("API Error:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to fetch news"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!filters.searchTerm.trim() && !filters.category) {
        setError("Please enter a search term or select a category");
        return;
      }
      fetchFilteredNews(1, true);
    },
    [filters, fetchFilteredNews]
  );

  const handleClear = useCallback(() => {
    setFilters(defaultFilters);
    setArticles([]);
    setError("");
    setCurrentPage(1);
    setTotalPages(1);
    setSearchHistory([]);
  }, []);

  const goBack = useCallback(() => {
    if (searchHistory.length > 1) {
      const prevState = searchHistory[searchHistory.length - 2];
      setFilters(prevState.filters);
      setCurrentPage(prevState.page);
      setArticles(prevState.articles);
      setSearchHistory((prev) => prev.slice(0, -1));
    } else {
      handleClear();
    }
  }, [searchHistory, handleClear]);

  const loadPage = useCallback(
    (page) => {
      if (page < 1 || page > totalPages) return;
      fetchFilteredNews(page);
    },
    [totalPages, fetchFilteredNews]
  );

  // Initial load: categories and ads
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const [catRes, adRes] = await Promise.all([
          GetNewsCategories("MYAWR241227001"),
          GetSearchPageTopAds("MYAWR241227001"),
        ]);

        setCategories(catRes?.data?.response || []);
        setTopAds(adRes?.data?.response?.top_banner || {});

        // Load first category by default if no filters
        if (!filters.category && catRes?.data?.response?.length > 0) {
          const firstCategoryId = catRes.data.response[0].id;
          setFilters((prev) => ({ ...prev, category: firstCategoryId }));
        }
      } catch (err) {
        console.error("Initial load failed:", err);
        setError("Failed to load initial data");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Fetch news when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.category || filters.searchTerm) {
        fetchFilteredNews(1, true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, fetchFilteredNews]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!filters.category) {
      setSubcategories([]);
      return;
    }

    const loadSubcategories = async () => {
      try {
        const res = await GetNewsSubcategories(
          "MYAWR241227001",
          filters.category
        );
        setSubcategories(res?.data?.response || []);
      } catch (err) {
        console.error("Failed to load subcategories:", err);
      }
    };

    loadSubcategories();
  }, [filters.category]);

  return (
    <div className="mt-1 min-h-screen">
      {/* Search Header */}
      <div
        className="py-4 sticky top-0 z-10 shadow-md"
        style={{
          backgroundColor:
            webTheme["bg-color"] === "#e60000"
              ? "#b91c1c"
              : webTheme["bg-color"],
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-2">
            {searchHistory.length > 0 && (
              <button
                onClick={goBack}
                disabled={isLoading}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors disabled:opacity-50"
                aria-label="Go back"
              >
                <FaArrowLeft />
              </button>
            )}

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="flex-1 ">
              <div
                className={`${
                  error ? "border border-red-500" : "border border-transparent"
                } flex items-center gap-2 px-3 py-2 bg-white w-full rounded-lg shadow-sm`}
              >
                <button type="submit" className="p-1" disabled={isLoading}>
                  <FaSearch
                    className={`${
                      isLoading
                        ? "text-gray-400"
                        : "text-gray-500 hover:text-red-500"
                    } transition-colors`}
                  />
                </button>
                <input
                  type="text"
                  placeholder="Search news, categories..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchTerm: e.target.value,
                    }))
                  }
                  className="border-none outline-none w-full text-gray-700 placeholder-gray-400"
                  disabled={isLoading}
                />
                {filters.searchTerm && (
                  <button
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, searchTerm: "" }))
                    }
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              {error && (
                <p className="text-red-100 text-center mt-2 font-medium">
                  {error}
                </p>
              )}
            </form>
          </div>

          {/* Dropdown Filters - Desktop */}
          <div className="hidden md:block">
            <DropdownFilters
              categories={categories}
              subcategories={subcategories}
              setCategory={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  category: value,
                  subcategory: "",
                }))
              }
              setSubcategory={(value) =>
                setFilters((prev) => ({ ...prev, subcategory: value }))
              }
              setSortBy={(value) =>
                setFilters((prev) => ({ ...prev, sortBy: value }))
              }
              setLocation={(value) =>
                setFilters((prev) => ({ ...prev, location: value }))
              }
              currentFilters={filters}
              disabled={isLoading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow hover:shadow-md transition-all w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <ImSpinner8 className="animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={isLoading}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow hover:shadow-md transition-all w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              disabled={isLoading}
              className="md:hidden p-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Toggle filters"
            >
              <FaFilter />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="md:hidden bg-white p-4 shadow-lg border-t border-gray-200">
          <DropdownFilters
            categories={categories}
            subcategories={subcategories}
            setCategory={(value) =>
              setFilters((prev) => ({
                ...prev,
                category: value,
                subcategory: "",
              }))
            }
            setSubcategory={(value) =>
              setFilters((prev) => ({ ...prev, subcategory: value }))
            }
            setSortBy={(value) =>
              setFilters((prev) => ({ ...prev, sortBy: value }))
            }
            setLocation={(value) =>
              setFilters((prev) => ({ ...prev, location: value }))
            }
            currentFilters={filters}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Lower Banner Ad */}
      {/* <div className="flex justify-center my-6">
        <HeaderAd
          className="bg-gray-100 sm:w-[728px] sm:h-[90px] w-full max-w-[320px] h-[100px] rounded-lg overflow-hidden shadow-sm"
          adData={topAds}
        />
      </div> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        {/* Loading State */}
        {isLoading && articles.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <ImSpinner8 className="animate-spin text-4xl text-gray-400" />
          </div>
        )}

        {/* Results */}
        {!isLoading && articles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              {filters.searchTerm || filters.category
                ? "No articles found"
                : "Search for news or select a category"}
            </h3>
            <p className="text-gray-500">
              {filters.searchTerm || filters.category
                ? "Try adjusting your search criteria"
                : "Browse news by selecting a category or using the search bar"}
            </p>
          </div>
        ) : (
          <>
            {articles.length > 0 && (
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {filters.searchTerm
                    ? `Results for "${filters.searchTerm}"`
                    : categories.find((c) => c.id === filters.category)?.name ||
                      "Latest News"}
                </h2>
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <NewsFeed newsCard={articles} />
            </div>
          </>
        )}

        {/* Pagination Controls */}
        {articles.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => loadPage(currentPage - 1)}
              disabled={currentPage <= 1 || isLoading}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaArrowLeft />
              Previous
            </button>

            <div className="flex items-center px-4">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => loadPage(pageNum)}
                    disabled={pageNum === currentPage || isLoading}
                    className={`w-10 h-10 rounded-full mx-1 ${
                      pageNum === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => loadPage(currentPage + 1)}
              disabled={currentPage >= totalPages || isLoading}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <FaArrowRight />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
