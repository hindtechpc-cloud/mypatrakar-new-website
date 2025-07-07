// import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";
// import logo from "../../../assets/Ellipse.svg";
// import { useContext, useEffect, useState } from "react";
// import { NewsContext } from "../../../context/NewsContext";
// import { useNavigate } from "react-router-dom";
// import { GetShortsNews } from "../../../../api/index.js";
// import HtmlToPlainText from "../../../utils/HtmlToPlainText.jsx";
// import { WebThemeContext } from "../../../context/ThemeContext.jsx";
// import { encryptData } from "../../../utils/cryptoHelper.js";
// import ShortsClap from "./ShortsClap.jsx";
// import { checkAuth } from "../../../utils/checkAuth.js";

// const ShortsPages = () => {
//   const { setNews } = useContext(NewsContext);
//   const { webTheme } = useContext(WebThemeContext);
//   const navigate = useNavigate();
//   const user = checkAuth();

//   const [shorts, setShorts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNewsContent = (news) => {
//     setNews(news);
//     navigate(`/read-news/shorts/${encryptData(news.short_news_id)}`);
//   };

//   const handleScrollDown = () => {
//     if (currentIndex < shorts.length - 1) {
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   const handleScrollUp = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   const loadShorts = async () => {
//     try {
//       const res = await GetShortsNews("MYAWR241227001");
//       if (res) {
//         setShorts(res.data.response.news);
//       }
//     } catch (error) {
//       console.error("Error fetching shorts:", error);
//     }
//   };

//   useEffect(() => {
//     loadShorts();
//   }, []);

//   const currentShort = shorts[currentIndex];

//   return (
//     <div className="fixed w-full flex gap-3 items-center justify-center mt-12">
//       <div className="h-[530px] w-[350px] flex items-center justify-center">
//         {currentShort && (
//           <div className="bg-white h-[530px] rounded-2xl shadow-md shadow-gray-500 pb-3 relative w-full border flex flex-col">
//             {/* Header Section */}
//             <div className="relative rounded-md h-48 overflow-hidden">
//               <img
//                 src={webTheme["web-logo"]}
//                 alt="Source"
//                 className="w-12 h-12 rounded-full object-cover absolute m-2 z-10"
//               />
//               <img
//                 src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${currentShort?.news_img}`}
//                 alt={currentShort.news_title}
//                 className="w-full h-full object-cover rounded-t-md"
//               />
//               <span className="flex flex-col items-end justify-end -mt-10 p-2 font-bold text-xl">
//                 <ShortsClap
//                   news_id={currentShort.short_news_id}
//                   user_id={user?.user_id}
//                 />
//               </span>
//             </div>

//             {/* Content Section */}
//             <div className="p-4 flex-1 overflow-auto">
//               <h2 className="font-bold text-lg">{currentShort.news_title}</h2>
//               <p className="text-red-600 text-sm font-semibold">
//                 {currentShort.location} {currentShort.publishedAt}
//               </p>
//               <p className="text-gray-600 text-sm mb-2">
//                 {currentShort.news_des?.length > 300 ? (
//                   (
//                     <HtmlToPlainText htmlContent={currentShort.news_des} />
//                   ).slice(
//                     0,
//                     (
//                       <HtmlToPlainText htmlContent={currentShort.news_des} />
//                     ).lastIndexOf(" ", 300)
//                   ) + "..."
//                 ) : (
//                   <HtmlToPlainText htmlContent={currentShort.news_des} />
//                 )}
//               </p>

//               <div className="flex items-center justify-between">
//                 <button
//                   className="bg-red-600 text-white text-sm font-normal py-1 px-4 rounded-full"
//                   onClick={() => handleNewsContent(currentShort)}
//                 >
//                   Read Full Article
//                 </button>
//                 <button className="text-gray-500 hover:text-gray-600 font-thin">
//                   <FaShareAlt size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Scroll Buttons */}
//       <div className="flex flex-col gap-2">
//         <button
//           className={`bg-red-600 p-2 rounded-full text-white ${
//             currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={handleScrollUp}
//           disabled={currentIndex === 0}
//         >
//           <FaArrowUp size={20} />
//         </button>
//         <button
//           className={`bg-red-600 p-2 rounded-full text-white ${
//             currentIndex === shorts.length - 1
//               ? "opacity-50 cursor-not-allowed"
//               : ""
//           }`}
//           onClick={handleScrollDown}
//           disabled={currentIndex === shorts.length - 1}
//         >
//           <FaArrowDown size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShortsPages;

import {
  FaArrowUp,
  FaArrowDown,
  FaShareAlt,
  FaArrowCircleLeft,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewsContext } from "../../../context/NewsContext";
import { WebThemeContext } from "../../../context/ThemeContext";
import { GetShortsNews } from "../../../../api";
import HtmlToPlainText from "../../../utils/HtmlToPlainText";
import { encryptData } from "../../../utils/cryptoHelper";
import ShortsClap from "./ShortsClap";
import { checkAuth } from "../../../utils/checkAuth";

const ShortsPages = () => {
  const { setNews } = useContext(NewsContext);
  const { webTheme } = useContext(WebThemeContext);
  const navigate = useNavigate();
  const user = checkAuth();

  const [shorts, setShorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNewsContent = (news) => {
    setNews(news);
    navigate(`/read-news/shorts/${encryptData(news.short_news_id)}`);
  };

  const handleScrollDown = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleScrollUp = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const loadShorts = async () => {
    try {
      const res = await GetShortsNews("MYAWR241227001");
      if (res) {
        setShorts(res.data.response.news);
      }
    } catch (error) {
      console.error("Error fetching shorts:", error);
    }
  };

  useEffect(() => {
    loadShorts();
  }, []);

  const currentShort = shorts[currentIndex];

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 pt-2  rounded-full  hover:scale-105  transition duration-300"
      >
        <FaArrowCircleLeft size={23}/>
      </button>

      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-3 items-center justify-center mt-12 px-4 sm:px-0">
        {/* Shorts Card */}
        <div className="h-[85vh] max-h-[530px] w-full sm:w-[350px] flex items-center justify-center">
          {currentShort && (
            <div className="bg-white w-full h-full rounded-2xl shadow-md shadow-gray-500 pb-3 relative border flex flex-col">
              {/* Header Image Section */}
              <div className="relative rounded-md h-48 overflow-hidden">
                <img
                  src={webTheme["web-logo"]}
                  alt="Source"
                  className="w-12 h-12 rounded-full object-cover absolute m-2 z-10"
                />
                <img
                  src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                    currentShort?.news_img
                  }`}
                  alt={currentShort.news_title}
                  className="w-full h-full object-contain rounded-t-md"
                />
                <span className="flex flex-col items-end justify-end -mt-10 p-2 font-bold text-xl">
                  <ShortsClap
                    news_id={currentShort.short_news_id}
                    user_id={user?.user_id}
                  />
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 overflow-auto">
                <h2 className="font-bold text-lg">{currentShort.news_title}</h2>
                <p className="text-red-600 text-sm font-semibold">
                  {currentShort.location} {currentShort.publishedAt}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {currentShort.news_des?.length > 300 ? (
                    (
                      <HtmlToPlainText htmlContent={currentShort.news_des} />
                    ).slice(
                      0,
                      (
                        <HtmlToPlainText htmlContent={currentShort.news_des} />
                      ).lastIndexOf(" ", 300)
                    ) + "..."
                  ) : (
                    <HtmlToPlainText htmlContent={currentShort.news_des} />
                  )}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-red-600 text-white text-sm font-normal py-1 px-4 rounded-full"
                    onClick={() => handleNewsContent(currentShort)}
                  >
                    Read Full Article
                  </button>
                  <button className="text-gray-500 hover:text-gray-600 font-thin">
                    {/* <FaShareAlt size={20} /> */}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll Buttons */}
        <div className="flex sm:flex-col gap-2 mt-4 sm:mt-0">
          <button
            className={`bg-red-600 p-2 rounded-full text-white ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleScrollUp}
            disabled={currentIndex === 0}
          >
            <FaArrowUp size={20} />
          </button>
          <button
            className={`bg-red-600 p-2 rounded-full text-white ${
              currentIndex === shorts.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleScrollDown}
            disabled={currentIndex === shorts.length - 1}
          >
            <FaArrowDown size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ShortsPages;
