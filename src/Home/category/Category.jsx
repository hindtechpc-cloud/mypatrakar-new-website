// src/Home/category/Category.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import RightHome from "../RightHome/RightHome";
import { loadNewsByCategory } from "../../../api";
import { decryptData } from "../../utils/cryptoHelper";

import NoData from "../NoData";
import GameSkeleton from "../LeftHome/game/GameSkeleton";

export default function Category() {
  const { category, categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;
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

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-[45px] my-2 xl:mx-[149px] lg:mx-2  mx-2">
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

              {/* Pagination */}
              {articles.length > itemsPerPage && (
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="w-full  xl:w-[335px] lg:w-[295px] md:w-1/2 lg:flex flex-1 ">
          <RightHome />
        </div>
      </div>
    </div>
  );
}
