// import { useEffect, useState } from "react";
// import NewsFeed from "../readNews/newsfeed/NewsFeed";
// import { articlesCard } from "../search/news";
// import { useLocation, useParams } from "react-router-dom";
// import RightHome from "../RightHome/RightHome";
// import { loadNewsBySubCategory } from "../../../api";
// export default function Subcategory() {
//   const [articles, setArticles] = useState([]);
//   const location = useLocation();
//   const { subcategory, subCategoryId } = useParams();
//   //  get Subcategory and SubcategoryId
//   // find last url
//   const lastUrl = location.pathname.split("/").pop();
//   // filter articles by category
//   useEffect(() => {
//     const normalizedUrl = lastUrl.replace(/-/g, " ").toLowerCase(); // Convert 'madhya-pradesh' to 'madhya pradesh'
//     // const filteredArticles = articlesCard.filter(
//     //   (article) => article.location.toLowerCase().includes(normalizedUrl) // Match location
//     // );
//     const filteredArticles = articlesCard.filter((article) =>
//       Object.values(article).some((value) =>
//         String(value).toLowerCase().includes(normalizedUrl.toLowerCase())
//       )
//     );
//     setArticles(filteredArticles);
//   }, [lastUrl]);

//   const loadNewsByCategories = async (subCategoryId) => {
//     try {
//       const res = await loadNewsBySubCategory(subCategoryId);
//       console.log(res);
//     } catch (error) {
//       console.error("Error loading news by subcategory:", error);
//     }
//   };

//   useEffect(() => {
//     if (subCategoryId) {
//       loadNewsByCategories(subCategoryId);
//     }
//   }, [subCategoryId]);

//   return (
//     <div>
//       <div>
//         <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 md:mx-14 sm:mx-8 mx-2 ">
//           {/* Left Section */}
//           <div className="w-full lg:w-8/12">
//             <div className="w-full">
//               <h1 className="text-2xl font-bold my-3 capitalize">
//                 {subcategory}
//               </h1>
//               <NewsFeed newsCard={articles} />
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="w-full  lg:w-4/12">
//             {/* <Country/> */}
//             <RightHome />

//             {/* <LiveCricket/> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import { useLocation, useParams } from "react-router-dom";
import RightHome from "../RightHome/RightHome";
import { loadNewsBySubCategory } from "../../../api";

export default function Subcategory() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { subcategory, subCategoryId } = useParams();

  // Extract and normalize last URL segment (e.g., madhya-pradesh → madhya pradesh)
  const lastUrl = location.pathname.split("/").pop();
  const normalizedUrl = lastUrl.replace(/-/g, " ").toLowerCase();

  const loadNewsByCategories = async () => {
    try {
      setLoading(true);
      const res = await loadNewsBySubCategory(subCategoryId);
// console.log(res)
      const fetchedArticles = res?.data?.response || [];
      // Optional: filter articles if needed
      const filteredArticles = fetchedArticles.filter((article) =>
        Object.values(article).some((value) =>
          String(value).toLowerCase().includes(normalizedUrl)
        )
      );
      setArticles(res.data.response);
    } catch (err) {
      console.log("Error loading news by subcategory:", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subCategoryId) {
      loadNewsByCategories();
    }
  }, [subCategoryId]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 md:mx-14 sm:mx-8 mx-2">
        {/* Left Section */}
        <div className="w-full lg:w-8/12">
          <div className="w-full">
            <h1 className="text-2xl font-bold my-3 capitalize">{subcategory}</h1>

            {/* Loader */}
            {loading ? (
              <p className="text-center text-blue-500 font-semibold">Loading news...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : articles.length > 0 ? (
              <NewsFeed newsCard={articles} />
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
    </div>
  );
}
