import { useEffect, useState } from "react";
import { AdCard } from "../components/AdCard";
import { useNavigate } from "react-router-dom";
import { GetMarketPlaceAds } from "../../../../api";
import { FiArrowRight, FiSearch, FiFilter, FiX } from "react-icons/fi";
import { Skeleton, AdCardSkeleton } from "../components/Skeleton";

export const AdListingPage = () => {
  const [defaultAds, setDefaultAds] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("buyer");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Lucknow");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
  });

  const navigate = useNavigate();

  const loadAds = async () => {
    try {
      setLoading(true);
      const res = await GetMarketPlaceAds("MYAWR241227001");
      const adList = res?.data?.response || [];
      console.log(res)
      setDefaultAds(adList);
      setAds(adList);
    } catch (error) {
      console.error("Failed to load ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Step 1: Get user coordinates
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Step 2: Use OpenStreetMap reverse geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();

        // Step 3: Extract city and state
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "Unknown City";
        const state = data.address.state || "Unknown State";

        setLocation(`${city}, ${state}`);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocation("Location permission denied or unavailable");
      }
    );
    loadAds()
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setAds(defaultAds);
      return;
    }
    const filtered = defaultAds.filter(
      (ad) =>
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.short_desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAds(filtered);
  };

  const applyFilters = () => {
    let filtered = [...defaultAds];

    if (filters.minPrice) {
      filtered = filtered.filter((ad) => ad.amount >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((ad) => ad.amount <= Number(filters.maxPrice));
    }

    if (filters.category) {
      filtered = filtered.filter(
        (ad) => ad.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    setAds(filtered);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      category: "",
    });
    setAds(defaultAds);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Location and Search */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Marketplace
          </h1>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>Currently showing ads in </span>
            <span className="ml-1 font-medium text-blue-600">{location}</span>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products, companies..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setAds(defaultAds);
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Search
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Mode Switch */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-8 max-w-md mx-auto sm:mx-0">
          <button
            className={`flex-1 py-3 px-4 rounded-full transition-all ${
              mode === "seller"
                ? "bg-white shadow-md font-medium"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => {
              setMode("seller");
              navigate("/seller-query-form");
            }}
          >
            I Want to Sell
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-full transition-all ${
              mode === "buyer"
                ? "bg-white shadow-md font-medium"
                : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => {
              setMode("buyer");
              navigate("/buyer-query-form");
            }}
          >
            I Want to Buy
          </button>
        </div>

        {/* Filter and Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="mb-3 sm:mb-0">
            <h2 className="text-lg font-semibold text-gray-900">
              {loading ? "Loading..." : `${ads.length} Results`}
            </h2>
            <p className="text-sm text-gray-500">
              {loading
                ? "Fetching available listings..."
                : `Showing ${ads.length} of ${defaultAds.length} listings`}
            </p>
          </div>
          <button
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="mr-2" />
            {showFilters ? "Hide Filters" : "Filter Results"}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                  placeholder="Minimum"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                  placeholder="Maximum"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="vehicles">Vehicles</option>
                  {/* Add more categories as needed */}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md border border-gray-300"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Ads Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <AdCardSkeleton key={i} />
            ))}
          </div>
        ) : ads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <AdCard ad={ad} key={ad.ad_id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
              <FiSearch className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No listings found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                resetFilters();
              }}
              className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {ads.length > 0 && !loading && ads.length < defaultAds.length && (
          <div className="mt-10 text-center">
            <button
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => {
                // In a real app, you would fetch more data here
                setAds(defaultAds); // For demo, showing all ads
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
