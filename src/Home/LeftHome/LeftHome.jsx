
import React, { useEffect, useState, useRef } from "react";
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

export default function LeftHome() {
  const [featured, setFeatured] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [adError, setAdError] = useState(null);
  const [ads, setAds] = useState({ top: null, main: null });

  const { getSettingStatus } = useSettingsContext();
  const isElectionEnabled = getSettingStatus("Exit Polls");

  const fetchedRef = useRef(false);

  // ✅ load featured sections
  const loadFeaturedSection = async () => {
    try {
      // पहले cache check कर
      const cached = sessionStorage.getItem("featuredSections");
      if (cached) {
        setFeatured(JSON.parse(cached));
        return;
      }

      const res = await GetFeaturedSection();
      const sorted = res.data.response.sort((a, b) => a.order - b.order);
      setFeatured(sorted);

      // cache में डाल दे
      sessionStorage.setItem("featuredSections", JSON.stringify(sorted));
    } catch (error) {
      console.error("Featured section load error:", error);
      setAdError("Failed to load featured section");
    }
  };

  // ✅ load ads
  const loadAds = async () => {
    try {
      const cachedAds = sessionStorage.getItem("leftHomeAds");
      if (cachedAds) {
        setAds(JSON.parse(cachedAds));
        setLoadingAds(false);
        return;
      }

      const [topRes, mainRes] = await Promise.all([
        GetLeftBannerAds(),
        GetLeftHomeMainAds(),
      ]);

      const newAds = {
        top: topRes?.data?.response?.top_banner || null,
        main: mainRes?.data?.response?.top_banner || null,
      };

      setAds(newAds);
      sessionStorage.setItem("leftHomeAds", JSON.stringify(newAds));
    } catch (err) {
      console.error("Ad loading error:", err);
      setAdError("Ads could not be loaded.");
    } finally {
      setLoadingAds(false);
    }
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    loadFeaturedSection();
    loadAds();
  }, []);

  // ✅ ad renderer
  const renderAd = (adData) => {
    if (loadingAds) {
      return (
        <div className="w-full h-40 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      );
    }

    if (adError || !adData) return null;

    return <HeaderAd adData={adData} text="leftHome" className="w-full" />;
  };

  return (
    <div className="w-full space-y-6 px-4 md:px-0">
      {/* ✅ Top Ad */}
      {ads?.top?.ad_image_url && renderAd(ads.top)}

      {/* ✅ Featured Components */}
      <div className="grid grid-cols-1 gap-6">
        {featured.map((section, index) => {
          const Component = componentsMap[section.order]; // ✅ अब सीधे order से match

          return (
            <React.Fragment key={section.section_id || index}>
              <div>
                {Component ? (
                  <Component
                    section_id={section.section_id}
                    category_id={section.category_id}
                    category={section.category}
                    section_title={section.section_title}
                    web_section_id={section.web_section_id}
                  />
                ) : (
                  // ✅ fallback skeleton
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {section.section_title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(6)].map((_, i) => (
                        <AdCardSkeleton key={i} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ✅ Mid Ad after 3nd component */}
              {index === 2 && ads?.main?.ad_image_url && (
                <div className="mt-4">{renderAd(ads.main)}</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ✅ Election Section */}
      {!isElectionEnabled && (
        <div className="mt-5">
          <Election />
        </div>
      )}
    </div>
  );
}
