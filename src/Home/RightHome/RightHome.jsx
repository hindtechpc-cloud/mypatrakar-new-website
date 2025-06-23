import { useEffect, useState } from "react";
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

export default function RightHome() {
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
          top: topRes?.data?.response?.top_banner || null,
          main: mainRes?.data?.response?.top_banner || null,
          bottom: bottomRes?.data?.response?.top_banner || null,
        });
      } catch (error) {
        console.error("Error loading ads:", error);
      }
    };

    loadAds();
  }, []);

  return (
    <div>
      {pathname === "/" && <LiveTv />}
      <OwnState />
      <AddRightHome1 adData={ads.top} />
      <Trending />
      <LiveCricket />
      <Shorts />
      <AddRightHome1 adData={ads.main} />
      <Rashiphal />
      <JoinChannels />
      <StockInfo />
      <PollWidget />
      <WeatherWidget />
      <AddRightHome1 adData={ads.bottom} />
    </div>
  );
}
