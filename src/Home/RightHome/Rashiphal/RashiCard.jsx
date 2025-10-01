import { FaRegCalendarAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const zodiacSigns = [
  { name: "Aries", symbol: "♈" },
  { name: "Taurus", symbol: "♉" },
  { name: "Gemini", symbol: "♊" },
  { name: "Cancer", symbol: "♋" },
  { name: "Leo", symbol: "♌" },
  { name: "Virgo", symbol: "♍" },
  { name: "Libra", symbol: "♎" },
  { name: "Scorpio", symbol: "♏" },
  { name: "Sagittarius", symbol: "♐" },
  { name: "Capricorn", symbol: "♑" },
  { name: "Aquarius", symbol: "♒" },
  { name: "Pisces", symbol: "♓" },
];

export default function RashiCard({ item }) {
  // Find symbol from local zodiacSigns array
  const symbolObj = zodiacSigns.find(z => z.name.toLowerCase() === item.name.toLowerCase());
  const symbol = symbolObj?.symbol || "?";

  return (
    <div className="flex-shrink-0 w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 relative text-center">
      {/* Header */}
      <div className="flex justify-center items-center gap-2 mb-3">
        <GoDotFill className="text-red-500 text-sm" />
        <h2 className="font-bold text-gray-800 text-sm">Today’s Horoscope</h2>
      </div>

      {/* Zodiac Icon Circle */}
      <div className="relative flex items-center justify-center mb-4">
        <div className="relative w-16 h-16 rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center text-3xl text-blue-600 font-bold">
          {symbol}
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow">
            {item.lucky_number || "?"}
          </span>
        </div>
      </div>

      {/* Zodiac Name */}
      <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>

      {/* Horoscope Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        {item.rashifal || "No prediction available today."}
      </p>

      {/* Date */}
      <div className="flex justify-center items-center gap-1 text-xs text-gray-500">
        <FaRegCalendarAlt />
        {new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
    </div>
  );
}
