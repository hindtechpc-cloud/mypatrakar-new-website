import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function MatchMeta({ venue, date }) {
  return (
    <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
        <span className="truncate">{venue || "Melbourne Cricket Ground"}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaCalendarAlt className="text-gray-400 flex-shrink-0" />
        <span>{date || "Dec 26, 2024"}</span>
      </div>
    </div>
  );
}
