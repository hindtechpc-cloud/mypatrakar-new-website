
import { useEffect, useRef } from "react";

const HeaderAd = ({ adSlot = "3965429761", className, height }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (window.adsbygoogle && adRef.current) {
      try {
        // Only push if the ad hasn't been loaded before
        if (!adRef.current.hasLoaded) {
          console.log("Loading ad with slot:", adSlot); // Log ad slot for debugging
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adRef.current.hasLoaded = true;
        }
      } catch (e) {
        console.error("AdSense Error:", e);
      }
    }
  }, [adSlot]);
  // "my-4 flex justify-center items-center bg-gray-200 w-full rounded"
  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "728px",
          minHeight: "90px",
          height: height || "200px",
        }}
        data-ad-client="ca-pub-3716384259878681" // Your AdSense client ID
        data-ad-slot={adSlot} // Your AdSlot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default HeaderAd;
