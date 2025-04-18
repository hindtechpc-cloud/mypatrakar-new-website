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
import SourceWidget from "../../footer/SourceWidget";
import { useLocation } from "react-router-dom";
import Youtube from "./Youtube";
import { useEffect, useState } from "react";
import { componentsMap } from "../LeftHome/componentsMap";

export default function Right() {
  const [layoutIds, setLayoutIds] = useState([]);
  // Simulating fetching component IDs from the backend
  useEffect(() => {
    // Example layout from backend
    const fetchedLayout = [
      "ad",
      "topNews",
      "ownState",
      "ad",
      "state",
      "game",
      "entertainment",
      "country",
      "election",
    ];
    setLayoutIds(fetchedLayout);
  }, []);
  const location = useLocation();
  const url = location.pathname;

  return (
    <div className="w-full">
      {layoutIds.map((id, index) => {
        const Component = componentsMap[id];
        if (id === "ad") {
          return (
            <Component
              key={index}
              className="my-4 w-full h-[160px] flex justify-center items-center bg-gray-300 rounded shadow"
            />
          );
        }
        return Component ? <Component key={index} /> : null;
      })}
    </div>
  );
}
