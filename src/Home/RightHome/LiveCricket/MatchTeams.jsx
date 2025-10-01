import React from "react";

export default function MatchTeams({ team1, team2 }) {
  return (
    <div className="text-center mb-4">
      <div className="flex flex-col items-center justify-between mb-3">
        {/* Team 1 */}
        <div className="flex-1 text-right">
          <span className="font-bold text-gray-900 text-sm block truncate">
            {team1?.team || "Team A"}
          </span>
        </div>

        {/* VS Badge */}
        <div className="mx-3">
          <span className="bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
            VS
          </span>
        </div>

        {/* Team 2 */}
        <div className="flex-1 text-left">
          <span className="font-bold text-gray-900 text-sm block truncate">
            {team2?.team || "Team B"}
          </span>
        </div>
      </div>
    </div>
  );
}
