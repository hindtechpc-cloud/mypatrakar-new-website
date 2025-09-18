// import React, { useContext, useState } from "react";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { WebThemeContext } from "../../../context/ThemeContext";

// const MenuBar = ({ menuText, setSubcategory, menuItems }) => {
//   const [isOpen, setIsOpen] = useState(false);
// const {webTheme}=useContext(WebThemeContext)
//   const toggleMenu = () => setIsOpen(!isOpen);
//   const themeColor = webTheme["bg-color"] || "#b91c1c";
//   return (
//     <div className=" text-white shadow-md rounded-md py-[7px] px-[10px] " style={{
//       background:themeColor
//     }}>
//       {/* Menu Header */}
//       <div
//         className="flex items-center justify-between cursor-pointer"
//         onClick={toggleMenu}
//       >
//         <span className="text-[15px] font-bold tracking-wide">{menuText}</span>

//         {menuItems.length > 0 && (
//           <button className="md:hidden focus:outline-none transition-transform duration-300">
//             {isOpen ? (
//               <IoIosArrowUp size={22} className="text-yellow-300" />
//             ) : (
//               <IoIosArrowDown size={22} className="text-yellow-300" />
//             )}
//           </button>
//         )}
//       </div>

//       {/* Menu Items */}
//       <div
//         className={`md:flex flex-wrap gap-2 transition-all duration-300 ease-in-out ${
//           isOpen
//             ? "block opacity-100"
//             : "hidden md:flex opacity-0 md:opacity-100"
//         }`}
//       >
//         {menuItems?.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => setSubcategory(item)}
//             className=" bg-white/10 hover:bg-white hover:text-blue-700 text-[15px] font-semibold rounded-lg cursor-pointer shadow-sm transition-all duration-200"
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function Menu({ menuText, setSubcategory, menu }) {
//   return (
//     <div className="w-full">
//       <MenuBar
//         menuItems={menu}
//         menuText={menuText}
//         setSubcategory={setSubcategory}
//       />
//     </div>
//   );
// }
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { WebThemeContext } from "../../../context/ThemeContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const MenuBar = ({
  menuText,
  setArticlList,
  menuItems,
  articles = [],
  totalArticles = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { webTheme } = useContext(WebThemeContext);

  // pagination states
  const [page, setPage] = useState(1);
  const articlesPerPage = 2;

  const toggleMenu = () => setIsOpen(!isOpen);
  const themeColor = webTheme["bg-color"] || "#b91c1c";

  // calculate current articles
  const startIndex = (page - 1) * articlesPerPage;
  const currentArticles = articles.slice(
    startIndex,
    startIndex + articlesPerPage
  );
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value); // ✅ sirf page update karo
    setArticlList(currentArticles)
  };

  // ✅ Jab page ya articles change ho tabhi list update karo
  // useEffect(() => {
  //   setArticlList(currentArticles);
  // }, [ articles]); // <-- currentArticles ko dependency me mat daalo

  // ✅ Jab articles list update ho to page ko 1 pe reset karo
  useEffect(() => {
    setPage(1);
  }, [articles]);

  return (
    <div
      className="text-white shadow-md flex items-center justify-between rounded-md py-[7px] px-[10px]"
      style={{ background: themeColor }}
    >
      <div>
        {/* Menu Header */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={toggleMenu}
        >
          <span className="text-[15px] font-bold tracking-wide">
            {menuText}
          </span>

          {menuItems?.length > 0 && (
            <button className="md:hidden focus:outline-none transition-transform duration-300">
              {isOpen ? (
                <IoIosArrowUp size={22} className="text-yellow-300" />
              ) : (
                <IoIosArrowDown size={22} className="text-yellow-300" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt text-sm text-gray-200">
        {totalPages > 1 && (
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default function Menu({
  menuText,
  setArticlList,
  menu,
  articles,
  totalArticles,
}) {
  return (
    <div className="w-full">
      <MenuBar
        menuItems={menu}
        menuText={menuText}
        setArticlList={setArticlList}
        articles={articles}
        totalArticles={totalArticles}
      />
    </div>
  );
}
