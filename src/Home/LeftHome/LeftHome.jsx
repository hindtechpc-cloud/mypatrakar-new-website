// // // src/Home/LeftHome/LeftHome.jsx
// // import React, { useEffect, useState } from "react";
// // import { componentsMap } from "./componentsMap";
// // import {
// //   GetFeaturedSection,
// //   GetLeftBannerAds,
// //   GetLeftHomeMainAds,
// // } from "../../../api";
// // import HeaderAd from "../../TopBar/HeaderAd";
// // import Election from "./election/Election";
// // import { useSettingsContext } from "../../context/SettingsContext";
// // import { AdCardSkeleton } from "../market/components/Skeleton";
// // import { useAds } from "../../context/AdsContext";

// // export default function LeftHome() {
// //   const [featured, setFeatured] = useState([]);
// //   const [loadingAds, setLoadingAds] = useState(true);
// //   const [adError, setAdError] = useState(null);
// //   const { ads, getAds } = useAds();
// //   const { getSettingStatus } = useSettingsContext();
// //   const isElectionEnabled = getSettingStatus("Exit Polls");

// //   const loadFeaturedSection = async () => {
// //     try {
// //       const res = await GetFeaturedSection("MYAWR241227001");
// //       const sorted = res.data.response.sort((a, b) => a.order - b.order);
// //       setFeatured(sorted);
// //     } catch (error) {
// //       console.error(error);
// //       setAdError("Failed to load featured section");
// //     }
// //   };

// //   const loadAds = async () => {
// //     setLoadingAds(true);
// //     try {
// //       const [topRes, mainRes] = await Promise.all([
// //         // getAds("left_home_top_banner_ad", GetLeftBannerAds, ""),
// //         // getAds("left_home_main_banner_ad", GetLeftHomeMainAds, ""),
// //         GetLeftBannerAds(),
// //         GetLeftHomeMainAds(),
// //       ]);
// //       // console.log(topRes);
// //       ads.top = topRes?.top_banner || null;
// //       ads.main = mainRes?.top_banner || null;
// //     } catch (err) {
// //       console.error("Ad loading error:", err);
// //       setAdError("Ads could not be loaded.");
// //     } finally {
// //       setLoadingAds(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadFeaturedSection();
// //     loadAds();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   const renderAd = (adData, label) => {
// //     console.log(adData)
// //     return (
// //       <div className="w-full">
// //         {loadingAds ? (
// //           <div className="h-[160px] bg-gray-100 flex items-center justify-center rounded shadow">
// //             <span className="text-sm text-gray-500 animate-pulse">
// //               Loading {label}...
// //             </span>
// //           </div>
// //         ) : adError || !adData ? (
// //           <div className="h-[160px] bg-gray-100 flex items-center justify-center rounded shadow">
// //             <span className="text-sm text-red-500">
// //               {/* {adError || "Ad not available"} */}
// //             </span>
// //           </div>
// //         ) : (
// //           <HeaderAd adData={adData} text="leftHome" />
// //         )}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="w-full space-y-4">
// //       {/* ✅ Top Ad */}
// //       {ads.top && renderAd(ads.top, "Top Banner Ad")}

// //       {/* ✅ Featured Components with mid Ad */}
// //       {featured.map((section, index) => {
// //         const match = componentsMap.find(
// //           (item) =>
// //             item.order === section.order
// //             // item.section_title === section.section_title ||
// //             // !item.category ||
// //             // item.category === section.category
// //         );

// //         const Component = match?.component;

// //         return (
// //           <React.Fragment key={index}>
// //             {Component ? (
// //               <Component
// //                 section_id={section.section_id}
// //                 category_id={section.category_id}
// //                 category={section.category}
// //                 section_title={section.section_title}
// //                 web_section_id={section.web_section_id}
// //               />
// //             ) : (
// //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {[...Array(6)].map((_, i) => (
// //                   <AdCardSkeleton key={i} />
// //                 ))}
// //               </div>
// //             )}

// //             {/* ✅ Show mid Ad after 2nd component */}
// //             {index === 1 && ads.main && renderAd(ads.main, "Main Banner Ad")}
// //           </React.Fragment>
// //         );
// //       })}

// //       {!isElectionEnabled && <Election />}
// //     </div>
// //   );
// // }

// // src/Home/LeftHome/LeftHome.jsx
// import React, { useEffect, useState } from "react";
// import { componentsMap } from "./componentsMap";
// import {
//   GetFeaturedSection,
//   GetLeftBannerAds,
//   GetLeftHomeMainAds,
// } from "../../../api";
// import HeaderAd from "../../TopBar/HeaderAd";
// import Election from "./election/Election";
// import { useSettingsContext } from "../../context/SettingsContext";
// import { AdCardSkeleton } from "../market/components/Skeleton";
// import { useAds } from "../../context/AdsContext";

// export default function LeftHome() {
//   const [featured, setFeatured] = useState([]);
//   const [loadingAds, setLoadingAds] = useState(true);
//   const [adError, setAdError] = useState(null);
//   const { ads, getAds } = useAds();
//   const { getSettingStatus } = useSettingsContext();
//   const isElectionEnabled = getSettingStatus("Exit Polls");

//   const loadFeaturedSection = async () => {
//     try {
//       const res = await GetFeaturedSection();
//       console.log(res);
//       const sorted = res.data.response.sort((a, b) => a.order - b.order);
//       setFeatured(sorted);
//     } catch (error) {
//       console.log(error);
//       setAdError("Failed to load featured section");
//     }
//   };

//   const loadAds = async () => {
//     setLoadingAds(true);
//     try {
//       const [topRes, mainRes] = await Promise.all([
//         GetLeftBannerAds(),
//         GetLeftHomeMainAds(),
//       ]);
//       ads.top = topRes?.top_banner || null;
//       ads.main = mainRes?.top_banner || null;
//     } catch (err) {
//       console.log("Ad loading error:", err);
//       setAdError("Ads could not be loaded.");
//     } finally {
//       setLoadingAds(false);
//     }
//   };

//   useEffect(() => {
//     loadFeaturedSection();
//     loadAds();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const renderAd = (adData, label) => {
//     return (
//       <div className="w-full mb-6">
//         {loadingAds ? (
//           <div className="w-full h-40 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md flex items-center justify-center">
//             <div className="animate-pulse flex flex-col items-center">
//               <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
//               <div className="h-3 w-24 bg-gray-300 rounded"></div>
//             </div>
//           </div>
//         ) : adError || !adData ? (
//           <div className="w-full h-40 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl flex flex-col items-center justify-center p-4 shadow-md">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <span className="text-sm text-red-500 text-center">
//               {adError || `${label} not available`}
//             </span>
//           </div>
//         ) : (
//           <HeaderAd adData={adData} text="leftHome" />
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="w-full space-y-6 px-4 md:px-0">
//       {/* Top Ad */}
//       {ads.top && renderAd(ads.top, "Top Banner")}

//       {/* Featured Components with mid Ad */}
//       <div className="grid grid-cols-1 gap-6">
//         {featured.map((section, index) => {
//           const match = componentsMap.find(
//             (item) => item.order === section.order
//           );

//           const Component = match?.component;

//           return (
//             <React.Fragment key={index}>
//               <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
//                 {Component ? (
//                   <Component
//                     section_id={section.section_id}
//                     category_id={section.category_id}
//                     category={section.category}
//                     section_title={section.section_title}
//                     web_section_id={section.web_section_id}
//                   />
//                 ) : (
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">{section.section_title}</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                       {[...Array(6)].map((_, i) => (
//                         <AdCardSkeleton key={i} />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Show mid Ad after 2nd component */}
//               {index === 1 && ads.main && (
//                 <div className="my-4">
//                   {renderAd(ads.main, "Main Banner")}
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>

//       {!isElectionEnabled && (
//         <div className="mt-6">
//           <Election />
//         </div>
//       )}
//     </div>
//   );
// }

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

  // const { ads, setAds } = useAds();
  //  // ✅ useAds me setAds hona chahiye
  const [ads,setAds]=useState({
    top:{},
    main:{}
  })
  const { getSettingStatus } = useSettingsContext();
  const isElectionEnabled = getSettingStatus("Exit Polls");
// console.log((ads))
  const loadFeaturedSection = async () => {
    try {
      const res = await GetFeaturedSection(); // ✅ param wapas daala
      // console.log(res);
      const sorted = res.data.response.sort((a, b) => a.order - b.order);
      // console.log(res)
      setFeatured(sorted);
    } catch (error) {
      console.log("Featured section load error:", error);
      setAdError("Failed to load featured section");
    }
  };
// console.log("s")
  const loadAds = async () => {
    setLoadingAds(true);
    try {
      const [topRes, mainRes] = await Promise.all([
        GetLeftBannerAds(),
        GetLeftHomeMainAds(),
      ]);
// console.log(topRes.data.response.top_banner)
      // ✅ ads state ko update karna (immutably)
      setAds((prev) => ({
        ...prev,
        top: topRes.data.response.top_banner || null,
        main: mainRes.data.response.top_banner|| null,
      }));
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
// console.log(ads)
  const renderAd = (adData, label) => {
    return (
      <div className="w-full  flex items-center justify-center">
        {loadingAds ? (
          <div className="w-full h-40 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        ) : adError || !adData ? null
         : (
          <HeaderAd adData={adData} text="leftHome" className="w-full"/>
        )}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6 px-4 md:px-0">
      {/* ✅ Top Ad */}
      {ads?.top&& ads?.top?.ad_image_url?.length>0 && renderAd(ads?.top, "Top Banner")}

      {/* ✅ Featured Components */}
      <div className="grid grid-cols-1 gap-6">
        {featured.map((section, index) => {
          const match = componentsMap.find(
            (item) => item.order === section.order
          );

          const Component = match?.component;

          return (
            <React.Fragment key={index}>
              <div className=" ">
                {Component ? (
                  <Component
                    section_id={section.section_id}
                    category_id={section.category_id}
                    category={section.category}
                    section_title={section.section_title}
                    
                    web_section_id={section.web_section_id}
                  />
                ) : (
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

              {/* ✅ Mid Ad after 2nd component */}
              {index === 2 && ads?.main&& ads.main.ad_image_url?.length>0 && (
                <div className="mt-4">{renderAd(ads.main, "Main Banner")}</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ✅ Election Section */}
      {!isElectionEnabled && (
        <div className="mt-6">
          <Election />
        </div>
      )}
    </div>
  );
}
