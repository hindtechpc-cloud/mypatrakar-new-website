// import { useEffect, useRef, useState } from "react";
// import { FiAlertCircle, FiExternalLink } from "react-icons/fi";

// const HeaderAd = ({
//   adSlot = "3965429761",
//   className = "",
//   height = "200px",
//   maxWidth = "728px",
//   enableFallbackCTA = true,
//   adData = null, // Optional ad data for future use
// }) => {
//   const adRef = useRef(null);
//   const [adState, setAdState] = useState("loading"); // 'loading' | 'loaded' | 'error'
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const resizeObserver = new ResizeObserver((entries) => {
//       const { width, height } = entries[0].contentRect;
//       setDimensions({ width, height });
//     });

//     const loadAd = () => {
//       try {
//         if (window.adsbygoogle && adRef.current) {
//           resizeObserver.observe(adRef.current);

//           (window.adsbygoogle = window.adsbygoogle || []).push({});
//           adRef.current.hasLoaded = true;

//           // First check after 1s
//           const checkAdLoaded = setInterval(() => {
//             const html = adRef.current?.innerHTML || "";
//             if (html.trim().length > 10) {
//               // More robust check
//               setAdState("loaded");
//               clearInterval(checkAdLoaded);
//             }
//           }, 1000);

//           // Fallback after 8s
//           setTimeout(() => {
//             if (adState === "loading") {
//               setAdState("error");
//               clearInterval(checkAdLoaded);
//             }
//           }, 8000);

//           return () => {
//             clearInterval(checkAdLoaded);
//             resizeObserver.disconnect();
//           };
//         }
//       } catch (e) {
//         console.error("AdSense Error:", e);
//         setAdState("error");
//       }
//     };

//     // Delay initial load by 500ms to prioritize content
//     const loadTimer = setTimeout(loadAd, 500);

//     return () => {
//       clearTimeout(loadTimer);
//       resizeObserver.disconnect();
//     };
//   }, [adSlot]);

//   const getAspectRatioClass = () => {
//     if (!dimensions.width || !dimensions.height) return "";
//     const ratio = dimensions.width / dimensions.height;
//     if (ratio > 3) return "aspect-wide";
//     if (ratio < 0.8) return "aspect-tall";
//     return "";
//   };

//   return (
//     <div
//       className={`relative ${className} w-full mx-auto rounded-xl overflow-hidden shadow-sm bg-gray-400`}
//       style={{ maxWidth }}
//       data-testid="header-ad-container"
//     >
//       {/* Loading State */}
//       {adState === "loading" && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse">
//             <p className="text-center"> Advertize with us</p>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="  flex items-center space-x-2">
//                 <div
//                   className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
//                   style={{ animationDelay: "0ms" }}
//                 />{" "}
//                 <div
//                   className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
//                   style={{ animationDelay: "150ms" }}
//                 />
//                 <div
//                   className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
//                   style={{ animationDelay: "300ms" }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Error/Fallback State */}
//       {adState === "error" && (
//         <div
//           className={`absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 ${getAspectRatioClass()}`}
//         >
//           <div className="bg-white p-4 rounded-full shadow-md mb-3">
//             <FiAlertCircle className="text-yellow-500 text-2xl" />
//           </div>
//           <h3 className="text-gray-700 font-medium text-lg mb-1">
//             Ad Couldn't Load
//           </h3>
//           <p className="text-gray-500 text-sm text-center mb-4 max-w-md">
//             We're having trouble loading this advertisement. You may have an ad
//             blocker enabled.
//           </p>

//           {enableFallbackCTA && (
//             <a
//               href="/advertise"
//               className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-md transition-all flex items-center space-x-2"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <span>Advertise With Us</span>
//               <FiExternalLink className="text-sm" />
//             </a>
//           )}
//         </div>
//       )}

//       {/* Actual Ad */}
//       <ins
//         ref={adRef}
//         className="adsbygoogle block w-full h-full"
//         style={{
//           display: adState === "loaded" ? "block" : "none",
//           height,
//           minHeight: "90px",
//         }}
//         data-ad-client="ca-pub-3716384259878681"
//         data-ad-slot={adSlot}
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//         aria-hidden={adState !== "loaded"}
//       />
//     </div>
//   );
// };

// export default HeaderAd;
import { useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiExternalLink } from "react-icons/fi";
import PropTypes from "prop-types";

const HeaderAd = ({
  adSlot = "3965429761",
  className = "",
  height = "200px",
  maxWidth = "728px",
  enableFallbackCTA = true,
  adData = null,
  text
}) => {
  const adRef = useRef(null);
  const [adState, setAdState] = useState("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const imageBaseURL = import.meta.env.VITE_REACT_APP_API_URL_Image;

  const isMultipleImages = adData?.ad_image_url?.length > 1;

  // Validate and set ad state based on adData
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
// console.log(text)
  // Auto slide logic with pause on hover
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

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? adData.ad_image_url.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === adData.ad_image_url.length - 1 ? 0 : prev + 1
    );
  };

  // Generate a unique ID for accessibility
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
          <h3 className="text-gray-700 font-medium text-lg mb-1">
            Ad Couldn't Load
          </h3>
          <p className="text-gray-500 text-sm text-center mb-4 max-w-md">
            We're having trouble loading this advertisement. You may have an ad
            blocker enabled.
          </p>

          {enableFallbackCTA && (
            <a
              href="/advertise-with-us"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-md transition-all flex items-center space-x-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Advertise with us"
            >
              <span>Advertise With Us</span>
              <FiExternalLink className="text-sm" />
            </a>
          )}
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
        )}
        {adData?.ad_subtitle && (
          // <p className="text-sm text-gray-600 mb-4">{adData.ad_subtitle}</p>
        )} */}

        {/* Single Image */}
        {!isMultipleImages && (
          // <a
          //   href={
          //     adData?.is_url === "0" && adData?.ad_url ? adData.ad_url : "#"
          //   }
          //   target="_blank"
          //   rel="noopener noreferrer"
          //   className="w-full"
          //   aria-label="View advertisement"
          // >
            <img
              src={`${imageBaseURL}${adData.ad_image_url[0]}`}
              alt={adData?.ad_title || "Advertisement"}
              className="rounded-lg object-cover w-full h-full max-h-40 hover:opacity-90 transition"
              loading="lazy"
            />
          // </a>
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

            {adData?.ad_image_url?.length > 0 &&
              adData?.ad_image_url?.map((img, idx) => (
                <a
                  key={idx}
                  href={
                    adData?.is_url === "0" && adData?.ad_url
                      ? adData.ad_url
                      : "#"
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

            {/* Navigation buttons */}
            {/* <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full z-20 hover:bg-opacity-50 transition"
              aria-label="Previous slide"
            >
              &larr;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full z-20 hover:bg-opacity-50 transition"
              aria-label="Next slide"
            >
              &rarr;
            </button> */}

            {/* Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
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
