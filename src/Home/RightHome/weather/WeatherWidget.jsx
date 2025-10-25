// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import Header from "../shared/Header";
// import Loader from "../../../utils/Loader";

// const WeatherWidget = () => {
//   const [error, setError] = useState(true);
//   const [weatherData, setWeatherData] = useState(null);
//   const [location, setLocation] = useState("Lucknow");
//   const [inputValue, setInputValue] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${import.meta.env.VITE_REACT_APP_ID}`
//         );
//         const data = await response.json();
//         setWeatherData(data);
//         setError(false);
//       } catch (error) {
//         console.log(error);
//         setError(true);
//       }
//     };
//     fetchWeatherData();
//   }, [location]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (inputValue.trim()) {
//       setLocation(inputValue.trim());
//       setInputValue("");
//     }
//   };

//   return (
//     <div className="my-2 mt-5 font-sans md:max-w-sm w-[350px] mx-auto py-4">
//       <Header text="Weather" />
//       <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 w-full">
//         {weatherData ? (
//           <>
//             <div className="flex justify-between items-center mb-4">
//               <div>
//                 <p className="text-sm">
//                   {new Date().toLocaleString("en-US", {
//                     weekday: "short",
//                     day: "numeric",
//                     month: "short",
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </p>
//                 <h2 className="text-lg font-bold">{weatherData.name}</h2>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h1 className="text-4xl font-bold">
//                 {weatherData?.main?.temp}°C
//               </h1>
//               <p className="text-sm">
//                 बारिश:{" "}
//                 {weatherData.rain ? `${weatherData?.rain["1h"]} mm` : "0 mm"} |
//                 नमी: {weatherData?.main?.humidity}% | हवा:{" "}
//                 {weatherData?.wind?.speed} km/h
//               </p>
//             </div>

//             <form
//               onSubmit={handleSearch}
//               className="flex items-center rounded-lg bg-white mb-4"
//             >
//               <input
//                 type="text"
//                 placeholder="शहर खोजें"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 className="w-full px-4 rounded-l-lg py-2 text-black"
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-r-lg"
//               >
//                 <FaSearch />
//               </button>
//             </form>

//             <button
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
//               onClick={() => setShowModal(true)}
//             >
//               देखें आज का मौसम
//             </button>

//             <p className="text-xs text-gray-400 mt-4 text-center">
//               Powered By: <span className="font-bold">OpenWeather</span>
//             </p>
//           </>
//         ) : (
//           <Loader />
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && weatherData && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
//             <h2 className="text-xl font-bold mb-2 text-center text-gray-800">
//               {weatherData.name} Weather
//             </h2>
//             <p className="text-gray-700 mb-2">
//               🌡️ तापमान: {weatherData.main.temp}°C
//             </p>
//             <p className="text-gray-700 mb-2">
//               💧 नमी: {weatherData.main.humidity}%
//             </p>
//             <p className="text-gray-700 mb-2">
//               🌬️ हवा की गति: {weatherData.wind.speed} km/h
//             </p>
//             <p className="text-gray-700 mb-2">
//               🌞 सूर्योदय:{" "}
//               {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
//             </p>
//             <p className="text-gray-700 mb-4">
//               🌇 सूर्यास्त:{" "}
//               {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
//             </p>

//             <button
//               className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
//               onClick={() => setShowModal(false)}
//             >
//               बंद करें
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export { WeatherWidget };

import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import Header from "../shared/Header";
import Loader from "../../../utils/Loader";

const WeatherWidget = () => {
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Lucknow");
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setError("");
      setWeatherData(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${
            import.meta.env.VITE_REACT_APP_ID
          }`
        );

        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
        } else {
          setError(data.message || "Invalid city name");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    if (location) fetchWeatherData();
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError("Please enter a city name");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(inputValue.trim())) {
      setError("City name should only contain letters");
      return;
    }

    setLocation(inputValue.trim());
    setInputValue("");
    setError("");
  };

  return (
    <div className="mt-4 xl:w-[335px] lg:w-[295px] w-full mx-auto">
      <Header text="Weather" />

      {/* Main Card */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-950 text-white rounded-2xl shadow-xl p-5 w-full relative overflow-hidden">
        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-200 text-sm text-center bg-red-700/70 px-3 py-2 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {/* Weather Data */}
        {weatherData ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs opacity-80">
                  {new Date().toLocaleString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <h2 className="text-2xl font-bold drop-shadow-md">
                  {weatherData.name}
                </h2>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`}
                alt="Weather Icon"
                className="w-14 h-14 drop-shadow-lg"
              />
            </div>

            <div className="mb-4">
              <h1 className="text-5xl font-extrabold drop-shadow-md">
                {weatherData?.main?.temp}°C
              </h1>
              <p className="text-sm mt-2 opacity-90">
                🌧️ Rain:{" "}
                {weatherData.rain ? `${weatherData?.rain["1h"]} mm` : "0 mm"} |
                💧 {weatherData?.main?.humidity}% | 🌬️{" "}
                {weatherData?.wind?.speed} km/h
              </p>
            </div>
          </>
        ) : !error ? (
          <Loader />
        ) : null}

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex items-center rounded-lg bg-white mb-4 overflow-hidden shadow-md"
        >
          <input
            type="text"
            placeholder="🔍 Search city..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-b from-blue-900 to-blue-950  hover:bg-blue-700 px-4 py-3 text-white transition"
          >
            <FaSearch />
          </button>
        </form>

        {/* Action Button */}
        <button
          disabled={!weatherData}
          className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-lg backdrop-blur-sm transition disabled:opacity-40"
          onClick={() => setShowModal(true)}
        >
          🌤️ View Today’s Weather
        </button>

        {/* Footer */}
        <p className="text-xs text-white/70 mt-4 text-center">
          Powered By <span className="font-bold">OpenWeather</span>
        </p>
      </div>

      {/* Modal */}
      {showModal && weatherData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
              {weatherData.name} Weather
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                🌡️ Temperature: <b>{weatherData.main.temp}°C</b>
              </p>
              <p>
                💧 Humidity: <b>{weatherData.main.humidity}%</b>
              </p>
              <p>
                🌬️ Wind: <b>{weatherData.wind.speed} km/h</b>
              </p>
              <p>
                🌞 Sunrise:{" "}
                <b>
                  {new Date(
                    weatherData.sys.sunrise * 1000
                  ).toLocaleTimeString()}
                </b>
              </p>
              <p>
                🌇 Sunset:{" "}
                <b>
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                </b>
              </p>
            </div>

            <button
              className="mt-6 w-full bg-gradient-to-b from-blue-900 to-blue-950  hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { WeatherWidget };
