import React from "react";
import { FaHeart, FaCommentDots, FaShareAlt } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";

export default function NewsArticleSkeleton() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden  border border-yellow-100 hover:shadow-2xl  transition-all duration-500 animate-pulse">
      {/* Header Image Skeleton */}
      <div className="relative">
        <div className="w-full h-72 bg-gray-200"></div>
        <div className="absolute top-2 left-2 bg-gray-300 h-6 w-20 rounded-full"></div>
      </div>

      {/* Reaction Section */}
      <div className="flex items-center justify-between px-5 py-3 text-gray-600 text-sm border-b border-gray-100">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <FaHeart className="text-gray-300" /> <div className="h-3 w-10 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-1">
            <FaCommentDots className="text-gray-300" /> <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-1">
            <BsFillSunFill className="text-gray-300" /> <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>

        <FaShareAlt className="text-gray-300" />
      </div>

      {/* Author Section Skeleton */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Article Title Skeleton */}
      <div className="px-5 py-4 space-y-4">
        <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-6 w-5/6 bg-gray-200 rounded"></div>

        {/* Article Paragraph Skeletons */}
        <div className="space-y-3">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-11/12 bg-gray-200 rounded"></div>
          <div className="h-3 w-10/12 bg-gray-200 rounded"></div>
          <div className="h-3 w-9/12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
