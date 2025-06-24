import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search news..."
        className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full py-3 px-5 pl-12 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      />
      <FaSearch className="absolute left-5 top-3.5 text-white text-opacity-70" />
    </div>
  );
};

export default SearchBar;