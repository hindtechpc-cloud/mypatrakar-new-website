import React from "react";

const NewsCard = ({
  className,
  classNameToImage,
  image,
  ctaText,
  title,
  description,
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Image Section */}
      <div className={`relative overflow-hidden ${classNameToImage}`}>
        <img
          src={image}
          alt="News"
          className="rounded-lg w-full h-full object-cover"
        />
        {/* CTA Button Stuck to Image Bottom-Right */}
        <button className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded shadow-md">
          {ctaText}
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-grow mt-3">
        {/* Title */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm md:text-sm text-gray-600 mb-3">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
