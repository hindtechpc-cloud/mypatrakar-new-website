
// src/navigation/Navbar/Navbar.jsx
import { useState, useEffect, useCallback } from "react";
import { FaBars, FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadNewsBySubCategory, menuWithSubNavMenuList } from "../../api";
import defaultLogo from "../assets/Ellipse.svg";
import { useWebThemeContext } from "../context/WebThemeContext";

import DesktopMenuItem from "./DesktopMenuItem";
import MobileMenuItem from "./MobileMenuItem";
import { setCache, getCache } from "./CacheHelpers";
import ProfileMenu from "./ProfileMenu";
import SocialIcons from "../TopBar/SocialIcons";
import { useSearch } from "../context/SearchContext";
import SearchBar from "./SearchBar";
import { MenuButton } from "./MenuButton";
import { RxCross1 } from "react-icons/rx";


const Navbar = () => {
  const { webTheme } = useWebThemeContext();
  const { searchTerm, setSearchTerm } = useSearch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);
  const [isFixed, setIsFixed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [hoveredNews, setHoveredNews] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [loadingNews, setLoadingNews] = useState(false);
  const [newsCache, setNewsCache] = useState(new Map());

  const location = useLocation();
  const navigate = useNavigate();

  const themeColor = webTheme["bg-color"] || "#b91c1c";
  const logo = webTheme["web-logo"] || defaultLogo;

  // Fetch Menu
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const cached = getCache("menu_items");
        if (cached) {
          setMenuItems(cached);
          return;
        }
        const res = await menuWithSubNavMenuList("");
        const data = res.data.response || [];
        setMenuItems(data);
        setCache("menu_items", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenuItems();
  }, []);

  // Scroll fixed navbar
  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handlers
  const toggleMenu = () => {
    const willOpen = !menuOpen;
    setMenuOpen(willOpen);
    document.body.style.overflow = willOpen ? "hidden" : "auto";
  };

  const handleMenuClick = (path) => {
    setActivePath(path);
    setActiveDropdown(null);
    setHoveredNews([]);
    setMenuOpen(false);
    document.body.style.overflow = "auto";
    navigate(path);
  };

  const fetchHoverNews = useCallback(
    async (subcategoryId) => {
      if (newsCache.has(subcategoryId)) {
        setHoveredNews(newsCache.get(subcategoryId));
        return;
      }
      if (loadingNews) return;

      setLoadingNews(true);
      try {
        const res = await loadNewsBySubCategory(subcategoryId);
        const newsData = res.data.response || [];
        setNewsCache((prev) => new Map(prev.set(subcategoryId, newsData)));
        setHoveredNews(newsData);
      } catch (error) {
        console.log("Error fetching hover news:", error);
        setHoveredNews([]);
      } finally {
        setLoadingNews(false);
      }
    },
    [newsCache, loadingNews]
  );

  const handleSubmenuHover = useCallback(
    (subcategoryId) => {
      if (window.hoverTimeout) clearTimeout(window.hoverTimeout);
      window.hoverTimeout = setTimeout(() => {
        fetchHoverNews(subcategoryId);
      }, 200);
    },
    [fetchHoverNews]
  );

  return (
    <>
      {/* mobile Navbar */}
      <nav
        className={`w-full text-white transition-all duration-300 ${
          isFixed
            ? "fixed top-0 left-0 shadow-lg z-50 animate-fadeIn"
            : "relative"
        }`}
        style={{ backgroundColor: themeColor }}
      >
        <div className="container mx-auto flex justify-between items-center px-2">
          {/* Logo */}

          <Link to={"/search"} className="lg:hidden flex">
            <FaSearch size={18} />
          </Link>
          <div
            className={`${
              isFixed ? "flex" : "lg:hidden flex"
            } items-center ml-12`}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Website Logo"
                className="lg:w-20 lg:h-20 w-20 h-20 object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl text-white focus:outline-none p-2"
          >
            {menuOpen ? <FaTimes size={28} /> : <MenuButton  />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-between w-full">
            <div>
              {" "}
              {/* Home Button */}
              <Link
                to="/"
                className={`flex items-center p-4 hover:bg-gray-200 hover:text-black transition-colors ${
                  location.pathname === "/"
                    ? "bg-gray-200 text-black shadow-xl"
                    : ""
                }`}
                onClick={() => handleMenuClick("/")}
              >
                <FaHome className="text-2xl" />
              </Link>
            </div>
            {/* <span className="hidden xl:flex">
              <LiveDateTime />
    </span> */}
            <div className="flex">
              {/* Menu Items */}
              {menuItems.map((item) => (
                <DesktopMenuItem
                  key={item.cat_id}
                  item={item}
                  activePath={activePath}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  handleMenuClick={handleMenuClick}
                  hoveredNews={hoveredNews}
                  setHoveredNews={setHoveredNews}
                  handleSubmenuHover={handleSubmenuHover}
                  loadingNews={loadingNews}
                  themeColor={themeColor}
                />
              ))}
            </div>

            <div className="hidden lg:flex items-center justify-center  gap-1">
              {/* Search Button */}
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleMenuClick={handleMenuClick}
              />
              {/* Profile Menu */}
              <ProfileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed lg:hidden top-0 right-0 sm:w-1/3 w-3/4 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: themeColor }}
      >
        <div className="flex items-center justify-center p-4 ">
        
          <button onClick={toggleMenu} className="text-gray-300 ">
            <RxCross1 size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-full">
          {/* Home Link */}
          <Link
            to="/"
            className={`block px-4 py-5   ${
              location.pathname === "/"
                ? "bg-gray-200 text-black"
                : "text-white"
            }`}
            onClick={() => handleMenuClick("/")}
          >
            Home
          </Link>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <MobileMenuItem
              key={item.cat_id}
              item={item}
              activePath={activePath}
              mobileActiveDropdown={mobileActiveDropdown}
              setMobileActiveDropdown={setMobileActiveDropdown}
              handleMenuClick={handleMenuClick}
            />
          ))}

          <div className="">
            {/* Search Link */}
            {/* <Link
              to="/search"
              className={`block px-4 py-3  font-semibold ${
                location.pathname === "/search"
                  ? "bg-gray-300 text-black"
                  : "text-white"
              }`}
              onClick={() => handleMenuClick("/search")}
            >
              <span className="flex items-center gap-3">
                <FaSearch /> <span>Search</span>
              </span>
            </Link> */}
            <div className="my-5 flex flex-col gap-5">
              {" "}
              <div className="text-white mt-5">
                <SocialIcons />
              </div>
             <div className="mt-1">
               <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleMenuClick={handleMenuClick}
              />
             </div>
            </div>
            {/* Profile Menu in Mobile */}
            <div className="p-2">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
