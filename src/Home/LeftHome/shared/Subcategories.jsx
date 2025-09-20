import React, { useState } from "react";

export default function Subcategories({ menuItems, handleArticlList ,articles,setArticlList}) {
  const [active, setActive] = useState(null); // ✅ store active sub_category_id
  const [showAll, setShowAll] = useState(false); // ✅ control "All" visibility

  const handleClick = (id) => {
    setActive(id);
    handleArticlList(id);

    // ✅ अगर कोई subcategory चुनी गई है तो "All" दिखाओ
    if (id !== null) {
      setShowAll(true);
    }
  };

  const handleAllClick = () => {
    setActive(null); // reset subcategory
    setArticlList(articles); // show all articles
    setShowAll(false); // ✅ फिर से "All" हटाओ
  };

  return (
    <div>
      <ul className="flex items-center justify-center gap-[14px]">
        {/* ✅ "All" सिर्फ तब दिखेगा जब कोई subcategory चुनी गई हो */}
        {showAll && (
          <li
            onClick={handleAllClick}
            className={`text-xs cursor-pointer transition-all ${
              active === null
                ? "underline underline-offset-4 font-semibold"
                : ""
            }`}
          >
            All
          </li>
        )}

        {/* ✅ Subcategories */}
        {menuItems?.length > 0 &&
          menuItems.map((menu) => {
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
