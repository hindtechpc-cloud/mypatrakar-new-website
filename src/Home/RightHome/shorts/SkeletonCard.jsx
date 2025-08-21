import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-full max-w-xs rounded-xl shadow-md p-4 bg-white animate-pulse">
      {/* Top logo */}
      <div className="w-8 h-8 rounded-full bg-gray-300 mb-3" />

      {/* Image */}
      <div className="w-full h-40 bg-gray-300 rounded-lg mb-4" />

      {/* Title */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>

      {/* Paragraph */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 rounded w-4/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
