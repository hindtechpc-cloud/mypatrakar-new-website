import { useEffect } from "react";
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
import { useAds } from "../../context/AdsContext";

export default function RightHome() {
  const { pathname } = useLocation();
  const { ads, getAds } = useAds();
  const { getSettingStatus } = useSettingsContext();

  const isHoroscopeEnabled = getSettingStatus("Hororscope");
  const isLiveStreamingEnabled = getSettingStatus("Live Streaming");
  const isQuizEnabled = getSettingStatus("Quiz Polls");
  const isSportsEnabled = getSettingStatus("Sports");
  const isStockEnabled = getSettingStatus("Stock");
  const isWhatsAppTelegramEnabled = getSettingStatus("Whats App & Telegram Button");

  const loadAds = async () => {
    try {
      await Promise.all([
        getAds("right_home_top_banner_ad", GetRightTopAds, "top"),
        getAds("right_home_main_banner_ad", GetRightMainAds, "main"),
        getAds("right_home_bottom_banner_ad", GetRightBottomAds, "bottom"),
      ]);
      console.log(ads?.top, ads?.main, ads?.bottom)
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  };

  useEffect(() => {
    loadAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {pathname === "/" && isLiveStreamingEnabled && <LiveTv />}
      <OwnState />
      <AddRightHome1 adsData={ads.top} text="top" />
      <Trending />
      {isSportsEnabled && <LiveCricket />}
      <Shorts />
      <AddRightHome1 adsData={ads.main} text="main" />
      {isHoroscopeEnabled && <Rashiphal />}
      {isWhatsAppTelegramEnabled && <JoinChannels />}
      {isStockEnabled && <StockInfo />}
      {isQuizEnabled && <PollWidget />}
      <WeatherWidget />
      <AddRightHome1 adsData={ads.bottom} text="bottom" />
    </div>
  );
}