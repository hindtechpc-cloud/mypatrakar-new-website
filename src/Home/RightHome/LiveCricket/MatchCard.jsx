import React from "react";
import MatchHeader from "./MatchHeader";
import MatchTeams from "./MatchTeams";
import MatchStatus from "./MatchStatus";
import MatchScores from "./MatchScores";
import MatchMeta from "./MatchMeta";

const formatDate = (dateString) => {
  if (!dateString) return "Dec 26, 2024";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Dec 26, 2024";
  }
};

export default function MatchCard({ match }) {
  const innings = match?.score?.innings || [];
  const team1 = innings[0] || {};
  const team2 = innings[1] || {};
  return (
    <div className="flex-shrink-0 md:w-[335px] w-[295px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <MatchHeader isMatchLive={match?.status_text?.toLowerCase().includes("live")} />
      <MatchTeams team1={team1} team2={team2} />
      <MatchStatus status={match?.status_text} />
      <MatchScores team1={team1} team2={team2} />
      <MatchMeta venue={match?.venue} date={formatDate(match?.date)} />
    </div>
  );
}
