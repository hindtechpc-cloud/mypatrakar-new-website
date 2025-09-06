// import React, { useEffect, useState } from "react";
// import FooterMenu from "./footerMenu";
// import FooterFaceBook from "./FooterFaceBook";
// // import FaceBookClone from './FaceBookClone'
// import FooterTwitter from "./FooterTwitter";
// import PostsListWidget from "./PostsListWidget";
// import SourceWidget from "./SourceWidget";
// import FooterBottom from "./FooterBottom";
// import HeaderAd from "../TopBar/HeaderAd";
// import { GetBottomBannerAds } from "../../api";

// export default function Footer() {
//   const [topBanner, setTopBanner] = useState(null);
//   const [showLoginOverlay, setShowLoginOverlay] = useState(false);
//   const [loadingBanner, setLoadingBanner] = useState(true);
//   const [bannerError, setBannerError] = useState(false);

//   const loadTopBannerAds = async () => {
//     try {
//       setLoadingBanner(true);
//       setBannerError(false);

//       const res = await GetBottomBannerAds("MYAWR241227001");

//       // Check for valid structure
//       if (res) {
//         // console.log(res);
//         setTopBanner(res.data.response.top_banner);
//       } else {
//         // console.warn("Top banner structure not valid or images missing");
//         setBannerError(true);
//       }
//     } catch (error) {
//       console.log("Error loading top banner ads:", error);
//       setBannerError(true);
//     } finally {
//       setLoadingBanner(false);
//     }
//   };

//   useEffect(() => {
//     loadTopBannerAds();
//   }, []);
//   return (
//     <div className="">
//       {topBanner && (
//         <div className=" flex items-center justify-center mx-auto">
//           {" "}
//           <HeaderAd
//             className="my-4 flex justify-center items-center bg-gray-300 rounded shadow
//              w-full h-[100px] sm:w-[728px] sm:h-[90px] md:w-[970px] mx-auto"
//             adData={topBanner}
//           />
//           {/* <Horoscope/> */}
//         </div>
//       )}
//       <div className="bg-blue-950 text-gray-200 py-10 font-noto ">
//         <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between md:items-start sm:items-center md:gap-5 gap-10  my-2 md:mx-14 sm:mx-8 mx-2 ">
//           <FooterMenu />
//           <FooterFaceBook />
//           {/* <FooterTwitter /> */}
//           <PostsListWidget />
//           <SourceWidget setShowLoginOverlay={setShowLoginOverlay} className="mx-auto  text-white shadow-lg w-[300px] `" />
//         </div>
//       </div>
//       <FooterBottom />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import FooterMenu from "./footerMenu";
import FooterFaceBook from "./FooterFaceBook";
import FooterTwitter from "./FooterTwitter";
import PostsListWidget from "./PostsListWidget";
import SourceWidget from "./SourceWidget";
import FooterBottom from "./FooterBottom";
import HeaderAd from "../TopBar/HeaderAd";
import { GetBottomBannerAds } from "../../api";

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
      console.log(res);
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
          ) : bannerError ? (
            <div className="w-full h-24 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-400 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-sm text-red-500">Ad failed to load</span>
            </div>
          ) : topBanner && topBanner.ad_image_url.length > 0 ? (
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
              <FooterMenu />
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
