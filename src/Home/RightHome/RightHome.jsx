
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// import LiveTv from "./LiveTv";
// import Trending from "./trending/Trending";
// import OwnState from "./OwnState/OwnState";
// import AddRightHome1 from "./shared/AddRightHome1";
// import LiveCricket from "./LiveCricket/LiveCricket";
// import Shorts from "./shorts/Shorts";
// import JoinChannels from "./JoinChannels";
// import { PollWidget } from "./poll/PollWidget";
// import { WeatherWidget } from "./weather/WeatherWidget";
// import StockInfo from "./stockmarcket/StockInfo";
// import Rashiphal from "./Rashiphal/Rashiphal";
// import MobileFrame from "./shorts/MobileFrame";
// import AppDownloadCard from "./AppDownloadCard";

// import {
//   GetRightTopAds,
//   GetRightMainAds,
//   GetRightBottomAds,
// } from "../../../api";
// import { useSettingsContext } from "../../context/SettingsContext";

// function RightHome() {
//   const { pathname } = useLocation();
//   const [ads, setAds] = useState({
//     top: null,
//     main: null,
//     bottom: null,
//   });

//   const { getSettingStatus } = useSettingsContext();

//   const isHoroscopeEnabled = getSettingStatus("Horoscope");
//   const isLiveStreamingEnabled = getSettingStatus("Live Streaming");
//   const isQuizEnabled = getSettingStatus("Quiz Polls");
//   const isSportsEnabled = getSettingStatus("Sports");
//   const isStockEnabled = getSettingStatus("Stock");
//   const isAds = getSettingStatus("In Web Ads");
//   const isWhatsAppTelegramEnabled = getSettingStatus(
//     "Whats App & Telegram Button"
//   );

//   // ✅ Detect iPad

 

//   // ✅ Only call ads API if it's iPad
//   useEffect(() => {
//     const loadAds = async () => {
//       if (!isAds || !isAds) return; // skip ads if not iPad or ads disabled

//       try {
//         const [topRes, mainRes, bottomRes] = await Promise.all([
//           GetRightTopAds(),
//           GetRightMainAds(),
//           GetRightBottomAds(),
//         ]);

//         setAds({
//           top: topRes?.data?.response?.top_banner ?? null,
//           main: mainRes?.data?.response?.main_banner ?? null,
//           bottom: bottomRes?.data?.response?.bottom_banner ?? null,
//         });
//       } catch (error) {
//         console.error("Error loading ads:", error);
//       }
//     };

//     loadAds();
//   }, [isAds, isAds]);

//   return (
//     <div>
//       {pathname === "/" && isLiveStreamingEnabled && <LiveTv />}
//       <OwnState />

//       {/* ✅ Ads will only appear if iPad */}
//       {isAds && <AddRightHome1 adsData={ads.top} text="top" />}

//       <Trending />

//       {!isSportsEnabled && <LiveCricket />}
//       <Shorts />

//       {isAds && <AddRightHome1 adsData={ads.main} text="main" />}
//       {isHoroscopeEnabled && <Rashiphal />}

//       {isAds && !isWhatsAppTelegramEnabled && <JoinChannels />}

//       {!isStockEnabled && <StockInfo />}
//       <AppDownloadCard />

//       {!isQuizEnabled && <PollWidget />}

//       <WeatherWidget />
//       <MobileFrame />

//       {isAds && <AddRightHome1 adsData={ads.bottom} text="bottom" />}
//     </div>
//   );
// }

// export default React.memo(RightHome);


import React from "react";
import { useLocation } from "react-router-dom";
import LiveTv from "./LiveTv";
import Trending from "./trending/Trending";
import OwnState from "./OwnState/OwnState";
import AddRightHome1 from "./shared/AddRightHome1";
import LiveCricket from "./LiveCricket/LiveCricket";
import Shorts from "./shorts/Shorts";
import JoinChannels from "./JoinChannels";
import { PollWidget } from "./poll/PollWidget";
import { WeatherWidget } from "./weather/WeatherWidget";
import StockInfo from "./stockmarcket/StockInfo";
import Rashiphal from "./Rashiphal/Rashiphal";
import MobileFrame from "./shorts/MobileFrame";
import AppDownloadCard from "./AppDownloadCard";
import { useSettingsContext } from "../../context/SettingsContext";
import { useRightHomeAds } from "../../hooks/useRightHomeAds";

function RightHome() {
  const { pathname } = useLocation();
  const { getSettingStatus } = useSettingsContext();

  const isHoroscopeEnabled = getSettingStatus("Horoscope");
  const isLiveStreamingEnabled = getSettingStatus("Live Streaming");
  const isQuizEnabled = getSettingStatus("Quiz Polls");
  const isSportsEnabled = getSettingStatus("Sports");
  const isStockEnabled = getSettingStatus("Stock");
  const isAds = getSettingStatus("In Web Ads");
  const isWhatsAppTelegramEnabled = getSettingStatus("Whats App & Telegram Button");

  // ✅ React Query Ads Hook
  const { topAds, mainAds, bottomAds, isLoading } = useRightHomeAds(isAds);

  return (
    <div>
      {pathname === "/" && isLiveStreamingEnabled && <LiveTv />}

      <OwnState />

      {!isAds && <AddRightHome1 adsData={topAds} text="top" />}
      <Trending />

      {isSportsEnabled && <LiveCricket />}
      <Shorts />

      {!isAds && <AddRightHome1 adsData={mainAds} text="main" />}
      {isHoroscopeEnabled && <Rashiphal />}

      {isAds && !isWhatsAppTelegramEnabled && <JoinChannels />}

      {isStockEnabled && <StockInfo />}
      <AppDownloadCard />

      {isQuizEnabled && <PollWidget />}

      <WeatherWidget />
      <MobileFrame />

      {isAds && <AddRightHome1 adsData={bottomAds} text="bottom" />}
    </div>
  );
}

export default React.memo(RightHome);
