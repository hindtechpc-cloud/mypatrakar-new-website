import { useState, useEffect } from "react";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import { GetTrending } from "../../../../api";
import { encryptData } from "../../../utils/cryptoHelper";

export default function OwnState() {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const navigate = useNavigate();

  const handleNewsContent = (article) => {
    console.log(article)
    navigate(`/read-news/${article.title}/${encryptData(article.roadmap_id)}`);
  };

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setloading(true);
        const response = await GetTrending();
        console.log(response);
        const trendingArticles = response?.data?.response;

        const formattedArticles = trendingArticles.map((item) => ({
          title: item.roadmap,
          date: item.date,
          roadmap_id: item.roadmap_id,
        }));

        setArticles(formattedArticles);
      } catch (err) {
        console.error(err);
        setError("Failed to load trending news");
      } finally {
        setloading(false);
      }
    };

    loadTrending();
  }, []);

  return (
    <div className="my-2 mt-5 font-sans md:max-w-sm w-[350px] mx-auto py-2">
     {articles.length >= 0 && <Header text={"उत्तर प्रदेश"} />}
   {loading?<p>Loading...</p>:   <div className="flex items-start justify-center md:justify-start md:max-w-sm w-[350px] mx-auto py-2">
        <div className="flex flex-col items-start relative">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex items-center relative"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {index !== 0 && (
                <div
                  className={`absolute -top-1/2 left-[3.5px] w-[1px] h-full transition bg-gray-300`}
                ></div>
              )}

              <div
                className={`w-2 h-2 rounded-full transition ${
                  hoverIndex === index
                    ? "bg-yellow-500 z-20"
                    : "bg-gray-300 z-20"
                }`}
              ></div>

              <div
                className={`w-full max-w-3xl px-2 py-2 ml-1 transition ${
                  hoverIndex === index ? "bg-gray-100" : ""
                }`}
              >
                <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                <h3
                  className={`text-xs font-semibold transition duration-300 cursor-pointer ${
                    hoverIndex === index ? "text-yellow-500" : "text-gray-800"
                  }`}
                  onClick={() => handleNewsContent(article)}
                >
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}
