import { useState } from "react";

const Horoscope = () => {
  const [sign, setSign] = useState("aries");
  const [date, setDate] = useState("2025-04-01");
  const [result, setResult] = useState("");

  const getHoroscope = async () => {
    const username = "639338"; // Replace with your API username
    const password = "04c8e6d2949904c72bfcc6d5c343e8afa8644c36"; // Replace with your API password
    const auth = btoa(`${username}:${password}`);

    try {
      const response = await fetch(
        `https://json.astrologyapi.com/v1/sun_sign_prediction/daily/${sign}`, 
        {
          method: "POST",  // ✅ Change back to POST
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            day: "today", // Can be 'yesterday', 'today', or 'tomorrow'
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.prediction || "No prediction available.");
    } catch (error) {
      console.error("Error fetching horoscope:", error);
      setResult("Failed to fetch horoscope.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Daily Horoscope</h2>
      <select
        className="border p-2 mb-2 w-full"
        value={sign}
        onChange={(e) => setSign(e.target.value)}
      >
        {[
          "aries", "taurus", "gemini", "cancer", "leo", "virgo",
          "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
        ].map((zodiac) => (
          <option key={zodiac} value={zodiac}>
            {zodiac.charAt(0).toUpperCase() + zodiac.slice(1)}
          </option>
        ))}
      </select>
      
      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={getHoroscope}
      >
        Get Horoscope
      </button>

      {result && <p className="mt-4">{result}</p>}
    </div>
  );
};

export default Horoscope;
