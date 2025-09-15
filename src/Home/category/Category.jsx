// // src/Home/category/Category.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import NewsFeed from "../readNews/newsfeed/NewsFeed";
// import { articlesCard } from "../search/news";
// import RightHome from "../RightHome/RightHome";
// import { loadNewsByCategory } from "../../../api";
// import { decryptData } from "../../utils/cryptoHelper";

// export default function Category() {
//   const { category, categoryId } = useParams();
//   const [articles, setArticles] = useState([]);

//   // Normalize category slug to compare (e.g., "madhya-pradesh" → "madhya pradesh")
//   // const normalize = (str) => str?.replace(/-/g, " ").toLowerCase();
//   const catId = decryptData(categoryId);
//   // Load from API
//   const loadNewsByCategories = async () => {
//     try {
//       const res = await loadNewsByCategory(catId);
//       console.log(res.data.response);
//       setArticles(res.data.response); // Reset articles before fetching
//     } catch (error) {
//       console.log("Error loading news by category:", error);
//     }
//   };

//   // Fetch on categoryId change
//   useEffect(() => {
//     loadNewsByCategories();
//   }, [categoryId]);

//   return (
//     <div className="my-2 md:mx-14 sm:mx-8 mx-2">
//       <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
//         {/* Left Section */}
//         <div className="w-full lg:w-8/12">
//           <h1 className="text-2xl font-bold my-3 capitalize">{category}</h1>
//           <NewsFeed newsCard={articles} className="gdwe  wef er f ef " />
//         </div>

//         {/* Right Section */}
//         <div className="w-full lg:w-4/12">
//           <RightHome />
//         </div>
//       </div>
//     </div>
//   );
// }

// src/Home/category/Category.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import RightHome from "../RightHome/RightHome";
import { loadNewsByCategory } from "../../../api";
import { decryptData } from "../../utils/cryptoHelper";
import Loader from "../../utils/Loader";
// import { fetchNewsByCategories } from "../../features/categorySlice";
// import { useDispatch, useSelector } from "react-redux";
export default function Category() {
  const { category, categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  // const articles = useSelector((state) => state.articles);
  // const loading = useSelector((state) => state.loading);
  // const error = useSelector((state) => state.error);

  const itemsPerPage = 10;
  const catId = decryptData(categoryId);

  // useEffect(() => {
  //   dispatch(fetchNewsByCategories(catId)); // Pass the category you want
  // }, []);

  // Load all articles once
  const loadNewsByCategories = async () => {
    setLoading(true);
    try {
      const res = await loadNewsByCategory(catId);
      setArticles(res.data.response || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error loading news by category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // reset page on category change
    loadNewsByCategories();
  }, [categoryId]);

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination Controls
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="my-2 md:mx-14 sm:mx-8 mx-2">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-5">
        {/* Left Section */}
        <div className="w-full lg:w-8/12">
          {!loading ? (
            <div className="">
              <h1 className="text-2xl font-bold my-3 capitalize">{category}</h1>

              <NewsFeed newsCard={currentArticles} />

              {/* Pagination Buttons */}
              {articles.length > itemsPerPage && (
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50`}
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-4/12">
          <RightHome />
        </div>
      </div>
    </div>
  );
}


// // src/Home/category/Category.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import NewsFeed from "../readNews/newsfeed/NewsFeed";
// import RightHome from "../RightHome/RightHome";
// import Loader from "../../utils/Loader";
// import { fetchNewsByCategories } from "../../features/categorySlice";
// import { decryptData } from "../../utils/cryptoHelper";

// export default function Category() {
//   const { category, categoryId } = useParams();
//   const dispatch = useDispatch();

//   const { articles, loading, error } = useSelector(
//     (state) => state.news_by_category
//   );
// console.log(articles);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     if (!categoryId) return;

//     const decryptedId = decryptData(categoryId);
//     console.log("Decrypted categoryId:", decryptedId); // ✅ Debug

//     setCurrentPage(1); // Reset to first page
//     dispatch(fetchNewsByCategories(decryptedId));
//   }, [categoryId, dispatch]);

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(articles.length / itemsPerPage);

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   return (
//     <div className="my-2 md:mx-14 sm:mx-8 mx-2">
//       <div className="flex flex-col lg:flex-row items-start justify-center gap-5">
//         {/* Left Section */}
//         <div className="w-full lg:w-8/12">
//           {loading ? (
//             <Loader />
//           ) : error ? (
//             <div className="text-red-600 font-semibold text-center my-6">
//               {error}
//             </div>
//           ) : (
//             <>
//               <h1 className="text-2xl font-bold my-3 capitalize">{category}</h1>

//               {currentArticles.length > 0 ? (
//                 <>
//                   <NewsFeed newsCard={currentArticles} />

//                   {/* Pagination Buttons */}
//                   {articles.length > itemsPerPage && (
//                     <div className="flex items-center justify-between mt-6">
//                       <button
//                         onClick={handlePrevious}
//                         disabled={currentPage === 1}
//                         className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
//                       >
//                         Previous
//                       </button>

//                       <span className="text-sm text-gray-600">
//                         Page {currentPage} of {totalPages}
//                       </span>

//                       <button
//                         onClick={handleNext}
//                         disabled={currentPage === totalPages}
//                         className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="text-center text-gray-500 mt-10">
//                   No news found for this category.
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Right Section */}
//         <div className="w-full lg:w-4/12">
//           <RightHome />
//         </div>
//       </div>
//     </div>
//   );
// }
