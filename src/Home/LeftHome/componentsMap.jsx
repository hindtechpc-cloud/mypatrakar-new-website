// componentsMap.js

// Content Components
import TopNews from "./TopNews/TopNews";
import OwnState from "./ownState/OwnState";
import State from "./State/State";
import Game from "./game/Game";
import Entertainment from "./enterTainment/EnterTainment";
import Country from "./Country/Country";
import Election from "./election/Election";

// No Ads here now!
export const componentsMap = [
  {
    order: 3,
    section_title: "regional",
    category: "breaking",
    component: TopNews,
  },
  {
    order: 2,
    section_title: "own_state",
    category: "local",
    component: OwnState,
  },
  {
    order: 1,
    section_title: "state",
    category: "top_news",
    component: State,
  },
  {
    order: 4,
    section_title: "game",
    category: "fun",
    component: Game,
  },
  {
    order: 5,
    section_title: "entertainment",
    category: "movies",
    component: Entertainment,
  },
  {
    order: 6,
    section_title: "country",
    category: "national",
    component: Country,
  },
  {
    order: 7,
    section_title: "election",
    category: "politics",
    component: Election,
  },
];
