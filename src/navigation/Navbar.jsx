// // src/navigation/Navbar.jsx
// import { useState, useEffect, useContext, useCallback } from "react";
// import { FaBars, FaHome, FaSearch, FaTimes } from "react-icons/fa";
// import { CgChevronUp } from "react-icons/cg";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { LanguageContext } from "../context/LanguageContext";
// import { WebThemeContext } from "../context/ThemeContext";
// import { loadNewsBySubCategory, menuWithSubNavMenuList } from "../../api";
// import defaultLogo from "../assets/Ellipse.svg";
// import { encryptData } from "../utils/cryptoHelper";
// import NewPreviewSubMenuHovered from "./NewPreviewSubMenuHovered";
// import { useWebThemeContext } from "../context/WebThemeContext";

// // --------------------
// // Cache Helpers
// // --------------------
// const CACHE_MAX_AGE = 1800000; // 30 minutes

// const setCache = (key, data) => {
//   localStorage.setItem(key, JSON.stringify(data));
//   localStorage.setItem(`${key}_time`, Date.now().toString());
// };

// const getCache = (key, maxAge = CACHE_MAX_AGE) => {
//   const cached = localStorage.getItem(key);
//   const cacheTime = localStorage.getItem(`${key}_time`);

//   if (!cached || !cacheTime) return null;

//   const age = Date.now() - parseInt(cacheTime, 10);
//   if (age > maxAge) {
//     localStorage.removeItem(key);
//     localStorage.removeItem(`${key}_time`);
//     return null;
//   }

//   return JSON.parse(cached);
// };

// const Navbar = () => {
//   const { webTheme } = useWebThemeContext();
//   const { language } = useContext(LanguageContext);

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activePath, setActivePath] = useState(window.location.pathname);
//   const [isFixed, setIsFixed] = useState(false);
//   const [menuItems, setMenuItems] = useState([]);
//   const [hoveredNews, setHoveredNews] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
//   const [loadingNews, setLoadingNews] = useState(false);
//   const [newsCache, setNewsCache] = useState(new Map());

//   const location = useLocation();
//   const navigate = useNavigate();

//   const themeColor = webTheme["bg-color"] || "#b91c1c";
//   const logo = webTheme["web-logo"] || defaultLogo;

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const cached = getCache("menu_items");
//         if (cached) {
//           setMenuItems(cached);
//           return;
//         }

//         const res = await menuWithSubNavMenuList("");
//         const data = res.data.response || [];
//         setMenuItems(data);
//         setCache("menu_items", data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchMenuItems();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setIsFixed(window.scrollY > 150);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     const willOpen = !menuOpen;
//     setMenuOpen(willOpen);
//     document.body.style.overflow = willOpen ? "hidden" : "auto";
//   };

//   const handleMenuClick = (path) => {
//     setActivePath(path);
//     setActiveDropdown(null);      // ✅ Close dropdown
//     setHoveredNews([]);          // ✅ Clear news
//     setMenuOpen(false);
//     document.body.style.overflow = "auto";
//     navigate(path);
//   };

//   const fetchHoverNews = useCallback(async (subcategoryId) => {
//     if (newsCache.has(subcategoryId)) {
//       setHoveredNews(newsCache.get(subcategoryId));
//       return;
//     }

//     if (loadingNews) return;

//     setLoadingNews(true);

//     try {
//       const res = await loadNewsBySubCategory(subcategoryId);
//       const newsData = res.data.response || [];

//       setNewsCache((prev) => new Map(prev.set(subcategoryId, newsData)));
//       setHoveredNews(newsData);
//     } catch (error) {
//       console.log("Error fetching hover news:", error);
//       setHoveredNews([]);
//     } finally {
//       setLoadingNews(false);
//     }
//   }, [newsCache, loadingNews]);

//   const handleSubmenuHover = useCallback((subcategoryId) => {
//     if (window.hoverTimeout) clearTimeout(window.hoverTimeout);

//     window.hoverTimeout = setTimeout(() => {
//       fetchHoverNews(subcategoryId);
//     }, 200);
//   }, [fetchHoverNews]);

//   useEffect(() => {
//     return () => {
//       if (window.hoverTimeout) {
//         clearTimeout(window.hoverTimeout);
//       }
//     };
//   }, []);

//   const DesktopMenuItem = ({ item }) => {
//     const [localHovered, setLocalHovered] = useState(false);

//     return (
//       <div
//         key={item.cat_id}
//         className="relative group"
//         onMouseEnter={() => {
//           setActiveDropdown(item.cat_id);
//           setLocalHovered(true);
//         }}
//         onMouseLeave={() => {
//           setActiveDropdown(null);
//           setLocalHovered(false);
//           setHoveredNews([]); // ✅ clear news preview
//           if (window.hoverTimeout) {
//             clearTimeout(window.hoverTimeout);
//           }
//         }}
//       >
//         <button
//           className={`flex items-center px-3 py-3 ml-1 font-semibold text-md transition-colors ${
//             activePath.startsWith("/topic/") &&
//             activePath.includes(`/topic/${item.nav_name.toLowerCase()}`)
//               ? "bg-gray-200 rounded-md text-black"
//               : "hover:bg-gray-200 rounded-md hover:text-black"
//           }`}
//           onClick={() =>
//             handleMenuClick(
//               `/topic/${item.nav_name.toLowerCase()}/${encryptData(item.cat_id)}`
//             )
//           }
//         >
//           {item.nav_name}
//           {item.submenus?.length > 0 && (
//             <CgChevronUp
//               className={`ml-1 transition-transform ${
//                 activeDropdown === item.cat_id ? "rotate-0" : "rotate-180"
//               }`}
//             />
//           )}
//         </button>

//         {item.submenus?.length > 0 && activeDropdown === item.cat_id && (
//           <div
//             className="absolute -left-40 z-50 mt-0 px-4 shadow-lg pb-5 w-[650px] min-w-[600px]"
//             style={{ backgroundColor: themeColor }}
//             onMouseEnter={() => setLocalHovered(true)}
//             onMouseLeave={() => setLocalHovered(false)}
//           >
//             <div className="flex items-start flex-wrap overflow-y-auto">
//               {item.submenus.map((submenu) => (
//                 <Link
//                   key={submenu.subcategory_id}
//                   to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
//                     submenu.subcategory_id
//                   )}`}
//                   className="block text-sm px-3 py-2 text-white hover:bg-gray-200 hover:rounded hover:text-black transition-colors min-w-[150px]"
//                   onClick={() =>
//                     handleMenuClick(
//                       `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
//                         submenu.subcategory_id
//                       )}`
//                     )
//                   }
//                   onMouseEnter={() => handleSubmenuHover(submenu.subcategory_id)}
//                 >
//                   {submenu.nav_name}
//                 </Link>
//               ))}
//             </div>

//             {localHovered && (
//               <div className="mt-3 border-t border-white/20 pt-3">
//                 {loadingNews ? (
//                   <div className="flex justify-center items-center py-4">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//                     <span className="ml-2 text-white text-sm">Loading news...</span>
//                   </div>
//                 ) : hoveredNews.length > 0 ? (
//                   <NewPreviewSubMenuHovered hoveredNews={hoveredNews} />
//                 ) : (
//                   <div className="text-center text-white/70 text-sm py-4">
//                     Hover on a submenu to see latest news
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const MobileMenuItem = ({ item }) => (
//     <div key={item.cat_id} className="border-b border-gray-600">
//       <button
//         className={`flex justify-between items-center w-full px-4 py-3 text-white font-semibold ${
//           activePath.startsWith("/topic/") &&
//           activePath.includes(`/topic/${item.nav_name.toLowerCase()}`)
//             ? "bg-gray-200 text-black"
//             : ""
//         }`}
//         onClick={() => {
//           if (item.submenus?.length > 0) {
//             setMobileActiveDropdown(
//               mobileActiveDropdown === item.cat_id ? null : item.cat_id
//             );
//           } else {
//             handleMenuClick(
//               `/topic/${item.nav_name.toLowerCase()}/${encryptData(item.cat_id)}`
//             );
//           }
//         }}
//       >
//         <span>{item.nav_name}</span>
//         {item.submenus?.length > 0 && (
//           <CgChevronUp
//             className={`transition-transform ${
//               mobileActiveDropdown === item.cat_id ? "rotate-0" : "rotate-180"
//             }`}
//           />
//         )}
//       </button>
//       {item.submenus?.length > 0 && mobileActiveDropdown === item.cat_id && (
//         <div className="pl-20">
//           {item.submenus.map((submenu) => (
//             <Link
//               key={submenu.subcategory_id}
//               to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
//                 submenu.subcategory_id
//               )}`}
//               className={`block px-4 py-2 text-gray-50 ${
//                 activePath ===
//                 `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
//                   submenu.subcategory_id
//                 )}`
//                   ? "bg-gray-200 text-black"
//                   : "hover:bg-gray-200 hover:text-black"
//               }`}
//               onClick={() =>
//                 handleMenuClick(
//                   `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
//                     submenu.subcategory_id
//                   )}`
//                 )
//               }
//             >
//               {submenu.nav_name}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <>
//       <nav
//         className={`w-full text-white transition-all duration-300 ${
//           isFixed
//             ? "fixed top-0 left-0 shadow-lg z-50 animate-fadeIn"
//             : "relative"
//         }`}
//         style={{ backgroundColor: themeColor }}
//       >
//         <div className="container mx-auto flex justify-between items-center px-4">
//           <div className={`${isFixed ? "flex" : "lg:hidden flex"} items-center`}>
//             <Link to="/">
//               <img
//                 src={logo}
//                 alt="Website Logo"
//                 className="w-16 h-16 object-contain hover:opacity-90 transition-opacity"
//               />
//             </Link>
//           </div>

//           <button
//             onClick={toggleMenu}
//             className="lg:hidden text-2xl text-white focus:outline-none p-2"
//             aria-label={menuOpen ? "Close Menu" : "Open Menu"}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           <div className="hidden lg:flex items-center">
//             <Link
//               to="/"
//               className={`flex items-center p-4 hover:bg-gray-200 hover:text-black transition-colors ${
//                 location.pathname === "/" ? "bg-gray-200 text-black shadow-xl" : ""
//               }`}
//               aria-label="Home"
//               onClick={() => handleMenuClick("/")}
//             >
//               <FaHome className="text-2xl" />
//             </Link>
//             {menuItems.map((item) => (
//               <DesktopMenuItem key={item.cat_id} item={item} />
//             ))}
//           </div>

//           <Link
//             to="/search"
//             className={`hidden lg:flex items-center p-4 hover:bg-gray-200 hover:text-black transition-colors ${
//               location.pathname === "/search" ? "bg-gray-200 text-black shadow-xl" : ""
//             }`}
//             onClick={() => handleMenuClick("/search")}
//             aria-label="Search"
//           >
//             <FaSearch className="text-lg" />
//           </Link>
//         </div>
//       </nav>

//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
//           onClick={toggleMenu}
//         />
//       )}

//       <div
//         className={`fixed lg:hidden top-0 left-0 w-3/4 h-full z-50 transform transition-transform duration-300 ease-in-out ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         style={{ background: themeColor }}
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <Link to="/">
//             <img src={logo} alt="Logo" className="w-12 h-12" />
//           </Link>
//           <button onClick={toggleMenu} className="text-white text-xl">
//             <FaTimes />
//           </button>
//         </div>
//         <div className="overflow-y-auto h-full">
//           <Link
//             to="/"
//             className={`block px-4 py-3 text-white font-semibold ${
//               location.pathname === "/" ? "bg-gray-200 text-black" : ""
//             }`}
//             onClick={() => handleMenuClick("/")}
//           >
//             Home
//           </Link>
//           {menuItems.map((item) => (
//             <MobileMenuItem key={item.cat_id} item={item} />
//           ))}
//           <Link
//             to="/search"
//             className={`block px-4 py-3 text-white font-semibold ${
//               location.pathname === "/search" ? "bg-gray-200 text-black" : ""
//             }`}
//             onClick={() => handleMenuClick("/search")}
//           >
//             <span className="flex items-center gap-3">
//               <FaSearch /> <span>Search</span>
//             </span>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

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

const Navbar = () => {
  const { webTheme } = useWebThemeContext();

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
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <Link to={"/search"} className="lg:hidden flex">
            <FaSearch size={29}/>
          </Link>
          <div
            className={`${
              isFixed ? "flex" : "lg:hidden flex"
            } items-center mr-5`}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Website Logo"
                className="lg:w-20 lg:h-20 w-24 h-24 object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl text-white focus:outline-none p-2"
          >
            {menuOpen ? <FaTimes size={28}/> : <FaBars size={28}/>}
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

            <div className="flex items-center justify-center gap-1">
              {/* Search Button */}
              <Link
                to="/search"
                className={`flex items-center p-4 rounded-lg hover:bg-gray-200 hover:text-black transition-colors ${
                  location.pathname === "/search"
                    ? "bg-gray-200 text-black shadow-xl"
                    : ""
                }`}
                onClick={() => handleMenuClick("/search")}
              >
                <FaSearch className="text-lg" />
              </Link>

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
        className={`fixed lg:hidden top-0 left-0 w-3/4 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: themeColor }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-20 h-2o" />
          </Link>
          <button onClick={toggleMenu} className="text-white text-xl">
            <FaTimes size={29} />
          </button>
        </div>

        <div className="overflow-y-auto h-full">
          {/* Home Link */}
          <Link
            to="/"
            className={`block px-4 py-3  font-semibold ${
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
            <Link
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
            </Link>
   <div className="text-white mt-5">
     <SocialIcons/>
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
