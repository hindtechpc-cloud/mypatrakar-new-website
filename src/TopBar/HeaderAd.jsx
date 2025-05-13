import { useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiExternalLink } from "react-icons/fi";

const HeaderAd = ({
  adSlot = "3965429761",
  className = "",
  height = "200px",
  maxWidth = "728px",
  enableFallbackCTA = true,
}) => {
  const adRef = useRef(null);
  const [adState, setAdState] = useState("loading"); // 'loading' | 'loaded' | 'error'
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    const loadAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          resizeObserver.observe(adRef.current);

          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adRef.current.hasLoaded = true;

          // First check after 1s
          const checkAdLoaded = setInterval(() => {
            const html = adRef.current?.innerHTML || "";
            if (html.trim().length > 10) {
              // More robust check
              setAdState("loaded");
              clearInterval(checkAdLoaded);
            }
          }, 1000);

          // Fallback after 8s
          setTimeout(() => {
            if (adState === "loading") {
              setAdState("error");
              clearInterval(checkAdLoaded);
            }
          }, 8000);

          return () => {
            clearInterval(checkAdLoaded);
            resizeObserver.disconnect();
          };
        }
      } catch (e) {
        console.error("AdSense Error:", e);
        setAdState("error");
      }
    };

    // Delay initial load by 500ms to prioritize content
    const loadTimer = setTimeout(loadAd, 500);

    return () => {
      clearTimeout(loadTimer);
      resizeObserver.disconnect();
    };
  }, [adSlot]);

  const getAspectRatioClass = () => {
    if (!dimensions.width || !dimensions.height) return "";
    const ratio = dimensions.width / dimensions.height;
    if (ratio > 3) return "aspect-wide";
    if (ratio < 0.8) return "aspect-tall";
    return "";
  };

  return (
    <div
      className={`relative ${className} w-full mx-auto rounded-xl overflow-hidden shadow-sm bg-white/10`}
      style={{ maxWidth }}
      data-testid="header-ad-container"
    >
      {/* Loading State */}
      {adState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse">
            <p className="text-center"> Advertize with us</p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 p-3 rounded-lg shadow-md flex items-center space-x-2">
                <div
                  className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />{" "}
                <div
                  className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error/Fallback State */}
      {adState === "error" && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 ${getAspectRatioClass()}`}
        >
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
              href="/advertise"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-md transition-all flex items-center space-x-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Advertise With Us</span>
              <FiExternalLink className="text-sm" />
            </a>
          )}
        </div>
      )}

      {/* Actual Ad */}
      <ins
        ref={adRef}
        className="adsbygoogle block w-full h-full"
        style={{
          display: adState === "loaded" ? "block" : "none",
          height,
          minHeight: "90px",
        }}
        data-ad-client="ca-pub-3716384259878681"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        aria-hidden={adState !== "loaded"}
      />
    </div>
  );
};

export default HeaderAd;
