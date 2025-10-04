import React from "react";

export default function PriceFilter({ filters, setFilters }) {
  return (
    <>
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
    </>
  );
}
