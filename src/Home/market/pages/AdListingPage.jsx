import { useEffect, useState } from "react";
// import { AdCard } from "../components/AdCard";
import { useLocation, useNavigate } from "react-router-dom";
import { GetMarketPlaceAds } from "../../../../api";
// import { FiArrowRight, FiSearch, FiFilter, FiX } from "react-icons/fi";
// import { Skeleton, AdCardSkeleton } from "../components/Skeleton";
import RenderUi from "./RenderUi";
import SellerQueryForm from "./QueryForm";

export const AdListingPage = () => {
  const [defaultAds, setDefaultAds] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("buyer");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Lucknow");
  const [showFilters, setShowFilters] = useState(false);
  const url = useLocation();
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
  });
// console.log(url)
  const navigate = useNavigate();

  const loadAds = async () => {
    try {
      setLoading(true);
      const res = await GetMarketPlaceAds("MYAWR241227001");
      const adList = res?.data?.response || [];
      // console.log(res);
      setDefaultAds(adList);
      setAds(adList);
    } catch (error) {
      console.log("Failed to load ads:", error);
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
    loadAds();
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
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Marketplace
          </h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500">
            <span>Currently showing ads in </span>
            <span className="ml-1 font-medium text-blue-600">{location}</span>
          </div>
        </div>

        {/* Mode Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full md:w-auto">
          <button
            className={`w-full sm:w-auto py-2 sm:py-3 px-4 rounded-full transition-all ${
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
            className={`w-full sm:w-auto py-2 sm:py-3 px-4 rounded-full transition-all ${
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
      </div>
    </div>
  </div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {(url.pathname === "/market-place" || url.pathname === "/market-place/") && (
      <RenderUi
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        setAds={setAds}
        ads={ads}
        defaultAds={defaultAds}
        loading={loading}
        setFilters={setFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        showFilters={showFilters}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
      />
    )}

    {url.pathname === "/buyer-query-form" && <SellerQueryForm />}
    {url.pathname === "/seller-query-form" && <SellerQueryForm />}
  </div>
</div>

  );
};
