// import { useContext, useEffect, useState } from "react";
// import { FaBars, FaHome, FaSearch, FaTimes } from "react-icons/fa";
// import { CgChevronUp } from "react-icons/cg";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { MdOutlineAccessTime } from "react-icons/md";
// // import { menuItems } from "./menuItems";
// import { news } from "./news";
// import { t } from "i18next";
// import { LanguageContext } from "../context/LanguageContext";
// import image from "../assets/MyPatrakarLogo1.png";
// import { NewsContext } from "../context/NewsContext";
// import { WebThemeContext } from "../context/ThemeContext";
// import { menuWithSubNavMenuList } from "../../api";
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
//   const [menuItems, setMenuItems] = useState([]);
//   const loadMenuItems = async () => {
//     try {
//       const res = await menuWithSubNavMenuList("MYAWR241227001");
//       console.log(res.data.response);
//       setMenuItems(res.data.response);
//     } catch (error) {
//       console.error("Error loading menu items:", error);
//       setMenuItems([]); // Fallback to empty array on error
//     }
//   };

//   useEffect(() => {
//     loadMenuItems();
//   }, []);

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

//   // useEffect(() => {
//   //   FilteredNews();
//   // });
//   const renderMenuItems = (isMobile = false) =>
//     menuItems?.map((item) => (
//       <div
//         key={t(item.nav_name)}
//         className={`relative group text-xs  font-semibold ${
//           isMobile ? "border-b border-gray-600" : ""
//         }`}
//         onMouseEnter={
//           !isMobile ? () => toggleDropdown(item.nav_name, `/${item.nav_name.toLowerCase()}`) : null
//         } // For hover behavior on desktop
//         onMouseLeave={!isMobile ? () => toggleDropdown("") : null} // For hover behavior on desktop
//       >
//         <div
//           onClick={() =>
//             isMobile
//               ? toggleMobileDropdown(item.nav_name, item.path)
//               : handleMenuClick(item.path)
//           }
//           className={`flex justify-between items-center ${
//             item.nav_name === "search"
//               ? "px-3 hover:text-black  focus:text-black"
//               : "px-3"
//           } lg:py-5 py-2 cursor-pointer ${
//             activePath === item.path
//               ? "bg-gray-200 text-black "
//               : "hover:bg-gray-200 hover:text-black  lg:py-5 py-3"
//           }`}
//         >
//           {item.nav_name === "search" ? (
//             <div className="p-0">
//               <FaSearch className="text-xl  hover:text-black font-bold p-0" />{" "}
//             </div>
//           ) : (
//             item.nav_name
//           )}
//           {item.submenu && (
//             <CgChevronUp
//               className={`text-lg transition-transform ${
//                 (isMobile ? mobileDropdownOpen : dropdownOpen) === item.nav_name
//                   ? "rotate-0"
//                   : "rotate-180"
//               }`}
//             />
//           )}
//         </div>

//         {/* Desktop Dropdown with News and Buttons */}
//         {!isMobile && item.submenu && dropdownOpen === item.nav_name && (
//           <div
//             className={
//               item.nav_name == "विविध"
//                 ? `absolute z-50 top-full text-white shadow-md px-5 py-2 `
//                 : `absolute z-50 top-full transform ${
//                     language == "en" || language == "ta"
//                       ? "left-[-280px] "
//                       : "left-[-375px] "
//                   }  text-white shadow-md p-4 ${
//                     News.length > 3 ? "w-auto" : "w-[850px]"
//                   }`
//             }
//             style={{
//               // changes background color
//               // backgroundColor:
//               backgroundColor: !webTheme["bg-color"]
//                 ? "#b91c1c"
//                 : webTheme["bg-color"],
//             }}
//           >
//             <div>
//               {/* Submenu Items */}
//               <div
//                 className={
//                   item.nav_name == "विविध"
//                     ? "grid"
//                     : "grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6"
//                 }
//               >
//                 {item.subItems.map((subItem) => (
//                   <span
//                     key={subItem.nav_name}
//                     // to={subItem.path}
//                     onClick={() => handleMenuClick(subItem.path)}
//                     className="block py-1"
//                   >
//                     {subItem.nav_name}
//                   </span>
//                 ))}
//               </div>
//               <div className="">
//                 {/* Buttons Section */}
//                 {item.submenu && item.nav_name !== "विविध" && (
//                   <div className="mt-4 flex items-start justify-start gap-1 flex-wrap">
//                     <button
//                       className="py-2 px-2  text-white hover:bg-gray-100 hover:text-gray-900"
//                       onClick={() => handleMenuClick("/")}
//                       onMouseEnter={
//                         !isMobile ? () => setLocalNews(() => [...news]) : null
//                       }
//                     >
//                       {/* All */}
//                     </button>
//                     {/* {item.subItems.map((button, index) => (
//                       <button
//                         key={index}
//                         className="py-2 px-2  text-white rounded hover:bg-gray-100 hover:text-gray-900"
//                         onClick={() => handleMenuClick(button.path)}
//                         onMouseEnter={
//                           !isMobile ? () => FilteredNews(button.name) : null
//                         } // For hover behavior on desktop
//                         // onMouseLeave={!isMobile ? () => FilteredNews("") : null} // For hover behavior on desktop
//                       >
//                         {button.name}
//                       </button>
//                     ))} */}
//                   </div>
//                 )}
//               </div>
//               {/* News Section */}
//               {News && item.nav_name !== "विविध" && (
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
//         {isMobile && item.subItems && mobileDropdownOpen === item.nav_name && (
//           <div
//             className={
//               language == "en" || language == "ta"
//                 ? `px-0  pb-2 overflow-y-scroll h-96 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 border-r-2`
//                 : `px-4  pb-2 overflow-y-scroll h-96 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 border-r-2`
//             }
//             style={{
//               // changes background color
//               // backgroundColor:
//               backgroundColor: !webTheme["bg-color"]
//                 ? "#b91c1c"
//                 : webTheme["bg-color"],
//             }}
//           >
//             {item.subItems.map((subItem) => (
//               <Link
//                 key={subitem.nav_name}
//                 to={subItem.path}
//                 onClick={() => handleMenuClick(subItem.path)}
//                 className={
//                   language == "en" || language == "ta"
//                     ? "block px-0 text-white hover:text-black hover:bg-gray-100 py-1"
//                     : `block px-3 text-white hover:text-black hover:bg-gray-100 py-1`
//                 }
//               >
//                 {subitem.nav_name}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     ));

//   return (
//     <div
//       className={`text-white mx-0
//         ${isFixed ? "fixed top-0 left-0 shadow-lg right-0 z-50" : "relative"}`}
//       style={{
//         // changes background color
//         // backfaceVisibility

//         backgroundColor: !webTheme["bg-color"]
//           ? "#b91c1c"
//           : webTheme["bg-color"],
//       }}
//     >
//       {/* Main Navbar */}
//       <div className="flex justify-between items-center gap-5 px-4 py-0 md:px-6">
//         <div
//           className={`lg:${
//             isFixed ? "flex" : "hidden"
//           } items-center justify-center gap-5 px-4 py-0 md:px-5`}
//         >
//           <img
//             src={webTheme["web-logo"] || image}
//             alt="logo"
//             className="w-20 h-20 object-cover"
//           />
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
//         className={` fixed lg:hidden block top-0 left-0 w-3/4 max-w-sm h-full text-white z-50 transform transition-transform duration-300 ease-linear ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         style={{
//           // chnages background color
//           // backgroundColor:
//           backgroundColor: !webTheme["bg-color"]
//             ? "#b91c1c"
//             : webTheme["bg-color"],
//         }}
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
//         <div className="flex flex-col overflow-y-scroll  px-3 mt-2 ">
//           {renderMenuItems(true)} {/* Mobile menu */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import { useContext, useEffect, useState } from "react";
import { FaBars, FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { CgChevronUp } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAccessTime } from "react-icons/md";
import { t } from "i18next";
import { LanguageContext } from "../context/LanguageContext";
import image from "../assets/MyPatrakarLogo1.png";
import { NewsContext } from "../context/NewsContext";
import { WebThemeContext } from "../context/ThemeContext";
import { menuWithSubNavMenuList } from "../../api";

const Navbar = () => {
  const { setNews } = useContext(NewsContext);
  const { webTheme, setWebTheme } = useContext(WebThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);
  const [dropdownOpen, setDropdownOpen] = useState(null); // For desktop
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null); // For mobile
  const [isFixed, setIsFixed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const { language } = useContext(LanguageContext);

  const loadMenuItems = async () => {
    try {
      const res = await menuWithSubNavMenuList("MYAWR241227001");
      // console.log(res);
      setMenuItems(res.data.response);
    } catch (error) {
      console.log("Error loading menu items:", error);
      setMenuItems([]);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

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

  const toggleDropdown = (navId) => {
    setDropdownOpen(dropdownOpen === navId ? null : navId);
  };

  const toggleMobileDropdown = (navId) => {
    setMobileDropdownOpen(mobileDropdownOpen === navId ? null : navId);
  };

  const renderDesktopMenu = () => (
    <div className="hidden lg:flex items-center">
      <Link
        to="/"
        className={`flex items-center p-4 hover:bg-gray-200 hover:text-black ${
          location.pathname === "/"
            ? "bg-gray-200 text-black shadow-xl shadow-gray-500"
            : ""
        }`}
      >
        <FaHome className="text-2xl" aria-label="Home" />
      </Link>
      {menuItems.map((item) => (
        <div
          key={item.cat_id}
          className="relative group"
          onMouseEnter={() => toggleDropdown(item.cat_id)}
          onMouseLeave={() => setDropdownOpen(null)}
        >
          <button
            className={`flex items-center px-4 py-5 font-semibold text-xs ${
              activePath === `/topic/${item.nav_name.toLowerCase()}`
                ? "bg-gray-200 text-black"
                : "hover:bg-gray-200 hover:text-black"
            }`}
            onClick={() =>
              handleMenuClick(
                `/topic/${item.nav_name.toLowerCase()}/${item.cat_id}`
              )
            }
          >
            {item.nav_name}
            {item.submenus?.length > 0 && (
              <CgChevronUp
                className={`ml-1 transition-transform ${
                  dropdownOpen === item.cat_id ? "rotate-0" : "rotate-180"
                }`}
              />
            )}
          </button>

          {item.submenus?.length > 0 && dropdownOpen === item.cat_id && (
            <div
              className="absolute left-0 z-50 w-48 mt-0 bg-white shadow-lg"
              style={{ backgroundColor: webTheme["bg-color"] || "#b91c1c" }}
            >
              {item.submenus.map((submenu) => (
                <Link
                  key={submenu.subcategory_id}
                  to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${
                    submenu.subcategory_id
                  }`}
                  className="block px-4 py-2 text-white hover:bg-gray-200 hover:text-black"
                  onClick={() =>
                    handleMenuClick(
                      `/topic/${
                        item.nav_name
                      }/${submenu.nav_name.toLowerCase()}/${
                        submenu.subcategory_id
                      }`
                    )
                  }
                >
                  {submenu.nav_name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderMobileMenu = () => (
    <div
      className={`fixed lg:hidden top-0 left-0 w-3/4 h-full z-50 transform transition-transform duration-300 ease-linear ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ backgroundColor: webTheme["bg-color"] || "#b91c1c" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-600">
        <Link to="/" className="text-lg font-semibold text-white">
          <FaHome className="text-2xl" />
        </Link>
        <button
          onClick={toggleMenu}
          className="text-2xl text-white focus:outline-none"
          aria-label="Close Menu"
        >
          <FaTimes />
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        {menuItems.map((item) => (
          <div key={item.cat_id} className="border-b border-gray-600">
            <button
              className={`flex justify-between items-center w-full px-4 py-3 text-white font-semibold ${
                activePath ===
                `/topic/${item.nav_name.toLowerCase()}/${item.cat_id}`
                  ? "bg-gray-200 text-black"
                  : ""
              }`}
              onClick={() => {
                if (item.submenus?.length > 0) {
                  toggleMobileDropdown(item.cat_id);
                } else {
                  handleMenuClick(
                    `/topic/${item.nav_name.toLowerCase()}/${item.cat_id}`
                  );
                }
              }}
            >
              <span>{item.nav_name}</span>
              {item.submenus?.length > 0 && (
                <CgChevronUp
                  className={`transition-transform ${
                    mobileDropdownOpen === item.cat_id
                      ? "rotate-0"
                      : "rotate-180"
                  }`}
                />
              )}
            </button>

            {item.submenus?.length > 0 &&
              mobileDropdownOpen === item.cat_id && (
                <div className="pl-6">
                  {item.submenus.map((submenu) => (
                    <Link
                      key={submenu.subcategory_id}
                      to={`/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${
                        submenu.subcategory_id
                      }`}
                      className={`block px-4 py-2 text-white ${
                        activePath ===
                        `/topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${
                          submenu.subcategory_id
                        }`
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-200 hover:text-black"
                      }`}
                      onClick={() =>
                        handleMenuClick(
                          `topic/${item.nav_name.toLowerCase()}/${submenu.nav_name.toLowerCase()}/${
                            submenu.subcategory_id
                          }`
                        )
                      }
                    >
                      {submenu.nav_name}
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <nav
      className={`w-full text-white ${
        isFixed ? "fixed top-0 left-0 shadow-lg z-50" : "relative"
      }`}
      style={{ backgroundColor: webTheme["bg-color"] || "#b91c1c" }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo - visible when fixed or on mobile */}
        <div className={`${isFixed ? "flex" : "lg:hidden flex"} items-center`}>
          <img
            src={webTheme["web-logo"] || image}
            alt="logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-2xl text-white focus:outline-none"
          aria-label="Open Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        {renderDesktopMenu()}

        {/* Search Icon - you can implement search functionality here */}
        <Link to={"/search"} className="hidden lg:flex items-center">
          <button className="hidden lg:flex items-center px-4 py-5 text-white hover:bg-gray-200 hover:text-black">
            <FaSearch className="text-lg" />
          </button>
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      {renderMobileMenu()}
    </nav>
  );
};

export default Navbar;
