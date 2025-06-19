// src/navigation/MenuItem.jsx
import { useContext } from "react";
import { CgChevronUp } from "react-icons/cg";
import { Link } from "react-router-dom";
// import { NewsContext } from "../../context/NewsContext";
import { MdOutlineAccessTime } from "react-icons/md";
import { LanguageContext } from "../.../../context/LanguageContext";
import React from "react";

const MenuItem = ({ item, isMobile, activePath, handleMenuClick, toggleDropdown, dropdownOpen, mobileDropdownOpen, toggleMobileDropdown, FilteredNews, News }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div
      className={`relative group bg-red-700 text-xs font-semibold ${isMobile ? "border-b border-gray-600" : ""}`}
      onMouseEnter={!isMobile ? () => toggleDropdown(item.name) : null}
      onMouseLeave={!isMobile ? () => toggleDropdown("") : null}
    >
      <div
        onClick={() =>
          isMobile
            ? toggleMobileDropdown(item.name, item.path)
            : handleMenuClick(item.path)
        }
        className={`flex justify-between items-center px-3 lg:py-5 py-2 cursor-pointer ${
          activePath === item.path
            ? "bg-gray-200 text-black"
            : "hover:bg-gray-200 hover:text-black"
        }`}
      >
        {item.name}
        {item.subItems && (
          <CgChevronUp
            className={`text-lg transition-transform ${
              (isMobile ? mobileDropdownOpen : dropdownOpen) === item.name
                ? "rotate-0"
                : "rotate-180"
            }`}
          />
        )}
      </div>

      {/* Dropdown goes here if not mobile */}
      {!isMobile && item.subItems && dropdownOpen === item.name && (
        <div className="absolute z-50 top-full mt-1 bg-red-700 text-white shadow-md p-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6">
            {item.subItems.map((subItem) => (
              <span key={subItem.name} onClick={() => handleMenuClick(subItem.path)} className="block py-1">
                {subItem.name}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1">
            <button className="py-2 px-2 bg-red-800 text-white" onClick={() => handleMenuClick("/")}>
              All
            </button>
            {item.subItems.map((button, index) => (
              <button
                key={index}
                className="py-2 px-2 bg-red-800 text-white rounded"
                onClick={() => handleMenuClick(button.path)}
                onMouseEnter={() => FilteredNews(button.name)}
              >
                {button.name}
              </button>
            ))}
          </div>
          <div className="mt-2 flex gap-4">
            {News?.slice(0, 4).map((newsItem, index) => (
              <span key={index} className="text-sm text-gray-200 grid gap-1 hover:underline">
                <div className="w-48 h-32 rounded">
                  <img src={newsItem.urlToImage} alt={newsItem.title} className="object-cover w-full h-full rounded" />
                </div>
                <p className="text-gray-50 text-xs">{newsItem.description}</p>
                <div className="flex items-center gap-1">
                  <MdOutlineAccessTime className="text-gray-300" />
                  <span className="text-gray-300 text-xs">{new Date(newsItem.publishedAt).toDateString()}</span>
                </div>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Dropdown */}
      {isMobile && item.subItems && mobileDropdownOpen === item.name && (
        <div className="bg-red-700 px-4 pb-2 overflow-y-scroll h-96">
          {item.subItems.map((subItem) => (
            <Link key={subItem.name} to={subItem.path} onClick={() => handleMenuClick(subItem.path)} className="block px-3 text-white hover:bg-red-900 py-1">
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
