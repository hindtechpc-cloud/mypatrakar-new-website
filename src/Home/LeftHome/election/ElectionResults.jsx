// import React from "react";
// import TopResultTable from "./TopResultTable";
// import image from "../../../assets/election.svg";

// export default function ElectionResults({ results }) {
//   console.log(results);
//   // Sort parties by seats won in descending order and get top 3
//   const topParties = [...results].sort((a, b) => parseInt(b.seats_won) - parseInt(a.seats_won)).slice(0, 3);

//   // Calculate total seats won by top 3 parties
//   const totalSeats = topParties.reduce((acc, party) => acc + parseInt(party.seats_won), 0);

//   // Calculate degrees for each segment
//   const angles = topParties.map((party) => (parseInt(party.seats_won) / totalSeats) * 360);

//   // Generate dynamic background for the pie chart
//   const bgStyle = {
//     background: `conic-gradient(
//       red 0deg ${angles[0]}deg,
//       green ${angles[0]}deg ${angles[0] + angles[1]}deg,
//       orange ${angles[0] + angles[1]}deg 360deg
//     )`,
//   };

//   // Function to calculate label positions dynamically
//   const getLabelPosition = (startAngle, segmentAngle) => {
//     const angle = (startAngle + segmentAngle / 2) * (Math.PI / 180); // Convert to radians
//     const radius = 80; // Distance from center
//     return {
//       top: `${50 - (Math.cos(angle) * radius) / 2}%`,
//       left: `${50 + (Math.sin(angle) * radius) / 2}%`,
//       transform: "translate(-50%, -50%)",
//     };
//   };

//   return (
//     <div className="flex sm:justify-between justify-center flex-wrap items-center">
//       {/* Outer Circular Chart */}
//       <div className="relative w-64 h-64 rounded-full shadow-lg">
//         {/* Dynamic Pie Chart */}
//         <div
//           className="w-full h-full rounded-full transition-all duration-500"
//           style={bgStyle}
//         ></div>

//         {/* Center Content */}
//         <div className="absolute inset-0 flex flex-col justify-center items-center bg-white rounded-full w-32 h-32 m-auto shadow-md">
//           <div>
//             <img src={image} alt="Election related image" />
//           </div>
//           <p className="text-gray-800 font-semibold text-md">
//             Target: <span className="text-black font-bold">100</span>
//           </p>
//         </div>

//         {/* Dynamic Labels for Top 3 Parties */}
//         {topParties.map((party, index) => (
//           <div
//             key={index}
//             className="absolute bg-white shadow-md rounded-full w-14 h-14 flex items-center justify-center text-black font-bold text-sm"
//             style={getLabelPosition(
//               angles.slice(0, index).reduce((a, b) => a + b, 0),
//               angles[index]
//             )}
//           >
//             {((parseInt(party.seats_won) / totalSeats) * 100).toFixed(2)}%
//           </div>
//         ))}
//       </div>

//       <div className="w-1/2">
//         <TopResultTable results={topParties} />
//       </div>
//     </div>
//   );
// }

import React from "react";
import TopResultTable from "./TopResultTable";
import result from "../../../assets/election.svg";
import poll from "../../../assets/exit_poll_img.png";
import PartyScroll from "./PartyCard";

export default function ElectionResults({ results,parties }) {
  console.log(parties)
  // Sort parties by seats won in descending order and get top 3
  const topParties = [...results]
    .sort((a, b) => parseInt(b.seats_won) - parseInt(a.seats_won))
    .slice(0, 3);
  // Calculate total seats won by top 3 parties
  const totalSeats = topParties.reduce(
    (acc, party) => acc + parseInt(party.seats_won),
    0
  );

  // Calculate degrees for each segment
  const angles = topParties.map(
    (party) => (parseInt(party.seats_won) / totalSeats) * 360
  );

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
    <div className=" rounded-2xl  mb-6 px-3 border border-gray-100">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Visualization Section */}
        <div className="w-full lg:w-2/5 flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
            Seat Distribution
          </h2>

          {/* Outer Circular Chart */}
          <div className="relative w-64 h-64 rounded-full shadow-lg mb-4">
            {/* Dynamic Pie Chart */}
            <div
              className="w-full h-full rounded-full transition-all duration-500"
              style={bgStyle}
            ></div>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-white rounded-full w-32 h-32 m-auto shadow-md border border-gray-100">
              <div className="mb-1">
                <img
                  src={parties?.type=="Poll"?poll:result}
                  alt="Election related image"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-600 text-sm font-medium">Total Seats</p>
              <p className="text-gray-800 font-bold text-xl">
                {" "}
                {totalSeats > 999 ? `${totalSeats / 1000} K` : totalSeats}
              </p>
            </div>

            {/* Dynamic Labels for Top 3 Parties */}
            {topParties.map((party, index) => (
              <div
                key={index}
                className="absolute bg-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center text-black font-bold text-sm border-2 border-gray-100"
                style={getLabelPosition(
                  angles.slice(0, index).reduce((a, b) => a + b, 0),
                  angles[index]
                )}
              >
                {((parseInt(party.seats_won) / totalSeats) * 100).toFixed(1)}%
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {topParties.map((party, index) => {
              const colors = ["red", "green", "orange"];
              return (
                <div key={index} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: colors[index] }}
                  ></div>
                  {/* <p>party : {party.party_name}</p> */}
                  <span className="text-sm font-medium text-gray-700">
                    {party.party_name.length > 15
                      ? `${party.party_name.substring(0, 12)}...`
                      : party.party_name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results Table */}
        <div className="w-full lg:w-3/5">
          <TopResultTable results={topParties} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Performance Summary
        </h3>
   {/* <div className="w-[700px] flex items-start justify-start overflow-x-auto gap-4 flex-nowrap scrollbar-hide">
  {topParties.map((party, index) => {
    const colors = ["red", "green", "orange"];
    return (
      <div
        key={index}
        className="bg-gray-50 rounded-lg p-4 border border-gray-100 min-w-[230px] shrink-0"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            {party.party_name}
          </span>
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors[index] }}
          ></div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {party.seats_won > 999
                ? `${party.seats_won / 1000} K`
                : party.seats_won}
            </p>
            <p className="text-xs text-gray-500">seats won</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">
              {((parseInt(party.seats_won) / totalSeats) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500">of top 3 total</p>
          </div>
        </div>
      </div>
    );
  })}
</div> */}
<PartyScroll topParties={topParties} totalSeats={totalSeats}/> 
      </div>
    </div>
  );
}
