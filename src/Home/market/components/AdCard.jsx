import React, { useState } from "react";
import { AdDetailPage } from "../pages/AdDetailPage";

export const AdCard = ({ ad }) => {
  const [isOpenDetailCard, setIsOpenDetailCard] = useState(false);

  const BASE_IMAGE_URL = import.meta.env.VITE_REACT_APP_API_URL_Image;

  // Fallback image logic
  const imageUrl =
    ad.images && ad.images.length > 0
      ? `${BASE_IMAGE_URL}${ad.images[0]}`
      : "https://www.akamai.com/site/im-demo/perceptual-standard.jpg";

  return (
    <div className="max-w-sm w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white hover:border-blue-200">
      {/* Image with hover effect */}
      <div className="relative overflow-hidden h-48 sm:h-52">
        <img
          src={"https://www.akamai.com/site/im-demo/perceptual-standard.jpg"}
          alt={ad.title || "Ad Image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
        />
        {/* Price tag overlay */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="font-bold text-green-700">₹{ad.amount}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h2
          className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer hover:underline"
          onClick={() => setIsOpenDetailCard(true)}
        >
          {ad.title}
        </h2>

        {isOpenDetailCard && (
  <div className="fixed inset-0 z-50">
    {/* Backdrop with smooth transition */}
    <div 
      className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={() => setIsOpenDetailCard(false)}
    ></div>
    
    {/* Modal container */}
    <div className="absolute inset-0 flex items-center justify-center p-4">
      {/* Modal content with max-height and scrolling */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Close button (top-right) */}
        <button
          onClick={() => setIsOpenDetailCard(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition-colors shadow-sm"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        
        {/* Ad detail content with scrollable area */}
        <div className="overflow-y-auto flex-1">
          <AdDetailPage 
            initialAd={ad} 
            onClose={() => setIsOpenDetailCard(false)}
          />
        </div>
      </div>
    </div>
  </div>
)}

        {/* Short Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {ad.short_desc}
        </p>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-start">
            <svg
              className="w-4 h-4 mt-0.5 mr-1.5 text-blue-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-gray-700 truncate">{ad.company_name}</span>
          </div>

          <div className="flex items-start">
            <svg
              className="w-4 h-4 mt-0.5 mr-1.5 text-blue-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-gray-700 truncate">{ad.location}</span>
          </div>

          <div className="flex items-start">
            <svg
              className="w-4 h-4 mt-0.5 mr-1.5 text-blue-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-gray-700 truncate">{ad.contact}</span>
          </div>

          <div className="flex items-start">
            <svg
              className="w-4 h-4 mt-0.5 mr-1.5 text-blue-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-700 truncate">{ad.email}</span>
          </div>
        </div>

        {/* Website Link */}
        {ad.website && (
          <a
            href={
              ad.website.startsWith("http")
                ? ad.website
                : `https://${ad.website}`
            }
            className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
            <svg
              className="w-4 h-4 ml-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};
