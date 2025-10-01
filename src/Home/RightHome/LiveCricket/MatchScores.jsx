import React from "react";
import { FaBaseballBatBall } from "react-icons/fa6";

export default function MatchScores({ team1, team2 }) {
  return (
    <div className="space-y-2 mb-4">
      {/* Team 1 */}
      <div className="flex justify-between items-center bg-gradient-to-r from-red-50 to-white px-3 py-3 rounded-xl border border-red-100 shadow-sm">
        <div className="flex items-center gap-2">
          <FaBaseballBatBall className="text-red-400 rotate-90" size={14} />
          <span className="text-xs font-semibold text-gray-800 truncate max-w-[80px]">
            {team1?.team || "Team A"}
          </span>
        </div>
        <div className="text-right">
          <span className="font-bold text-gray-900 text-sm">
            {team1?.runs || 0}/{team1?.wickets || 0}
          </span>
          <span className="text-xs text-gray-500 ml-1">
            ({team1?.overs || 0.0} ov)
          </span>
        </div>
      </div>

      {/* Team 2 */}
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-white px-3 py-3 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <FaBaseballBatBall className="text-gray-500 rotate-90" size={14} />
          <span className="text-xs font-semibold text-gray-800 truncate max-w-[80px]">
            {team2?.team || "Team B"}
          </span>
        </div>
        <div className="text-right">
          <span className="font-bold text-gray-900 text-sm">
            {team2?.runs || 0}/{team2?.wickets || 0}
          </span>
          <span className="text-xs text-gray-500 ml-1">
            ({team2?.overs || 0.0} ov)
          </span>
        </div>
      </div>
    </div>
  );
}
