// Search.jsx (Final Cleaned Version)

import { useContext, useEffect, useState, useCallback } from "react";
import {
  GetNewsCategories,
  GetNewsSubcategories,
  GetSearchPageTopAds,
  NewsSortBy,
} from "../../../api";
import { WebThemeContext } from "../../context/ThemeContext";
import { FaSearch, FaTimes, FaFilter, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import DropdownFilters from "./DropdownFilters";
import HeaderAd from "../../TopBar/HeaderAd";
import ArticleListItem from "./ArticleListItem";

const defaultFilters = {
  searchTerm: "",
  category: "",
  subcategory: "",
  location: "",
  sortBy: "",
};
const mockLocations = [
  { id: 'up', name: 'उत्तर प्रदेश' },
  { id: 'mp', name: 'मध्य प्रदेश' },
  { id: 'delhi', name: 'दिल्ली' },
];
const mockSortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Popular", value: "popular" },
  { label: "Date", value: "date" },
];

export default function Search() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [locations, setLocations] = useState(mockLocations);
  const [topAds, setTopAds] = useState({});
  const [filters, setFilters] = useState(defaultFilters);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { webTheme } = useContext(WebThemeContext);

  const fetchFilteredNews = useCallback(async (page = 1, currentFilters) => {
    if (!currentFilters.searchTerm.trim() && !currentFilters.category) {
      setArticles([]);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const payload = {
        search_term: currentFilters.searchTerm || undefined,
        category_id: currentFilters.category || undefined,
        sub_category_id: currentFilters.subcategory || undefined,
        location_id: currentFilters.location || undefined,
        sort_by: currentFilters.sortBy || undefined,
        page,
      };
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, v]) => v)
      );
      const res = await NewsSortBy("MYAWR241227001", cleanPayload);
      const newArticles = res?.data?.response || [];
      setArticles(newArticles);
      setTotalPages(Math.ceil((res?.data?.total_count || newArticles.length) / 10) || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("API Error:", err);
      setArticles([]);
      setError("Failed to fetch news.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    fetchFilteredNews(1, filters);
  }, [fetchFilteredNews, filters]);

  const handleClear = useCallback(() => {
    setFilters(defaultFilters);
    setArticles([]);
    setError("");
    setCurrentPage(1);
    setTotalPages(1);
  }, []);

  const loadPage = useCallback((page) => {
    if (page < 1 || page > totalPages) return;
    fetchFilteredNews(page, filters);
  }, [totalPages, fetchFilteredNews, filters]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [catRes, adRes] = await Promise.all([
          GetNewsCategories("MYAWR241227001"),
          GetSearchPageTopAds("MYAWR241227001"),
        ]);
        setCategories(catRes?.data?.response || []);
        setTopAds(adRes?.data?.response?.top_banner || {});
      } catch (err) {
        console.error("Initial load failed:", err);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!filters.category) {
      setSubcategories([]);
      return;
    }
    const loadSubcategories = async () => {
      try {
        const res = await GetNewsSubcategories("MYAWR241227001", filters.category);
        setSubcategories(res?.data?.response || []);
      } catch (err) {
        setSubcategories([]);
        console.error("Failed to load subcategories:", err);
      }
    };
    loadSubcategories();
  }, [filters.category]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="py-4 sticky top-0 z-20 shadow-md" style={{ backgroundColor: webTheme["bg-color"] || "#b91c1c" }}>
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-4">
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="flex items-center bg-white rounded-sm p-2 shadow-sm">
              <button type="submit" className="text-gray-500 pl-2 pr-3" disabled={isLoading}><FaSearch /></button>
              <input
                type="text"
                placeholder="Search news..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="border-none outline-none text-gray-800 placeholder-gray-500 w-full"
                disabled={isLoading}
              />
              {filters.searchTerm && (
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, searchTerm: "" }))}
                  className="p-1 text-gray-400 hover:text-gray-600"
                ><FaTimes /></button>
              )}
            </div>
          </form>
          <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="md:hidden p-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Filters */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 p-6 rounded-lg bg-white shadow-sm">
          <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block`}>
            <DropdownFilters
              categories={categories}
              subcategories={subcategories}
              locations={locations}
              sortOptions={mockSortOptions}
              setCategory={(v) => setFilters(prev => ({ ...prev, category: v, subcategory: "" }))}
              setSubcategory={(v) => setFilters(prev => ({ ...prev, subcategory: v }))}
              setSortBy={(v) => setFilters(prev => ({ ...prev, sortBy: v }))}
              setLocation={(v) => setFilters(prev => ({ ...prev, location: v }))}
              currentFilters={filters}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Search & Clear Buttons */}
        <div className="flex items-center justify-center gap-4 my-6">
          <button onClick={handleSubmit} disabled={isLoading || (!filters.searchTerm && !filters.category)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-10 rounded shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-70">
            {isLoading ? (<><ImSpinner8 className="animate-spin" /> Searching...</>) : "SEARCH"}
          </button>
          <button onClick={handleClear} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-10 rounded shadow-md hover:shadow-lg disabled:opacity-70">
            CLEAR
          </button>
        </div>

        {/* Ads */}
        <div className="flex justify-center my-6">
          <HeaderAd adData={topAds} />
        </div>

        {/* Articles */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center min-h-[40vh]">
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
                    description: article.news_description_html || 'No description available.',
                    category: article.news_category_name,
                    url: `/news/${article.news_id}`,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 w-full">
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                {filters.searchTerm || filters.category ? "No articles found" : "Search for news or select a category"}
              </h3>
              <p className="text-gray-500">
                {filters.searchTerm || filters.category ? "Try adjusting your search criteria" : "Browse news by selecting a category or using the search bar"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && articles.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button onClick={() => loadPage(currentPage - 1)} disabled={currentPage <= 1} className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm disabled:opacity-50">
              <FaArrowLeft /> Previous
            </button>
            <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
            <button onClick={() => loadPage(currentPage + 1)} disabled={currentPage >= totalPages} className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm disabled:opacity-50">
              Next <FaArrowRight />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
