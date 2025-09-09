// // DropdownFilters.jsx (Final Corrected Version)

// import React from "react";
// import PropTypes from "prop-types";

// const DropdownFilters = ({
//   categories = [],
//   subcategories = [],
//   locations = [],
//   sortOptions = [],
//   setCategory,
//   setSubcategory,
//   setSortBy,
//   setLocation,
//   currentFilters,
//   disabled,
// }) => {

//   const handleChange = (e) => {


//     const { name, value } = e.target;
//     switch (name) {
//       case "category":
//         setCategory(value);
//         break;
//       case "subcategory":
//         setSubcategory(value);
//         break;
//       case "sortby":
//         setSortBy(value);
//         break;
//       case "location":
//         setLocation(value);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {/* Category Dropdown */}
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold text-gray-700 mb-1">
//             Category
//           </label>
//           <select
//             className="border p-2 rounded focus:ring focus:ring-blue-300"
//             name="category"
//             onChange={handleChange}
//             value={currentFilters.category}
//             disabled={disabled}
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.cat_id} value={cat.cat_id}>
//                 {cat.cat_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Subcategory Dropdown */}
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold text-gray-700 mb-1">
//             Subcategory
//           </label>
//           <select
//             className="border p-2 rounded focus:ring focus:ring-blue-300"
//             name="subcategory"
//             onChange={handleChange}
//             value={currentFilters.subcategory}
//             disabled={disabled || !subcategories.length}
//           >
//             <option value="">Select Subcategory</option>
//             {subcategories.map((sub) => (
//               <option key={sub.sub_category_id} value={sub.sub_category_id}>
//                 {sub.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Sort By Dropdown */}
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold text-gray-700 mb-1">
//             Sort By
//           </label>
//           <select
//             className="border p-2 rounded focus:ring focus:ring-blue-300"
//             name="sortby"
//             onChange={handleChange}
//             value={currentFilters.sortBy}
//             disabled={disabled}
//           >
//             <option value="">Select Sort Option</option>
//             {sortOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Location Dropdown */}
//         <div className="flex flex-col">
//           <label className="text-sm font-semibold text-gray-700 mb-1">
//             Location
//           </label>
//           <select
//             className="border p-2 rounded focus:ring focus:ring-blue-300"
//             name="location"
//             onChange={handleChange}
//             value={currentFilters.location}
//             disabled={disabled}
//           >
//             <option value="">Select Location</option>
//             {locations?.map((loc) => (
//               <option key={loc.location_id} value={loc.location_id}>
//                 {loc.location_name}
//               </option>
//             ))}
//           </select>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// DropdownFilters.propTypes = {
//   categories: PropTypes.array,
//   subcategories: PropTypes.array,
//   locations: PropTypes.array,
//   sortOptions: PropTypes.array,
//   setCategory: PropTypes.func.isRequired,
//   setSubcategory: PropTypes.func.isRequired,
//   setSortBy: PropTypes.func.isRequired,
//   setLocation: PropTypes.func.isRequired,
//   currentFilters: PropTypes.object.isRequired,
//   disabled: PropTypes.bool,
// };

// export default DropdownFilters;






// DropdownFilters.jsx

import React, { useEffect } from "react";
import PropTypes from "prop-types";

const DropdownFilters = ({
  categories = [],
  subcategories = [],
  locations = [],
  sortOptions = [],
  setCategory,
  setSubcategory,
  setSortBy,
  setLocation,
  currentFilters,
  disabled,
  fetchNews, // 👈 add fetch callback from parent
}) => {
  // 1️⃣ On mount, auto-select the first category (if not already set)
  useEffect(() => {
    if (categories.length > 0 && !currentFilters.category) {
      setCategory(categories[0].cat_id);
    }
  }, [categories, currentFilters.category, setCategory]);

  // 2️⃣ Whenever filters change, fetch the news
  useEffect(() => {
    if (currentFilters.category) {
      fetchNews(currentFilters); // Pass current filters
    }
  }, [currentFilters, fetchNews]);

  // 3️⃣ Handle dropdown changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "category":
        setCategory(value);
        setSubcategory(""); // reset subcategory when category changes
        break;
      case "subcategory":
        setSubcategory(value);
        break;
      case "sortby":
        setSortBy(value);
        break;
      case "location":
        setLocation(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            name="category"
            onChange={handleChange}
            value={currentFilters.category}
            disabled={disabled}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.cat_id} value={cat.cat_id}>
                {cat.cat_name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Subcategory
          </label>
          <select
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            name="subcategory"
            onChange={handleChange}
            value={currentFilters.subcategory}
            disabled={disabled || !subcategories.length}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub.sub_category_id} value={sub.sub_category_id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Sort By
          </label>
          <select
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            name="sortby"
            onChange={handleChange}
            value={currentFilters.sortBy}
            disabled={disabled}
          >
            <option value="">Select Sort Option</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Location
          </label>
          <select
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            name="location"
            onChange={handleChange}
            value={currentFilters.location}
            disabled={disabled}
          >
            <option value="">Select Location</option>
            {locations?.map((loc) => (
              <option key={loc.location_id} value={loc.location_id}>
                {loc.location_name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

DropdownFilters.propTypes = {
  categories: PropTypes.array,
  subcategories: PropTypes.array,
  locations: PropTypes.array,
  sortOptions: PropTypes.array,
  setCategory: PropTypes.func.isRequired,
  setSubcategory: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  currentFilters: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  fetchNews: PropTypes.func.isRequired, // 👈 add
};

export default DropdownFilters;
