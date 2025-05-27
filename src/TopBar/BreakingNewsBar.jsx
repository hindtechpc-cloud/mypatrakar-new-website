import { useContext, useEffect, useState } from "react";
import { WebThemeContext } from "../context/ThemeContext";
import { getBreakingNews } from "../../api";
import { Link } from "react-router-dom";

const BreakingNewsBar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { webTheme } = useContext(WebThemeContext);

  // Live Clock Update (Optimized)
  useEffect(() => {
    let animationFrameId;
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString());
      animationFrameId = requestAnimationFrame(updateClock);
    };
    animationFrameId = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Load Breaking News
  useEffect(() => {
    const loadBreakingNews = async () => {
      try {
        setLoading(true);
        const res = await getBreakingNews("MYAWR241227001");

        const response = res?.data?.response;
        setNewsItems(Array.isArray(response) && response.length > 0
          ? response
          : [
              { news_headline: "सीनियर गेंदबाज का खेलना मुश्किल", news_category_name: "sports", news_id: "1" },
              { news_headline: "सोनू सूद की तमाम कोशिश के बावजूद नहीं बची लड़की की जान, एक्टर बोले- 'काश! मैं उसे बचा पाता'", news_category_name: "bollywood", news_id: "2" },
              { news_headline: "सस्ते इंजेक्शन पर बड़ा फैसला", news_category_name: "health", news_id: "3" },
            ]
        );
      } catch (err) {
        console.error("Error loading breaking news:", err);
        setNewsItems([
          { news_headline: "सीनियर गेंदबाज का खेलना मुश्किल", news_category_name: "sports", news_id: "1" },
          { news_headline: "सोनू सूद की तमाम कोशिश के बावजूद नहीं बची लड़की की जान, एक्टर बोले- 'काश! मैं उसे बचा पाता'", news_category_name: "bollywood", news_id: "2" },
          { news_headline: "सस्ते इंजेक्शन पर बड़ा फैसला", news_category_name: "health", news_id: "3" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadBreakingNews();
  }, []);

  if (loading) {
    return (
      <div
        className="bg-gray-500 rounded-lg text-white mx-0 sm:mx-2 md:mx-10 my-2 p-2 text-center"
        style={{ backgroundColor: webTheme["bg-color"] || "#b91c1c" }}
      >
        Loading breaking news...
      </div>
    );
  }

  if (!newsItems || newsItems.length === 0) return null;

  return (
    <div
      className="rounded-lg text-white mx-0 sm:mx-2 md:mx-10 my-2"
      style={{ backgroundColor: webTheme["bg-color"] || "#b91c1c" }}
    >
      <div className="flex items-center">
        {/* BREAKING Label */}
        <div className="relative flex items-center bg-black h-full px-3 py-2 text-xs md:text-sm font-bold text-white rounded-l-lg">
          <span>BREAKING</span>
          <div
            className="absolute h-full w-4 bg-black"
            style={{
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              right: "-16px",
            }}
          />
        </div>

        {/* News Ticker */}
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee space-x-5 text-xs md:text-sm">
            {newsItems.map((news, index) => (
              <Link
                key={index}
                to={`/read-news/${news.news_category_name}/${news.news_id}`}
                title={news.news_headline}
                className="inline-block hover:text-yellow-300 transition-colors duration-200"
              >
                {news.news_headline}
                <span className="mx-1 text-yellow-400">››</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Clock */}
        <div className="bg-black px-3 py-2 text-xs md:text-sm font-bold text-white rounded-r-lg">
          {time}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
