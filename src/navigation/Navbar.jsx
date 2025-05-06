// import { useContext, useEffect, useState } from "react";
// import { FaBars, FaHome, FaSearch, FaTimes } from "react-icons/fa";
// import { CgChevronUp } from "react-icons/cg";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { MdOutlineAccessTime } from "react-icons/md";
// import { menuItems } from "./menuItems";
// import { news } from "./news";
// import { t } from "i18next";
// import { LanguageContext } from "../context/LanguageContext";
// import image from "../assets/MyPatrakarLogo1.png";
// import { NewsContext } from "../context/NewsContext";
// import { WebThemeContext } from "../context/ThemeContext";
// const Navbar = () => {
//   const { setNews } = useContext(NewsContext);
//   const { webTheme, setWebTheme } = useContext(WebThemeContext);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activePath, setActivePath] = useState(window.location.pathname);
//   const [dropdownOpen, setDropdownOpen] = useState(""); // For desktop
//   const [mobileDropdownOpen, setMobileDropdownOpen] = useState(""); // For mobile
//   const [isFixed, setIsFixed] = useState(false);
//   const [News, setLocalNews] = useState(news); // For mobile
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleNewsContent = (news) => {
//     setNews(news);
//     navigate(`/read-news/${news.title}`);
//   };
//   const { language } = useContext(LanguageContext);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 150) {
//         setIsFixed(true);
//       } else {
//         setIsFixed(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//     document.body.style.overflow = menuOpen ? "auto" : "hidden";
//   };

//   const handleMenuClick = (path) => {
//     setActivePath(path);
//     setMenuOpen(!menuOpen);
//     document.body.style.overflow = "auto";
//     navigate(`${path}`);
//   };

//   const toggleDropdown = (menu) => {
//     setDropdownOpen((prev) => (prev === menu ? "" : menu));
//   };

//   const toggleMobileDropdown = (menu, path) => {
//     setMobileDropdownOpen((prev) => (prev === menu ? "" : menu));
//     navigate(path);
//   };

//   // FilteredNews function
//   const FilteredNews = (searchTerm) => {
//     console.log(News);
//     if (!searchTerm.trim()) {
//       // Reset to original news list if search term is empty
//       setLocalNews(news);
//       return;
//     }
//     const filteredNews = news.filter((newsItem) =>
//       Object.values(newsItem).some((value) =>
//         value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );

//     setLocalNews(filteredNews);
//   };

//   const renderMenuItems = (isMobile = false) =>
//     menuItems.map((item) => (
//       <div
//         key={t(item.name)}
//         className={`relative group text-xs  font-semibold ${
//           isMobile ? "border-b border-gray-600" : ""
//         }`}
//         onMouseEnter={
//           !isMobile ? () => toggleDropdown(item.name, item.path) : null
//         } // For hover behavior on desktop
//         onMouseLeave={!isMobile ? () => toggleDropdown("") : null} // For hover behavior on desktop
//       >
//         <div
//           onClick={() =>
//             isMobile
//               ? toggleMobileDropdown(item.name, item.path)
//               : handleMenuClick(item.path)
//           }
//           className={`flex justify-between items-center ${
//             item.name === "search"
//               ? "px-3 hover:text-black  focus:text-black"
//               : "px-3"
//           } lg:py-5 py-2 cursor-pointer ${
//             activePath === item.path
//               ? "bg-gray-200 text-black "
//               : "hover:bg-gray-200 hover:text-black  lg:py-5 py-3"
//           }`}
//         >
//           {item.name === "search" ? (
//             <div className="p-0">
//               <FaSearch className="text-xl  hover:text-black font-bold p-0" />{" "}
//             </div>
//           ) : (
//             item.name
//           )}
//           {item.subItems && (
//             <CgChevronUp
//               className={`text-lg transition-transform ${
//                 (isMobile ? mobileDropdownOpen : dropdownOpen) === item.name
//                   ? "rotate-0"
//                   : "rotate-180"
//               }`}
//             />
//           )}
//         </div>

//         {/* Desktop Dropdown with News and Buttons */}
//         {!isMobile && item.subItems && dropdownOpen === item.name && (
//           <div
//             className={
//               item.name == "विविध"
//                 ? `absolute z-50 top-full bg-red-700  text-white shadow-md px-5 py-2 `
//                 : `absolute z-50 top-full  mt-1 transform ${
//                     language == "en" || language == "ta"
//                       ? "left-[-280px] "
//                       : "left-[-375px] "
//                   } bg-red-700 text-white shadow-md p-4 ${
//                     News.length > 3 ? "w-auto" : "w-[850px]"
//                   }`
//             }
//           >
//             <div>
//               {/* Submenu Items */}
//               <div
//                 className={
//                   item.name == "विविध"
//                     ? "grid"
//                     : "grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6"
//                 }
//               >
//                 {item.subItems.map((subItem) => (
//                   <span
//                     key={subItem.name}
//                     // to={subItem.path}
//                     onClick={() => handleMenuClick(subItem.path)}
//                     className="block py-1"
//                   >
//                     {subItem.name}
//                   </span>
//                 ))}
//               </div>
//               <div className="">
//                 {/* Buttons Section */}
//                 {item.subItems && item.name !== "विविध" && (
//                   <div className="mt-4 flex items-start justify-start gap-1 flex-wrap">
//                     <button
//                       className="py-2 px-2 bg-red-800 text-white hover:bg-gray-100 hover:text-gray-900"
//                       onClick={() => handleMenuClick("/")}
//                       onMouseEnter={
//                         !isMobile ? () => setLocalNews(() => [...news]) : null
//                       }
//                     >
//                       All
//                     </button>
//                     {item.subItems.map((button, index) => (
//                       <button
//                         key={index}
//                         className="py-2 px-2 bg-red-800 text-white rounded hover:bg-gray-100 hover:text-gray-900"
//                         onClick={() => handleMenuClick(button.path)}
//                         onMouseEnter={
//                           !isMobile ? () => FilteredNews(button.name) : null
//                         } // For hover behavior on desktop
//                         // onMouseLeave={!isMobile ? () => FilteredNews("") : null} // For hover behavior on desktop
//                       >
//                         {button.name}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               {/* News Section */}
//               {News && item.name !== "विविध" && (
//                 <div className="mt-2 flex items-center justify-start gap-4">
//                   {News?.slice(0, 4).map((newsItem, index) => (
//                     <span
//                       // to={newsItem.title}
//                       key={index}
//                       className="text-sm text-gray-200 grid gap-1 hover:underline"
//                       onClick={() => handleNewsContent(newsItem)}
//                     >
//                       {/*news  image  */}
//                       <div className="w-48 h-32 rounded">
//                         <img
//                           src={newsItem.urlToImage}
//                           alt={newsItem.title}
//                           className="object-cover w-full h-full rounded"
//                         />
//                       </div>
//                       {/* news description   */}
//                       <div>
//                         <p className="text-gray-50 text-xs">
//                           {newsItem.description}
//                         </p>
//                       </div>
//                       {/* news date  */}
//                       <div className="flex items-start justify-center gap-1">
//                         <span>
//                           <MdOutlineAccessTime className="inline-block font-bold text-lg mb-2 text-gray-300" />
//                         </span>
//                         <span className="text-gray-300 text-xs">
//                           {newsItem?.publishedAt
//                             ? new Date(newsItem.publishedAt).toDateString()
//                             : "No Date"}{" "}
//                         </span>
//                       </div>
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Mobile Dropdown */}
//         {isMobile && item.subItems && mobileDropdownOpen === item.name && (
//           <div
//             className={
//               language == "en" || language == "ta"
//                 ? `bg-${
//                     webTheme["bg-color"] == "#e60000"
//                       ? "red-700"
//                       : webTheme["bg-color"]
//                   } px-0  pb-2 overflow-y-scroll h-96 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 border-r-2`
//                 : `bg-${
//                     webTheme["bg-color"] == "#e60000"
//                       ? "red-700"
//                       : webTheme["bg-color"]
//                   } px-4  pb-2 overflow-y-scroll h-96 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 border-r-2`
//             }
//           >
//             {item.subItems.map((subItem) => (
//               <Link
//                 key={subItem.name}
//                 to={subItem.path}
//                 onClick={() => handleMenuClick(subItem.path)}
//                 className={
//                   language == "en" || language == "ta"
//                     ? "block px-0 text-white hover:bg-red-900 py-1"
//                     : `block px-3 text-white hover:bg-red-900 py-1`
//                 }
//               >
//                 {subItem.name}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     ));

//   return (
//     <div
//       className={`bg-${
//         webTheme["bg-color"] == "#e60000" ? "red-700" : webTheme["bg-color"]
//       } text-white mx-0 
//         ${isFixed ? "fixed top-0 left-0 shadow-lg right-0 z-50" : "relative"}`}
//     >
//       {/* Main Navbar */}
//       <div className="flex justify-between items-center gap-5 px-4 py-0 md:px-6">
//         <div
//           className={`lg:${
//             isFixed ? "flex" : "hidden"
//           } items-center justify-center gap-5 px-4 py-0 md:px-5`}
//         >
//           <img src={webTheme["web-logo"]} alt="logo" className="w-28" />
//         </div>

//         {/* Logo */}

//         {/* Mobile Menu Button */}
//         <button
//           onClick={toggleMenu}
//           className="relative text-2xl focus:outline-none lg:hidden"
//           aria-label="Open Menu"
//         >
//           {menuOpen ? (
//             <FaTimes className="my-4" />
//           ) : (
//             <FaBars className="my-4" />
//           )}
//         </button>

//         {/* Desktop Menu */}
//         <div
//           className={`hidden lg:flex items-center justify-center ${
//             isFixed ? "lg:gap-5" : "lg:gap-36"
//           }`}
//         >
//           <div className="flex items-center justify-center  px-4 py-0 md:px-5">
//             <Link
//               to="/"
//               className={`absolute flex items-start p-5 md:p-5 hover:bg-gray-200 hover:text-black ${
//                 location.pathname === "/"
//                   ? "bg-gray-200 text-black p-5 md:p-5 shadow-xl shadow-gray-500"
//                   : "text-white"
//               }`}
//             >
//               <FaHome className="md:text-2xl" aria-label="Home" />
//             </Link>
//           </div>
//           <div className="hidden lg:flex items-center justify-between space-x-2">
//             {renderMenuItems()}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       <div
//         className={`fixed lg:hidden block top-0 left-0 w-3/4 max-w-sm h-full bg-${
//           webTheme["bg-color"] == "#e60000" ? "red-700" : webTheme["bg-color"]
//         }text-white z-50 transform transition-transform duration-300 ease-linear ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center px-4 py-1 me-2">
//           <Link to="/" className="text-lg font-semibold">
//             <FaHome className="text-2xl" aria-label="Home" />
//           </Link>
//           <button
//             onClick={toggleMenu}
//             className="text-2xl focus:outline-none"
//             aria-label="Close Menu"
//           >
//             <FaTimes />
//           </button>
//         </div>
//         <div className="flex flex-col overflow-y-scroll  px-3 mt-2">
//           {renderMenuItems(true)} {/* Mobile menu */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import { WebThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { news } from "./news";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

const Navbar = () => {
  const { setNews } = useContext(NewsContext);
  const { webTheme } = useContext(WebThemeContext);
  const { language } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);
  const [isFixed, setIsFixed] = useState(false);
  const [News, setLocalNews] = useState(news);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNewsContent = (news) => {
    setNews(news);
    navigate(`/read-news/${news.title}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  const handleMenuClick = (path) => {
    setActivePath(path);
    setMenuOpen(false);
    document.body.style.overflow = "auto";
    navigate(path);
  };

  return (
    <div
      className={`bg-${
        webTheme["bg-color"] === "#e60000" ? "red-700" : webTheme["bg-color"]
      } text-white ${isFixed ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : "relative"}`}
    >
      <div className="flex justify-between items-center px-4 py-0 md:px-6">
        <Logo isFixed={isFixed} />
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none lg:hidden"
          aria-label="Open Menu"
        >
          {menuOpen ? <FaTimes className="my-4" /> : <FaBars className="my-4" />}
        </button>
        <MenuItem
          isFixed={isFixed}
          location={location}
          activePath={activePath}
          setActivePath={setActivePath}
          handleMenuClick={handleMenuClick}
          News={News}
          setNews={setLocalNews}
          handleNewsContent={handleNewsContent}
        />
      </div>
      <MobileMenu
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        handleMenuClick={handleMenuClick}
        activePath={activePath}
        setActivePath={setActivePath}
        News={News}
        setNews={setLocalNews}
        handleNewsContent={handleNewsContent}
      />
    </div>
  );
};

export default Navbar;
