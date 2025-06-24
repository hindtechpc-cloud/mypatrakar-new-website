import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccessTime } from "react-icons/md";
import { encryptData } from "../utils/cryptoHelper";

const NewsPreview = ({ newsItems }) => {
  return (
    <div className="my-20 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white">
      {newsItems.slice(0, 3).map((newsItem) => (
        <Link
          key={newsItem.news_id}
          to={`/read-news/${encodeURIComponent(newsItem.news_headline)}/${encryptData(newsItem.news_id)}`}
          className="group block transition-transform hover:scale-[1.02]"
        >
          <div className="aspect-video overflow-hidden rounded-lg mb-3">
            <img
              src={
                newsItem?.news_img_url
                  ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${newsItem.news_img_url}`
                  : "https://picsum.photos/600/400"
              }
              alt={newsItem.news_headline}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <h3 className="font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600">
            {newsItem.news_headline}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <MdOutlineAccessTime className="mr-1" />
            <span>
              {newsItem.publishedAt
                ? new Date(newsItem.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "No date"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewsPreview;