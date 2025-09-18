import React, { useEffect, useState, useCallback } from "react";
import RightHome from "../RightHome/RightHome";
import News from "./News";
import Feedback from "./feedback/Feedback";
import NewsFeed from "./newsfeed/NewsFeed";
// import OwnState from "../LeftHome/OwnState/OwnState";
import VideoGallery from "./videos/VideoGallery";
import HeaderAd from "../../TopBar/HeaderAd";
import TotalCommnets from "./feedback/TotalComments";
// import { articlesCard } from "../search/news";
import { GetReadNewsPageBottomAds, GetReadNewsPageTopAds } from "../../../api";
import { useParams } from "react-router-dom";
import { useSettingsContext } from "../../context/SettingsContext";
import Loader from "../../utils/Loader";

export default function ReadNews() {
  const [topAds, setTopAds] = useState(null);
  const [bottomAds, setBottomAds] = useState(null);
  const [adError, setAdError] = useState(null);
  const [loadingAds, setLoadingAds] = useState(true);
  const { getSettingStatus } = useSettingsContext();
  const isCommentEbaled = getSettingStatus("Comments");
  const [isComment,setIsComment]=useState(false);
  const [articales, setArticles] = useState([]);

  const { type } = useParams();
  const loadAds = useCallback(async () => {
    setLoadingAds(true);
    try {
      // const res=await GetReadNewsPageTopAds();
      const [topRes, bottomRes] = await Promise.all([
        GetReadNewsPageTopAds(),
        GetReadNewsPageBottomAds(),
      ]);
      // console.log(topRes);
      setTopAds(topRes?.data?.response?.top_banner || null);
      setBottomAds(bottomRes?.data?.response?.top_banner || null);
      // console.log(res);
    } catch (error) {
      console.log("Ad loading error:", error);
      setAdError("Failed to load ads.");
    } finally {
      setLoadingAds(false);
    }
  }, []);

  useEffect(() => {
    loadAds();
  }, [loadAds]);
  // console.log(bottomAds)
  const renderAd = (adData) => {
    if (loadingAds) {
      return (
        <div className="my-4 h-[200px] w-full bg-gray-100 flex items-center justify-center rounded shadow">
          <span className="text-gray-500 animate-pulse">
            <Loader />
          </span>
        </div>
      );
    }

    if (adError || !adData) {
      return null;
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
    <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 md:mx-[149px] sm:mx-8 mx-2">
      {/* Left Section */}
      <div className="w-full lg:w-8/12">
        <News />
        <div className="flex items-center justify-center mx-auto">
          {topAds&& topAds?.ad_image_url.length>0 && renderAd(topAds)}
        </div>
        {type !== "shorts" && isCommentEbaled && <Feedback setIsComment={setIsComment} isComment={isComment}/>}
        {type !== "shorts" && isCommentEbaled && <TotalCommnets setIsComment={setIsComment} isComment={isComment}/>}
        {/* <NewsFeed newsCard={articlesCard} /> */}
        {/* <NewsAppAd /> */}
        <div className="flex items-center justify-center mx-auto">
          {bottomAds&& bottomAds?.ad_image_url.length>0  &&renderAd(bottomAds)}
        </div>
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
