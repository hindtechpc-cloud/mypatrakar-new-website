import { useState, useEffect } from "react";
import Header from "../shared/Header";
import { useNavigate } from "react-router-dom";
import { Roadmaps } from "../../../../api";
import { encryptData } from "../../../utils/cryptoHelper";
import useRoadmapList from "../shared/useRoadmapList";

export default function OwnState() {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [roadmap_id, setRoadmap_id] = useState(null);

  const navigate = useNavigate();
  const { loadNewsByRoadmapId } = useRoadmapList();

  const CACHE_KEY = "own_state_roadmap_news";
  const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

  const handleNewsContent = (article) => {
    navigate(`/read-news/${article.title}/${encryptData(article.news_id)}`);
  };

  // ✅ reload function
  const loadRoadmaps = async () => {
    try {
      setloading(true);
      setError(null);

      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        const now = Date.now();

        if (now - parsed.timestamp < CACHE_EXPIRY) {
          setRoadmap_id(parsed.roadmap_id);
          setArticles(parsed.data);
          setloading(false);
          return;
        }
      }

      const response = await Roadmaps();
      const trendingArticles = response?.data?.response || [];

      const formattedArticles = trendingArticles.filter(
        (item) => item.position == "3"
      );

      if (formattedArticles.length > 0) {
        const newRoadmapId = formattedArticles[0].roadmap_id;
        setRoadmap_id(newRoadmapId);

        const res = await loadNewsByRoadmapId(newRoadmapId);
        const freshArticles = res?.data?.response || [];

        setArticles(freshArticles);

        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: freshArticles,
            roadmap_id: newRoadmapId,
            timestamp: Date.now(),
          })
        );
      }
    } catch (err) {
      console.error(err);
      // setError("Failed to load road maps");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    loadRoadmaps();

    const interval = setInterval(() => {
      sessionStorage.removeItem(CACHE_KEY);
      loadRoadmaps();
    }, CACHE_EXPIRY);

    return () => clearInterval(interval);
  }, [loadNewsByRoadmapId]);

  // ✅ Skeleton Loader (timeline style)
  const SkeletonLoader = () => (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto animate-pulse my-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-start gap-3 border-l-2 border-gray-200 pl-3"
        >
          <div className="w-2 h-2 mt-1 rounded-full bg-gray-300"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
            <div className="h-3 w-40 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-3 font-sans xl:w-[335px] lg:w-[295px] w-full mx-auto">
      {articles.length > 0 && !loading && !error && (
        <Header text={"उत्तर प्रदेश"} />
      )}

      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="text-center p-4">
          <p className="text-red-600 text-sm font-medium mb-2">{error}</p>
          <button
            onClick={loadRoadmaps}
            className="px-4 py-2 text-sm rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className=" relative flex flex-col gap-3 w-full max-w-sm mx-auto my-2">
          {articles?.slice(0, 4).map((article, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 border-l-2 pl-3 cursor-pointer transition ${
                hoverIndex === index
                  ? "border-yellow-500 bg-ye"
                  : "border-gray-200"
              }`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => handleNewsContent(article)}
            >
              <div
                className={`w-2 h-2 mt- rounded-full -ml-[17px] ${
                  hoverIndex === index ? "bg-yellow-500" : "bg-gray-400"
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-[11px] text-gray-500">{article.date}</p>
                <h3
                  className={`text-sm font-medium leading-snug transition ${
                    hoverIndex === index
                      ? "text-yellow-600"
                      : "text-gray-800"
                  }`}
                >
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
