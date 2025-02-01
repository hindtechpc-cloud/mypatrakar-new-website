import { useContext, useState } from "react";
import { IoHandLeft } from "react-icons/io5";
import { NewsContext } from "../context/NewsContext";
import { useNavigate } from "react-router-dom";

const PostsListWidget = () => {
  const articles = [
    {
      title:
        "The Privacy Policy and any additional privacy information made available to you, govern the use of your personal",
      date: "March 6, 2024",
      urlToImage:'https://picsum.photos/200/500'
    },
    {
      title:
        "The Privacy Policy and any additional privacy information made available to you, govern the use of your personal",
      date: "March 6, 2024",
      urlToImage:'https://picsum.photos/200/800'

    },
    {
      title:
        "The Privacy Policy and any additional privacy information made available to you, govern the use of your personal",
      date: "March 6, 2024",
      urlToImage:'https://picsum.photos/200/100'

    },
  ];
  const [hoverIndex, setHoverIndex] = useState(null); // State to track the hovered index
  const { setNews } = useContext(NewsContext);
  const navigate = useNavigate();
  const handleNewsContent = (news) => {
    setNews(news);
    navigate(`/readNews/${news.title}`);
  };
  return (
    <div className="w-[300px] ">
      <div className="  flex items-start justify-center   ">
        {/* Root Section */}
        <div className="flex flex-col items-start relative">
          <span className="text-lg text-gray-50 font-sans">#BS_Exclusive</span>
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
                      ? "bg-gray-600"
                      : "bg-gray-600"
                  }`}
                ></div>
              )}

              {/* Dot */}
              <div
                className={`w-2 h-2 rounded-full transition  ${
                  hoverIndex === index
                    ? "bg-yellow-500 z-20"
                    : "bg-gray-600 z-20"
                }`}
              ></div>

              {/* News Section */}
              <div
                className={`  w-full max-w-3xl py-2 ml-2 transition ${
                  hoverIndex === index ? "" : ""
                }`}
              >
                <p className="text-xs text-gray-400 ">{article.date}</p>
                <h3
                  className={`text-xs font-semibold transition duration-300 cursor-pointer ${
                    hoverIndex === index ? "text-yellow-500" : "text-gray-200"
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

export default PostsListWidget;
