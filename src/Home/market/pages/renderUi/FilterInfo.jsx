import React from "react";
import { FiFilter } from "react-icons/fi";
import LocationFilter from "./FilterPanel/LocationFilter";

export default function FilterInfo({
  ads,
  setAds,
  defaultAds,
  loading,
  showFilters,
  setShowFilters,
  locations,
  filters,
  setFilters,
}) {
  return (
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
      <div className="flex items-center justify-center gap-2">
        <button
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter className="mr-2" />
          {showFilters ? "Hide Filters" : "Filter Results"}
        </button>
     <LocationFilter
  ads={ads}
  setAds={setAds}
  defaultAds={defaultAds}  
  locations={locations}
  filters={filters}
  setFilters={setFilters}
/>

      </div>
    </div>
  );
}
