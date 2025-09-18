import { useEffect, useState } from "react";
import { featuredmenulist } from "../../../api";
import TopNews from "./TopNews/TopNews";
import OwnState from "./ownState/OwnState";
import State from "./State/State";
import Game from "./game/Game";
import Entertainment from "./enterTainment/EnterTainment";
import Country from "./Country/Country";
import Election from "./election/Election";

 let  screensIds=[];
export default function useFeaturedScreens() {
  // const [screens, setScreens] = useState([]);

  useEffect(() => {
    const loadFeaturedScreens = async () => {
      try {
        const res = await featuredmenulist();
        screensIds(res.data.response); // API response
      } catch (error) {
        console.log(error);
      }
    };
    loadFeaturedScreens();
  }, []);

 
}

// Content Components


// सिर्फ order → component mapping

export const componentsMap = {
  1: TopNews,
  2: OwnState,
  3: State,
  4: Game,
  5: Entertainment,
  6: Country,
  7: Election,
};

