import React, { useEffect, useState } from "react";
import Header from "../shared/Header";

export default function LiveCricket() {
  const [score, setScore] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch live cricket scores
  const fetchScore = async () => {
    try {
      const response = await fetch(
        "https://api.cricapi.com/v1/currentMatches?apikey=90e6f74a-b95c-422d-a6ea-45d6b9daf7e5&offset=0"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.data?.length === 0) {
        setScore("No Live Matches");
      } else if (data.status === "success") {
        setScore(data.data);
      } else {
        throw new Error("Failed to fetch live matches");
      }
    } catch (error) {
      console.error("Error fetching cricket scores:", error);
      setError(error.message || "Something went wrong!");
    }
  };

  // Fetch scores on component mount and set an interval for updates
  useEffect(() => {
    fetchScore(); // Initial fetch

    const interval = setInterval(() => {
      fetchScore();
    }, 200000); // Fetch every 20 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
  <div className="my-2 mt-5 font-sans">
    <Header text="Live Cricket" />
      <div className="overflow-y-auto ">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Live Cricket Scores
      </h1>

      {/* Error Handling */}
      {error && (
        <div className="text-center text-red-600 text-lg">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Display No Matches */}
      {score === "No Live Matches" && !error && (
        <h2 className="text-center text-xl text-red-600">
          No Live Matches Available
        </h2>
      )}

      {/* Display Live Matches */}
      {!error &&
        score !== "No Live Matches" &&
        Array.isArray(score) &&
        score.length > 0 &&
        score.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-2 mb-5  mx-auto"
          >
            {/* Match Details */}
            <h2 className="text-xl font-semibold text-gray-800">
              {item.name}
            </h2>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {item.date}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Match Type:</strong> {item.matchType}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Venue:</strong> {item.venue}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  item.status.includes("Live")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.status}
              </span>
            </p>

            {/* Team Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {(item.teamInfo || item.teams)?.map((team) => (
                <div
                  key={team.name}
                  className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={team.img}
                    alt={team.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                   
                    <p className="text-xs text-gray-600">
                      <strong>Short Name:</strong> {team.shortname}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Score Table */}
            {item.score && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Score Table
                </h3>
                <table className="w-full text-left border-collapse border border-gray-300 mt-2">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="border border-gray-300 px-2 py-2">
                        Inning
                      </th>
                      <th className="border border-gray-300 px-2 py-2">
                        Overs
                      </th>
                      <th className="border border-gray-300 px-2 py-2">
                        Runs
                      </th>
                      <th className="border border-gray-300 px-2 py-2">
                        Wickets
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.score.map((s) => (
                      <tr key={s.inning} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-2 py-2">
                          {s.inning}
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          {s.o}
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          {s.r}
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          {s.w}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
    </div>
  </div>
  );
}
