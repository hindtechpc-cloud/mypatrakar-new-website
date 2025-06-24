import React from "react";
import { Link } from "react-router-dom";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { encryptData } from "../utils/cryptoHelper";


const MenuItem = ({
  item,
  type,
  activeDropdown,
  setActiveDropdown,
  mobileActiveDropdown,
  setMobileActiveDropdown,
  fetchHoverNews,
  onClose,
}) => {
  const isDesktop = type === "desktop";
  const isActive = isDesktop
    ? activeDropdown === item.cat_id
    : mobileActiveDropdown === item.cat_id;

  const handleClick = () => {
    if (isDesktop) {
      setActiveDropdown(isActive ? null : item.cat_id);
    } else {
      setMobileActiveDropdown(isActive ? null : item.cat_id);
    }
  };

  const handleSubmenuClick = (path) => {
    if (onClose) onClose();
    if (isDesktop && fetchHoverNews) {
      fetchHoverNews(item.subcategory_id);
    }
  };

  if (isDesktop) {
    return (
      <div className="relative group">
        <button
          className={`flex items-center px-4 py-3 mx-1 rounded-lg transition-colors ${
            isActive
              ? "bg-white bg-opacity-20 font-medium"
              : "hover:bg-white hover:bg-opacity-10"
          }`}
          onClick={handleClick}
          onMouseEnter={() => setActiveDropdown(item.cat_id)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {item.nav_name}
          {item.submenus?.length > 0 && (
            <span className="ml-2">
              {isActive ? <CgChevronUp /> : <CgChevronDown />}
            </span>
          )}
        </button>

        {item.submenus?.length > 0 && isActive && (
          <div className="absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-lg z-50">
            <div className="grid grid-cols-3 gap-4 p-4">
              {item.submenus.map((submenu) => (
                <Link
                  key={submenu.subcategory_id}
                  to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
                    submenu.subcategory_id
                  )}`}
                  className="block p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => handleSubmenuClick()}
                  onMouseEnter={() => fetchHoverNews(submenu.subcategory_id)}
                >
                  <h4 className="font-medium text-gray-800">{submenu.nav_name}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mobile version
  return (
    <div className="border-b border-white border-opacity-20">
      <button
        className={`flex justify-between items-center w-full px-4 py-3 ${
          isActive ? "bg-white bg-opacity-10" : ""
        }`}
        onClick={handleClick}
      >
        <span>{item.nav_name}</span>
        {item.submenus?.length > 0 && (
          <span>{isActive ? <CgChevronUp /> : <CgChevronDown />}</span>
        )}
      </button>

      {item.submenus?.length > 0 && isActive && (
        <div className="pl-6 bg-black bg-opacity-10">
          {item.submenus.map((submenu) => (
            <Link
              key={submenu.subcategory_id}
              to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
                submenu.subcategory_id
              )}`}
              className="block px-4 py-2.5 hover:bg-white hover:bg-opacity-10 rounded-lg"
              onClick={onClose}
            >
              {submenu.nav_name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;