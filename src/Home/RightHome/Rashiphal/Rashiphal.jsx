// import {  useEffect,  useState } from "react";
// import Header from "../shared/Header";
// import Loader from "../../../utils/Loader";
// import { GetHoroscope } from "../../../../api";

// const zodiacSigns = [
//   { name: "Aries", symbol: "♈", color: "bg-red-100 text-red-600" },
//   { name: "Taurus", symbol: "♉", color: "bg-green-100 text-green-600" },
//   { name: "Gemini", symbol: "♊", color: "bg-yellow-100 text-yellow-600" },
//   { name: "Cancer", symbol: "♋", color: "bg-blue-100 text-blue-600" },
//   { name: "Leo", symbol: "♌", color: "bg-orange-100 text-orange-600" },
//   { name: "Virgo", symbol: "♍", color: "bg-purple-100 text-purple-600" },
//   { name: "Libra", symbol: "♎", color: "bg-pink-100 text-pink-600" },
//   { name: "Scorpio", symbol: "♏", color: "bg-red-100 text-red-600" },
//   { name: "Sagittarius", symbol: "♐", color: "bg-indigo-100 text-indigo-600" },
//   { name: "Capricorn", symbol: "♑", color: "bg-gray-100 text-gray-600" },
//   { name: "Aquarius", symbol: "♒", color: "bg-teal-100 text-teal-600" },
//   { name: "Pisces", symbol: "♓", color: "bg-blue-100 text-blue-600" },
// ];

// export default function Rashiphal() {
//   const [rashis, setRashis] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchAllRashis = async () => {
//     try {
//       setLoading(true);
//       const allData = await Promise.all(
//         zodiacSigns.map(async (sign) => {
//           const res = await GetHoroscope(sign.name.toLowerCase());
//           return {
//             ...sign,
//             rashifal: res.data.data.prediction,
//             lucky_number: res.data.data.lucky_number,
//           };
//         })
//       );
//       setRashis(allData);
//     } catch (err) {
//       console.error("Error fetching rashifal:", err.message);
//       setError("Network error. Showing fallback rashiphal.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllRashis();
//   }, []);

//   return (
//     <div className="max-w-md w-full mx-auto p-4 font-sans">
//       {/* Header with Glow Effect */}
//       <div className="relative mb-6">
//         <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-20"></div>
//         <Header 
//           text="🌟 आज का राशिफल" 
//           className="relative text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600"
//         />
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4">
//           <p className="font-medium">⚠️ {error}</p>
//         </div>
//       )}

//       {/* Loading State */}
//       {loading && (
//         <div className="flex flex-col items-center justify-center p-8">
//           <Loader />
//           <p className="text-gray-600 mt-3">Loading your horoscope...</p>
//         </div>
//       )}

//       {/* Zodiac Signs Grid */}
//       {!loading && rashis.length > 0 && (
//         <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[600px]">
//           {rashis.map((item, index) => (
//             <div 
//               key={index}
//               className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
//             >
//               {/* Zodiac Header */}
//               <div className={`flex items-center justify-between p-4 ${item.color}`}>
//                 <div className="flex items-center">
//                   <span className="text-2xl mr-3">{item.symbol}</span>
//                   <h3 className="text-lg font-bold">{item.name}</h3>
//                 </div>
//                 <span className="bg-white rounded-full px-3 py-1 text-sm font-medium shadow-sm">
//                   🎲 {item.lucky_number}
//                 </span>
//               </div>

//               {/* Horoscope Content */}
//               <div className="p-4">
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                   {item.rashifal}
//                 </p>
//                 <div className="mt-3 flex justify-end">
//                   <span className="text-xs text-gray-500">
//                     {new Date().toLocaleDateString('en-IN', { 
//                       day: 'numeric', 
//                       month: 'long', 
//                       year: 'numeric' 
//                     })}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && rashis.length === 0 && !error && (
//         <div className="text-center p-8">
//           <div className="text-4xl mb-3">🔮</div>
//           <h3 className="text-lg font-medium text-gray-700">Horoscope unavailable</h3>
//           <p className="text-gray-500 mt-1">Try refreshing later</p>
//           <button 
//             onClick={fetchAllRashis}
//             className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-2 rounded-lg shadow-sm"
//           >
//             Refresh
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import Header from "../shared/Header";
import Loader from "../../../utils/Loader";
import { GetHoroscope } from "../../../../api";

const zodiacSigns = [
  { name: "Aries", symbol: "♈", color: "bg-red-100 text-red-600" },
  { name: "Taurus", symbol: "♉", color: "bg-green-100 text-green-600" },
  { name: "Gemini", symbol: "♊", color: "bg-yellow-100 text-yellow-600" },
  { name: "Cancer", symbol: "♋", color: "bg-blue-100 text-blue-600" },
  { name: "Leo", symbol: "♌", color: "bg-orange-100 text-orange-600" },
  { name: "Virgo", symbol: "♍", color: "bg-purple-100 text-purple-600" },
  { name: "Libra", symbol: "♎", color: "bg-pink-100 text-pink-600" },
  { name: "Scorpio", symbol: "♏", color: "bg-red-100 text-red-600" },
  { name: "Sagittarius", symbol: "♐", color: "bg-indigo-100 text-indigo-600" },
  { name: "Capricorn", symbol: "♑", color: "bg-gray-100 text-gray-600" },
  { name: "Aquarius", symbol: "♒", color: "bg-teal-100 text-teal-600" },
  { name: "Pisces", symbol: "♓", color: "bg-blue-100 text-blue-600" },
];

export default function Rashiphal() {
  const [rashis, setRashis] = useState([]);
  const [fallbackInfo, setFallbackInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllRashis = async () => {
    try {
      setLoading(true);
      setError("");
      setRashis([]);
      setFallbackInfo(null);

      const allData = await Promise.all(
        zodiacSigns.map(async (sign) => {
          const res = await GetHoroscope(sign.name.toLowerCase());
          const resData = res?.data?.data;

          // ✅ Handle fallback case
          if (resData?.is_fallback) {
            throw {
              isFallback: true,
              image: resData.fallback_image,
              website: resData.fallback_website,
            };
          }

          return {
            ...sign,
            rashifal: resData.prediction,
            lucky_number: resData.lucky_number,
          };
        })
      );

      setRashis(allData);
    } catch (err) {
      console.error("Error fetching rashifal:", err);

      if (err?.isFallback) {
        setFallbackInfo({
          image: err.image,
          website: err.website,
        });
      } else {
        setError("Network error. Showing fallback rashiphal.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRashis();
  }, []);

  return (
    <div className="max-w-md w-full mx-auto p-4 font-sans">
      {/* Header */}
     {!error && <div className="relative mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-20"></div>
        <Header
          text="🌟 आज का राशिफल"
          className="relative text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600"
        />
      </div>}

      {/* Error message */}
      {/* {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )} */}

      {/* Loader */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-8">
          <Loader />
          <p className="text-gray-600 mt-3">Loading your horoscope...</p>
        </div>
      )}

      {/* ✅ Fallback View */}
      {!loading && fallbackInfo && (
        <div className="text-center p-6">
          <img
            src={fallbackInfo.image}
            alt="Fallback Rashifal"
            className="rounded-xl mx-auto shadow-md"
          />
          <p className="text-sm text-gray-600 mt-3">
            Showing fallback data. For more detailed horoscope, visit:
          </p>
          <a
            href={fallbackInfo.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-5 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg shadow hover:scale-105 transition-transform"
          >
            Visit Horoscope Site 🔮
          </a>
        </div>
      )}

      {/* Valid Horoscope Grid */}
      {!loading && rashis.length > 0 && (
        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[600px]">
          {rashis.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className={`flex items-center justify-between p-4 ${item.color}`}>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{item.symbol}</span>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                </div>
                <span className="bg-white rounded-full px-3 py-1 text-sm font-medium shadow-sm">
                  🎲 {item.lucky_number}
                </span>
              </div>

              <div className="p-4">
                <p className="text-gray-700 text-sm leading-relaxed">{item.rashifal}</p>
                <div className="mt-3 flex justify-end">
                  <span className="text-xs text-gray-500">
                    {new Date().toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && rashis.length === 0 && !fallbackInfo && !error && (
        <div className="text-center p-8">
          <div className="text-4xl mb-3">🔮</div>
          <h3 className="text-lg font-medium text-gray-700">Horoscope unavailable</h3>
          <p className="text-gray-500 mt-1">Try refreshing later</p>
          <button
            onClick={fetchAllRashis}
            className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-2 rounded-lg shadow-sm"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
