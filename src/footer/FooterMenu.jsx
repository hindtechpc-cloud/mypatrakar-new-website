import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaVideo,
  FaShieldAlt,
  FaFileContract,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSettingsContext } from "../context/SettingsContext";

export default function FooterMenu() {
  const { getSettingStatus } = useSettingsContext();

  const isAboutPageEnabled = getSettingStatus("About Us");
  // const isAdvertiseWithUsPageEnabled = getSettingStatus("Apply for Advertisement");

  const baseMenu = [
    { name: "Home", link: "/", icon: <FaHome /> },
    { name: "Contact Us", link: "/contact-us", icon: <FaEnvelope /> },
    { name: "Videos", link: "/videos", icon: <FaVideo /> },
    { name: "Privacy Policy", link: "/privacy-policy", icon: <FaShieldAlt /> },
    {
      name: "Terms & Conditions",
      link: "/terms-and-conditions",
      icon: <FaFileContract />,
    },
  ];

  // Conditionally insert 'About Us' if enabled
  if (isAboutPageEnabled) {
    baseMenu.splice(1, 0, {
      name: "About",
      link: "/about-us",
      icon: <FaInfoCircle />,
    });
  }

  return (
    <div className="w-[320px]">
      <h2 className="text-yellow-400 text-xl font-semibold border-b border-gray-700 pb-3 mb-5 text-center">
        Navigation
      </h2>
      <ul className="text-gray-300 font-noto space-y-4">
        {baseMenu.map((item, index) => (
          <li key={index} className="group">
            <Link
              to={item.link}
              className="flex items-center space-x-3 text-sm hover:text-yellow-400"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
