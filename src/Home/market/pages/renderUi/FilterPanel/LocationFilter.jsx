// import React from "react";
// import FilterAds from "../../../components/FilterAds";
// import { LuMapPin } from "react-icons/lu";

// export default function LocationFilter({ locations, filters, setFilters, setAds, ads, defaultAds }) {

//   // jab user koi location select kare
//   const handleLocationChange = (selectedIds) => {
//     // filter state update karna
//     setFilters({ ...filters, location: selectedIds });

//     // agar kuch select nahi hai to sab ads wapas dikha do
//     if (selectedIds.length === 0) {
//       setAds(defaultAds);
//       return;
//     }

//     // ads ko filter karo unke location id ke basis pe
//     const filteredAds = ads?.filter(
//       (ad) => selectedIds.includes(ad.location) // ad ka location_id match kare
//     );

//     // filtered ads UI me dikhana
//     setAds(filteredAds);
//   };

//   return (
//     <div>
//       <FilterAds
//         icons={<LuMapPin />}
//         options={locations}
//         onFilterChange={handleLocationChange}
//       />
//     </div>
//   );
// }

import React from "react";
import FilterAds from "../../../components/FilterAds";
import { LuMapPin } from "react-icons/lu";

export default function LocationFilter({
  locations,
  filters,
  setFilters,
  setAds,
  ads,
  defaultAds,
}) {
  // jab user location select kare
  const handleLocationChange = (selectedLocations) => {
    // filters me update karna
    setFilters({ ...filters, location: selectedLocations });

    // agar kuch bhi select nahi hai → sab ads dikha do
    if (selectedLocations.length === 0) {
      setAds(defaultAds);
      return;
    }
console.log(selectedLocations)
    // Filter ads based on location name (case-insensitive)
    const filteredAds = defaultAds.filter((ad) =>
      selectedLocations.some(
        (locName) =>
          ad.location && ad.location.toLowerCase() === locName.toLowerCase()
      )
    );

    // filtered ads update karo
    setAds(filteredAds);
  };

  return (
    <div>
      <FilterAds
        icons={<LuMapPin />}
        options={locations}
        onFilterChange={handleLocationChange}
      />
    </div>
  );
}
