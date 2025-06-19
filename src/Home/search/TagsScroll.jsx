import React, { useRef } from "react";

export default function TagsScroll() {
  const tags = [
    "Elections", "इंडिया", "Elections", "इंडिया", "Elections", "Elections", 
    "Electronics", "UI", "Travel", "Interior", "Admin Dashboard", 
    "Admin Dashboard", "Admin Dashboard",
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">TAGS</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => scroll("left")}
            className="text-2xl font-bold text-gray-500 hover:text-gray-800"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="text-2xl font-bold text-gray-500 hover:text-gray-800"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
      <div className="relative flex items-center">
        <div
          ref={scrollRef}
          className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {tags.map((tag, index) => (
            <button
              key={index}
              className="px-10 py-1.5 bg-gray-200 text-gray-800 whitespace-nowrap hover:bg-gray-300 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}