// import React, { useEffect, useState } from "react";
// import { componentsMap } from "./componentsMap";
// import {
//   GetFeaturedSection,
//   GetLeftBannerAds,
//   GetLeftHomeMainAds,
// } from "../../../api";

// export default function LeftHome() {
//   const [layoutIds, setLayoutIds] = useState([]);
//   const [topBannerAd, setTopBannerAd] = useState(null);
//   const [mainBannerAd, setMainBannerAd] = useState(null);
//   const [loadingAds, setLoadingAds] = useState(true);
//   const [adError, setAdError] = useState(null);

//   const [featured, setFeatured] = useState([]);

//   const loadFeaturedSection = async () => {
//     try {
//       const res = await GetFeaturedSection("MYAWR241227001");
//       console.log(res);
//       setFeatured(res.data.response);
//     } catch (error) {
//       console.log(error)
//       setAdError(error.response.message);
//     }
//   };
//   useEffect(() => {
//     loadFeaturedSection();
//   }, []);

//   // Example layout from backend
//   useEffect(() => {
//     const fetchedLayout = [
//       "ad", // Will render topBannerAd
//       "topNews",
//       "ownState",
//       "state",
//       "game",
//       "ad", // Will render mainBannerAd on second "ad"
//       "entertainment",
//       "country",
//       "election",
//     ];
//     setLayoutIds(fetchedLayout);
//   }, []);

//   // Load both ads in parallel
//   const loadAds = async () => {
//     setLoadingAds(true);
//     try {
//       const [topRes, mainRes] = await Promise.all([
//         GetLeftBannerAds(""),
//         GetLeftHomeMainAds(""),
//       ]);
//       // console.log(mainRes)

//       setTopBannerAd(topRes?.data?.response?.top_banner || null);
//       setMainBannerAd(mainRes?.data?.response?.top_banner || null);
//     } catch (err) {
//       console.error("Ad loading error:", err);
//       setAdError("Ads could not be loaded at this time.");
//     } finally {
//       setLoadingAds(false);
//     }
//   };

//   useEffect(() => {
//     loadAds();
//   }, []);

//   let adRenderCount = 0; // To alternate between topBannerAd and mainBannerAd

//   return (
//     <div className="w-full space-y-4">
//       {layoutIds.map((id, index) => {
//         const Component = componentsMap[id];

//         // Handle "ad" blocks with alternating ad data
//         if (id === "ad") {
//           const currentAd = adRenderCount === 0 ? topBannerAd : mainBannerAd;
//           const adPosition =
//             adRenderCount === 0 ? "Top Banner Ad" : "Main Banner Ad";
//           adRenderCount++;

//           return (
//             <div key={index} className="w-full">
//               {loadingAds ? (
//                 <div className="h-[160px] w-full bg-gray-100 flex items-center justify-center rounded shadow">
//                   <span className="text-sm text-gray-500 animate-pulse">
//                     Loading {adPosition}...
//                   </span>
//                 </div>
//               ) : adError || !currentAd ? (
//                 <div className="h-[160px] w-full bg-gray-100 flex items-center justify-center rounded shadow">
//                   <span className="text-sm text-red-500">
//                     {adError || "Ad not available"}
//                   </span>
//                 </div>
//               ) : (
//                 <Component
//                   className="my-2 w-full h-[160px] flex justify-center items-center bg-gray-100 rounded shadow"
//                   adData={currentAd}
//                   text="leftHome"
//                 />
//               )}
//             </div>
//           );
//         }

//         // Render other components dynamically
//         return Component ? (
//           <Component key={index} />
//         ) : (
//           <div key={index} className="text-sm text-red-400">
//             Unknown component: {id}
//           </div>
//         );
//       })}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { componentsMap } from "./componentsMap";
import {
  GetFeaturedSection,
  GetLeftBannerAds,
  GetLeftHomeMainAds,
} from "../../../api";
import HeaderAd from "../../TopBar/HeaderAd";

export default function LeftHome() {
  const [featured, setFeatured] = useState([]);
  const [ads, setAds] = useState({ top: null, main: null });
  const [loadingAds, setLoadingAds] = useState(true);
  const [adError, setAdError] = useState(null);

  // Load featured sections
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

  // Load ads
  const loadAds = async () => {
    setLoadingAds(true);
    try {
      const [topRes, mainRes] = await Promise.all([
        GetLeftBannerAds(""),
        GetLeftHomeMainAds(""),
      ]);
      setAds({
        top: topRes?.data?.response?.top_banner || null,
        main: mainRes?.data?.response?.top_banner || null,
      });
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
  }, []);

const renderAd = (adData, label) => {
  console.log("Rendering ad for", label, ":", adData);
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
          <span className="text-sm text-red-500">{adError || "Ad not available"}</span>
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
      {renderAd(ads.top, "Top Banner Ad")}

      {/* ✅ Featured Components with mid Ad */}
      {featured.map((section, index) => {
        // Match based on all 3 keys
        const match = componentsMap.find(
          (item) =>
            item.order === section.order||
            item.section_title === section.section_title ||
            (!item.category || item.category === section.category)
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
              <div className="text-sm text-yellow-500 px-2 py-1 border rounded">
                Skipped: No matching component for{" "}
                <strong>
                  {section.order} / {section.section_title} / {section.category}
                </strong>
              </div>
            )}

            {/* ✅ Show mid Ad after 2nd component */}
            {index === 1 && renderAd(ads.main, "Main Banner Ad")}
          </React.Fragment>
        );
      })}
    </div>
  );
}



