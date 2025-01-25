import React from "react";
import AddLeftHome1 from "./AddLeftHome1";
import TopNews from "./TopNews/TopNews";
import OwnState from "./ownState/OwnState";
import State from "./State/State";
import Game from "./game/Game";
import EnterTainment from "./enterTainment/EnterTainment";
import Country from "./Country/Country";
import Election from "./election/Election";

export default function LeftHome() {
  return (
    <div className="w-full">
      <AddLeftHome1 />
      <TopNews />
      <OwnState />
      <div className="my-2">
        <AddLeftHome1 />
      </div>
      <State />
      <Game />
      <EnterTainment />
      <Country />
      <Election />
    </div>
  );
}
