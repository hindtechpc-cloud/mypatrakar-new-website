import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaVideo,
  FaShieldAlt,
  FaFileContract,
  FaFire,
} from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { Link } from "react-router-dom";

export default function FooterMenu() {
  const menu = [
    { name: "Home", link: "/", icon: <FaHome /> },
    { name: "About", link: "/about-us", icon: <FaInfoCircle /> },
    { name: "Contact Us", link: "/contact-us", icon: <FaEnvelope /> },
    { name: "Live Stream", link: "/services", icon: <MdLiveTv /> },
    { name: "Videos", link: "/videos", icon: <FaVideo /> },
    { name: "Privacy Policy", link: "/privacy-policy", icon: <FaShieldAlt /> },
    {
      name: "Terms & Conditions",
      link: "/terms-and-conditions",
      icon: <FaFileContract />,
    },
    { name: "Bharat Trending", link: "/bharat-trending", icon: <FaFire /> },
  ];

  return (
    <div className="w-[320px]  ">
      <h2 className="text-yellow-400 text-xl font-semibold border-b border-gray-700 pb-3 mb-5 text-center">
        Navigation
      </h2>
      <ul className="text-gray-300 font-noto space-y-4">
        {menu.map((item, index) => (
          <li key={index} className="group">
            <Link
              to={item.link}
              className="flex items-center space-x-3 text-sm  hover:text-yellow-400 "
            >
              <span className="  text-sm ">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
