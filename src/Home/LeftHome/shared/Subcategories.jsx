import React, { useState } from "react";

export default function Subcategories({ menuItems, handleArticlList }) {
  const [active, setActive] = useState(null); // ✅ store active sub_category_id

  const handleClick = (id) => {
    setActive(id); // ✅ set active item
    handleArticlList(id); // ✅ call parent function
  };

  return (
    <div>
      <ul className="flex items-center justify-center gap-[14px]">
        {menuItems?.length > 0 &&
          menuItems?.map((menu) => {
            const isActive = active === menu.sub_category_id;
            return (
              <li
                key={menu.sub_category_id}
                onClick={() => handleClick(menu.sub_category_id)}
                className={`text-xs cursor-pointer transition-all ${
                  isActive ? "underline underline-offset-4 font-semibold " : ""
                }`}
              >
                {menu.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
