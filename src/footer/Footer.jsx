import React, { useEffect, useState } from "react";
import FooterMenu from "./footerMenu";
import FooterFaceBook from "./FooterFaceBook";
// import FaceBookClone from './FaceBookClone'
import FooterTwitter from "./FooterTwitter";
import PostsListWidget from "./PostsListWidget";
import SourceWidget from "./SourceWidget";
import FooterBottom from "./FooterBottom";
import HeaderAd from "../TopBar/HeaderAd";
import { GetBottomBannerAds } from "../../api";

export default function Footer() {

  const [topBanner, setTopBanner] = useState(null);
    const [loadingBanner, setLoadingBanner] = useState(true);
    const [bannerError, setBannerError] = useState(false);
  
    const loadTopBannerAds = async () => {
      try {
        setLoadingBanner(true);
        setBannerError(false);
  
        const res = await GetBottomBannerAds("MYAWR241227001");
  
        // Check for valid structure
        if (res) {
          // console.log(res);
          setTopBanner(res.data.response.top_banner);
        } else {
          // console.warn("Top banner structure not valid or images missing");
          setBannerError(true);
        }
      } catch (error) {
        console.log("Error loading top banner ads:", error);
        setBannerError(true);
      } finally {
        setLoadingBanner(false);
      }
    };
  
    useEffect(() => {
      loadTopBannerAds();
    }, []);
  return (
    <div className="">
      
      <div className=" flex items-center justify-center mx-auto">
        {" "}
        <HeaderAd
          className="my-4 flex justify-center items-center bg-gray-300 rounded shadow 
             w-full h-[100px] sm:w-[728px] sm:h-[90px] md:w-[970px] mx-auto"
             adData={topBanner}
        />
        {/* <Horoscope/> */}
      </div>
      <div className="bg-blue-950 text-gray-200 py-10 font-noto ">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between md:items-start sm:items-center md:gap-5 gap-10  my-2 md:mx-14 sm:mx-8 mx-2 ">
          <FooterMenu />
          <FooterFaceBook />
          {/* <FooterTwitter /> */}
          <PostsListWidget />
          <SourceWidget className="mx-auto  text-white shadow-lg w-[300px] `" />
        </div>
      </div>
      <FooterBottom />
    </div>
  );
}
