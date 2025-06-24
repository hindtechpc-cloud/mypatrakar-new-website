import React, { useState, useEffect } from "react";
import { FaHome, FaSearch, FaBookmark, FaUser, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { menuWithSubNavMenuList } from "../../api";
import toast from "react-hot-toast";
import MenuItem from "./MenuItem";
import SearchBar from "./SearchBar";

const MobileMenu = ({ isOpen, onClose, themeColor, logo }) => {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

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

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed lg:hidden top-0 left-0 w-80 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex items-center justify-between p-5 border-b border-white border-opacity-20">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="ml-3 font-bold text-xl">MyPatrakar</span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-10"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="h-[calc(100%-72px)] overflow-y-auto">
          <Link
            to="/search"
            className="px-4 py-3 flex items-center rounded-lg hover:bg-white hover:bg-opacity-10"
            onClick={onClose}
          >
            <SearchBar />
          </Link>

          <nav className="px-2">
            <Link
              to="/"
              className={`flex items-center px-4 py-3 rounded-lg ${
                location.pathname === "/"
                  ? "bg-white bg-opacity-20 font-medium"
                  : "hover:bg-white hover:bg-opacity-10"
              }`}
              onClick={onClose}
            >
              <FaHome className="mr-3" />
              Home
            </Link>

            {menuItems.map((item) => (
              <MenuItem
                key={item.cat_id}
                item={item}
                mobileActiveDropdown={mobileActiveDropdown}
                setMobileActiveDropdown={setMobileActiveDropdown}
                onClose={onClose}
                type="mobile"
              />
            ))}

            {/* <div className="border-t border-white border-opacity-20 mt-2 pt-2">
              <Link
                to="/bookmarks"
                className={`flex items-center px-4 py-3 rounded-lg ${
                  location.pathname === "/bookmarks"
                    ? "bg-white bg-opacity-20 font-medium"
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
                onClick={onClose}
              >
                <FaBookmark className="mr-3" />
                Saved Articles
              </Link>
              <Link
                to="/profile"
                className={`flex items-center px-4 py-3 rounded-lg ${
                  location.pathname === "/profile"
                    ? "bg-white bg-opacity-20 font-medium"
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
                onClick={onClose}
              >
                <FaUser className="mr-3" />
                My Account
              </Link>
            </div> */}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
