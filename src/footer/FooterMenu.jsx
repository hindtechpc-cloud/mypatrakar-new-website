import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaVideo,
  FaShieldAlt,
  FaFileContract,
  FaStore,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSettingsContext } from "../context/SettingsContext";
import { useWebThemeContext } from "../context/WebThemeContext";
import { useState } from "react";

export default function FooterMenu() {
  const { getSettingStatus } = useSettingsContext();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { webTheme } = useWebThemeContext();

  const isAboutPageEnabled = getSettingStatus("About Us");

  const baseMenu = [
    { name: "Home", link: "/", icon: <FaHome className="text-lg" /> },
    { name: "Contact Us", link: "/contact-us", icon: <FaEnvelope className="text-lg" /> },
    { name: "Market Place", link: "/market-place", icon: <FaStore className="text-lg" /> },
    { name: "Privacy Policy", link: "/privacy-policy", icon: <FaShieldAlt className="text-lg" /> },
    {
      name: "Terms & Conditions",
      link: "/terms-and-conditions",
      icon: <FaFileContract className="text-lg" />,
    },
  ];

  if (isAboutPageEnabled) {
    baseMenu.splice(1, 0, {
      name: "About",
      link: "/about-us",
      icon: <FaInfoCircle className="text-lg" />,
    });
  }

  return (
    <div className="w-full max-w-xs mx-auto lg:mx-0">
      <h2
        className="text-xl font-bold pb-3 mb-6 text-center lg:text-left"
        style={{
          color: webTheme["bg-color"] || "white",
          borderBottom: `1px solid ${webTheme["bg-color"]}`,
        }}
      >
        Navigation
      </h2>
      <div className="grid grid-cols-1">
        {baseMenu.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300"
            style={{
              backgroundColor:
                hoveredIndex === index ? webTheme["bg-color"] : "transparent",
              color: hoveredIndex === index ? "blue" : "white",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              style={{
                color: hoveredIndex === index ? "blue" : "white",
              }}
            >
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
