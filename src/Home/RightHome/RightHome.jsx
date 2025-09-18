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

//   useEffect(() => {
//     const loadAds = async () => {
//       try {
//         const [topRes, mainRes, bottomRes] = await Promise.all([
//           GetRightTopAds(),
//           GetRightMainAds(),
//           GetRightBottomAds(),
//         ]);

//         setAds({
//           top: topRes?.data?.response?.top_banner || null,
//           main: mainRes?.data?.response?.top_banner || null,
//           bottom: bottomRes?.data?.response?.top_banner || null,
//         });
//       } catch (error) {
//         console.error("Error loading ads:", error);
//       }
//     };

//     loadAds();
//   }, []);
//   const { getSettingStatus } = useSettingsContext();
//   const isHoroscopeEnabled = getSettingStatus("Hororscope");
//   const isLiveStreamingEnabled = getSettingStatus("Live Streaming");
//   const isQuizEnabled = getSettingStatus("Quiz Polls");
//   const isSportsEnabled = getSettingStatus("Sports");
//   const isStockEnabled = getSettingStatus("Stock");
//   const isWhatsAppTelegramEnabled = getSettingStatus(
//     "Whats App & Telegram Button"
//   );
//   return (
//     <div>
//       {pathname === "/" && isLiveStreamingEnabled && <LiveTv />}
//       <OwnState />
//       <AddRightHome1 adsData={ads.top} text="top" />
//       <Trending />
//       {isSportsEnabled && <LiveCricket />}
//       <Shorts />
//       <AddRightHome1 adsData={ads.main} text={"main"} />
//       {isHoroscopeEnabled && <Rashiphal />}
//       {isWhatsAppTelegramEnabled && <JoinChannels />}
//       {isStockEnabled && <StockInfo />}
//       {isQuizEnabled && <PollWidget />}
//       <WeatherWidget />
//       <AddRightHome1 adsData={ads.bottom} text="bottom" />
//     </div>
//   );
// }

// export default React.Memo(RightHome);



import React, { useEffect, useState } from "react";
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

import {
  GetRightTopAds,
  GetRightMainAds,
  GetRightBottomAds,
} from "../../../api";
import { useSettingsContext } from "../../context/SettingsContext";

function RightHome() {
  const { pathname } = useLocation();
  const [ads, setAds] = useState({
    top: null,
    main: null,
    bottom: null,
  });

  useEffect(() => {
    const loadAds = async () => {
      try {
        const [topRes, mainRes, bottomRes] = await Promise.all([
          GetRightTopAds(),
          GetRightMainAds(),
          GetRightBottomAds(),
        ]);

        setAds({
          top: topRes?.data?.response?.top_banner ?? null,
          main: mainRes?.data?.response?.main_banner ?? null,
          bottom: bottomRes?.data?.response?.bottom_banner ?? null,
        });
      } catch (error) {
        console.error("Error loading ads:", error);
      }
    };

    loadAds();
  }, []);

  const { getSettingStatus } = useSettingsContext();

  const isHoroscopeEnabled = getSettingStatus("Horoscope");
  const isLiveStreamingEnabled = getSettingStatus("Live Streaming");
  const isQuizEnabled = getSettingStatus("Quiz Polls");
  const isSportsEnabled = getSettingStatus("Sports");
  const isStockEnabled = getSettingStatus("Stock");
  const isWhatsAppTelegramEnabled = getSettingStatus("Whats App & Telegram Button");

  return (
    <div>
      {pathname === "/" && isLiveStreamingEnabled && <LiveTv />}

      <OwnState />

      <AddRightHome1 adsData={ads.top} text="top" />

      <Trending />

      {isSportsEnabled && <LiveCricket />}

      <Shorts />

      <AddRightHome1 adsData={ads.main} text="main" className="mt-[9px]"/>

      {isHoroscopeEnabled && <Rashiphal />}

      {isWhatsAppTelegramEnabled && <JoinChannels />}

      {isStockEnabled && <StockInfo />}

      {isQuizEnabled && <PollWidget />}

      <WeatherWidget />

      <AddRightHome1 adsData={ads.bottom} text="bottom" />
    </div>
  );
}

export default React.memo(RightHome);
