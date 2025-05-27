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
      "ad",
      "ownState",
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
