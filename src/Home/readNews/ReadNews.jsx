import React, { useEffect, useState, useCallback } from "react";
import RightHome from "../RightHome/RightHome";
import News from "./News";
import Feedback from "./feedback/Feedback";
import NewsFeed from "./newsfeed/NewsFeed";
import OwnState from "../LeftHome/OwnState/OwnState";
import VideoGallery from "./videos/VideoGallery";
import HeaderAd from "../../TopBar/HeaderAd";
import TotalCommnets from "./feedback/TotalComments";
import { articlesCard } from "../search/news";
import { GetReadNewsPageBottomAds, GetReadNewsPageTopAds } from "../../../api";
import { useParams } from "react-router-dom";

export default function ReadNews() {
  const [topAds, setTopAds] = useState(null);
  const [bottomAds, setBottomAds] = useState(null);
  const [adError, setAdError] = useState(null);
  const [loadingAds, setLoadingAds] = useState(true);

  const { type } = useParams();
  const loadAds = useCallback(async () => {
    setLoadingAds(true);
    try {
      const [topRes, bottomRes] = await Promise.all([
        GetReadNewsPageTopAds(),
        GetReadNewsPageBottomAds(),
      ]);

      setTopAds(topRes?.data?.response?.top_banner || null);
      setBottomAds(bottomRes?.data?.response?.top_banner || null);
    } catch (error) {
      console.error("Ad loading error:", error);
      setAdError("Failed to load ads.");
    } finally {
      setLoadingAds(false);
    }
  }, []);

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  const renderAd = (adData) => {
    if (loadingAds) {
      return (
        <div className="my-4 h-[200px] w-full bg-gray-100 flex items-center justify-center rounded shadow">
          <span className="text-gray-500 animate-pulse">Loading Ad...</span>
        </div>
      );
    }

    if (adError || !adData) {
      return (
        <div className="my-4 h-[200px] w-full bg-gray-100 flex items-center justify-center rounded shadow">
          <span className="text-red-500">{adError || "No ad available"}</span>
        </div>
      );
    }

    return (
      <HeaderAd
        className="my-4 flex justify-center items-center bg-gray-300 w-1/2 rounded"
        height="200px"
        adData={adData}
      />
    );
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 md:mx-14 sm:mx-8 mx-2">
      {/* Left Section */}
      <div className="w-full lg:w-8/12">
        <News />
        {renderAd(topAds)}
        {type !== "shorts" && <Feedback />}
        {type !== "shorts" && <TotalCommnets />}
        {/* <NewsFeed newsCard={articlesCard} /> */}
        {/* <NewsAppAd /> */}
        {/* {renderAd(bottomAds)} */}
        {/* <OwnState /> */}
        <VideoGallery />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-4/12">
        <RightHome />
      </div>
    </div>
  );
}
