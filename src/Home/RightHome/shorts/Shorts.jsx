import { Link } from "react-router-dom";
import Header from "../shared/Header";
import { GetShortsNews } from "../../../../api";
import { useEffect, useState } from "react";
import HtmlToPlainText from "../../../utils/HtmlToPlainText";

export default function Shorts() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadShorts = async () => {
    try {
      const res = await GetShortsNews("MYAWR241227001");
      // console.log("API Response:", res);
// console.log(object)
      const shorts = res?.data?.response?.news;
      // console.log("Fetched Shorts:", shorts);

      if (shorts && shorts.length > 0) {
        const randomIndex = Math.floor(Math.random() * shorts.length);
        const selected = shorts[randomIndex];
        // console.log("Selected Short:", selected);

        setArticle({
          urlToImage: selected.news_img,
          category: "Shorts",
          title: selected.news_title || "Untitled",
          updated: selected.updated_at || "Just now",
          description: selected.news_des?.replace(/<[^>]*>?/gm, "") || "",
        });
      }
    } catch (error) {
      console.error("Error fetching shorts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShorts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!article) return <div className="text-center mt-10">No Shorts Found</div>;

  return (
    <div className="my-2 mt-5 font-sans md:max-w-sm w-[300px] mx-auto py-4">
      <Header text="Shorts" />
      <div className="flex items-center justify-center relative">
        {/* Mobile Frame */}
        <div className="relative w-[300px] h-[550px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-[10px] border-black overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-2xl"></div>

          {/* Screen Content */}
          <div className="h-full rounded-[2rem] bg-gray-50 flex flex-col relative pt-6 shadow-inner">
            <div className="text-center mt-2">
              <h1 className="text-xl font-extrabold text-red-500 tracking-wide">
                <span className="text-black">MY</span> Patrakar{" "}
                <span className="text-black">Shorts</span>
              </h1>
            </div>

            <div className="flex-1 overflow-y-auto px-3 border-b-2 hide-scroll bg-gray-50 rounded-2xl shadow-xl mx-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {/* Article Image */}
              <div className="w-full h-44 rounded-lg mt-4 overflow-hidden shadow-lg">
                <img
                  src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${article.urlToImage}`}
                  alt="Article"
                  className="w-full h-full object-cover transition-transform transform hover:scale-105"
                />
              </div>

              {/* Title */}
              <h2 className="text-md font-bold text-gray-800 leading-tight mt-3">
                {article.title}
              </h2>

              {/* Category & Updated Time */}
              <p className="text-xs text-gray-500 mt-2">
                <span className="text-red-500 font-semibold">
                  {article.category}
                </span>{" "}
                · Updated: {article.updated}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                <HtmlToPlainText htmlContent={article.description} />
              </p>
            </div>

            <div className="text-center p-3 bg-gray-100 mt-2 rounded-b-[2rem]">
              <Link
                to={`/shorts`}
                className="text-red-500 font-bold text-sm hover:underline flex flex-col items-center"
              >
                VIEW ALL SHORTS
                <div className="bg-black w-10 h-[2px] mx-auto mt-1"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
