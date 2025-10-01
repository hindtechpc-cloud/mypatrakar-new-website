import React from "react";
import { GoDotFill } from "react-icons/go";
import { FaBaseballBatBall } from "react-icons/fa6";
import liveCricket from "../../../assets/live-cricket.jpg";

export default function EmptyState() {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <GoDotFill className="text-red-500 text-xl" />
            <h2 className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Live Cricket
            </h2>
          </div>
          <div className="bg-red-50 p-2 rounded-full">
            <FaBaseballBatBall className="text-red-500 rotate-90" size={20} />
          </div>
        </div>

        {/* Image with bottom overlay text */}
        <a
          href="https://www.cricbuzz.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block w-full"
        >
          <img
            src={liveCricket}
            alt="Live cricket scores on Cricbuzz"
            className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          />
          {/* Overlay text */}
          <div className="absolute bottom-10 left-0 right-0 to-transparent rounded-b-lg px-3 py-2">
            <p className="text-white text-xl font-semibold">
              Live Cricket • Live Score
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
