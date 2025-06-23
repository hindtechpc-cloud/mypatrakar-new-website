import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "../shared/Header";
import Loader from "../../../utils/Loader";

const WeatherWidget = () => {
  const [error, setError] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Lucknow");
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9857ae27919fb1f4e30d14a0bdc145c6`
        );
        const data = await response.json();
        setWeatherData(data);
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchWeatherData();
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setLocation(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="my-2 mt-5 font-sans md:max-w-sm w-[350px] mx-auto py-4">
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
              <h1 className="text-4xl font-bold">
                {weatherData?.main?.temp}°C
              </h1>
              <p className="text-sm">
                बारिश:{" "}
                {weatherData.rain ? `${weatherData?.rain["1h"]} mm` : "0 mm"} |
                नमी: {weatherData?.main?.humidity}% | हवा:{" "}
                {weatherData?.wind?.speed} km/h
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-lg bg-white mb-4"
            >
              <input
                type="text"
                placeholder="शहर खोजें"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 rounded-l-lg py-2 text-black"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-r-lg"
              >
                <FaSearch />
              </button>
            </form>

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
              onClick={() => setShowModal(true)}
            >
              देखें आज का मौसम
            </button>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Powered By: <span className="font-bold">OpenWeather</span>
            </p>
          </>
        ) : (
          <Loader />
        )}
      </div>

      {/* Modal */}
      {showModal && weatherData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-2 text-center text-gray-800">
              {weatherData.name} Weather
            </h2>
            <p className="text-gray-700 mb-2">
              🌡️ तापमान: {weatherData.main.temp}°C
            </p>
            <p className="text-gray-700 mb-2">
              💧 नमी: {weatherData.main.humidity}%
            </p>
            <p className="text-gray-700 mb-2">
              🌬️ हवा की गति: {weatherData.wind.speed} km/h
            </p>
            <p className="text-gray-700 mb-2">
              🌞 सूर्योदय:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="text-gray-700 mb-4">
              🌇 सूर्यास्त:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>

            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              बंद करें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { WeatherWidget };
