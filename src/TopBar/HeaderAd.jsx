import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const HeaderAd = ({
  adData,
  className = "",
  height = "200px",
  maxWidth = "728px",
}) => {
  const imageBaseURL = import.meta.env.VITE_REACT_APP_API_URL_Image;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const images = adData?.ad_image_url || [];
  const isMultipleImages = images.length > 1;

  useEffect(() => {
    if (!images.length) return;

    const preload = new Image();
    preload.src = `${imageBaseURL}${images[0]}`;
    preload.onload = () => setIsLoading(false);
    preload.onerror = () => setIsLoading(false);
  }, [images, imageBaseURL]);

  useEffect(() => {
    if (!isMultipleImages) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timerRef.current);
  }, [isMultipleImages, images.length]);

  if (!images.length || isLoading) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-gray-200 animate-pulse ${className}`}
        style={{ maxWidth, height }}
      />
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg ${className}`}
      style={{ maxWidth, height }}
    >
      <img
        src={`${imageBaseURL}${images[isMultipleImages ? currentIndex : 0]}`}
        alt={adData?.ad_title || "Advertisement"}
        className="w-full h-full object-cover"
        style={{ height, maxWidth }}
        loading="lazy"
      />
    </div>
  );
};

HeaderAd.propTypes = {
  adData: PropTypes.shape({
    ad_image_url: PropTypes.arrayOf(PropTypes.string),
    ad_title: PropTypes.string,
  }),
  className: PropTypes.string,
  height: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default React.memo(HeaderAd);
