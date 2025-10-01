// src/Home/subcategory/Subcategory.jsx
import React, { useContext, useEffect, useState } from "react";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import { useLocation, useParams } from "react-router-dom";
import RightHome from "../RightHome/RightHome";
import { loadNewsBySubCategory } from "../../../api";
import { decryptData } from "../../utils/cryptoHelper";
import Loader from "../../utils/Loader";
import NoData from "../NoData";
import GameSkeleton from "../LeftHome/game/GameSkeleton";
import { Pagination, Stack } from "@mui/material"; // <-- MUI Pagination Import
import { WebThemeContext } from "../../context/ThemeContext";


export default function Subcategory() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {webTheme}=useContext(WebThemeContext);

  const itemsPerPage = 2;
const theme=webTheme["bg-color"];
  const location = useLocation();
  const { subcategory, subCategoryId } = useParams();

  const loadNewsByCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!subCategoryId) throw new Error("Invalid Subcategory ID");

      const decryptedId = await decryptData(subCategoryId);
      if (!decryptedId) throw new Error("Failed to decrypt subCategoryId");

      const res = await loadNewsBySubCategory(decryptedId);
      const fetchedArticles = res?.data?.response || [];

      setArticles(fetchedArticles);
    } catch (err) {
      console.error("Error loading news by subcategory:", err);
      setError("Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subCategoryId) {
      setCurrentPage(1); // Reset page on subcategory change
      loadNewsByCategories();
    }
  }, [subCategoryId]);

  // Pagination logic
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-[45px] my-2 xl:mx-[149px] lg:mx-2 mx-2">
      {/* Left Section */}
      <div className="w-full xl:w-[760px]">
        <div className="w-full">
          <h1 className="text-2xl font-bold my-3 capitalize">{subcategory}</h1>

          {loading ? (
            <GameSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={loadNewsByCategories}
                className="px-5 py-2 rounded-md bg-red-600 text-white shadow-md hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          ) : currentArticles.length > 0 ? (
            <>
              <NewsFeed newsCard={currentArticles} />

              {/* MUI Pagination */}
              {articles.length > itemsPerPage && (
                <div className="flex justify-end mt-6">
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(event, value) => setCurrentPage(value)}
                      shape="rounded"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "#374151", // text color for unselected
                          backgroundColor: "#d1d5db80", // gray bg
                          borderRadius: "8px",
                          border: "1px solid #fff",
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                          backgroundColor: theme||"#0f3493", // white bg for selected
                          color: "#fff", // black text
                          fontWeight: "bold",
                        },
                        "& .MuiPaginationItem-root:hover": {
                          backgroundColor: "#9ca3af", // darker gray on hover
                          color: "black",
                        },
                      }}
                    />
                  </Stack>
                </div>
              )}
            </>
          ) : (
            <NoData />
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[335px] xl:w-[335px] lg:w-[295px] lg:flex flex-1 items-center justify-center mx-auto">
        <RightHome />
      </div>
    </div>
  );
}
