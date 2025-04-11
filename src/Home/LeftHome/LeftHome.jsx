// import React from "react";
// import AddLeftHome1 from "./AddLeftHome1";
// import TopNews from "./TopNews/TopNews";
// import OwnState from "./ownState/OwnState";
// import State from "./State/State";
// import Game from "./game/Game";
// import EnterTainment from "./enterTainment/EnterTainment";
// import Country from "./Country/Country";
// import Election from "./election/Election";
// import HeaderAd from "../../TopBar/HeaderAd";

// export default function LeftHome() {
//   return (
//     <div className="w-full">
//       {/* <AddLeftHome1 /> */}
//       <HeaderAd
//   className="my-4 w-full h-[160px] flex justify-center items-center bg-gray-300 rounded shadow"
// />

//       <TopNews />
//       <OwnState />
//       <div className="my-2">
//         {/* <AddLeftHome1 /> */}
//         <HeaderAd
//   className="my-4 w-[full] h-[160px] flex justify-center items-center bg-gray-300 rounded shadow"
// />

//       </div>
//       <State />
//       <Game />
//       <EnterTainment />
//       <Country />
//       <Election />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { componentsMap } from "./componentsMap";

export default function LeftHome() {
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

  return (
    <div className="w-full">
      {layoutIds.map((id, index) => {
        const Component = componentsMap[id];

        // Return HeaderAd with specific props, others as default
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
