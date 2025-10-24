// import React, { useEffect, useState } from 'react'
// import { AdCardSkeleton } from '../components/Skeleton';
// import { AdCard } from '../components/AdCard';
// import { FiArrowRight, FiFilter, FiSearch, FiX } from 'react-icons/fi';
// import FilterAds from '../components/FilterAds';
// import { LocationList } from '../../../../api'; // API se location fetch

// export default function RenderUi({
//     searchQuery,
//     setSearchQuery,
//     handleSearch,
//     setAds,
//     ads,
//     defaultAds,
//     loading,
//     setFilters,
//     setShowFilters,
//     filters,
//     showFilters,
//     resetFilters,
//     applyFilters
// }) {
//   const [locations, setLocations] = useState([]);

//   // Load locations from API
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const res = await LocationList();
//         const data = res.data?.response || [];
//         setLocations(data.map(loc => ({ name: loc.location_name, value: loc.location_id })));
//       } catch (err) {
//         console.log("Error loading locations:", err);
//       }
//     };
//     fetchLocations();
//   }, []);

//   return (
//     <div className='mb-3'>
//        {/* Search Bar */}
//           <div className="flex flex-col sm:flex-row gap-3 mb-6">
//             <div className="relative flex-grow">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search for products, companies..."
//                 className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => {
//                     setSearchQuery("");
//                     setAds(defaultAds);
//                   }}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 </button>
//               )}
//             </div>
//             <button
//               onClick={handleSearch}
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
//             >
//               Search
//               <FiArrowRight className="ml-2" />
//             </button>
//           </div>

//       {/* Filter and Results Info */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <div className="mb-3 sm:mb-0">
//           <h2 className="text-lg font-semibold text-gray-900">
//             {loading ? "Loading..." : `${ads.length} Results`}
//           </h2>
//           <p className="text-sm text-gray-500">
//             {loading
//               ? "Fetching available listings..."
//               : `Showing ${ads.length} of ${defaultAds.length} listings`}
//           </p>
//         </div>
//         <button
//           className="flex items-center text-sm text-blue-600 hover:text-blue-800"
//           onClick={() => setShowFilters(!showFilters)}
//         >
//           <FiFilter className="mr-2" />
//           {showFilters ? "Hide Filters" : "Filter Results"}
//         </button>
//       </div>

//       {/* Filter Panel */}
//       {showFilters && (
//         <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//             {/* Price Filters */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Min Price (₹)
//               </label>
//               <input
//                 type="number"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={filters.minPrice}
//                 onChange={(e) =>
//                   setFilters({ ...filters, minPrice: e.target.value })
//                 }
//                 placeholder="Minimum"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Max Price (₹)
//               </label>
//               <input
//                 type="number"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={filters.maxPrice}
//                 onChange={(e) =>
//                   setFilters({ ...filters, maxPrice: e.target.value })
//                 }
//                 placeholder="Maximum"
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={filters.category}
//                 onChange={(e) =>
//                   setFilters({ ...filters, category: e.target.value })
//                 }
//               >
//                 <option value="">All Categories</option>
//                 <option value="electronics">Electronics</option>
//                 <option value="furniture">Furniture</option>
//                 <option value="vehicles">Vehicles</option>
//               </select>
//             </div>

//             {/* Location Filter */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Location
//               </label>
//               <FilterAds
//                 icons={<FiFilter />}
//                 options={locations}
//                 onFilterChange={(value) =>
//                   setFilters({ ...filters, location: value })
//                 }
//               />
//             </div>
//           </div>

//           <div className="flex justify-end space-x-3">
//             <button
//               onClick={resetFilters}
//               className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md border border-gray-300"
//             >
//               Reset
//             </button>
//             <button
//               onClick={applyFilters}
//               className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Ads Grid */}
//       {loading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <AdCardSkeleton key={i} />
//           ))}
//         </div>
//       ) : ads?.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {ads?.map((ad) => (
//             <AdCard ad={ad} key={ad.ad_id} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
//             <FiSearch className="h-6 w-6 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-1">
//             No listings found
//           </h3>
//           <p className="text-gray-500 max-w-md mx-auto">
//             Try adjusting your search or filter to find what {`you're`} looking for.
//           </p>
//           <button
//             onClick={() => {
//               setSearchQuery("");
//               resetFilters();
//             }}
//             className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
//           >
//             Clear all filters
//           </button>
//         </div>
//       )}

//       {/* Load More Button */}
//       {ads.length > 0 && !loading && ads.length < defaultAds.length && (
//         <div className="mt-10 text-center">
//           <button
//             className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//             onClick={() => {
//               setAds(defaultAds);
//             }}
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

import React, { useState, useEffect } from "react";
import { LocationList } from "../../../../api";

import FilterInfo from "./renderUi/FilterInfo";
import FilterPanel from "./renderUi/FilterPanel/FilterPanel";
import AdsGrid from "./renderUi/AdsGrid";
import SearchBar from "./renderUi/SearchBar";

export default function RenderUi(props) {
  const {
    searchQuery,
    setSearchQuery,
    handleSearch,
    ads,
    setAds,
    defaultAds,
    loading,
    filters,
    setFilters,
    showFilters,
    setShowFilters,
    resetFilters,
    applyFilters,
  } = props;

  const [locations, setLocations] = useState([]);
console.log(ads)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await LocationList();
        const data = res.data?.response || [];
        setLocations(
          data.map((loc) => ({
            name: loc.location_name,
            value: loc.location_id,
          }))
        );
      } catch (err) {
        console.log("Error loading locations:", err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="mb-3">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        defaultAds={defaultAds}
        setAds={setAds}
      />

      <FilterInfo
        ads={ads}
        setAds={setAds}
        defaultAds={defaultAds}
        loading={loading}
        showFilters={showFilters}
        locations={locations}
        // locations={locations}
        filters={filters}
        setFilters={setFilters}
        setShowFilters={setShowFilters}
      />

      {showFilters && (
        <FilterPanel
          ads={ads}
          setAds={setAds}
          filters={filters}
          setFilters={setFilters}
          locations={locations}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}

      <AdsGrid
        ads={ads}
        defaultAds={defaultAds}
        loading={loading}
        setAds={setAds}
        setSearchQuery={setSearchQuery}
        resetFilters={resetFilters}
      />
    </div>
  );
}
