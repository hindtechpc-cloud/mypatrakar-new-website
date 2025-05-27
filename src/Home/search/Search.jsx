// import { useContext, useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import DropdownFilters from "./DropdownFilters";
// import TagsScroll from "./TagsScroll";
// import NewsFeed from "../readNews/newsfeed/NewsFeed";
// import { articlesCard } from "./news";
// import HeaderAd from "../../TopBar/HeaderAd";
// import { WebThemeContext } from "../../context/ThemeContext";
// import { GetNewsCategories, GetNewsSubcategories, NewsSotBy } from "../../../api";

// export default function Search() {
//   const [articles, setArticles] = useState(articlesCard);
//   const [category, setCategory] = useState("");
//   const [error, setError] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [location, setLocation] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const { webTheme } = useContext(WebThemeContext);

//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const applyFilters = () => {
//     let filteredArticles = articlesCard;

//     // Apply searchTerm filter
//     if (searchTerm) {
//       filteredArticles = filteredArticles.filter((article) =>
//         article.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply category filter
//     if (category) {
//       filteredArticles = filteredArticles.filter(
//         (article) => article.category.toLowerCase() === category.toLowerCase()
//       );
//     }

//     // Apply subcategory filter
//     if (subcategory) {
//       filteredArticles = filteredArticles.filter(
//         (article) =>
//           article.subcategory.toLowerCase() === subcategory.toLowerCase()
//       );
//     }

//     // Apply location filter
//     if (location) {
//       filteredArticles = filteredArticles.filter(
//         (article) => article.location.toLowerCase() === location.toLowerCase()
//       );
//     }

//     // Apply sortBy filter (Assuming 'sortBy' is based on article properties like 'date' or 'popularity')
//     if (sortBy) {
//       filteredArticles = filteredArticles.sort((a, b) => {
//         if (sortBy === "date") {
//           return new Date(b.date) - new Date(a.date); // Sort by date descending
//         } else if (sortBy === "popularity") {
//           return b.popularity - a.popularity; // Sort by popularity descending
//         }
//         return 0;
//       });
//     }

//     setArticles(filteredArticles);
//   };

//   // Run the filtering every time one of the filters or search term changes
//   useEffect(() => {
//     applyFilters();
//   }, [searchTerm, category, subcategory, location, sortBy]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchTerm === "") {
//       setError("Please Write Your Query");
//     } else {
//       setError("");
//       applyFilters(); // Apply filters when submitting
//     }
//   };

//   const loadNewsCategory = async () => {
//     const res = await GetNewsCategories("MYAWR241227001");
//     console.log(res);
//   };
//   useEffect(() => {
//     loadNewsCategory();
//   });

//   const loadSubcategories = async (category) => {
//     const res = await GetNewsSubcategories("MYAWR241227001", category);
//     console.log(res);
//   };
//   useEffect(() => {
//     if (category) {
//       loadSubcategories(category);
//     }
//   }, [category]);

//   const loadNewsSortBy=async()=>{
//     const res=await NewsSotBy("MYAWR241227001",sortBy);
//     console.log(res);
//   }
//   useEffect(() => {
//     if (sortBy) {
//       loadNewsSortBy();
//     }
//   }, [sortBy]);
//   return (
//     <div className="mt-1">
//       {/* <div className=" flex items-center justify-center mx-auto">
//         {" "}
//         <HeaderAd className="my-4 flex justify-center items-center bg-gray-300 md:w-5/6 w-full sm:mx-0 mx-2 rounded" />
//       </div> */}
//       <div
//         className="py-3"
//         style={{
//           backgroundColor:
//             webTheme["bg-color"] === "#e60000"
//               ? "#b91c1c"
//               : webTheme["bg-color"],
//         }}
//       >
//         <form
//           className=" py-2 w-full"
//           onSubmit={handleSubmit}
//           style={{
//             backgroundColor:
//               webTheme["bg-color"] === "#e60000"
//                 ? "#b91c1c"
//                 : webTheme["bg-color"],
//           }}
//         >
//           <div
//             className={`${
//               error !== "" || error !== null ? "border " : "border-none"
//             } flex items-center justify-start gap-2 px-3 py-1 bg-white w-1/3 mx-auto rounded-lg`}
//           >
//             <button className="border-none p-2 ">
//               <FaSearch className=" text-red-500 font-bold" />
//             </button>

//             <input
//               type="text"
//               name="search"
//               className={`border-none outline-none focus:ring-0 focus:outline-none w-full`}
//               placeholder="Search..."
//               onChange={handleChange}
//             />
//           </div>{" "}
//         </form>

//         <DropdownFilters
//           setCategory={setCategory}
//           setSubcategory={setSubcategory}
//           setSortBy={setSortBy}
//           setLocation={setLocation}
//         />
//         {/* <TagsScroll /> */}

//         <div className="flex items-center justify-center gap-10 my-4 md:mx-14 sm:mx-8 mx-2">
//           <button
//             onClick={handleSubmit}
//             className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 w-1/4"
//           >
//             Filter
//           </button>

//           <button
//             onClick={() => {
//               setSearchTerm("");
//               setCategory("");
//               setSubcategory("");
//               setLocation("");
//               setSortBy("");
//               setArticles(articlesCard);
//             }}
//             className="flex items-center justify-center  w-1/4 gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
//           >
//             Clear
//           </button>
//         </div>
//       </div>

//       <div className=" flex items-center justify-center mx-auto">
//         {" "}
//         <HeaderAd className="my-4 flex justify-center items-center bg-gray-300 sm:w-[728px] sm:h-[90px] w-[320px] h-[100px] sm:mx-0 mx-2 rounded" />
//       </div>
//       <div className="flex items-center flex-wrap justify-center gap-5 my-2 md:mx-14 sm:mx-8 mx-2">
//         <NewsFeed newsCard={articles} />
//       </div>
//     </div>
//   );
// }

import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DropdownFilters from "./DropdownFilters";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import HeaderAd from "../../TopBar/HeaderAd";
import { WebThemeContext } from "../../context/ThemeContext";
import {
  GetNewsCategories,
  GetNewsSubcategories,
  NewsSortBy,
} from "../../../api";

export default function Search() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { webTheme } = useContext(WebThemeContext);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const applyFilters = () => {
    let filteredArticles = [...articles]; // Clone to avoid direct mutation

    if (searchTerm) {
      filteredArticles = filteredArticles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filteredArticles = filteredArticles.filter(
        (article) => article.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (subcategories) {
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.subcategory?.toLowerCase() === subcategories.toLowerCase()
      );
    }

    if (location) {
      filteredArticles = filteredArticles.filter(
        (article) => article.location?.toLowerCase() === location.toLowerCase()
      );
    }

    if (sortBy) {
      filteredArticles.sort((a, b) => {
        if (sortBy === "date") {
          return new Date(b.date) - new Date(a.date);
        } else if (sortBy === "popularity") {
          return b.popularity - a.popularity;
        }
        return 0;
      });
    }

    setArticles(filteredArticles);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, category, subcategories, location, sortBy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setError("Please Write Your Query");
    } else {
      setError("");
      applyFilters();
    }
  };

  useEffect(() => {
    const loadNewsCategory = async () => {
      try {
        const res = await GetNewsCategories("MYAWR241227001");
        // console.log(res.data.response);
        if (res) {
          setCategories(res.data.response);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadNewsCategory();
  }, []);

  useEffect(() => {
    const loadSubcategories = async () => {
      if (!category) {
        setSubcategories([]);
        return;
      }

      try {
        const res = await GetNewsSubcategories("MYAWR241227001", category);
        // console.log(res.data.response);
        setSubcategories(res.data.response);
        // if (res) {
        //   console.log("Subcategories:", res.data.response);
        // }
      } catch (error) {
        console.error("Failed to load subcategories:", error);
      }
    };
    loadSubcategories();
  }, [category]);

  useEffect(() => {
    const loadNewsSortBy = async () => {
      try {
        const res = await NewsSortBy("MYAWR241227001", sortBy,subcategory);
        // console.log(res.data.response)
        setArticles(res.data.response);
      } catch (error) {
        console.error("Failed to load sorted news:", error);
      }
    };
    if (sortBy) {
      loadNewsSortBy();
    }
  }, [sortBy]);

  return (
    <div className="mt-1">
      <div
        className="py-3"
        style={{
          backgroundColor:
            webTheme["bg-color"] === "#e60000"
              ? "#b91c1c"
              : webTheme["bg-color"],
        }}
      >
        <form
          className="py-2 w-full"
          onSubmit={handleSubmit}
          style={{
            backgroundColor:
              webTheme["bg-color"] === "#e60000"
                ? "#b91c1c"
                : webTheme["bg-color"],
          }}
        >
          <div
            className={`${
              error ? "border border-red-500" : "border-none"
            } flex items-center justify-start gap-2 px-3 py-1 bg-white w-1/3 mx-auto rounded-lg`}
          >
            <button type="submit" className="border-none p-2">
              <FaSearch className="text-red-500 font-bold" />
            </button>

            <input
              type="text"
              name="search"
              className="border-none outline-none focus:ring-0 focus:outline-none w-full"
              placeholder="Search..."
              onChange={handleChange}
              value={searchTerm}
            />
          </div>
          {error && (
            <p className="text-red-600 text-center mt-1 font-semibold">
              {error}
            </p>
          )}
        </form>

        <DropdownFilters
          categories={categories}
          setCategory={setCategory}
          subcategory={subcategory}
          setSubcategory={setSubcategory}
          subcategories={subcategories}
          setSortBy={setSortBy}
          setLocation={setLocation}
        />

        <div className="flex items-center justify-center gap-10 my-4 md:mx-14 sm:mx-8 mx-2">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 w-1/4"
          >
            Filter
          </button>

          <button
            onClick={() => {
              setSearchTerm("");
              setCategory("");
              setSubcategories("");
              setLocation("");
              setSortBy("");
              setArticles([]);
              setError("");
            }}
            className="flex items-center justify-center w-1/4 gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mx-auto">
        <HeaderAd className="my-4 flex justify-center items-center bg-gray-300 sm:w-[728px] sm:h-[90px] w-[320px] h-[100px] sm:mx-0 mx-2 rounded" />
      </div>

      <div className="flex items-center flex-wrap justify-center gap-5 my-2 md:mx-14 sm:mx-8 mx-2">
        <NewsFeed newsCard={articles} />
      </div>
    </div>
  );
}
