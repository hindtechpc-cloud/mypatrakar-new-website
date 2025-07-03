
// src/TopBar/HeaderAd.jsx
import React, { useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiExternalLink } from "react-icons/fi";
import PropTypes from "prop-types";

const HeaderAd = ({
  adSlot = "3965429761",
  className = "",
  height = "200px",
  maxWidth = "728px",
  enableFallbackCTA = true,
  adData = null,
  text,
}) => {
  const adRef = useRef(null);
  const [adState, setAdState] = useState("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const imageBaseURL = import.meta.env.VITE_REACT_APP_API_URL_Image;
  const isMultipleImages = adData?.ad_image_url?.length > 1;

  useEffect(() => {
    if (!adData) {
      setAdState("error");
      return;
    }
    if (adData?.ad_image_url?.length > 0) {
      setAdState("loaded");
    } else {
      setAdState("error");
    }
  }, [adData]);

  useEffect(() => {
    if (!isMultipleImages) return;

    const startInterval = () => {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === adData.ad_image_url.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    };

    if (!isHovered) {
      startInterval();
    }

    return () => clearInterval(timerRef.current);
  }, [isMultipleImages, adData?.ad_image_url?.length, isHovered]);

  const carouselId = `ad-carousel-${adSlot}`;

  if (adState === "loading") {
    return (
      <div
        className={`relative ${className} w-full mx-auto rounded-xl overflow-hidden shadow-sm bg-gray-200`}
        style={{ maxWidth, height }}
        ref={adRef}
        aria-label="Advertisement loading"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse flex flex-col items-center justify-center">
            <p className="text-center text-gray-600 font-medium">
              Advertise with us
            </p>
            <div className="mt-2 flex items-center space-x-2">
              {[0, 150, 300].map((delay) => (
                <div
                  key={delay}
                  className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (adState === "error") {
    return (
      <div
        className={`relative ${className} w-full mx-auto rounded-xl overflow-hidden shadow-sm bg-gray-200`}
        style={{ maxWidth, height }}
        ref={adRef}
        aria-label="Advertisement error"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="bg-white p-4 rounded-full shadow-md mb-3">
            <FiAlertCircle className="text-yellow-500 text-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className} w-full mx-auto rounded-xl overflow-hidden shadow-sm bg-gray-200`}
      style={{ maxWidth, height }}
      ref={adRef}
      aria-label="Advertisement"
    >
      <div className="w-full h-full bg-white p-4 flex flex-col justify-center items-center relative">
        {/* {adData?.ad_title && (
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {adData.ad_title}
          </h3>
        )} */}
        {/* {adData?.ad_subtitle && (
          <p className="text-sm text-gray-600 mb-4">{adData.ad_subtitle}</p>
        )} */}

        {/* Single Image */}
        {!isMultipleImages && adData?.ad_image_url?.length > 0 && (
          <a
            href={
              adData?.is_url === "0" && adData?.ad_url ? adData.ad_url : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            aria-label="View advertisement"
          >
            <img
              src={`${imageBaseURL}${adData.ad_image_url[0]}`}
              alt={adData?.ad_title || "Advertisement"}
              className="rounded-lg object-center w-full h-full max-h-40 hover:opacity-90 transition"
              loading="lazy"
            />
          </a>
        )}

        {/* Slider for Multiple Images */}
        {isMultipleImages && (
          <div
            className="relative w-full h-40 overflow-hidden rounded-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-roledescription="carousel"
            aria-labelledby={carouselId}
          >
            <div id={carouselId} className="sr-only" aria-live="polite">
              {`Item ${currentIndex + 1} of ${adData.ad_image_url.length}`}
            </div>

            {adData?.ad_image_url?.map((img, idx) => (
              <a
                key={idx}
                href={
                  adData?.is_url === "0" && adData?.ad_url ? adData.ad_url : ""
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === currentIndex ? "opacity-100 z-10" : "opacity-0"
                }`}
                aria-hidden={idx !== currentIndex}
                tabIndex={idx === currentIndex ? 0 : -1}
                aria-label={`Advertisement ${idx + 1}`}
              >
                <img
                  src={`${imageBaseURL}${img}`}
                  alt={
                    adData?.ad_title
                      ? `${adData.ad_title} - Slide ${idx + 1}`
                      : `Advertisement Slide ${idx + 1}`
                  }
                  className="w-full h-full object-cover rounded-lg"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </a>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {adData.ad_image_url.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

HeaderAd.propTypes = {
  adSlot: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.string,
  maxWidth: PropTypes.string,
  enableFallbackCTA: PropTypes.bool,
  adData: PropTypes.shape({
    ad_title: PropTypes.string,
    ad_subtitle: PropTypes.string,
    ad_image_url: PropTypes.arrayOf(PropTypes.string),
    ad_url: PropTypes.string,
    is_url: PropTypes.oneOf(["0", "1"]),
  }),
};

export default HeaderAd;
