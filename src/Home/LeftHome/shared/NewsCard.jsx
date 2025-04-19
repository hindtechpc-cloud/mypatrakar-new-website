import React, { useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setSelectedNews } from "../../../redux/features/newsSlice";

const NewsCard = ({
  news,
  className,
  classNameToImage,
  classNameForContent = "",
  image,
  ctaText,
  title,
  description,
}) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setNews } = useContext(NewsContext);
  const handleNewsContent = (news) => {
    setNews(news);
    // dispatch(setSelectedNews(news)); // Save clicked news to Redux

    navigate(`/read-news/${title}`);
  };
  return (
    <div className={`relative ${className}`}>
      {/* Image Section */}
      <div className={classNameToImage}>
        <img
          src={image}
          alt="News"
          className="rounded-lg w-full h-full object-cover"
          // className={classNameToImage}
        />
        {/* CTA Button Stuck to Image Bottom-Right */}
        <button className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded shadow-md">
          {ctaText}
        </button>
      </div>

      {/* Content Section */}
      <div className={classNameForContent}>
        {/* Title */}
        <h2
          className="text-lg md:text-xl font-semibold text-gray-800 mb-2 cursor-pointer hover:underline"
          onClick={() => handleNewsContent(news)}
        >
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm md:text-sm text-gray-600 mb-3 ">
          {description?.slice(0, 300)}...
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
