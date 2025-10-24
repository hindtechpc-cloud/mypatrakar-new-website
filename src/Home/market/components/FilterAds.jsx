import { useState, useRef, useEffect } from "react";
import { LocationList } from "../../../../api";
import { FiX, FiSearch } from "react-icons/fi";

export default function FilterAds({ icons, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // 🧭 Load locations from API
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const res = await LocationList();
        const data = res.data?.response || [];

        // Convert response into clean format
        const formatted = data.map((loc) => ({
          name: loc.location_name,
          id: loc.location_id,
        }));

        setLocations(formatted);
        setFilteredLocations(formatted);
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    };

    loadLocations();
  }, []);

  // 🧩 Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle select/deselect location
  const handleOptionToggle = (loc) => {
    let updated;

    // check if already selected
    if (selectedLocations.includes(loc.name)) {
      updated = selectedLocations.filter((l) => l !== loc.name);
    } else {
      updated = [...selectedLocations, loc.name];
    }

    setSelectedLocations(updated);
    onFilterChange(updated); // send selected names to parent
  };

  // 🔍 Filter locations by search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = locations.filter((loc) =>
      loc.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  // ❌ Clear all selections
  const clearSelection = () => {
    setSelectedLocations([]);
    onFilterChange([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 🔘 Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 transition flex items-center gap-1"
      >
        {icons}
        {selectedLocations.length > 0 && (
          <span className="text-sm text-red-600">{selectedLocations.length}</span>
        )}
      </button>

      {/* 📋 Dropdown */}
      {isOpen && (
        <div className="absolute -right-10 mt-2 w-64 bg-white border rounded-md shadow-lg z-50">
          {/* 🔎 Search Input */}
          <div className="p-2 border-b border-gray-200 flex items-center gap-2">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search location..."
              className="flex-grow px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-red-400 text-sm"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-gray-500">
                <FiX />
              </button>
            )}
          </div>

          {/* 📍 Location Options */}
          <div className="max-h-64 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => {
                const isSelected = selectedLocations.includes(loc.name);
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleOptionToggle(loc)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex justify-between items-center transition ${
                      isSelected ? "text-red-500 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {loc.name}
                    {isSelected && <FiX className="text-red-500" />}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-2 text-gray-400 text-sm">No locations found</div>
            )}
          </div>

          {/* 🧹 Clear All Button */}
          {selectedLocations.length > 0 && (
            <div className="p-2 border-t border-gray-200 text-right">
              <button
                onClick={clearSelection}
                className="text-sm text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
