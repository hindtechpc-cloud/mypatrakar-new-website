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
import { useLocation, useParams } from "react-router-dom";
import { useSettingsContext } from "../../context/SettingsContext";
import Loader from "../../utils/Loader";
import Header from "../RightHome/shared/Header";
import TopNews from "../LeftHome/TopNews/TopNews";
import { decryptData } from "../../utils/cryptoHelper";
import CategoryNews from "./CategoryNews";

export default function ReadNews() {
  const [topAds, setTopAds] = useState(null);
  const [bottomAds, setBottomAds] = useState(null);
  const [adError, setAdError] = useState(null);
  const [loadingAds, setLoadingAds] = useState(true);
  const { getSettingStatus } = useSettingsContext();
  const isCommentEbaled = getSettingStatus("Comments");
  const [isComment, setIsComment] = useState(false);
  const [category_id, setCategory_id] = useState("");
  const [newsCategory, setNewsCategory] = useState({
    category: "",
    c_id: "",
  });
  const location = useLocation();

  useEffect(() => {
    const section = JSON.parse(sessionStorage.getItem("featuredSections"));
    if (!section) {
      return;
    }
    setCategory_id(location.state?.category_id);
    setNewsCategory({
      category: section[0]?.category,
      c_id: section[0]?.category_id,
    });
  }, []);
  const { type, newsId } = useParams();

  // console.log(decryptData(newsId));
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
            {/* <Loader /> */}
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
  // console.log(JSON.parse(sessionStorage.getItem(`news_${newsCategory}`)))
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 md:mx-[149px] sm:mx-8 mx-2">
      {/* Left Section */}
      <div className="w-full">
        <News />
        <div className="flex items-center justify-center mx-auto">
          {topAds && topAds?.ad_image_url.length > 0 && renderAd(topAds)}
        </div>
        {type !== "shorts" && isCommentEbaled && (
          <Feedback setIsComment={setIsComment} isComment={isComment} />
        )}
        {type !== "shorts" && isCommentEbaled && (
          <TotalCommnets setIsComment={setIsComment} isComment={isComment} />
        )}
        {/* <NewsFeed newsCard={articlesCard} /> */}
        {/* category news are shown here  */}

        {/* <NewsAppAd /> */}
        <div className="flex items-center justify-center mx-auto">
          {bottomAds &&
            bottomAds?.ad_image_url.length > 0 &&
            renderAd(bottomAds)}
        </div>
        {/* <OwnState /> */}
        <CategoryNews category_id={category_id} />
        {newsCategory.c_id && newsCategory.category && (
          <TopNews
            category_id={newsCategory.c_id}
            section_title={newsCategory.category}
          />
        )}

        <div className="mt-10">
          <Header text="Videos" />
          <VideoGallery />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[335px]  xl:w-[335px] lg:w-[295px] -mt-9  lg:flex flex-1 items-center justify-center mx-auto">
        <RightHome />
      </div>
    </div>
  );
}
