import React from "react";

import FilterAds from "../../../components/FilterAds";
import { LuMapPin } from "react-icons/lu";


export default function LocationFilter({ locations, filters, setFilters }) {
  return (
    <div>
     
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
