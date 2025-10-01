import { useRef, useEffect } from "react";
import RashiCard from "./RashiCard";
import ScrollButton from "./ScrollButton";

export default function RashiphalCarousel({ 
  rashis, 
  leftVisible, 
  rightVisible, 
  setLeftVisible, 
  setRightVisible 
}) {
  const scrollContainerRef = useRef(null);

  // Helper → Get card width (including margin/gap)
  const getCardWidth = () => {
    const container = scrollContainerRef.current;
    if (!container) return 300; // fallback
    const card = container.querySelector("div"); // first card
    if (!card) return 300;
    const style = window.getComputedStyle(card);
    const marginRight = parseInt(style.marginRight || 0);
    return card.offsetWidth + marginRight;
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = getCardWidth();
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = getCardWidth();
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  // Check scroll position for arrows
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setLeftVisible(scrollLeft > 0);
    setRightVisible(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    setTimeout(checkScrollPosition, 100);

    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, [rashis]);

  return (
    <div className="relative w-full">
      {/* Left/Right Arrow Buttons */}
      <ScrollButton direction="left" onClick={scrollLeft} visible={leftVisible} />
      <ScrollButton direction="right" onClick={scrollRight} visible={rightVisible} />

      {/* Scrollable Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {rashis?.map((item, index) => (
          <RashiCard key={index} item={item} />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
