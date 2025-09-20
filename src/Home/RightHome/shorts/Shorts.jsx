import { Link } from "react-router-dom";
import Header from "../shared/Header";
import { GetShortsNews } from "../../../../api";
import { useEffect, useState, useCallback } from "react";
import HtmlToPlainText from "../../../utils/HtmlToPlainText";
import { motion, AnimatePresence } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";

const CACHE_KEY = "shorts_cache";
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

export default function Shorts() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadShorts = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // check sessionStorage first
      if (!forceRefresh) {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setArticles(data);
            setCurrentIndex(Math.floor(Math.random() * data.length));
            setLoading(false);
            return;
          }
        }
      }

      // fresh API call
      const res = await GetShortsNews("MYAWR241227001");
      const shorts = res?.data?.response?.news;

      if (shorts && shorts.length > 0) {
        const formattedArticles = shorts.map((short) => ({
          urlToImage: short.news_img,
          category: "Shorts",
          title: short.news_title || "Untitled",
          updated: short.updated_at || "Just now",
          description: short.news_des?.replace(/<[^>]*>?/gm, "") || "",
          id: short.news_id || Math.random().toString(36).substring(2, 9),
        }));

        setArticles(formattedArticles);
        setCurrentIndex(Math.floor(Math.random() * formattedArticles.length));

        // cache data
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: formattedArticles, timestamp: Date.now() })
        );
      } else {
        setError("No shorts available");
      }
    } catch (error) {
      console.error("Error fetching shorts:", error);
      setError("Failed to load shorts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-rotate articles
  useEffect(() => {
    if (articles.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [articles.length]);

  // Manual navigation
  const nextArticle = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevArticle = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  useEffect(() => {
    loadShorts();
    // setup auto-refresh every 30 min
    const interval = setInterval(() => {
      loadShorts(true);
    }, CACHE_EXPIRY);

    return () => clearInterval(interval);
  }, [loadShorts]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-pulse flex flex-col items-center">
          <div className=" text-center">
            <ImSpinner2 className="animate-spin text-red-500" size={50} />
          </div>
        </div>
      </div>
    );

  if (!articles.length) return null;

  const currentArticle = articles[currentIndex];

  return (
    <>
      {articles.length > 0 && (
        <div className="mt-[9px]  xl:w-[335px] lg:w-[295px] w-full mx-auto">
          <Header text="Shorts" />
          <div className="flex items-center justify-center relative">
            {/* Mobile Frame */}
            <div className="relative xl:w-[335px] lg:w-[295px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] shadow-xl border-[10px] border-black overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-2xl z-10"></div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[60px] h-[5px] bg-gray-700 rounded-full z-10"></div>

              {/* Screen Content */}
              <div className="h-full rounded-[2rem] bg-gray-50 flex flex-col relative pt-6 overflow-hidden">
                <div className="text-center mt-2 px-4">
                  <h1 className="text-xl font-extrabold text-red-500 tracking-wide">
                    <span className="text-black">MY</span> Patrakar{" "}
                    <span className="text-black">Shorts</span>
                  </h1>
                  <div className="flex justify-center mt-2">
                    {articles.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 mx-1 rounded-full ${
                          idx === currentIndex ? "bg-red-500" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentArticle.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="h-full overflow-y-auto px-4 hide-scroll bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                    >
                      {/* Article Image */}
                      <div className="w-full h-44 rounded-lg mt-4 overflow-hidden shadow-lg relative">
                        <img
                          src={`${
                            import.meta.env.VITE_REACT_APP_API_URL_Image
                          }${currentArticle.urlToImage}`}
                          alt="Article"
                          className="w-full h-full object-cover transition-transform duration-500"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x176?text=Image+Not+Available";
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-bold text-gray-800 leading-tight mt-3 line-clamp-2">
                        {currentArticle.title}
                      </h2>

                      {/* Category & Updated Time */}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                          {currentArticle.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          Updated: {currentArticle.updated}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="mt-3 mb-6">
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-5">
                          <HtmlToPlainText
                            htmlContent={currentArticle.description}
                          />
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {articles.length > 1 && (
                    <>
                      <button
                        onClick={prevArticle}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-800"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={nextArticle}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-800"
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
                      </button>
                    </>
                  )}
                </div>

                <div className="text-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 mt-auto rounded-b-[2rem] border-t border-gray-200">
                  <Link
                    to="/shorts"
                    className="inline-block text-red-500 font-bold text-sm hover:underline group"
                  >
                    VIEW ALL SHORTS
                    <div className="bg-black w-10 h-[2px] mx-auto mt-1 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
