import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DropdownFilters from "./DropdownFilters";
import TagsScroll from "./TagsScroll";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import { articlesCard } from "./news";
import HeaderAd from "../../TopBar/HeaderAd";

export default function Search() {
  const [articles, setArticles] = useState(articlesCard);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const applyFilters = () => {
    let filteredArticles = articlesCard;

    // Apply searchTerm filter
    if (searchTerm) {
      filteredArticles = filteredArticles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      filteredArticles = filteredArticles.filter(
        (article) => article.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply subcategory filter
    if (subcategory) {
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.subcategory.toLowerCase() === subcategory.toLowerCase()
      );
    }

    // Apply location filter
    if (location) {
      filteredArticles = filteredArticles.filter(
        (article) => article.location.toLowerCase() === location.toLowerCase()
      );
    }

    // Apply sortBy filter (Assuming 'sortBy' is based on article properties like 'date' or 'popularity')
    if (sortBy) {
      filteredArticles = filteredArticles.sort((a, b) => {
        if (sortBy === "date") {
          return new Date(b.date) - new Date(a.date); // Sort by date descending
        } else if (sortBy === "popularity") {
          return b.popularity - a.popularity; // Sort by popularity descending
        }
        return 0;
      });
    }

    setArticles(filteredArticles);
  };

  // Run the filtering every time one of the filters or search term changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, category, subcategory, location, sortBy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      setError("Please Write Your Query");
    } else {
      setError("");
      applyFilters(); // Apply filters when submitting
    }
  };

  return (
    <div className="">
      {/* <div className=" flex items-center justify-center mx-auto">
        {" "}
        <HeaderAd className="my-4 flex justify-center items-center bg-gray-300 md:w-5/6 w-full sm:mx-0 mx-2 rounded" />
      </div> */}
      <form className="bg-red-600 py-2 w-full" onSubmit={handleSubmit}>
        <div
          className={`${
            error !== "" || error !== null
              ? "border border-red-900"
              : "border-none"
          } flex items-center justify-start gap-2 px-3 py-1 bg-white w-1/3 mx-auto rounded-lg`}
        >
          <button className="border-none p-2 ">
            <FaSearch className=" text-red-500 font-bold" />
          </button>

          <input
            type="text"
            name="search"
            className={`border-none outline-none focus:ring-0 focus:outline-none w-full`}
            placeholder="Search..."
            onChange={handleChange}
          />
        </div>{" "}
      </form>

      <DropdownFilters
        setCategory={setCategory}
        setSubcategory={setSubcategory}
        setSortBy={setSortBy}
        setLocation={setLocation}
      />
      <TagsScroll />

      <div className="flex items-center justify-center gap-10 my-2 md:mx-14 sm:mx-8 mx-2">
        <button
          className="bg-blue-600 text-white py-2 w-1/4 px-4 rounded-lg"
          onClick={handleSubmit}
        >
          Filter
        </button>
        <button
          className="bg-red-600 text-white py-2 w-1/4 px-4 rounded-lg"
          onClick={() => {
            setSearchTerm("");
            setCategory("");
            setSubcategory("");
            setLocation("");
            setSortBy("");
            setArticles(articlesCard); // Reset to all articles
          }}
        >
          Clear
        </button>
      </div>
     

         <div className=" flex items-center justify-center mx-auto">
        {" "}
        <HeaderAd className="my-4 flex justify-center items-center bg-gray-300 md:w-5/6 w-full sm:mx-0 mx-2 rounded" />
      </div>
      <div className="flex items-center flex-wrap justify-center gap-5 my-2 md:mx-14 sm:mx-8 mx-2">
        <NewsFeed newsCard={articles} />
      </div>
    </div>
  );
}
