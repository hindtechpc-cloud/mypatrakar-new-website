// components/FilterAds.jsx
import { useState, useRef, useEffect } from "react";

export default function FilterAds({ icons, options, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (value) => {
    console.log(value)
    setSelected(value);
    setIsOpen(false);
    onFilterChange(value);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 transition"
      >
        {icons}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute -right-10 mt-0 w-28 bg-white border rounded-md shadow-lg z-20">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={`w-full px-4 py-2 text-sm text-center hover:bg-red-50 ${
                selected === option.value ? "text-red-500 font-semibold" : ""
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
