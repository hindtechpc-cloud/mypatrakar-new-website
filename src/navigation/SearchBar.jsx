import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const SearchBar = ({ searchTerm, setSearchTerm, handleMenuClick }) => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center bg-g00 rounded-full px-4 py-1 w-[230px] shadow-sm border border-gray-50" style={{
      }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-100 text-sm"
        />

        <Link
          to="/search"
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            location.pathname === "/search"
              ? "bg-gray-300 text-gray-100 "
              : "hover:bg-gray-300"
          }`}
          onClick={() => handleMenuClick("/search")}
        >
          <FaSearch className="text-lg text-gray-100" />
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
