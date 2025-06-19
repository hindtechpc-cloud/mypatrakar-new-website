import React from "react";
const DropdownFilters = ({
  categories = [],
  subcategories = [],
  locations = [],
  sortOptions = [],
  setCategory,
  setSubcategory,
  setSortBy,
  setLocation,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "category":
        setCategory(value);
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
    <div className="p-4 rounded-lg w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            name="category"
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.cat_id} value={cat.cat_id}>
                {cat.cat_name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">
            Subcategory
          </label>
          <select
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            name="subcategory"
            onChange={handleChange}
          >
            <option value="">Select Subcategory</option>
            {subcategories.length &&
              subcategories?.map((sub) => (
                <option key={sub.subcat_id} value={sub.subcat_id}>
                  {sub.name}
                </option>
              ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">Sort By</label>
          <select
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            name="sortby"
            onChange={handleChange}
          >
            <option value="">Select Sort Option</option>
            {[
              { lable: "Date", value: "date" },
              { lable: "Latest", value: "latest" },
              { lable: "Populer", value: "populer" },
            ]?.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.lable}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700">
            Location
          </label>
          <select
            className="border p-2 rounded focus:ring focus:ring-blue-300"
            name="location"
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {[
              { lable: "Date", value: "date" },
              { lable: "Latest", value: "latest" },
              { lable: "Populer", value: "populer" },
            ]?.map((loc) => (
              <option key={loc.loc_id} value={loc.loc_id}>
                {loc.loc_name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DropdownFilters;
