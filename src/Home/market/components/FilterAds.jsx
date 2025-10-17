// // // components/FilterAds.jsx
// // import { useState, useRef, useEffect } from "react";
// // import { LocationList } from "../../../../api";

// // export default function FilterAds({ icons, options, onFilterChange }) {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [selected, setSelected] = useState("");
// //   const dropdownRef = useRef(null);


// //   const loadLocations=async()=>{
// //     try {
// //       const res=await LocationList();
// //       console.log(res)
// //     } catch (error) {
// //       console.log(error)
// //     }
// //   }


// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// //         setIsOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleOptionSelect = (value) => {
// //     console.log(value)
// //     setSelected(value);
// //     setIsOpen(false);
// //     onFilterChange(value);
// //   };

// //   return (
// //     <div className="relative" ref={dropdownRef}>
// //       {/* Trigger Icon */}
// //       <button
// //         onClick={() => setIsOpen((prev) => !prev)}
// //         className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 transition"
// //       >
// //         {icons}
// //       </button>

// //       {/* Dropdown */}
// //       {isOpen && (
// //         <div className="absolute -right-10 mt-0 w-28 bg-white border rounded-md shadow-lg z-20">
// //           {options.map((option) => (
// //             <button
// //               key={option.value}
// //               onClick={() => handleOptionSelect(option.value)}
// //               className={`w-full px-4 py-2 text-sm text-center hover:bg-red-50 ${
// //                 selected === option.value ? "text-red-500 font-semibold" : ""
// //               }`}
// //             >
// //               {option.name}
// //             </button>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// // components/FilterAds.jsx
// import { useState, useRef, useEffect } from "react";
// import { LocationList } from "../../../../api";

// export default function FilterAds({ icons, onFilterChange }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [locations, setLocations] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [selected, setSelected] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const dropdownRef = useRef(null);

//   // Load locations from API
//   const loadLocations = async () => {
//     try {
//       const res = await LocationList();
//       const data = res.data?.response || [];
//       setLocations(data);
//       setFilteredLocations(data);
//     } catch (error) {
//       console.log("Error loading locations:", error);
//     }
//   };

//   useEffect(() => {
//     loadLocations();
//   }, []);

//   // Close dropdown when clicked outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle selection
//   const handleOptionSelect = (value) => {
//     setSelected(value);
//     setIsOpen(false);
//     onFilterChange(value);
//   };

//   // Filter locations based on search
//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     const filtered = locations.filter((loc) =>
//       loc.name.toLowerCase().includes(term.toLowerCase())
//     );
//     setFilteredLocations(filtered);
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Trigger Icon */}
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 transition"
//       >
//         {icons}
//       </button>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="absolute -right-10 mt-2 w-56 bg-white border rounded-md shadow-lg z-20">
//           {/* Search Input */}
//           <div className="p-2 border-b border-gray-200">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearch}
//               placeholder="Search location..."
//               className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-red-400 text-sm"
//             />
//           </div>

//           {/* Location Options */}
//           <div className="max-h-64 overflow-y-auto">
//             {filteredLocations.length > 0 ? (
//               filteredLocations.map((option) => (
//                 <button
//                   key={option.value || option.id}
//                   onClick={() => handleOptionSelect(option.name)}
//                   className={`w-full text-left px-4 py-2 text-sm hover:bg-red-50 transition ${
//                     selected === option.name ? "text-red-500 font-semibold" : ""
//                   }`}
//                 >
//                   {option.name}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-2 text-gray-400 text-sm">No locations found</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






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
  // Load locations from API
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const res = await LocationList();
        const data = res.data?.response || [];
        const formatted = data.map((loc) => ({ name: loc.location_name, id: loc.location_id }));
        setLocations(formatted);
        setFilteredLocations(formatted);
      } catch (error) {
        console.log("Error loading locations:", error);
      }
    };
    loadLocations();
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle multi-select
  const handleOptionToggle = (location) => {
    let updated;
    if (selectedLocations.some((l) => l.id === location.id)) {
      updated = selectedLocations.filter((l) => l.id !== location.id);
    } else {
      updated = [...selectedLocations, location];
    }
    setSelectedLocations(updated);
    onFilterChange(updated.map((l) => l.id)); // Send IDs to parent
  };

  // Filter locations based on search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredLocations(
      locations.filter((loc) => loc.name.toLowerCase().includes(term.toLowerCase()))
    );
  };

  // Clear all selections
  const clearSelection = () => {
    setSelectedLocations([]);
    onFilterChange([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 transition flex items-center gap-1"
      >
        {icons}
        {selectedLocations.length > 0 && (
          <span className="text-sm text-red-600">{selectedLocations.length}</span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute -right-10 mt-2 w-64 bg-white border rounded-md shadow-lg z-50">
          {/* Search Input */}
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

          {/* Location Options */}
          <div className="max-h-64 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => {
                const isSelected = selectedLocations.some((l) => l.id === loc.id);
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

          {/* Clear All */}
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
