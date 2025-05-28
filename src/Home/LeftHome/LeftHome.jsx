import React, { useEffect, useState } from "react";
import { componentsMap } from "./componentsMap";
import { GetLeftBannerAds, GetLeftHomeMainAds } from "../../../api";

export default function LeftHome() {
  const [layoutIds, setLayoutIds] = useState([]);
  const [topBannerAd, setTopBannerAd] = useState(null);
  const [mainBannerAd, setMainBannerAd] = useState(null);
  const [loadingAds, setLoadingAds] = useState(true);
  const [adError, setAdError] = useState(null);

  // Example layout from backend
  useEffect(() => {
    const fetchedLayout = [
      "ad",        // Will render topBannerAd
      "topNews",
      "ownState",
      "state",
      "game",
      "ad",        // Will render mainBannerAd on second "ad"
      "entertainment",
      "country",
      "election",
    ];
    setLayoutIds(fetchedLayout);
  }, []);

  // Load both ads in parallel
  const loadAds = async () => {
    setLoadingAds(true);
    try {
      const [topRes, mainRes] = await Promise.all([
        GetLeftBannerAds(""),
        GetLeftHomeMainAds(""),
      ]);
      // console.log(mainRes)

      setTopBannerAd(topRes?.data?.response?.top_banner || null);
      setMainBannerAd(mainRes?.data?.response?.top_banner || null);
    } catch (err) {
      console.error("Ad loading error:", err);
      setAdError("Ads could not be loaded at this time.");
    } finally {
      setLoadingAds(false);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  let adRenderCount = 0; // To alternate between topBannerAd and mainBannerAd

  return (
    <div className="w-full space-y-4">
      {layoutIds.map((id, index) => {
        const Component = componentsMap[id];

        // Handle "ad" blocks with alternating ad data
        if (id === "ad") {
          const currentAd = adRenderCount === 0 ? topBannerAd : mainBannerAd;
          const adPosition = adRenderCount === 0 ? "Top Banner Ad" : "Main Banner Ad";
          adRenderCount++;

          return (
            <div key={index} className="w-full">
              {loadingAds ? (
                <div className="h-[160px] w-full bg-gray-100 flex items-center justify-center rounded shadow">
                  <span className="text-sm text-gray-500 animate-pulse">Loading {adPosition}...</span>
                </div>
              ) : adError || !currentAd ? (
                <div className="h-[160px] w-full bg-gray-100 flex items-center justify-center rounded shadow">
                  <span className="text-sm text-red-500">{adError || "Ad not available"}</span>
                </div>
              ) : (
                <Component
                  className="my-2 w-full h-[160px] flex justify-center items-center bg-gray-100 rounded shadow"
                  adData={currentAd}
                  text="leftHome"
                />
              )}
            </div>
          );
        }

        // Render other components dynamically
        return Component ? (
          <Component key={index} />
        ) : (
          <div key={index} className="text-sm text-red-400">
            Unknown component: {id}
          </div>
        );
      })}
    </div>
  );
}
