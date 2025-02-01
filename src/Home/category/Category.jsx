import { useEffect, useState } from "react";
import NewsFeed from "../readNews/newsfeed/NewsFeed";
import { articlesCard } from "../search/news";
import { useLocation } from "react-router-dom";
import RightHome from "../RightHome/RightHome";
export default function Category() {
  const [articles, setArticles] = useState(articlesCard);
  const location = useLocation();
  // find last url
  const lastUrl = location.pathname.split("/").pop();
  // filter articles by category
  useEffect(() => {
    const normalizedUrl = lastUrl.replace(/-/g, " ").toLowerCase(); // Convert 'madhya-pradesh' to 'madhya pradesh'
   
    const filteredArticles = articlesCard.filter((article) =>
      Object.values(article).some((value) =>
        String(value).toLowerCase().includes(normalizedUrl.toLowerCase())
      )
    );
    setArticles(filteredArticles);
  }, [lastUrl]);

  return (
    <div>
      <div>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 md:mx-14 sm:mx-8 mx-2 ">
          {/* Left Section */}
          <div className="w-full lg:w-8/12">
            <div className="w-full">
              <h1 className="text-2xl font-bold my-3 capitalize">{lastUrl}</h1>
              <NewsFeed newsCard={articles} />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full  lg:w-4/12">
            {/* <Country/> */}

            <RightHome />
            {/* <LiveCricket/> */}
          </div>
        </div>
      </div>
    </div>
  );
}
