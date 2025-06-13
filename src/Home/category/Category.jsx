import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import { articlesCard } from "../search/news";
import RightHome from "../RightHome/RightHome";
import { loadNewsByCategory } from "../../../api";
import { decryptData } from "../../utils/cryptoHelper";

export default function Category() {
  const { category, categoryId } = useParams();
  const [articles, setArticles] = useState([]);

  // Normalize category slug to compare (e.g., "madhya-pradesh" → "madhya pradesh")
  // const normalize = (str) => str?.replace(/-/g, " ").toLowerCase();
const catId=decryptData(categoryId)
  // Load from API
  const loadNewsByCategories = async () => {
    try {
      const res = await loadNewsByCategory(catId);
      console.log(res.data.response)
    setArticles(res.data.response); // Reset articles before fetching
   
    } catch (error) {
      console.log("Error loading news by category:", error);

  };
  }
 
  // Fetch on categoryId change
  useEffect(() => {
    loadNewsByCategories();
  }, [categoryId]);

  return (
    <div className="my-2 md:mx-14 sm:mx-8 mx-2">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
        {/* Left Section */}
        <div className="w-full lg:w-8/12">
          <h1 className="text-2xl font-bold my-3 capitalize">{category}</h1>
          <NewsFeed newsCard={articles} className="gdwe  wef er f ef "/>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-4/12">
          <RightHome />
        </div>
      </div>
    </div>
  );
}
