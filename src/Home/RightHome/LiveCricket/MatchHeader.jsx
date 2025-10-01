import React from "react";
import { GoDotFill } from "react-icons/go";
import { FaBaseballBatBall } from "react-icons/fa6";

export default function MatchHeader({ isMatchLive }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <GoDotFill className={`text-red-500 text-xl ${isMatchLive ? "animate-pulse" : ""}`} />
        <h2 className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
          Live Cricket
        </h2>
      </div>
      <div className="bg-red-50 p-2 rounded-full">
        <FaBaseballBatBall className="text-red-500 rotate-90" size={20} />
      </div>
    </div>
  );
}
