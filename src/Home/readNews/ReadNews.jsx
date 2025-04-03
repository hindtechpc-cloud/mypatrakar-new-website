import React from "react";
import RightHome from "../RightHome/RightHome";
import News from "./News";
// import AddLeftHome1 from "../LeftHome/AddLeftHome1";
import Feedback from "./feedback/Feedback";
import NewsFeed from "./newsfeed/NewsFeed";
import NewsAppAd from "./NewsAppAd";
import OwnState from "../LeftHome/OwnState/OwnState";
import VideoGallery from "./videos/VideoGallery";
import { articlesCard } from "../search/news";
import HeaderAd from "../../TopBar/HeaderAd";

export default function ReadNews() {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-12 my-2 md:mx-14 sm:mx-8 mx-2 ">
      {/* Left Section */}
      <div className="w-full lg:w-8/12">
        <News />
        <HeaderAd
          className="my-4 flex justify-center items-center bg-gray-300  w-full rounded"
          height={"200px"}
        />
        <Feedback />

        <NewsFeed newsCard={articlesCard} />

        <NewsAppAd />
        <OwnState />
        <VideoGallery />
      </div>

      {/* Right Section */}
      <div className="w-full  lg:w-4/12">
        <RightHome />
      </div>
    </div>
  );
}
