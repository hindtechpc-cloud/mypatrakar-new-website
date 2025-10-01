import React from "react";
import { GoDotFill } from "react-icons/go";

export default function MatchStatus({ status }) {
  return (
    <div className="mb-4">
      <div className="inline-flex items-center gap-1 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
        <GoDotFill className="text-red-500 text-xs" />
        <span className="text-xs font-medium text-gray-700 truncate">
          {status || "Day 2: Stumps - India trail by 120 runs"}
        </span>
      </div>
    </div>
  );
}
