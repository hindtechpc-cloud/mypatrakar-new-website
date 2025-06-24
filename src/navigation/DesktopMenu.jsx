import React, { useState, useEffect, useContext } from "react";
import { FaHome, FaSearch, FaBookmark, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { loadNewsBySubCategory, menuWithSubNavMenuList } from "../../api";
import toast from "react-hot-toast";
import MenuItem from "./MenuItem";
import NewsPreview from "./NewsPreview";

const DesktopMenu = ({ themeColor }) => {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);
  const [hoveredNews, setHoveredNews] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await menuWithSubNavMenuList("MYAWR241227001");
        setMenuItems(res.data.response || []);
      } catch (error) {
        toast.error("Failed to load menu items");
      }
    };
    fetchMenuItems();
  }, []);

  const fetchHoverNews = async (subcategoryId) => {
    try {
      const res = await loadNewsBySubCategory(subcategoryId);
      setHoveredNews(res.data.response || []);
    } catch {
      toast.error("Failed to load news preview");
    }
  };

  return (
    <div className="hidden lg:flex items-center">
      <Link
        to="/"
        className={`flex items-center px-4 py-3 mx-1 rounded-lg transition-colors ${
          location.pathname === "/" 
            ? "bg-white bg-opacity-20 font-medium" 
            : "hover:bg-white hover:bg-opacity-10"
        }`}
      >
        <FaHome className="mr-2" />
        Home
      </Link>

      {menuItems.map((item) => (
        <MenuItem
          key={item.cat_id}
          item={item}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          fetchHoverNews={fetchHoverNews}
          themeColor={themeColor}
          type="desktop"
        />
      ))}

      {hoveredNews.length > 0 && activeDropdown && (
        <NewsPreview newsItems={hoveredNews} />
      )}

      <div className="flex items-center ml-4 space-x-2">
        {/* <Link
          to="/bookmarks"
          className="p-3 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
          aria-label="Bookmarks"
        >
          <FaBookmark />
        </Link> */}
        <Link
          to="/search"
          className="p-3 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
          aria-label="Search"
        >
          <FaSearch />
        </Link>
        {/* <Link
          to="/profile"
          className="p-3 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
          aria-label="Profile"
        >
          <FaUser />
        </Link> */}
      </div>
    </div>
  );
};

export default DesktopMenu;