// import LiveTv from "./LiveTv";
// import Trending from "./trending/Trending";
// import OwnState from "./OwnState/OwnState";
// import AddRightHome1 from "./shared/AddRightHome1";
// import LiveCricket from "./LiveCricket/LiveCricket";
// import Shorts from "./shorts/Shorts";
// import JoinChannels from "./JoinChannels";
// import { PollWidget } from "./poll/PollWidget";
// import { WeatherWidget } from "./weather/WeatherWidget";
// import StockMarcket from "./stockmarcket/StockMarcket";
// import SourceWidget from "../../footer/SourceWidget";
// import { useLocation } from "react-router-dom";
// import Youtube from "./Youtube";
// import CorporateActions from "./stockmarcket/CorporateActions";
// import StockInfo from "./stockmarcket/StockInfo";
// import Rashiphal from "./Rashiphal/Rashiphal";
// import { GetRightBottomAds, GetRightMainAds, GetRightTopAds } from "../../../api";
// import { useEffect, useState } from "react";
// export default function RightHome() {
//   const location = useLocation();
//   const url = location.pathname;

//   const [topAds, setTopAds] = useState(null);
//   const [mainAds, setMainAds] = useState(null);
//   const [bottomAds, setBottomAds] = useState(null);
//   const loadTopAds = async () => {
//     try {
//       const res = await GetRightTopAds();
//       console.log(res.data.response.top_banner);
//       setTopAds(res?.data?.response?.top_banner || null);
//     } catch (error) {
//       console.error("Error loading top ads:", error);
//     }
//   };
//   useEffect(() => {
//     loadTopAds();
//   },[]);

//    const loadMainAds = async () => {
//     try {
//       const res = await GetRightMainAds();
//       console.log(res.data.response.top_banner);
//       setMainAds(res?.data?.response?.top_banner || null);
//     } catch (error) {
//       console.error("Error loading top ads:", error);
//     }
//   };
//   useEffect(() => {
//     loadMainAds();
//   },[]);

  
//    const loadBottomAds = async () => {
//     try {
//       const res = await GetRightBottomAds();
//       console.log(res.data.response.top_banner);
//       setBottomAds(res?.data?.response?.top_banner || null);
//     } catch (error) {
//       console.error("Error loading top ads:", error);
//     }
//   };
//   useEffect(() => {
//     loadBottomAds();
//   },[]);
//   return (
//     <div>
//       {url === "/" && <LiveTv />}
//       <Trending />
//       {/* <Youtube  /> */}
//       <OwnState />
//       <AddRightHome1 adData={topAds} />
//       <LiveCricket />
//       <Shorts />
//       <AddRightHome1 adData={mainAds}/>
//       <Rashiphal />
//       <JoinChannels />
//       {/* <StockMarcket /> */}
//       {/* <CorporateActions/> */}
//       <StockInfo />
//       {/* <SourceWidget className="bg-red-900 mx-auto md:max-w-sm  w-[300px]  py-4 text-white shadow-lg  my-4 p-4 rounded-lg" /> */}
//       <PollWidget />
//       <WeatherWidget />
//       <AddRightHome1 adData={bottomAds}/>
//     </div>
//   );
// }


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
      <Trending />
      <OwnState />
      <AddRightHome1 adData={ads.top} />
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
