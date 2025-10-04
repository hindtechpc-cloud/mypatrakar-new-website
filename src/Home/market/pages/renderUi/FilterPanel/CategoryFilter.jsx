import React from "react";

export default function CategoryFilter({ filters, setFilters }) {
  return (
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
      </select>
    </div>
  );
}
