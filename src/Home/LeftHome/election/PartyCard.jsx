import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PartyScroll({ topParties, totalSeats }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const colors = ["red", "green", "orange"];

  return (
    <div className="relative w-[730px]">
      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <FaChevronLeft />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="w-[730px] flex items-start justify-start overflow-x-auto gap-4 flex-nowrap scrollbar-hide scroll-smooth px-10"
      >
        {topParties.map((party, index) => (
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
                  {(
                    (parseInt(party.seats_won) / totalSeats) *
                    100
                  ).toFixed(1)}
                  %
                </p>
                <p className="text-xs text-gray-500">of top 3 total</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
