import { motion, AnimatePresence } from "framer-motion";
import HtmlToPlainText from "../../../utils/HtmlToPlainText";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { useContext } from "react";
import { WebThemeContext } from "../../../context/ThemeContext";
import defaultLogo from "../../../assets/Ellipse.svg";
import { useWebThemeContext } from "../../../context/WebThemeContext";

const MobileFrame = ({
  articles = [],
  currentIndex = 0,
  onNext,
  onPrev,
  loading = false,
  error = null,
}) => {
  const { webTheme } = useWebThemeContext();

  const logo = webTheme["web-logo"] || defaultLogo;
  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <div className="animate-pulse flex flex-col items-center">
          <div className="text-center">
            <ImSpinner2 className="animate-spin text-red-500" size={50} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!articles.length) return null;

  const currentArticle = articles[currentIndex];

  return (
    <div className="flex  items-center justify-center px-[12px]">
      {/* Card Container with Double Shadow */}
      <div className="relative w-full max-w-md">
        {/* First Shadow Layer */}

        {/* Main Card */}
        <div className="relative transition-all duration-300 hover:shadow-3xl">
          {/* Card Header */}
          <div className=" flex items-center justify-center gap-1 ">
            <img
              src={logo}
              alt="news Agency logo"
              className="w-[65px] h-[65px] "
            />
            <span
              className="text-sm font-bold"
              style={{
                fontFamily: "Noto Sans Devanagari",
                color: "#000000",
              }}
            >
              Shorts News
            </span>
          </div>

          {/* Card Content */}
          <div
            className="pb-[10px]   bg-gray-400 shadow-xl"
            style={{
              borderRadius: "50px",
            }}
          >
            <div
              className="pb-[10px]  bg-gray-300 "
              style={{
                borderRadius: "30px",
              }}
            >
              <div
                className="relative bg-white   h-[448px]"
                style={{
                  borderRadius: "10px",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentArticle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className=""
                  >
                    {/* Article Image */}
                    <div className="w-full h-[145px] rounded-t-xl overflow-hidden shadow-lg relative mb-4">
                      <img
                        src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                          currentArticle.urlToImage
                        }`}
                        alt="Article"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x200?text=Image+Not+Available";
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>

                    <div className="px-3">
                      {/* Title */}
                      <h2 className="text-lg font-bold text-gray-800 leading-tight  line-clamp-2">
                        {currentArticle.title}
                      </h2>

                      {/* Description */}
                      <div className="mb-1">
                        <p className="text-xs text-gray-700 leading-relaxed line-clamp-4">
                          <HtmlToPlainText
                            htmlContent={currentArticle.description}
                          />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-[8px]">
            <Link
              to="/shorts"
              className="inline-flex items-center justify-center w-full text-red-600 font-bold text-xs hover:text-red-500 hover:underline transition-colors duration-200 group"
            >
              VIEW ALL SHORTS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1  transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
