import React from "react";
import TopResultTable from "./TopResultTable";
import image from "../../../assets/election.svg";

export default function ElectionResults({ results }) {
  console.log(results);
  // Sort parties by seats won in descending order and get top 3
  const topParties = [...results].sort((a, b) => parseInt(b.seats_won) - parseInt(a.seats_won)).slice(0, 3);

  // Calculate total seats won by top 3 parties
  const totalSeats = topParties.reduce((acc, party) => acc + parseInt(party.seats_won), 0);

  // Calculate degrees for each segment
  const angles = topParties.map((party) => (parseInt(party.seats_won) / totalSeats) * 360);

  // Generate dynamic background for the pie chart
  const bgStyle = {
    background: `conic-gradient(
      red 0deg ${angles[0]}deg, 
      green ${angles[0]}deg ${angles[0] + angles[1]}deg, 
      orange ${angles[0] + angles[1]}deg 360deg
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
    <div className="flex sm:justify-between justify-center flex-wrap items-center">
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

        {/* Dynamic Labels for Top 3 Parties */}
        {topParties.map((party, index) => (
          <div
            key={index}
            className="absolute bg-white shadow-md rounded-full w-14 h-14 flex items-center justify-center text-black font-bold text-sm"
            style={getLabelPosition(
              angles.slice(0, index).reduce((a, b) => a + b, 0),
              angles[index]
            )}
          >
            {((parseInt(party.seats_won) / totalSeats) * 100).toFixed(2)}%
          </div>
        ))}
      </div>

      <div className="w-1/2">
        <TopResultTable results={topParties} />
      </div>
    </div>
  );
}
