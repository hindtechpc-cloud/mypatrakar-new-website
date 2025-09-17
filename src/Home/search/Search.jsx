
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import {
  GetNewsCategories,
  GetNewsSubcategories,
  GetSearchPageTopAds,
  LocationList,
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
import ArticleListItem from "./ArticleListItem";
import { encryptData } from "../../utils/cryptoHelper";
import toast from "react-hot-toast";
import SpeakMessage from "../../utils/SpeakMessage";

const DEFAULT_FILTERS = {
  searchTerm: "",
  category: "",
  subcategory: "",
  location: "lucknow",
  sortBy: "",
};

const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Popular", value: "popular" },
  { label: "Date", value: "date" },
];

export default function Search() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [topAds, setTopAds] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [locations, setLocations] = useState([]);
  const { webTheme } = useContext(WebThemeContext);

  // 🔹 fetch news
  const fetchFilteredNews = useCallback(async (page = 1, currentFilters) => {
    if (!currentFilters?.searchTerm.trim() && !currentFilters?.category) {
      setArticles([]);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload = Object.fromEntries(
        Object.entries({
          search_term: currentFilters.searchTerm,
          category: currentFilters.category,
          sub_category: currentFilters.subcategory,
          location: currentFilters.location,
          sort_by: currentFilters.sortBy,
          page,
        }).filter(([_, v]) => v)
      );

      const res = await NewsSortBy("MYAWR241227001", payload);
      console.log(res)
      const newArticles = res?.data?.response || [];
      setArticles(newArticles);
      setTotalPages(
        Math.ceil((res?.data?.total_count || newArticles.length) / 10) || 1
      );
      setCurrentPage(page);
      toast.success("Fetched news successfully")
      newArticles && <SpeakMessage message="Fetched news successfully!" />
    } catch (err) {
      console.error("API Error:", err);
      setArticles([]);
      toast.error("Failed to fetch news.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔹 debounce search
  const debouncedSearch = useMemo(
    () =>
      debounce(
        (term) => setFilters((prev) => ({ ...prev, searchTerm: term })),
        600
      ),
    []
  );

  // 🔹 manual search submit
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      fetchFilteredNews(1, filters);

    },
    [fetchFilteredNews, filters]
  );

  // 🔹 clear filters
  const handleClear = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setArticles([]);
    setError("");
    setCurrentPage(1);
    setTotalPages(1);
    toast.error("Clear all filters successfully")
  }, []);

  // 🔹 pagination
  const loadPage = useCallback(
    (page) => {
      if (page < 1 || page > totalPages) return;
      fetchFilteredNews(page, filters);
    },
    [totalPages, fetchFilteredNews, filters]
  );

  // 🔹 load initial data (categories + ads)
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [catRes, adRes] = await Promise.all([
          GetNewsCategories("MYAWR241227001"),
          GetSearchPageTopAds("MYAWR241227001"),
        ]);
        const cats = catRes?.data?.response || [];
        setCategories(cats);
        setTopAds(adRes?.data?.response?.top_banner || null);

        // ✅ first category load hone ke baad uska news fetch
        if (cats.length > 0) {
          const firstCatId = cats[0].cat_id;

          // filters update
          setFilters((prev) => ({
            ...prev,
            category: firstCatId,
            subcategory: "",
          }));

          // news fetch
          fetchFilteredNews(1, {
            ...DEFAULT_FILTERS,
            category: firstCatId,
          });
        }
      } catch (err) {
        console.error("Initial load failed:", err);
      }
    };
    loadInitialData();
  }, [fetchFilteredNews]);

  // 🔹 fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!filters.category) return setSubcategories([]);
      try {
        const res = await GetNewsSubcategories(
          "MYAWR241227001",
          filters.category
        );
        setSubcategories(res?.data?.response || []);
      } catch (err) {
        console.error("Subcategory fetch error:", err);
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [filters.category]);

  // 🔹 fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await LocationList("MYAWR241227001", "location");
        setLocations(res?.data?.response || []);
      } catch (err) {
        console.error("Location fetch error:", err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sticky Search Header */}
      <div
        className="py-4 sticky top-0 z-20 shadow-md"
        style={{ backgroundColor: webTheme["bg-color"] || "#b91c1c" }}
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-4">
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="flex items-center bg-white rounded-sm p-2 shadow-sm">
              <button
                type="submit"
                className="text-gray-500 pl-2 pr-3"
                disabled={isLoading}
              >
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Search news..."
                onChange={(e) => debouncedSearch(e.target.value)}
                className="border-none outline-none text-gray-800 placeholder-gray-500 w-full"
                disabled={isLoading}
              />
              {filters.searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, searchTerm: "" }))
                  }
                  className="p-1 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </form>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden p-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-100"
            aria-label="Toggle filters"
          >
            <FaFilter />
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 🔹 Filters */}
        <section className="mb-6 p-6 rounded-lg bg-white shadow-sm">
          <div className={`${showMobileFilters ? "block" : "hidden"} md:block`}>
            <DropdownFilters
              categories={categories}
              subcategories={subcategories}
              locations={locations}
              sortOptions={SORT_OPTIONS}
              setCategory={(val) =>
                setFilters((prev) => ({
                  ...prev,
                  category: val,
                  subcategory: "",
                }))
              }
              setSubcategory={(val) =>
                setFilters((prev) => ({ ...prev, subcategory: val }))
              }
              setSortBy={(val) => setFilters((prev) => ({ ...prev, sortBy: val }))}
              setLocation={(val) =>
                setFilters((prev) => ({ ...prev, location: val }))
              }
              currentFilters={filters}
              disabled={isLoading}
              fetchNews={fetchFilteredNews}
            />
          </div>
        </section>

        {/* 🔹 Buttons */}
        <div className="flex items-center justify-center gap-4 my-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading || (!filters.searchTerm && !filters.category)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-10 rounded shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <ImSpinner8 className="animate-spin" /> Searching...
              </>
            ) : (
              "SEARCH"
            )}
          </button>
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-10 rounded shadow-md hover:shadow-lg disabled:opacity-70"
          >
            CLEAR
          </button>
        </div>

        {/* 🔹 Ads */}
        {topAds && (
          <div className="flex justify-center my-6">
            <HeaderAd adData={topAds} />
          </div>
        )}

        {/* 🔹 Articles */}
        <section className="mt-8 bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center min-h-[40vh]">
          {isLoading ? (
            <div className="flex justify-center items-center py-20 w-full">
              <ImSpinner8 className="animate-spin text-4xl text-gray-400" />
            </div>
          ) : articles.length > 0 ? (
            <div className="w-full max-w-4xl">
              {articles.map((article) => (
                <ArticleListItem
                  key={article.news_id}
                  article={{
                    image: article.news_img_url,
                    title: article.news_headline,
                    description:
                      article.news_description_html ||
                      "No description available.",
                    category: article.news_category_name,
                    url: `/read-news/${article.news_headline}/${encryptData(
                      article.news_id
                    )}`,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 w-full">
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                {filters.searchTerm || filters.category
                  ? "No articles found"
                  : "Search for news or select a category"}
              </h3>
              <p className={filters.searchTerm || filters.category ?"text-green-500":"text-red-500"}>
                {filters.searchTerm || filters.category
                  ? "Try adjusting your search criteria"
                  : "Browse news by selecting a category or using the search bar"}
              </p>
            </div>
          )}
        </section>

        {/* 🔹 Pagination */}
        {!isLoading && articles.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => loadPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm disabled:opacity-50"
            >
              <FaArrowLeft /> Previous
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => loadPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm disabled:opacity-50"
            >
              Next <FaArrowRight />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
