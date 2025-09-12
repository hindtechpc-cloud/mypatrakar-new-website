// // src/Home/subcategory/Subcategory.jsx
// import React, { useEffect, useState } from "react";
// import NewsFeed from "../readNews/newsfeed/NewsFeed";
// import { useLocation, useParams } from "react-router-dom";
// import RightHome from "../RightHome/RightHome";
// import { loadNewsBySubCategory } from "../../../api";
// import { decryptData } from "../../utils/cryptoHelper";

// export default function Subcategory() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const location = useLocation();
//   const { subcategory, subCategoryId } = useParams();

//   const lastUrl = location.pathname.split("/").pop();
//   const normalizedUrl = lastUrl.replace(/-/g, " ").toLowerCase();

//   const loadNewsByCategories = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       if (!subCategoryId) {
//         throw new Error("Invalid Subcategory ID");
//       }

//       const decryptedId = decryptData(subCategoryId);
//       console.log(decryptedId);

//       if (!decryptedId) {
//         throw new Error("Failed to decrypt subCategoryId");
//       }

//       const res = await loadNewsBySubCategory(decryptedId);
// // console.log(res)
//       const fetchedArticles = res?.data?.response || [];

//       const filteredArticles = fetchedArticles.filter((article) =>
//         Object.values(article).some((value) =>
//           String(value).toLowerCase().includes(normalizedUrl)
//         )
//       );

//       setArticles(res?.data?.response || []);
//     } catch (err) {
//       console.error("Error loading news by subcategory:", err);
//       setError("Failed to load news. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (subCategoryId) {
//       loadNewsByCategories();
//     }
//   }, [subCategoryId]);

//   return (
//     <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 md:mx-14 sm:mx-8 mx-2">
//       {/* Left Section */}
//       <div className="w-full lg:w-8/12">
//         <div className="w-full">
//           <h1 className="text-2xl font-bold my-3 capitalize">{subcategory}</h1>

//           {loading ? (
//             <p className="text-center text-blue-500 font-semibold">Loading news...</p>
//           ) : error ? (
//             <p className="text-center text-red-500">{error}</p>
//           ) : articles.length > 0 ? (
//             <NewsFeed newsCard={articles} />
//           ) : (
//             <p className="text-center text-gray-500">No articles found.</p>
//           )}
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="w-full lg:w-4/12">
//         <RightHome />
//       </div>
//     </div>
//   );
// }




// src/Home/subcategory/Subcategory.jsx
import React, { useEffect, useState } from "react";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import { useLocation, useParams } from "react-router-dom";
import RightHome from "../RightHome/RightHome";
import { loadNewsBySubCategory } from "../../../api";
import { decryptData } from "../../utils/cryptoHelper";
import Loader from "../../utils/Loader";

export default function Subcategory() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const location = useLocation();
  const { subcategory, subCategoryId } = useParams();

  const lastUrl = location.pathname.split("/").pop();
  const normalizedUrl = lastUrl.replace(/-/g, " ").toLowerCase();

  const loadNewsByCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!subCategoryId) throw new Error("Invalid Subcategory ID");

      const decryptedId = await decryptData(subCategoryId);
      if (!decryptedId) throw new Error("Failed to decrypt subCategoryId");

      const res = await loadNewsBySubCategory(decryptedId);
      console.log(res)
      const fetchedArticles = res?.data?.response||[];

      // You can apply filtering if needed
      // const filteredArticles = fetchedArticles.filter((article) =>
      //   Object.values(article).some((value) =>
      //     String(value).toLowerCase().includes(normalizedUrl)
      //   )
      // );

      setArticles(res?.data?.response);
    } catch (err) {
      console.error("Error loading news by subcategory:", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subCategoryId) {
      setCurrentPage(1); // Reset to first page on subcategory change
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
    <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 md:mx-14 sm:mx-8 mx-2">
      {/* Left Section */}
      <div className="w-full lg:w-8/12">
        <div className="w-full">
          <h1 className="text-2xl font-bold my-3 capitalize">{subcategory}</h1>

          {loading ? (
           <Loader></Loader>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
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
            <p className="text-center text-gray-500">No articles found.</p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-4/12">
        <RightHome />
      </div>
    </div>
  );
}
