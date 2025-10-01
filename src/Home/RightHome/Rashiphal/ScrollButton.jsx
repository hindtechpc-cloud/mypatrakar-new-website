import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ScrollButton({ direction, onClick, visible }) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
      style={{ [direction]: "-10px" }}
    >
      {direction === "left" ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );
}
