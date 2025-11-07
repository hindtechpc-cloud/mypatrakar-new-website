// src/navigation/Navbar/MobileMenuItem.jsx
import { Link } from "react-router-dom";
import { CgChevronUp } from "react-icons/cg";
import { encryptData } from "../utils/cryptoHelper";
import SocialIcons from "../TopBar/SocialIcons";

const MobileMenuItem = ({
  item,
  activePath,
  mobileActiveDropdown,
  setMobileActiveDropdown,
  handleMenuClick
}) => (
  <div key={item.cat_id} className=" border-b border-gray-300/30  text-sm">
    <button
      className={`flex justify-between items-center w-full px-4 py-5   ${
        activePath.startsWith("/topic/") &&
        activePath.includes(`/topic/${item.nav_name.toLowerCase()}`)
          ? "bg-gray-200 text-black"
          : "text-gray-100"
      }`}
      onClick={() => {
        if (item.submenus?.length > 0) {
          setMobileActiveDropdown(
            mobileActiveDropdown === item.cat_id ? null : item.cat_id
          );
        } else {
          handleMenuClick(
            `/topic/${item.nav_name.toLowerCase()}/${encryptData(item.cat_id)}`
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
      <div className="pl-5">
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

export default MobileMenuItem;
