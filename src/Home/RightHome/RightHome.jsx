import LiveTv from "./LiveTv";
import Trending from "./trending/Trending";
import OwnState from "./OwnState/OwnState";
import AddRightHome1 from "./shared/AddRightHome1";
import LiveCricket from "./LiveCricket/LiveCricket";
import Shorts from "./shorts/Shorts";
import Rashiphal from "./Rashiphal/Rashiphal";
import JoinChannels from "./JoinChannels";
import { PollWidget } from "./poll/PollWidget";
import { WeatherWidget } from "./weather/WeatherWidget";
import StockMarcket from "./stockmarcket/StockMarcket";

export default function RightHome() {
  return (
    <div>
      <LiveTv />
      <Trending />
      <OwnState />
      <AddRightHome1 />
      <LiveCricket />
      <Shorts />
      <AddRightHome1 />
      <Rashiphal />
      <JoinChannels />
      <StockMarcket />
      <PollWidget />
      <WeatherWidget />
      <AddRightHome1 />
    </div>
  );
}
