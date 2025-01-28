import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TagsScroll() {
  const tags = [
    "Elections",
    "हिंदी",
    "Elections",
    "हिंदी",
    "Elections",
    "Elections",
    "Electronics",
    "UI",
    "Travel",
    "Interior",
    "Admin Dashboard",
    "Admin Dashboard",
    "Admin Dashboard",
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=" my-2 md:mx-14 sm:mx-8 mx-2 ">
      <div className="flex items-center justify-between my-2">
        <h2 className="text-lg font-semibold mb-2">TAGS</h2>
        <div
          className="flex
         items-center justify-start gap-3"
        >
          <button
            onClick={() => scroll("left")}
            className="bg-white border rounded-full shadow-md p-2"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className=" bg-white border rounded-full shadow-md p-2"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className=" flex items-center">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth w-full px-8 hide-scroll mb-5"
        >
          {tags.map((tag, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg whitespace-nowrap"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
