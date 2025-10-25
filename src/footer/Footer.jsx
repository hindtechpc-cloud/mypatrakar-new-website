
import  { useEffect, useState } from "react";
import FooterFaceBook from "./FooterFaceBook";
import PostsListWidget from "./PostsListWidget";
import SourceWidget from "./SourceWidget";
import FooterBottom from "./FooterBottom";
import HeaderAd from "../TopBar/HeaderAd";
import { GetBottomBannerAds } from "../../api";
import FooterLinks from "./FooterLinks";


export default function Footer() {
  const [topBanner, setTopBanner] = useState(null);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [bannerError, setBannerError] = useState(false);

  const loadTopBannerAds = async () => {
    try {
      setLoadingBanner(true);
      setBannerError(false);

      const res = await GetBottomBannerAds("");
      // console.log(res);
      if (res) {
        setTopBanner(res.data.response.top_banner);
      } else {
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
    <div className="bg-gray-50">
      {/* Top Banner Ad */}
      <div className="w-full bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          {loadingBanner ? (
            <div className="w-full h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          )  : topBanner && topBanner.ad_image_url.length > 0 ? (
            <div className="flex justify-center">
              <HeaderAd
                adData={topBanner}
                className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-950 text-gray-200 py-10">
        <div className=" mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <div className="md:col-span-2 lg:col-span-1">
              <FooterLinks/>
            </div>
            <div>
              <FooterFaceBook />
            </div>
            <div>
              <PostsListWidget />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <SourceWidget
                setShowLoginOverlay={setShowLoginOverlay}
                className="bg-white/10 backdrop-blur-sm rounded-xl py-6 w-full md:w-[300px]  h-[330px] shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <FooterBottom />
    </div>
  );
}
