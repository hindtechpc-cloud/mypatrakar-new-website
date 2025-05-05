import React from "react";
import { GoDotFill } from "react-icons/go";
import Header from "./shared/Header";

const LiveTv = ({ videoId }) => {
  return (
    <div className="w-full max-w-md mx-auto py-6 px-4">
      <Header text="Live TV" />

      <div className="bg-white rounded-3xl p-1 shadow-xl">
        <div className="flex items-center gap-2 text-black text-xl font-bold mb-4 animate-pulse">
          <GoDotFill className="text-4xl text-red-500" />
          <span>Live Now</span>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <iframe
            className="w-full h-64 md:h-72 border-4 border-white rounded-2xl"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            title="YouTube Live Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* A glowing border effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-white opacity-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LiveTv;
