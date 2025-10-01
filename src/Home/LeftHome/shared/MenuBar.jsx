
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { WebThemeContext } from "../../../context/ThemeContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { loadNewsBySubCategory } from "../../../../api";
import Subcategories from "./Subcategories";
import { useWebThemeContext } from "../../../context/WebThemeContext";

const MenuBar = ({
  menuText,
  setArticlList,
  menuItems,
  articles = [],
  totalArticles = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { webTheme } = useWebThemeContext();


  // pagination states
  const [page, setPage] = useState(1);
  const articlesPerPage = 5;

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
    setArticlList(currentArticles);
  };

  // ✅ Jab articles list update ho to page ko 1 pe reset karo
  // useEffect(() => {
  //   setPage(1);
  //   // setArticlList(currentArticles);

  // }, []);
  const handleArticlList = async (id) => {
    try {
      const res = await loadNewsBySubCategory(id);
      console.log(res)
      setArticlList(res.data.response);
    } catch (error) {
      console.log(error);
    }
  };
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
        </div>
      </div>

      {/* Pagination */}
      {menuItems.length <= 0 ? (
        <div className="mt text-sm text-gray-200">
          {totalPages > 1 && (
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#374151", // text color for unselected
                    backgroundColor: "#d1d5db80", // gray bg
                    borderRadius: "8px",
                    border: "1px solid #fff",
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#ffffff", // white bg for selected
                    color: "#000000", // black text
                    fontWeight: "bold",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#9ca3af", // darker gray on hover
                    color: "black",
                  },
                }}
              />
            </Stack>
          )}
        </div>
      ) : (
       <div className="md:flex hidden">
        <Subcategories menuItems={menuItems} handleArticlList={handleArticlList} articles={articles} setArticlList={setArticlList}/>
       </div>
      )}
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
