import React from "react";

export default function AdCard({ adsData }) {
  return (
    <div className="relative group mt-2">
      <div className="w-[300px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 mx-auto">
        {/* AD Badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
            Advertisement
          </span>
        </div>

        {/* Ad Image */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${adsData.ad_image_url[0]}`}
            alt={adsData.ad_title || "Advertisement"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Ad Content */}
        <div className="p-4">
          {adsData.ad_title && (
            <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
              {adsData.ad_title}
            </h3>
          )}
          {adsData.ad_subtitle && (
            <p className="text-gray-600 text-xs mb-3 line-clamp-2">
              {adsData.ad_subtitle}
            </p>
          )}
          {adsData.ad_url && (
            <a
              href={adsData.ad_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center text-xs font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              Learn More
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
