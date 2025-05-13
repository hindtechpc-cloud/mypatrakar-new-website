import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import logo1 from "../assets/Ellipse.svg";
import SocialIcons from "./SocialIcons";
import { WebThemeContext } from "../context/ThemeContext";

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

  const themeColorClass = webTheme["bg-color"] === "#e60000"
    ? "bg-red-700"
    : "";

  const isInfoPage = [
    "/about-us",
    "/terms-and-condition",
    "/privacy-policy",
    "/contact-us",
    "/our-reporters",
    "/advertise-with-us",
  ].includes(location.pathname);

  return (
    <header
      className={`w-full ${themeColorClass} text-white py-4 px-4 shadow-lg sticky top-0 z-50 transition-colors duration-300`}
      style={{ 
        backgroundColor: webTheme["bg-color"] !== "#e60000" ? webTheme["bg-color"] : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {isInfoPage && (
          <div className="flex justify-between items-center mb-4">
            <div className="w-14 hover:scale-105 transition-transform duration-200">
              <img 
                src={logo1} 
                alt="Icon Logo" 
                className="w-full drop-shadow-md" 
              />
            </div>
            <div className="w-28 hover:scale-105 transition-transform duration-200">
              <img 
                src={webTheme["web-logo"]} 
                alt="Main Logo" 
                className="w-full drop-shadow-md" 
              />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Language Selection */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-sm">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                className="px-2 py-1 rounded-md hover:bg-white/20 hover:text-yellow-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                // onClick={() => changeLanguage(code)}
                aria-label={`Change language to ${label}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Social Icons and Contact */}
          <div className="flex items-center gap-4">
            <SocialIcons />
            {!isInfoPage && (
              <button className="text-sm px-3 py-1 bg-white/10 rounded-md hover:bg-white/20 hover:text-yellow-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                विज्ञापन के लिए संपर्क करें
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;