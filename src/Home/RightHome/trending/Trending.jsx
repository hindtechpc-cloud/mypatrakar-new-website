import { useContext, useState, useEffect } from "react";
import Header from "../shared/Header";
import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
import { GetTrending } from "../../../../api";
import { encryptData } from "../../../utils/cryptoHelper";

// const articles = [
//   {
//     title:
//       "राजनीति से जुड़ी युवाओं की आस, राष्ट्रीय युवा संसद में अपनी भागीदारी पर जाहिर की उम्मीदें",
//     date: "March 6, 2024",
//     urlToImage: "https://picsum.photos/200/200",
//   },
//   {
//     title:
//       "कौन है वो कांग्रेस नेता जिसने 'खुद को ही मान लिया कानून...? अब सुप्रीम कोर्ट ने की बड़ी टिप्पणी",
//     date: "March 6, 2024",
//     urlToImage: "https://picsum.photos/200/500",
//   },
//   {
//     title:
//       "महिला रैली में पीएम मोदी बोले, “भाज़पा ने नारी शक्ति को बनाया विकासशील भारत की शक्ति”",
//     date: "March 6, 2024",
//     urlToImage: "https://picsum.photos/200/800",
//   },
//   {
//     title:
//       "आखिर अचानक क्यों बंद हो गया था Facebook और Instagram! META ने दिया ये जवाब",
//     date: "March 6, 2024",

//     urlToImage: "https://picsum.photos/200/700",
//   },
// ];

const Trending = () => {
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null); // State to track the hovered index
  const { setNews } = useContext(NewsContext);
  const navigate = useNavigate();

  const handleNewsContent = (news) => {
    setNews(news);
    navigate(`/read-news/${news.title}/${encryptData(news.roadmap_id)}`);
  };

  useEffect(() => {
    const loadTrending = async () => {
      try{
        setLoading(true);
        const response = await GetTrending();
        const trendingArticles = response?.data?.response;

        const formattedArticles = trendingArticles.map(article => ({
          title: article.roadmap,
          date: article.date,
          // urlToImage: article.news_img
        }));
        setArticles(formattedArticles);
      }catch (err) {
        console.error(err);
        setError("Failed to load trending news");
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  return (
    <div className="my-2 mt-5 font-sans  md:max-w-sm  w-[350px] mx-auto py-4">
      {articles.length > 0 && <Header text={"TopNews"} />}
      <div className=" flex items-start justify-center md:justify-start md:max-w-sm w-[300px] mx-auto py-4  ">
        {/* Root Section */}
        <div className="flex flex-col items-start relative">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex items-center  relative"
              onMouseEnter={() => setHoverIndex(index)} // Highlight on hover
              onMouseLeave={() => setHoverIndex(null)} // Reset highlight
            >
              {/* Line (except for the first dot) */}
              {index !== 0 && (
                <div
                  className={`absolute -top-1/2 left-[3.5px]   w-[1px] h-full transition ${
                    hoverIndex === index || hoverIndex === index - 1
                      ? "bg-gray-300"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}

              {/* Dot */}
              <div
                className={`w-2 h-2 rounded-full transition  ${
                  hoverIndex === index
                    ? "bg-yellow-500 z-20"
                    : "bg-gray-300 z-20"
                }`}
              ></div>

              {/* News Section */}
              <div
                className={`  w-full max-w-3xl px-2 py-2 ml-1 transition ${
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
      </div>
    </div>
  );
};

export default Trending;
