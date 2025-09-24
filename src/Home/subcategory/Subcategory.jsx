// src/Home/subcategory/Subcategory.jsx
import React, { useEffect, useState } from "react";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import { useLocation, useParams } from "react-router-dom";
import RightHome from "../RightHome/RightHome";
import { loadNewsBySubCategory } from "../../../api";
import { decryptData } from "../../utils/cryptoHelper";
import Loader from "../../utils/Loader";
import NoData from "../NoData";
import GameSkeleton from "../LeftHome/game/GameSkeleton";

export default function Subcategory() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      setCurrentPage(1); // Reset page on change
      loadNewsByCategories();
    }
  }, [subCategoryId]);

  // Pagination logic
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-[45px] my-2 xl:mx-[149px] lg:mx-2  mx-2">
      {/* Left Section */}
      <div className="w-full xl:w-[760px]">
        <div className="w-full">
          <h1 className="text-2xl font-bold my-3 capitalize">{subcategory}</h1>

          {loading ? (
          <GameSkeleton/>
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

              {/* Pagination Buttons */}
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
          ) : (
            <NoData />
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[335px]  xl:w-[335px] lg:w-[295px]  lg:flex flex-1 items-center justify-center mx-auto">
        <RightHome />
      </div>
    </div>
  );
}
