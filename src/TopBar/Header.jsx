// // // src/TopBar/Header.jsx
// // import React, { useContext } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import logo1 from "../assets/Ellipse.svg";
// // import SocialIcons from "./SocialIcons";
// // import { WebThemeContext } from "../context/ThemeContext";

// // const languages = [
// //   { code: "hi", label: "हिंदी" },
// //   { code: "en", label: "English" },
// //   { code: "mr", label: "मराठी" },
// //   { code: "pa", label: "ਪੰਜਾਬੀ" },
// //   { code: "bn", label: "বাংলা" },
// //   { code: "gu", label: "ગુજરાતી" },
// //   { code: "ta", label: "தமிழ்" },
// //   { code: "te", label: "తెలుగు" },
// // ];

// // const Header = () => {
// //   const { webTheme } = useContext(WebThemeContext);
// //   const location = useLocation();

// //   const themeColorClass =
// //     webTheme["bg-color"] === "#e60000" ? "bg-red-700" : webTheme["bg-color"];

// //   const isInfoPage = [
// //     "/about-us",
// //     "/terms-and-condition",
// //     "/privacy-policy",
// //     "/contact-us",
// //     "/our-reporters",
// //     "/advertise-with-us",
// //   ].includes(location.pathname);

// //   return (
// //     <header
// //       className={`w-full ${themeColorClass}  md:block text-white py-4 px-4 shadow-lg sticky top-0 z-50 transition-colors duration-300`}
// //       style={{
// //         backgroundColor: !webTheme["bg-color"]
// //           ? "#b91c1c"
// //           : webTheme["bg-color"],
// //       }}
// //     >
// //       <div className="max-w-7xl mx-auto">
// //         {isInfoPage && (
// //           <div className="flex justify-between items-center mb-4">
// //             <div className="w-14 hover:scale-105 transition-transform duration-200">
// //               <img
// //                 src={logo1}
// //                 alt="Icon Logo"
// //                 className="w-full drop-shadow-md"
// //               />
// //             </div>
// //             <div className="w-20 h-20 hover:scale-105 transition-transform duration-200">
// //               <img
// //                 src={webTheme["web-logo"]}
// //                 alt="Main Logo"
// //                 className="w-full h-full object-cover drop-shadow-md"
// //               />
// //             </div>
// //           </div>
// //         )}

// //         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
// //           {/* Language Selection */}
// //           <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-sm">
// //             {languages.map(({ code, label }) => (
// //               <button
// //                 key={code}
// //                 className="px-2 py-1 rounded-md hover:bg-white/20 hover:text-yellow-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
// //                 // onClick={() => changeLanguage(code)}
// //                 aria-label={`Change language to ${label}`}
// //               >
// //                 {label}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Social Icons and Contact */}
// //           <div className="flex items-center gap-4">
// //             <SocialIcons />
// //             {!isInfoPage && (
// //               <Link to={"advertise-with-us"} className="text-sm">
// //                 <button className="text-sm px-3 py-1 bg-white/10 rounded-md hover:bg-white/20 hover:text-yellow-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
// //                   विज्ञापन के लिए संपर्क करें
// //                 </button>
// //               </Link>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// // src/TopBar/Header.jsx
// import React, { useContext } from "react";
// import { Link, Links, useLocation } from "react-router-dom";
// import logo1 from "../assets/Ellipse.svg";
// import SocialIcons from "./SocialIcons";
// import { WebThemeContext } from "../context/ThemeContext";
// import { useSettingsContext } from "../context/SettingsContext";

// const languages = [
//   { code: "hi", label: "हिंदी" },
//   { code: "en", label: "English" },
//   { code: "mr", label: "मराठी" },
//   { code: "pa", label: "ਪੰਜਾਬੀ" },
//   { code: "bn", label: "বাংলা" },
//   { code: "gu", label: "ગુજરાતી" },
//   { code: "ta", label: "தமிழ்" },
//   { code: "te", label: "తెలుగు" },
// ];

// const Header = () => {
//   const { webTheme } = useContext(WebThemeContext);
//   const location = useLocation();

//   const themeColorClass =
//     webTheme["bg-color"] === "#e60000" ? "bg-red-700" : webTheme["bg-color"];

//   const isInfoPage = [
//     "/about-us",
//     "/terms-and-condition",
//     "/privacy-policy",
//     "/contact-us",
//     "/our-reporters",
//     "/advertise-with-us",
//     "/market-place",
//     "/seller-query-form",
//     "/buyer-query-form",
//     "/market-place/details"
//   ].includes(location.pathname);


//     const { getSettingStatus } = useSettingsContext();
  
//     const isAdvertiseWithUsEnabled = getSettingStatus("Apply for Advertisement");
//   return (
//     <header
//       className={`w-full ${themeColorClass}  md:block text-white py-1 px-4 shadow-lg sticky top-0 z-50 transition-colors duration-300 mb-5`}
//       style={{
//         backgroundColor: !webTheme["bg-color"]
//           ? "#b91c1c"
//           : webTheme["bg-color"],
//       }}
//     >
//       <div className="max-w-7xl mx-auto">
//         {isInfoPage && (
//           <div className="flex justify-between items-center">
//             <div className="select-none w-14 hover:scale-105 transition-transform duration-200">
//              <Link to={"/"}>
             
//               <img
//                 src={logo1}
//                 alt="Icon Logo"
//                 className="w-full drop-shadow-md"
//               />
//               </Link>
//             </div>
//             <div className="select-none w-16 h-16 hover:scale-105 transition-transform duration-200">
//               <img
//                 src={webTheme["web-logo"]}
//                 alt="Main Logo"
//                 className="w-full h-full object-cover drop-shadow-md"
//               />
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//           {/* Language Selection */}
//           <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-sm">
//             {languages.map(({ code, label }) => (
//               <button
//                 key={code}
//                 className="px-2 py-1 rounded-md hover:bg-white/20 hover:text-yellow-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
//                 // onClick={() => changeLanguage(code)}
//                 aria-label={`Change language to ${label}`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {/* Social Icons and Contact */}
//           <div className="flex items-center gap-4">
//             <SocialIcons />
//             {!isInfoPage && isAdvertiseWithUsEnabled && (
//               <Link to={"advertise-with-us"} className="text-sm">
//                 <button className="text-sm px-3 py-1 bg-white/10 rounded-md hover:bg-white/20 hover:text-yellow-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
//                   विज्ञापन के लिए संपर्क करें
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;




// src/TopBar/Header.jsx
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../assets/Ellipse.svg";
import SocialIcons from "./SocialIcons";
import { WebThemeContext } from "../context/ThemeContext";
import { useSettingsContext } from "../context/SettingsContext";

const languages = [
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "bn", label: "বাংলা" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
];

const Header = () => {
  const { webTheme } = useContext(WebThemeContext);
  const location = useLocation();
  const { getSettingStatus } = useSettingsContext();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  
  const isAdvertiseWithUsEnabled = getSettingStatus("Apply for Advertisement");
  
  const isInfoPage = [
    "/about-us",
    "/terms-and-condition",
    "/privacy-policy",
    "/contact-us",
    "/our-reporters",
    "/advertise-with-us",
    "/market-place",
    "/seller-query-form",
    "/buyer-query-form",
    "/market-place/details"
  ].includes(location.pathname);

  // Calculate a lighter version of the theme color for hover effects
  const getHoverColor = (baseColor) => {
    if (!baseColor || baseColor === "#b91c1c") return "#f87171"; // Default to red if no theme
    // Simple function to lighten the color
    return baseColor.replace(/#(\w{2})(\w{2})(\w{2})/, (_, r, g, b) => {
      const lighten = (color) => Math.min(255, parseInt(color, 16) + 40).toString(16).padStart(2, '0');
      return `#${lighten(r)}${lighten(g)}${lighten(b)}`;
    });
  };

  const headerBgColor = webTheme["bg-color"] || "#b91c1c";
  const hoverColor = getHoverColor(headerBgColor);

  return (
    <header
      className="w-full text-white py-2 px-4 shadow-lg sticky top-0 z-50 transition-all duration-300 mb-5"
      style={{ backgroundColor: headerBgColor }}
    >
      <div className="max-w-7xl mx-auto">
        {isInfoPage && (
          <div className="flex justify-between items-center mb-3">
            <Link to="/" className="transition-transform hover:scale-105 duration-200">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
                <img
                  src={logo1}
                  alt="Icon Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <Link to="/" className="transition-transform hover:scale-105 duration-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2 shadow-md">
                <img
                  src={webTheme["web-logo"]}
                  alt="Main Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Language Selection - Improved with dropdown for mobile */}
          <div className="relative w-full md:w-auto">
            <div className="md:hidden w-full">
              <button
                className="w-full px-4 py-2 bg-white/10 rounded-lg flex items-center justify-between"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                style={{ 
                  backgroundColor: isLanguageMenuOpen ? hoverColor : 'rgba(255,255,255,0.1)'
                }}
              >
                <span>भाषा / Language</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 rounded-lg shadow-lg z-10 p-2 grid grid-cols-2 gap-1">
                  {languages.map(({ code, label }) => (
                    <button
                      key={code}
                      className="px-3 py-2 text-gray-800 rounded-md text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        // changeLanguage(code);
                        setIsLanguageMenuOpen(false);
                      }}
                      aria-label={`Change language to ${label}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="hidden md:flex flex-wrap justify-center gap-2">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  className="px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm font-medium"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.2s ease'
                  }}
                  // onClick={() => changeLanguage(code)}
                  aria-label={`Change language to ${label}`}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverColor;
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Social Icons and Contact */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="hidden lg:flex items-center">
              <SocialIcons />
            </div>
            
            {!isInfoPage && isAdvertiseWithUsEnabled && (
              <Link 
                to="advertise-with-us" 
                className="text-sm transition-all duration-200 hover:scale-105"
              >
                <button 
                  className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-1 font-medium text-sm"
                  style={{ 
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverColor;
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  विज्ञापन के लिए संपर्क करें
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;