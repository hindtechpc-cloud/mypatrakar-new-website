import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";
import logo from "../../../assets/Ellipse.svg";
import { useContext, useRef } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { short } from "./short.js";
import { useNavigate } from "react-router-dom";

const ShortsPages = () => {
  const { setNews } = useContext(NewsContext);
  const navigate = useNavigate();

  const handleNewsContent = (news) => {
    setNews(news);
    navigate(`/readNews/${news.title}`);
  };

  // Use useRef to reference the scroll container
  const scrollContainer = useRef(null);

  const handleScrollDown = () => {
    // Scroll down by 500px
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ top: 500, behavior: "smooth" });
    }
  };

  const handleScrollUp = () => {
    // Scroll up by 500px
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ top: -500, behavior: "smooth" });
    }
  };

  return (
    <div className="flex gap-3 items-center justify-center mt-20">
      <div
        className="overflow-y-auto h-[500px] flex flex-col gap-5 hide-scroll"
        ref={scrollContainer} // Attach the ref to the scroll container
      >
        {short?.map((short, index) => {
          return (
            <div
              key={index}
              className="max-w-sm bg-white rounded-2xl shadow-lg p-4 relative border border-red-50"
            >
              <div className="relative">
                <img
                  src={logo || "https://picsum.photos/1070/580"}
                  alt="Coldplay"
                  className="w-14 h-14 rounded-full object-cover absolute shadow-xl "
                />
                <img
                  src={short.urlToImage || "https://picsum.photos/1070/580"}
                  alt="PM Modi"
                  className="w-full h-48 object-cover rounded"
                />
              </div>
              <div className="p-4">
                <h2 className="font-bold text-lg">{short.title}</h2>
                <p className="text-red-600 text-sm font-semibold">
                  {short.location} | {short.publishedAt}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  {short?.description?.length > 300
                    ? short.description.slice(
                        0,
                        short.description.lastIndexOf(" ", 300)
                      ) + "..."
                    : short.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <button
                      className="bg-red-600 text-white font-bold py-2 px-4 rounded-full mt-4"
                      onClick={() => handleNewsContent(short)}
                    >
                      Read Full Article
                    </button>
                  </div>
                  <div className="bottom-4">
                    <button className="text-gray-600 hover:text-gray-900">
                      <FaShareAlt size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll Up and Down Buttons */}
      <div className=" top-1/3 flex flex-col gap-2 ">
        <button
          className="bg-red-600 p-2 rounded-full text-white"
          onClick={handleScrollUp} // Directly invoke the function here
        >
          <FaArrowUp size={20} />
        </button>
        <button
          className="bg-red-600 p-2 rounded-full text-white"
          onClick={handleScrollDown} // Directly invoke the function here
        >
          <FaArrowDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default ShortsPages;
