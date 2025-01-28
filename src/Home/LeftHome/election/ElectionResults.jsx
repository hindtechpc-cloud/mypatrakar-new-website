import React from "react";
import TopResultTable from "./TopResultTable";
import image from "../../../assets/election.svg";
export default function ElectionResults({ results }) {
  const { red, green, orange } = results;

  // Calculate degrees for each segment
  const redAngle = (red / 100) * 360;
  const greenAngle = ((red + green) / 100) * 360;

  // Generate dynamic background
  const bgStyle = {
    background: `conic-gradient(
      red 0deg ${redAngle}deg, 
      green ${redAngle}deg ${greenAngle}deg, 
      orange ${greenAngle}deg 360deg
    )`,
  };

  // Function to calculate label positions dynamically
  const getLabelPosition = (startAngle, segmentAngle) => {
    const angle = (startAngle + segmentAngle / 2) * (Math.PI / 180); // Convert to radians
    const radius = 80; // Distance from center
    return {
      top: `${50 - (Math.cos(angle) * radius) / 2}%`,
      left: `${50 + (Math.sin(angle) * radius) / 2}%`,
      transform: "translate(-50%, -50%)",
    };
  };

  return (
    <div className="flex sm:justify-between justify-center flex-wrap items-center  ">
      {/* Outer Circular Chart */}
      <div className="relative w-64 h-64 rounded-full shadow-lg">
        {/* Dynamic Pie Chart */}
        <div
          className="w-full h-full rounded-full transition-all duration-500"
          style={bgStyle}
        ></div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white rounded-full w-32 h-32 m-auto shadow-md">
          <div>
            <img src={image} alt="Election related image" />
          </div>
          <p className="text-gray-800 font-semibold text-md">
            Target: <span className="text-black font-bold">100</span>
          </p>
        </div>

        {/* Dynamic Labels - Automatically Positioned */}
        <div
          className="absolute bg-white shadow-md rounded-full w-14 h-14 flex items-center justify-center text-black font-bold text-sm"
          style={getLabelPosition(0, redAngle)}
        >
          {red}%
        </div>
        <div
          className="absolute bg-white shadow-md rounded-full w-14 h-14 flex items-center justify-center text-black font-bold text-sm"
          style={getLabelPosition(redAngle, greenAngle - redAngle)}
        >
          {green}%
        </div>
        <div
          className="absolute bg-white shadow-md rounded-full w-14 h-14 flex items-center justify-center text-black font-bold text-sm"
          style={getLabelPosition(greenAngle, 360 - greenAngle)}
        >
          {orange}%
        </div>
      </div>
      <div className="w-1/2">
        <TopResultTable results={results} />
      </div>
    </div>
  );
}
