import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "../shared/Header";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Delhi");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9857ae27919fb1f4e30d14a0bdc145c6
`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [location]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setLocation(inputValue.trim());
      setInputValue("");
    }
  };

  return (
   <div className="my-2 mt-5 font-sans">
    <Header text="Weather" />
     <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 w-full">
      {weatherData ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm">
                {new Date().toLocaleString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <h2 className="text-lg font-bold">{weatherData.name}</h2>
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-4xl font-bold">{weatherData.main.temp}°C</h1>
            <p className="text-sm">
              बारिश: {weatherData.rain ? `${weatherData.rain["1h"]} mm` : "0 mm"} |
              नमी: {weatherData.main.humidity}% |
              हवा: {weatherData.wind.speed} km/h
            </p>
          </div>

          <div className="flex items-center rounded-lg  bg-white mb-4">
            <input
              type="text"
              placeholder="शहर खोजें"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 rounded-l-lg py-2 text-black"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-r-lg"
            >
              <FaSearch />
            </button>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
            देखें आज का मौसम
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Powered By: <span className="font-bold">OpenWeather</span>
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export { WeatherWidget };
