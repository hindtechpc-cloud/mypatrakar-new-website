import { useEffect, useState } from "react";
import { AdCard } from "../components/AdCard";
import { FaFilter, FaMapMarkerAlt } from "react-icons/fa";
import { defaultAds, filterOptions, locationOptions } from "./data";
import FilterAds from "../components/FilterAds";
import { Link, useNavigate } from "react-router-dom";
import NotificationCard from "../components/NotificationCard";
import NotificationPage from "./NotificationPage";

export const AdListingPage = () => {
  const [ads, setAds] = useState(defaultAds);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("buyer");
const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
let filtered;
  const filterAds = (locationVal, categoryVal) => {
     filtered = defaultAds.filter((card) => {
      const matchesLocation = locationVal
        ? card.location.toLowerCase().includes(locationVal.toLowerCase())
        : true;
      const matchesCategory = categoryVal
        ? card.category.toLowerCase().includes(categoryVal.toLowerCase())
        : true;
      return matchesLocation && matchesCategory;
    });

    setAds(filtered);
  };

  const handleLocationFilter = (value) => {
    setSelectedLocation(value);
    filterAds(value, selectedCategory);
  };

  const handleCategoryFilter = (value) => {
    setSelectedCategory(value);
    filterAds(selectedLocation, value);
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      {/* Mode Switch */}
      <div className="flex justify-around mb-3">
        <button
          className={`flex-1 py-2 mx-1 rounded-full border ${
            mode === "seller" ? "bg-black text-white" : "bg-gray-100"
          }`}

          onClick={() => navigate("/seller-query-form")}
        >
          SELLER
        </button>
       
        
        <button
          className={`flex-1 py-2 mx-1 rounded-full border ${
            mode === "buyer" ? "bg-black text-white" : "bg-gray-100"
          }`}
          onClick={() => navigate("/buyer-query-form")}
        >
          BUYER
        </button>
      </div>

      {/* Heading */}
      <div className="mb-2">
        <h2 className="text-xl font-bold">Lucknow</h2>
        <p className="text-sm text-gray-500">
          {ads.length} product{ads.length !== 1 ? "s" : ""} found in{" "}
          <span className="text-red-500 font-semibold">shops</span> category
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-end mb-4 gap-3 text-xl">
        <FilterAds
          icons={<FaMapMarkerAlt className="h-5 w-5" />}
          options={locationOptions}
          onFilterChange={handleLocationFilter}
        />
        <FilterAds
          icons={<FaFilter className="h-5 w-5" />}
          options={filterOptions}
          onFilterChange={handleCategoryFilter}
        />
      </div>

      {/* Ads Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : ads.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {ads?.map((ad, i) => (
            <AdCard ad={ad} key={i} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No ads found.</p>
      )}
      <NotificationPage/>
    </div>
  );
};
