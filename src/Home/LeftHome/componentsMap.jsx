// componentsMap.js

// Content Components
import TopNews from "./TopNews/TopNews";
import OwnState from "./ownState/OwnState";
import State from "./State/State";
import Game from "./game/Game";
import Entertainment from "./enterTainment/EnterTainment";
import Country from "./Country/Country";
import Election from "./election/Election";

// सिर्फ order → component mapping

export const componentsMap = {
  "MYFS28052025001": TopNews,
  "MYFS28052025002": OwnState,
  3: State,
  "MYFS28052025004": Game,
  "MYFS28052025005": Entertainment,
  "MYFS28052025003": Country,
  7: Election,
};
