// src/Home/category/Category.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import RightHome from "../RightHome/RightHome";
import { loadNewsByCategory } from "../../../api";
import { decryptData } from "../../utils/cryptoHelper";
import NoData from "../NoData";
import GameSkeleton from "../LeftHome/game/GameSkeleton";
import { Pagination, Stack } from "@mui/material"; // ✅ MUI Pagination import

export default function Category() {
  const { category, categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 2;
  const catId = decryptData(categoryId);

  // ✅ API Call with retry support
  const loadNewsByCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await loadNewsByCategory(catId);
      setArticles(res?.data?.response || []);
    } catch (err) {
      console.error("Error loading news by category:", err);
      setError("खबरें लोड करने में दिक्कत आई।");
    } finally {
      setLoading(false);
    }
  }, [catId]);

  useEffect(() => {
    setCurrentPage(1);
    loadNewsByCategories();
  }, [categoryId, loadNewsByCategories]);

  // ✅ Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-[45px] my-2 xl:mx-[149px] lg:mx-2 mx-2">
        {/* Left Section */}
        <div className="w-full xl:w-[760px]">
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
          ) : articles.length === 0 ? (
            <NoData />
          ) : (
            <>
              <h1 className="text-2xl font-bold my-3 capitalize">{category}</h1>

              <NewsFeed newsCard={currentArticles} />

              {/* ✅ MUI Pagination */}
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
                          color: "#374151", // unselected text
                          backgroundColor: "#d1d5db80", // gray bg
                          borderRadius: "8px",
                          border: "1px solid #fff",
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                          backgroundColor: "#0f3493", // active bg
                          color: "#fff", // active text
                          fontWeight: "bold",
                        },
                        "& .MuiPaginationItem-root:hover": {
                          backgroundColor: "#9ca3af",
                          color: "black",
                        },
                      }}
                    />
                  </Stack>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="w-[335px] xl:w-[335px] lg:w-[295px] lg:flex flex-1 items-center justify-center mx-auto">
          <RightHome />
        </div>
      </div>
    </div>
  );
}
