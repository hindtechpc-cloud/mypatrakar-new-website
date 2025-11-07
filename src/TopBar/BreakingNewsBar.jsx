
import React, { useEffect, useState } from "react";
import { getBreakingNews } from "../../api";
import { Link } from "react-router-dom";
import { encryptData } from "../utils/cryptoHelper";
import { useWebThemeContext } from "../context/WebThemeContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";

// Fallback news
const fallbackNews = [
  {
    news_headline: "सीनियर गेंदबाज का खेलना मुश्किल",
    news_category_name: "sports",
    news_id: "1",
  },
  {
    news_headline:
      "सोनू सूद की तमाम कोशिश के बावजूद नहीं बची लड़की की जान, एक्टर बोले- 'काश! मैं उसे बचा पाता'",
    news_category_name: "bollywood",
    news_id: "2",
  },
  {
    news_headline: "सस्ते इंजेक्शन पर बड़ा फैसला",
    news_category_name: "health",
    news_id: "3",
  },
];

const BreakingNewsBar = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { webTheme } = useWebThemeContext();

  // Fetch news
  useEffect(() => {
    const loadBreakingNews = async () => {
      try {
        setLoading(true);
        const res = await getBreakingNews("MYAWR241227001");
        const response = res?.data?.response;
        setNewsItems(
          Array.isArray(response) && response.length > 0
            ? response
            : fallbackNews
        );
      } catch (err) {
        console.error("Error loading breaking news:", err);
        setNewsItems(fallbackNews);
      } finally {
        setLoading(false);
      }
    };
    loadBreakingNews();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  const bgColor = webTheme["bg-color"] || "#dc2626"; // red tone
  console.log(bgColor);
  if (loading) {
    return (
      <div className="flex bg-gray-300 items-center xl:mx-auto mx-2 mt-2 h-[40px] w-full xl:w-[1137px] justify-between  my-2 overflow-hidden rounded-sm"/>

      
    );
  }

  if (!newsItems.length) return null;

  const currentNews = newsItems[currentIndex];

  return (
    <div className=" flex items-center justify-center mt-2 ">
      <div className="flex items-center xl:mx-auto mx-2 w-full xl:w-[1137px] justify-between  my-2 overflow-hidden rounded-sm">
        {/* Left red section */}
        <div
          className="hidden md:flex text-white font-semibold text-sm md:text-base px-4 py-2 whitespace-nowrap"
          style={{ backgroundColor: bgColor }}
        >
          Breaking News
        </div>
        <div
          className="md:hidden flex text-white font-semibold text-sm md:text-base px-4 py-2 whitespace-nowrap"
          style={{ backgroundColor: bgColor }}
        >
         <MdOutlineElectricBolt className="-rotate-45 font-bold" size={21} />
        </div>
        {/* Middle black ticker area */}
        <div className="flex-1 bg-[#1f1f1f] text-white px-4 py-2 overflow-hidden relative flex items-center">
          <Link
            to={`/read-news/${currentNews.news_category_name}/${encryptData(
              currentNews.news_id
            )}`}
            className="block truncate hover:text-yellow-400 transition-colors duration-200 text-sm md:text-base"
          >
            {currentNews.news_headline}{""}
          </Link>
        </div>

        {/* Right controls */}
        <div className="flex items-center bg-[#1f1f1f] text-white  py-[3px] md:py-[5px]">
          <button
            onClick={handlePrev}
            className={`px-3 py-2 hover:bg-${bgColor} transition-colors1 border-l`}
            aria-label="Previous news"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = bgColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1f1f1f")
            }
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-2 hover:bg-gray-700 transition-colors border-l"
            aria-label="Next news"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1f1f1f")}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
