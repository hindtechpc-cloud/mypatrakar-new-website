import LiveTv from "./LiveTv";
import Trending from "./trending/Trending";
import OwnState from "./OwnState/OwnState";
import AddRightHome1 from "./shared/AddRightHome1";
import LiveCricket from "./LiveCricket/LiveCricket";
import Shorts from "./shorts/Shorts";
import JoinChannels from "./JoinChannels";
import { PollWidget } from "./poll/PollWidget";
import { WeatherWidget } from "./weather/WeatherWidget";
import StockMarcket from "./stockmarcket/StockMarcket";
import SourceWidget from "../../footer/SourceWidget";
import { useLocation } from "react-router-dom";
import Youtube from "./Youtube";
import CorporateActions from "./stockmarcket/CorporateActions";
import StockInfo from "./stockmarcket/StockInfo";
import Rashiphal from "./Rashiphal/Rashiphal";
export default function RightHome() {
  const location = useLocation();
  const url = location.pathname;
  return (
    <div>
      {url === "/" && <LiveTv />}
      <Trending />
      <Youtube />
      <OwnState />
      <AddRightHome1 />
      <LiveCricket />
      <Shorts />
      <AddRightHome1 />
      <Rashiphal />
      <JoinChannels />
      {/* <StockMarcket /> */}
      {/* <CorporateActions/> */}
      <StockInfo/>
      <SourceWidget className="bg-red-900 mx-auto md:max-w-sm  w-[300px]  py-4 text-white shadow-lg  my-4 p-4 rounded-lg" />
      <PollWidget />
      <WeatherWidget />
      <AddRightHome1 />
    </div>
  );
}
