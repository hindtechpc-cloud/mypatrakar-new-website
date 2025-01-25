import React from "react";
import { GoDotFill } from "react-icons/go";
import Header from "./shared/Header";

const LiveTv = ({ videoId }) => {
  return (
   <div>
    <Header text="Live TV" />
     <div className="flex-1 items-center justify-center w-full h-full p-4 bg-gray-300">
      <div className="flex items-center justify-start gap-2 text-red-600 text-2xl font-bold">
        <span>
          <GoDotFill className="text-4xl animate-pulse duration-75 delay-75" />
        </span>
        <span> Live</span>
      </div>
      {/* Responsive YouTube Video */}
      <div className="w-full max-w-xl h-72 ">
        <iframe
          className="w-full h-full rounded-md shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube Live Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
   </div>
  );
};

export default LiveTv;
