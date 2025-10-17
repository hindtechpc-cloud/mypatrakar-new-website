import React from "react";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";
// import LocationFilter from "./LocationFilter";

export default function FilterPanel({ filters, setFilters, resetFilters, applyFilters }) {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <PriceFilter filters={filters} setFilters={setFilters} />
        <CategoryFilter filters={filters} setFilters={setFilters} />
        {/* <LocationFilter locations={locations} filters={filters} setFilters={setFilters} /> */}
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
  );
}
