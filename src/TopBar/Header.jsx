import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../assets/Ellipse.svg";
import SocialIcons from "./SocialIcons";
import { useSettingsContext } from "../context/SettingsContext";
import { useWebThemeContext } from "../context/WebThemeContext";
import { loadGoogleTranslate, translatePageTo } from "../utils/loadGoogleTranslate";

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
  const { webTheme } = useWebThemeContext();
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
    "/market-place/details",
  ].includes(location.pathname);

useEffect(() => {
  // Delay script load for better initial performance
  const timer = setTimeout(() => {
    loadGoogleTranslate();
  }, 1500); // Delay of 1.5 seconds

  return () => clearTimeout(timer); // cleanup timer when unmounted
}, []);

  const getHoverColor = (baseColor) => {
    if (!baseColor || baseColor === "#b91c1c") return "#f87171";
    return baseColor.replace(/#(\w{2})(\w{2})(\w{2})/, (_, r, g, b) => {
      const lighten = (color) =>
        Math.min(255, parseInt(color, 16) + 40)
          .toString(16)
          .padStart(2, "0");
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
            <Link
              to="/"
              className="transition-transform hover:scale-105 duration-200"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
                <img
                  src={logo1}
                  alt="Icon Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <Link
              to="/"
              className="transition-transform hover:scale-105 duration-200"
            >
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
          {/* 🌐 Language Selection */}
          <div className="relative w-full md:w-auto">
            <div className="md:hidden w-full">
              <button
                className="w-full px-4 py-2 bg-white/10 rounded-lg flex items-center justify-between"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                style={{
                  backgroundColor: isLanguageMenuOpen
                    ? hoverColor
                    : "rgba(255,255,255,0.1)",
                }}
              >
                <span>भाषा / Language</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isLanguageMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 rounded-lg shadow-lg z-10 p-2 grid grid-cols-2 gap-1">
                  {languages.map(({ code, label }) => (
                    <button
                      key={code}
                      className="px-3 py-2 text-gray-800 rounded-md text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        translatePageTo(code);
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

            {/* Desktop Language Buttons */}
            <div className="hidden md:flex flex-wrap justify-center gap-2">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  className="px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm font-medium"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => translatePageTo(code)}
                  aria-label={`Change language to ${label}`}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverColor;
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor =
                      "rgba(255,255,255,0.1)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 📱 Social Icons + Contact */}
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
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverColor;
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor =
                      "rgba(255,255,255,0.1)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  विज्ञापन के लिए संपर्क करें
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Hidden translator div */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </header>
  );
};

export default Header;
