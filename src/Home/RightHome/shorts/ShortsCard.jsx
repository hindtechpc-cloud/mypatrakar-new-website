import { useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
import HtmlToPlainText from "../../../utils/HtmlToPlainText";
import { encryptData } from "../../../utils/cryptoHelper";
import ShortsClap from "./ShortsClap";
import { FaShareAlt } from "react-icons/fa";
import { WebThemeContext } from "../../../context/ThemeContext";

const ShortsCard = ({ short, user }) => {
  const { setNews } = useContext(NewsContext);
  const { webTheme } = useContext(WebThemeContext);
  const navigate = useNavigate();

  const handleNewsContent = () => {
    setNews(short);
    navigate(`/read-news/shorts/${encryptData(short.short_news_id)}`);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/read-news/shorts/${encryptData(short.short_news_id)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: short.news_title,
          text: "Check out this news on My Patrakar Shorts!",
          url: shareUrl,
        });
      } catch (err) {
        console.error("Share cancelled or failed:", err);
      }
    } else {
      // fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  const truncatedDescription =
    short.news_des?.length > 300
      ? HtmlToPlainText(short.news_des).slice(0, 300) + "..."
      : HtmlToPlainText(short.news_des);

  return (
  <div className="pb-[10px] bg-gray-300 rounded-[50px] ">

    <div className="pb-[9px] bg-gray-200 rounded-[30px]">
        <div className="bg-white w-full h-[600px] rounded-2xl shadow-lg pb-3 relative border border-gray-100 flex flex-col overflow-hidden">
      {/* Header Image Section */}
      <div className="relative rounded-t-2xl h-[200px] overflow-hidden">
        <img
          src={webTheme["web-logo"]}
          alt="Source"
          className="w-10 h-10 rounded-full object-cover absolute m-3 z-10 border-2 border-white shadow-sm"
        />
        <img
          src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${short.news_img}`}
          alt={short.news_title}
          className="w-full h-full object-center"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/350x200?text=Image+Not+Found";
          }}
        />
        <div className="absolute bottom-3 right-3">
          <ShortsClap news_id={short.short_news_id} user_id={user?.user_id} />
        </div>
      </div>

      {/* Content */}
      <div className="py-[8px] px-[10px] flex-1 flex flex-col overflow-auto">
        <h2 className="font-bold text-lg mb-2 text-gray-800">
          {short.news_title}
        </h2>
        <div className="flex items-center text-sm text-gray-500 ">
          <span className="text-red-600 font-semibold ">{short?.location}</span>
          {/* <span className="mx-2">•</span> */}
          <span>{short?.publishedAt}</span>
        </div>
        <div className="text-gray-600 text-sm mb- flex-1 overflow-auto">
       <HtmlToPlainText htmlContent={short.news_des}/>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button
            className="bg-red-600 text-white text-sm font-medium py-2 px-5 rounded-full hover:bg-red-700 transition-colors shadow-sm"
            onClick={handleNewsContent}
          >
            Read Full Article
          </button>
          <button
            className="text-gray-500 hover:text-gray-600 p-2"
            onClick={handleShare}
          >
            <FaShareAlt size={18} />
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
};

export default ShortsCard;


