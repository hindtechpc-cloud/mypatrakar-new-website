import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";
import logo from "../../../assets/Ellipse.svg";
import { useContext, useRef } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { shorts } from "./short.js";
import { useNavigate } from "react-router-dom";

const ShortsPages = () => {
  const { setNews } = useContext(NewsContext);
  const navigate = useNavigate();

  const handleNewsContent = (news) => {
    setNews(news);
    navigate(`/read-news/${news.title}`);
  };

  // Use useRef to reference the scroll container
  const scrollContainer = useRef(null);

  const handleScrollDown = () => {
    // Scroll down by 500px
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ top: 550, behavior: "smooth" });
    }
  };

  const handleScrollUp = () => {
    // Scroll up by 500px
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ top: -550, behavior: "smooth" });
    }
  };

  return (
    <div className=" fixed w-full flex gap-3 items-center justify-center mt-12">
      <div
        className="overflow-y-auto h-[530px] flex flex-col gap-10 hide-scroll py-5"
        ref={scrollContainer} // Attach the ref to the scroll container
      >
        {shorts?.map((short, index) => {
          return (
            <div
              key={index}
              className="  bg-white rounded-3xl shadow-md shadow-gray-500 pb-3 relative  "
            >
              <div className="  bg-white rounded-2xl shadow-md shadow-gray-500 pb-3 relative  ">
                <div
                  key={index}
                  className="w-[330px]  bg-white rounded-xl   relative border shadow-lg shadow-gray-400"
                >
                  <div className="relative rounded-md">
                    <img
                      src={logo || "https://picsum.photos/1070/580"}
                      alt="Coldplay"
                      className="w-12 h-12 rounded-full object-cover absolute "
                    />

                    <img
                      src={short.urlToImage || "https://picsum.photos/1070/580"}
                      alt="PM Modi"
                      className="w-full h-48 object-cover rounded-t-md"
                    />
                    <span className="flex items-end justify-end -mt-10 p-2 text-white font-bold text-xl">
                      {`${index + 1}/${shorts.length}`}
                    </span>
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
                          className="bg-red-600 text-white text-sm font-normal py-1 px-4 rounded-full mt-4"
                          onClick={() => handleNewsContent(short)}
                        >
                          Read Full Article
                        </button>
                      </div>
                      <div className="bottom-4">
                        <button className="text-gray-500 hover:text-gray-600 font-thin">
                          <FaShareAlt size={20} className="font-thin" />
                        </button>
                      </div>
                    </div>
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
