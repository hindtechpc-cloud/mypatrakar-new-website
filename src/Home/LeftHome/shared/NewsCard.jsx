import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
import HtmlToPlainText from "../../../utils/HtmlToPlainText";
import { encryptData } from "../../../utils/cryptoHelper";

const NewsCard = ({
  news,
  className = "",
  classNameToImage = "",
  classNameForContent = "",
  newsId,
  image,
  ctaText,
  title,
  description,maxLength
}) => {
  const navigate = useNavigate();
  const { setNews } = useContext(NewsContext);

  const handleNewsClick = useCallback(() => {
    if (!news) return;

    setNews(news);
    const safeTitle = encodeURIComponent(title || "");
    navigate(`/read-news/${safeTitle}/${encryptData(newsId)}`);
  }, [news, setNews, navigate, title, newsId]);

  const imageUrl = image
    ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${image}`
    : "https://via.placeholder.com/800x400?text=No+Image";

  return (
    <div className={`relative ${className}`}>
      {/* Image Section */}
      <div className={`relative select-none ${classNameToImage}`}>
        <img
          src={imageUrl}
          alt={title || "News image"}
          className={
            classNameToImage || "rounded-lg w-full h-full object-center"
          }
          loading="lazy"
        />

        {/* CTA Button */}
        {ctaText && (
          <button
            className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded shadow-md"
            aria-label={`Category: ${ctaText}`}
          >
            {ctaText}
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className={classNameForContent}>
        {/* Title */}
        <h2
          className="text-lg md:text-xl font-semibold text-gray-800  cursor-pointer hover:underline"
          onClick={handleNewsClick}
          aria-label={`Read news: ${title}`}
          
        >
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm md:text-sm text-gray-600 ">
          <HtmlToPlainText htmlContent={description} maxLength={maxLength}/>
        </p>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  news: PropTypes.object,
  className: PropTypes.string,
  classNameToImage: PropTypes.string,
  classNameForContent: PropTypes.string,
  newsId: PropTypes.string.isRequired,
  image: PropTypes.string,
  ctaText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default React.memo(NewsCard);
