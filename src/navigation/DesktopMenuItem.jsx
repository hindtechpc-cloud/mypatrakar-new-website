// src/navigation/Navbar/DesktopMenuItem.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { CgChevronUp } from "react-icons/cg";
import { encryptData } from "../utils/cryptoHelper";
import NewPreviewSubMenuHovered from "./NewPreviewSubMenuHovered";

const DesktopMenuItem = ({
  item,
  activePath,
  activeDropdown,
  setActiveDropdown,
  handleMenuClick,
  hoveredNews,
  setHoveredNews,
  handleSubmenuHover,
  loadingNews,
  themeColor
}) => {
  const [localHovered, setLocalHovered] = useState(false);

  return (
    <div
      key={item.cat_id}
      className="relative group"
      onMouseEnter={() => {
        setActiveDropdown(item.cat_id);
        setLocalHovered(true);
      }}
      onMouseLeave={() => {
        setActiveDropdown(null);
        setLocalHovered(false);
        setHoveredNews([]);
        if (window.hoverTimeout) clearTimeout(window.hoverTimeout);
      }}
    >
      <button
        className={`flex items-center px-3 py-3 ml-1 font-semibold text-md transition-colors ${
          activePath.startsWith("/topic/") &&
          activePath.includes(`/topic/${item.nav_name.toLowerCase()}`)
            ? "bg-gray-200 rounded-md text-black"
            : "hover:bg-gray-200 rounded-md hover:text-black"
        }`}
        onClick={() =>
          handleMenuClick(
            `/topic/${item.nav_name.toLowerCase()}/${encryptData(item.cat_id)}`
          )
        }
      >
        {item.nav_name}
        {item.submenus?.length > 0 && (
          <CgChevronUp
            className={`ml-1 transition-transform ${
              activeDropdown === item.cat_id ? "rotate-0" : "rotate-180"
            }`}
          />
        )}
      </button>

      {item.submenus?.length > 0 && activeDropdown === item.cat_id && (
        <div
          className="absolute -left-40 z-50 mt-0 px-4 shadow-lg pb-5 w-[650px] min-w-[600px]"
          style={{ backgroundColor: themeColor }}
          onMouseEnter={() => setLocalHovered(true)}
          onMouseLeave={() => setLocalHovered(false)}
        >
          <div className="flex items-start flex-wrap overflow-y-auto">
            {item.submenus.map((submenu) => (
              <Link
                key={submenu.subcategory_id}
                to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
                  submenu.subcategory_id
                )}`}
                className="block text-sm px-3 py-2 text-white hover:bg-gray-200 hover:rounded hover:text-black transition-colors min-w-[150px]"
                onClick={() =>
                  handleMenuClick(
                    `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
                      submenu.subcategory_id
                    )}`
                  )
                }
                onMouseEnter={() => handleSubmenuHover(submenu.subcategory_id)}
              >
                {submenu.nav_name}
              </Link>
            ))}
          </div>

          {localHovered && (
            <div className="mt-3 border-t border-white/20 pt-3">
              {loadingNews ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span className="ml-2 text-white text-sm">Loading news...</span>
                </div>
              ) : hoveredNews.length > 0 ? (
                <NewPreviewSubMenuHovered hoveredNews={hoveredNews} />
              ) : (
                <div className="text-center text-white/70 text-sm py-4">
                  Hover on a submenu to see latest news
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopMenuItem;
