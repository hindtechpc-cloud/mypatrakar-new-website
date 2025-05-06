import { FaTimes, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

const MobileMenu = ({ menuOpen, toggleMenu, menuItems, ...props }) => (
  <div
    className={`fixed top-0 left-0 w-3/4 max-w-sm h-full bg-red-700 text-white z-50 transform transition-transform duration-300 ${
      menuOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    {/* Header: Home icon and Close button */}
    <div className="flex justify-between items-center px-4 py-2 border-b border-red-500">
      <Link to="/" className="text-lg font-semibold flex items-center gap-2">
        <FaHome className="text-2xl" />
        Home
      </Link>
      <button onClick={toggleMenu} className="text-2xl">
        <FaTimes />
      </button>
    </div>

    {/* Menu Items */}
    <div className="flex flex-col px-4 py-3 overflow-y-auto h-[calc(100%-56px)]">
      {menuItems.map((item) => (
        <MenuItem key={item.name} item={item} isMobile={true} {...props} />
      ))}
    </div>
  </div>
);

export default MobileMenu;
