import React from "react";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";

export default function SearchBar({ searchQuery, setSearchQuery, handleSearch, defaultAds, setAds }) {
  return (
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
  );
}
