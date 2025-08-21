// src/Home/LeftHome/LeftHome.jsx
import React, { useEffect, useState } from "react";
import { componentsMap } from "./componentsMap";
import {
  GetFeaturedSection,
  GetLeftBannerAds,
  GetLeftHomeMainAds,
} from "../../../api";
import HeaderAd from "../../TopBar/HeaderAd";
import Election from "./election/Election";
import { useSettingsContext } from "../../context/SettingsContext";
import { AdCardSkeleton } from "../market/components/Skeleton";
import { useAds } from "../../context/AdsContext";

export default function LeftHome() {
  const [featured, setFeatured] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [adError, setAdError] = useState(null);
  const { ads, getAds } = useAds();
  const { getSettingStatus } = useSettingsContext();
  const isElectionEnabled = getSettingStatus("Exit Polls");

  const loadFeaturedSection = async () => {
    try {
      const res = await GetFeaturedSection("MYAWR241227001");
      const sorted = res.data.response.sort((a, b) => a.order - b.order);
      setFeatured(sorted);
    } catch (error) {
      console.error(error);
      setAdError("Failed to load featured section");
    }
  };

  const loadAds = async () => {
    setLoadingAds(true);
    try {
      const [topRes, mainRes] = await Promise.all([
        // getAds("left_home_top_banner_ad", GetLeftBannerAds, ""),
        // getAds("left_home_main_banner_ad", GetLeftHomeMainAds, ""),
        GetLeftBannerAds(),
        GetLeftHomeMainAds(),
      ]);
      console.log(topRes);
      ads.top = topRes?.top_banner || null;
      ads.main = mainRes?.top_banner || null;
    } catch (err) {
      console.error("Ad loading error:", err);
      setAdError("Ads could not be loaded.");
    } finally {
      setLoadingAds(false);
    }
  };

  useEffect(() => {
    loadFeaturedSection();
    loadAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAd = (adData, label) => {
    return (
      <div className="w-full">
        {loadingAds ? (
          <div className="h-[160px] bg-gray-100 flex items-center justify-center rounded shadow">
            <span className="text-sm text-gray-500 animate-pulse">
              Loading {label}...
            </span>
          </div>
        ) : adError || !adData ? (
          <div className="h-[160px] bg-gray-100 flex items-center justify-center rounded shadow">
            <span className="text-sm text-red-500">
              {/* {adError || "Ad not available"} */}
            </span>
          </div>
        ) : (
          <HeaderAd adData={adData} text="leftHome" />
        )}
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* ✅ Top Ad */}
      {ads.top && renderAd(ads.top, "Top Banner Ad")}

      {/* ✅ Featured Components with mid Ad */}
      {featured.map((section, index) => {
        const match = componentsMap.find(
          (item) =>
            item.order === section.order ||
            item.section_title === section.section_title ||
            !item.category ||
            item.category === section.category
        );

        const Component = match?.component;

        return (
          <React.Fragment key={index}>
            {Component ? (
              <Component
                section_id={section.section_id}
                category_id={section.category_id}
                category={section.category}
                section_title={section.section_title}
                web_section_id={section.web_section_id}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <AdCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* ✅ Show mid Ad after 2nd component */}
            {index === 1 && ads.main && renderAd(ads.main, "Main Banner Ad")}
          </React.Fragment>
        );
      })}

      {!isElectionEnabled && <Election />}
    </div>
  );
}
