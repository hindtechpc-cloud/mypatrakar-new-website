import React from "react";

import FilterAds from "../../../components/FilterAds";
import { LuMapPin } from "react-icons/lu";


export default function LocationFilter({ locations, filters, setFilters }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Location
      </label>
      <FilterAds
        icons={<LuMapPin />}
        options={locations}
        onFilterChange={(value) =>
          setFilters({ ...filters, location: value })
        }
      />
    </div>
  );
}
