import { useEffect, useRef, useState } from "react";

const HeaderAd = ({ adSlot = "3965429761", className = "", height = "200px" }) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    let timeout1, timeout2;

    if (window.adsbygoogle && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adRef.current.hasLoaded = true;

        // Check after 2s if ad got loaded
        timeout1 = setTimeout(() => {
          const html = adRef.current?.innerHTML || "";
          if (html.trim().length > 0) {
            setAdLoaded(true);
          }
        }, 2000);
      } catch (e) {
        console.error("AdSense Error:", e);
      }
    }

    // Fallback timeout if still not loaded after 5s
    timeout2 = setTimeout(() => {
      if (!adLoaded) setAdLoaded(false);
    }, 5000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [adSlot]);

  return (
    <div className={`relative ${className} w-full max-w-[728px] mx-auto rounded`}>
      {/* 👇 Shimmer + fallback */}
      {!adLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center rounded">
          <span className="text-gray-500 font-semibold">📢 Advertise Here</span>
        </div>
      )}

      {/* 👇 Real Ad */}
      <ins
        ref={adRef}
        className="adsbygoogle z-0"
        style={{
          display: "block",
          width: "100%",
          height,
          minHeight: "90px",
        }}
        data-ad-client="ca-pub-3716384259878681"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default HeaderAd;
