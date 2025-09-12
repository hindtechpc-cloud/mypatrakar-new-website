// src/navigation/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { FaBars, FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { CgChevronUp } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAccessTime } from "react-icons/md";
import { LanguageContext } from "../context/LanguageContext";
// import { NewsContext } from "../context/NewsContext";
import { WebThemeContext } from "../context/ThemeContext";
import { loadNewsBySubCategory, menuWithSubNavMenuList } from "../../api";
import defaultLogo from "../assets/Ellipse.svg";
// import toast from "react-hot-toast";
import { encryptData } from "../utils/cryptoHelper";

const Navbar = () => {
  // const { setNews } = useContext(NewsContext);
  const { webTheme } = useContext(WebThemeContext);
  const { language } = useContext(LanguageContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);
  const [isFixed, setIsFixed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [hoveredNews, setHoveredNews] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const themeColor = webTheme["bg-color"] || "#b91c1c";
  const logo = webTheme["web-logo"] || defaultLogo;

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await menuWithSubNavMenuList("");
        setMenuItems(res.data.response || []);
      } catch (error) {
        // toast.error("Failed to load menu items");
        console.log(error);
      }
    };
    fetchMenuItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    const willOpen = !menuOpen;
    setMenuOpen(willOpen);
    document.body.style.overflow = willOpen ? "hidden" : "auto";
  };

  const handleMenuClick = (path) => {
    setActivePath(path);
    setMenuOpen(false);
    document.body.style.overflow = "auto";
    navigate(path);
  };

  const fetchHoverNews = async (subcategoryId) => {
    try {
      const res = await loadNewsBySubCategory(subcategoryId);
      console.log(res)
      setHoveredNews(res.data.response || []);
    } catch (error) {
      // toast.error("Failed to load news preview");
      console.log(error);
    }
  };

  const NewsPreview = () => (
    <div className="relative flex items-center justify-between top-3 border-t p-4 z-50 ">
      {hoveredNews.slice(0, 3).map((newsItem) => (
        <Link
          key={newsItem.news_id}
          to={`/read-news/${newsItem.news_headline}/${encryptData(
            newsItem.news_id
          )}`}
          className="block mb-4 last:mb-0 group w-[250px] px-2"
        >
          <div className="w-full h-32 rounded overflow-hidden">
            <img
              src={
                newsItem?.news_img_url
                  ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                      newsItem.news_img_url
                    }`
                  : "https://picsum.photos/300/500"
              }
              alt={newsItem.news_headline}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="mt-2">
            <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
              {newsItem.news_headline}
            </h3>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <MdOutlineAccessTime className="mr-1" />
              <span>
                {newsItem.publishedAt
                  ? new Date(newsItem.publishedAt).toLocaleDateString()
                  : "No date"}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
// menu items or categories as nav menu 
  const DesktopMenuItem = ({ item }) => (
    <div
      key={item.cat_id}
      className="relative group"
      onMouseEnter={() => setActiveDropdown(item.cat_id)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <button
        className={`flex items-center px-3 py-3 ml-1 font-semibold text-xs transition-colors ${
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
          className="absolute -left-40 z-50 mt-0 px-4 shadow-lg pb-5 w-full min-w-[600px] "
          style={{ backgroundColor: themeColor }}
        >
          <div className="flex items-start ">
{/* // submenu items or subcategories as subnav menu  */}
            {item.submenus.map((submenu) => (
              <Link
                key={submenu.subcategory_id}
                to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
                  submenu.subcategory_id
                )}`}
                className="block  text-sm px-3 py-2 text-white hover:bg-gray-200 hover:rounded hover:text-black transition-colors"
                onClick={() =>
                  handleMenuClick(
                    `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
                      submenu.subcategory_id
                    )}`
                  )
                }
                onMouseEnter={() => fetchHoverNews(submenu.subcategory_id)}
              >
                {submenu.nav_name}
              </Link>
            ))}
          </div>
          {hoveredNews.length > 0 && <NewsPreview />}
        </div>
      )}
    </div>
  );

  const MobileMenuItem = ({ item }) => (
    <div key={item.cat_id} className="border-b border-gray-600">
      <button
        className={`flex justify-between items-center w-full px-4 py-3 text-white font-semibold ${
          activePath.includes(`/topic/${item.nav_name.toLowerCase()}`)
            ? "bg-gray-200 text-black"
            : ""
        }`}
        onClick={() => {
          if (item.submenus?.length > 0) {
            setMobileActiveDropdown(
              mobileActiveDropdown === item.cat_id ? null : item.cat_id
            );
          } else {
            handleMenuClick(
              `/topic/${item.nav_name.toLowerCase()}/${encryptData(
                item.cat_id
              )}`
            );
          }
        }}
      >
        <span>{item.nav_name}</span>
        {item.submenus?.length > 0 && (
          <CgChevronUp
            className={`transition-transform ${
              mobileActiveDropdown === item.cat_id ? "rotate-0" : "rotate-180"
            }`}
          />
        )}
      </button>
      {item.submenus?.length > 0 && mobileActiveDropdown === item.cat_id && (
        <div className="pl-20">
          {item.submenus.map((submenu) => (
            <Link
              key={submenu.subcategory_id}
              to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
                submenu.subcategory_id
              )}`}
              className={`block px-4 py-2 text-gray-50 ${
                activePath ===
                `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
                  submenu.subcategory_id
                )}`
                  ? "bg-gray-200 text-black"
                  : "hover:bg-gray-200 hover:text-black"
              }`}
              onClick={() =>
                handleMenuClick(
                  `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
                    submenu.subcategory_id
                  )}`
                )
              }
            >
              {submenu.nav_name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav
        className={`w-full text-white transition-all duration-300 ${
          isFixed
            ? "fixed top-0 left-0 shadow-lg z-50 animate-fadeIn"
            : "relative"
        }`}
        style={{ backgroundColor: themeColor }}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div
            className={`${isFixed ? "flex" : "lg:hidden flex"} items-center`}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Website Logo"
                className="w-16 h-16 object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl text-white focus:outline-none p-2"
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="hidden lg:flex items-center">
            <Link
              to="/"
              className={`flex items-center p-4 hover:bg-gray-200 hover:text-black transition-colors ${
                location.pathname === "/"
                  ? "bg-gray-200 text-black shadow-xl"
                  : ""
              }`}
              aria-label="Home"
            >
              <FaHome className="text-2xl" />
            </Link>
            {menuItems.map((item) => (
              <DesktopMenuItem key={item.cat_id} item={item} />
            ))}
          </div>

          <Link
            to="/search"
            className="hidden lg:flex items-center p-4 hover:bg-gray-200 hover:text-black transition-colors"
            aria-label="Search"
          >
            <FaSearch className="text-lg" />
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      <div
        className={`fixed lg:hidden top-0 left-0 w-3/4 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: themeColor }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </Link>
          <button onClick={toggleMenu} className="text-white text-xl">
            <FaTimes />
          </button>
        </div>
        <div className="overflow-y-auto h-full">
          <Link
            to="/"
            className={`block px-4 py-3 text-white font-semibold ${
              location.pathname === "/"
                ? "bg-gray-200 rounded-md text-black"
                : ""
            }`}
            onClick={() => handleMenuClick("/")}
          >
            Home
          </Link>
          {menuItems.map((item) => (
            <MobileMenuItem key={item.cat_id} item={item} />
          ))}
          <Link
            to="/search"
            className="block px-4 py-3 text-white font-semibold hover:bg-gray-200 hover:text-black"
            onClick={() => handleMenuClick("/search")}
          >
            <span className="flex items-center gap-3">
              <FaSearch /> <span>Search</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

// // src/navigation/Navbar.jsx
// import React, { useState, useEffect, useContext, useCallback } from "react";
// import { FaBars, FaHome, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { MdOutlineAccessTime } from "react-icons/md";
// import { LanguageContext } from "../context/LanguageContext";
// import { WebThemeContext } from "../context/ThemeContext";
// import { loadNewsBySubCategory, menuWithSubNavMenuList } from "../../api";
// import defaultLogo from "../assets/MyPatrakarLogo1.png";
// import { encryptData } from "../utils/cryptoHelper";

// const Navbar = () => {
//   const { webTheme } = useContext(WebThemeContext);
//   const { language } = useContext(LanguageContext);

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activePath, setActivePath] = useState(window.location.pathname);
//   const [isFixed, setIsFixed] = useState(false);
//   const [menuItems, setMenuItems] = useState([]);
//   const [hoveredNews, setHoveredNews] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
//   const [hoverTimeout, setHoverTimeout] = useState(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const themeColor = webTheme["bg-color"] || "#b91c1c";
//   const logo = webTheme["web-logo"] || defaultLogo;

//   // Function to calculate a lighter/darker variant of the theme color
//   const adjustColor = (color, amount) => {
//     return '#' + color.replace(/^#/, '').replace(/../g, color =>
//       ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
//     );
//   };

//   const lighterTheme = adjustColor(themeColor, 30);
//   const darkerTheme = adjustColor(themeColor, -30);

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const res = await menuWithSubNavMenuList("");
//         setMenuItems(res.data.response || []);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchMenuItems();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setIsFixed(window.scrollY > 100);
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
//     setMenuOpen(false);
//     document.body.style.overflow = "auto";
//     navigate(path);
//   };

//   const fetchHoverNews = useCallback(async (subcategoryId) => {
//     try {
//       const res = await loadNewsBySubCategory(subcategoryId);
//       setHoveredNews(res.data.response || []);
//     } catch(error) {
//       console.log(error);
//     }
//   }, []);

//   const handleDropdownHover = (itemId) => {
//     if (hoverTimeout) clearTimeout(hoverTimeout);
//     setActiveDropdown(itemId);
//   };

//   const handleDropdownLeave = () => {
//     const timeout = setTimeout(() => {
//       setActiveDropdown(null);
//     }, 300);
//     setHoverTimeout(timeout);
//   };

//   const NewsPreview = () => (
//     <div className="absolute left-0 right-0 top-full bg-white shadow-2xl rounded-b-lg p-4 z-50 grid grid-cols-3 gap-4 border-t-2 border-gray-100">
//       {hoveredNews.slice(0, 3).map((newsItem) => (
//         <Link
//           key={newsItem.news_id}
//           to={`/read-news/${newsItem.news_headline}/${encryptData(newsItem.news_id)}`}
//           className="block group transition-all duration-300 hover:shadow-md rounded-lg overflow-hidden"
//         >
//           <div className="w-full h-40 rounded-t-lg overflow-hidden relative">
//             <img
//               src={
//                 newsItem?.news_img_url
//                   ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${newsItem.news_img_url}`
//                   : "https://picsum.photos/300/200"
//               }
//               alt={newsItem.news_headline}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//           </div>
//           <div className="p-3">
//             <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
//               {newsItem.news_headline}
//             </h3>
//             <div className="flex items-center mt-2 text-xs text-gray-500">
//               <MdOutlineAccessTime className="mr-1" />
//               <span>
//                 {newsItem.publishedAt
//                   ? new Date(newsItem.publishedAt).toLocaleDateString()
//                   : "No date"}
//               </span>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );

//   const DesktopMenuItem = ({ item }) => (
//     <div
//       key={item.cat_id}
//       className="relative group"
//       onMouseEnter={() => handleDropdownHover(item.cat_id)}
//       onMouseLeave={handleDropdownLeave}
//     >
//       <button
//         className={`flex items-center px-4 py-5 font-medium text-sm transition-all duration-300 ${
//           activePath.includes(`/topic/${item.nav_name.toLowerCase()}`)
//             ? "bg-white text-gray-900 rounded-t-md shadow-sm"
//             : "hover:bg-white/10 text-white"
//         }`}
//         onClick={() =>
//           handleMenuClick(
//             `/topic/${item.nav_name.toLowerCase()}/${encryptData(item.cat_id)}`
//           )
//         }
//         style={{
//           backgroundColor: activePath.includes(`/topic/${item.nav_name.toLowerCase()}`)
//             ? 'white'
//             : 'transparent'
//         }}
//       >
//         {item.nav_name}
//         {item.submenus?.length > 0 && (
//           <FaChevronDown
//             className={`ml-2 transition-transform duration-300 ${
//               activeDropdown === item.cat_id ? "rotate-180" : "rotate-0"
//             }`}
//             size={12}
//           />
//         )}
//       </button>

//       {item.submenus?.length > 0 && activeDropdown === item.cat_id && (
//         <div
//           className="absolute left-0 z-50 shadow-xl rounded-b-lg overflow-hidden min-w-[280px]"
//           style={{ backgroundColor: lighterTheme }}
//           onMouseEnter={() => handleDropdownHover(item.cat_id)}
//           onMouseLeave={handleDropdownLeave}
//         >
//           <div className="py-2">
//             {item.submenus.map((submenu) => (
//               <Link
//                 key={submenu.subcategory_id}
//                 to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
//                   submenu.subcategory_id
//                 )}`}
//                 className="block px-4 py-3 text-sm text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-between"
//                 onClick={() =>
//                   handleMenuClick(
//                     `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
//                       submenu.subcategory_id
//                     )}`
//                   )
//                 }
//                 onMouseEnter={() => fetchHoverNews(submenu.subcategory_id)}
//               >
//                 <span>{submenu.nav_name}</span>
//                 <FaChevronDown size={10} />
//               </Link>
//             ))}
//           </div>
//           {hoveredNews.length > 0 && <NewsPreview />}
//         </div>
//       )}
//     </div>
//   );

//   const MobileMenuItem = ({ item }) => (
//     <div key={item.cat_id} className="border-b border-white/20">
//       <button
//         className={`flex justify-between items-center w-full px-5 py-4 font-medium text-white ${
//           activePath.includes(`/topic/${item.nav_name.toLowerCase()}`)
//             ? "bg-white/20"
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
//           <FaChevronDown
//             className={`transition-transform duration-300 ${
//               mobileActiveDropdown === item.cat_id ? "rotate-180" : "rotate-0"
//             }`}
//             size={14}
//           />
//         )}
//       </button>
//       {item.submenus?.length > 0 && mobileActiveDropdown === item.cat_id && (
//         <div className="pl-6 bg-white/10">
//           {item.submenus.map((submenu) => (
//             <Link
//               key={submenu.subcategory_id}
//               to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
//                 submenu.subcategory_id
//               )}`}
//               className={`block px-5 py-3 text-white border-t border-white/10 ${
//                 activePath ===
//                 `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${encryptData(
//                   submenu.subcategory_id
//                 )}`
//                   ? "bg-white/20 font-semibold"
//                   : "hover:bg-white/10"
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
//         className={`w-full text-white transition-all duration-500 ${
//           isFixed
//             ? "fixed top-0 left-0 shadow-xl z-50 animate-slideDown"
//             : "relative"
//         }`}
//         style={{
//           backgroundColor: themeColor,
//           background: `linear-gradient(145deg, ${lighterTheme} 0%, ${themeColor} 50%, ${darkerTheme} 100%)`
//         }}
//       >
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
//           {/* Logo - visible when fixed and on mobile */}
//           <div className={`${isFixed ? "flex" : "lg:hidden flex"} items-center`}>
//             <Link to="/" className="py-2">
//               <img
//                 src={logo}
//                 alt="Website Logo"
//                 className="w-14 h-14 object-contain transition-transform hover:scale-105"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center">
//             <Link
//               to="/"
//               className={`flex items-center p-5 transition-all duration-300 ${
//                 location.pathname === "/"
//                   ? "bg-white text-gray-900 shadow-inner"
//                   : "hover:bg-white/10 text-white"
//               } rounded-t-md font-medium`}
//               aria-label="Home"
//               style={{
//                 backgroundColor: location.pathname === "/" ? 'white' : 'transparent'
//               }}
//             >
//               <FaHome className="text-lg" />
//             </Link>
//             {menuItems.map((item) => (
//               <DesktopMenuItem key={item.cat_id} item={item} />
//             ))}
//           </div>

//           {/* Search Icon */}
//           <Link
//             to="/search"
//             className="hidden lg:flex items-center p-5 text-white hover:bg-white/10 transition-all duration-300 rounded-t-md"
//             aria-label="Search"
//           >
//             <FaSearch className="text-lg" />
//           </Link>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={toggleMenu}
//             className="lg:hidden text-2xl text-white focus:outline-none p-3 rounded-full hover:bg-white/20 transition-colors"
//             aria-label={menuOpen ? "Close Menu" : "Open Menu"}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden backdrop-blur-sm"
//           onClick={toggleMenu}
//         />
//       )}

//       {/* Mobile Menu */}
//       <div
//         className={`fixed lg:hidden top-0 left-0 w-80 h-full z-50 transform transition-transform duration-500 ease-in-out ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         } shadow-2xl`}
//         style={{
//           backgroundColor: themeColor,
//           background: `linear-gradient(135deg, ${lighterTheme} 0%, ${themeColor} 100%)`
//         }}
//       >
//         <div className="flex items-center justify-between p-5 border-b border-white/20">
//           <Link to="/" onClick={() => setMenuOpen(false)}>
//             <img src={logo} alt="Logo" className="w-12 h-12" />
//           </Link>
//           <button
//             onClick={toggleMenu}
//             className="text-white text-xl p-2 rounded-full hover:bg-white/20 transition-colors"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         <div className="overflow-y-auto h-full pb-20">
//           <Link
//             to="/"
//             className={`flex items-center px-5 py-4 text-white font-medium border-b border-white/10 ${
//               location.pathname === "/" ? "bg-white/20" : "hover:bg-white/10"
//             }`}
//             onClick={() => handleMenuClick("/")}
//           >
//             <FaHome className="mr-3" />
//             Home
//           </Link>

//           {menuItems.map((item) => (
//             <MobileMenuItem key={item.cat_id} item={item} />
//           ))}

//           <Link
//             to="/search"
//             className="flex items-center px-5 py-4 text-white font-medium border-b border-white/10 hover:bg-white/10"
//             onClick={() => handleMenuClick("/search")}
//           >
//             <FaSearch className="mr-3" />
//             Search
//           </Link>
//         </div>
//       </div>

//       {/* Add some custom animations */}
//       <style>{`
//         @keyframes slideDown {
//           from {
//             transform: translateY(-100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//         .animate-slideDown {
//           animation: slideDown 0.5s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;
