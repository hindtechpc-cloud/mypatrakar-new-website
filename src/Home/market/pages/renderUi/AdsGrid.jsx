import React from "react";
import { FiSearch } from "react-icons/fi";
import { AdCardSkeleton } from "../../components/Skeleton";
import { AdCard } from "../../components/AdCard";

export default function AdsGrid({ ads, defaultAds, loading, setAds, setSearchQuery, resetFilters }) {
  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <AdCardSkeleton key={i} />
        ))}
      </div>
    );

  if (ads.length === 0)
    return (
      <div className="text-center py-12">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
          <FiSearch className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No listings found
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Try adjusting your search or filter to find what {`you're`} looking for.
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
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <AdCard ad={ad} key={ad.ad_id} />
      ))}
    </div>
  );
}
