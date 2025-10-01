import { useContext, useState } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
import HtmlToPlainText from "../../../utils/HtmlToPlainText";
import { encryptData } from "../../../utils/cryptoHelper";
import ShortsClap from "./ShortsClap";
import {
  FaShareAlt,
  FaHeart,
  FaRegHeart,

  FaEllipsisH,
  FaMapMarkerAlt,

} from "react-icons/fa";
import { WebThemeContext } from "../../../context/ThemeContext";
import { useWebThemeContext } from "../../../context/WebThemeContext";

const ShortsCard = ({ short, user }) => {
  const { setNews } = useContext(NewsContext);
  const { webTheme } = useWebThemeContext();

  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  //   const [isSaved, setIsSaved] = useState(false);
console.log(short)
  const handleNewsContent = () => {
    setNews(short);
    navigate(`/read-news/shorts/${encryptData(short.short_news_id)}`);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/read-news/shorts/${encryptData(
      short.short_news_id
    )}`;

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
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };



 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-white w-full max-w-2xl mx-auto rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
      {/* Header - User Info */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={webTheme["web-logo"]}
              alt="Source"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">My Patrakar</h3>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
                News
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {short.location && (
                <>
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{short.location}</span>
                  <span>•</span>
                </>
              )}
              <span>{formatDate(short.publishedAt)}</span>
            </div>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
          <FaEllipsisH />
        </button>
      </div>

      {/* Content - Text */}
      <div className="px-4 pb-3">
        <h2 className="font-bold text-xl mb-2 text-gray-900 leading-tight">
          {short.news_title}
        </h2>

        <div className="text-gray-800 leading-relaxed">
          <HtmlToPlainText htmlContent={short.news_des} />
        </div>
      </div>

      {/* Optional Image/Thumbnail */}
      {short.news_img && (
        <div className="px-4 pb-3">
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                short.news_img
              }`}
              alt={short.news_title}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={handleNewsContent}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FaHeart className="text-red-500" />
            {short.clap_clount || 0} likes
          </span>
          {/* <span className="flex items-center gap-1">
            <FaComment className="text-blue-500" />
            {short.comments_count || 0} comments
          </span> */}
        </div>
        {/* <span className="text-xs">{short.views_count || 0} views</span> */}
      </div>

      {/* Action Buttons */}
      <div className="p-2">
        <div className="flex items-center justify-around border-t border-gray-100 pt-1">
          {/* Like Button */}
          <button
            onClick={toggleLike}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center group"
          >
            {isLiked ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-600 group-hover:text-red-500 text-lg" />
            )}
            <span
              className={`font-medium text-sm ${
                isLiked ? "text-red-500" : "text-gray-600"
              }`}
            >
              Like
            </span>
          </button>

          {/* Comment Button
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center group">
            <FaComment className="text-gray-600 group-hover:text-blue-500 text-lg" />
            <span className="font-medium text-sm text-gray-600">Comment</span>
          </button> */}

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center group"
          >
            <FaShareAlt className="text-gray-600 group-hover:text-green-500 text-lg" />
            <span className="font-medium text-sm text-gray-600">Share</span>
          </button>

        
        </div>
      </div>

      {/* Read Full Article Button */}
      <div className="px-4 pb-4 pt-2">
        <button
          onClick={handleNewsContent}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Read Full Article
        </button>
      </div>
    </div>
  );
};

export default ShortsCard;
