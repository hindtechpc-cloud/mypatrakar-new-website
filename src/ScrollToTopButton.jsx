// src/ScrollToTopButton.jsx
import React, { useState, useEffect, useContext } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useWebThemeContext } from "./context/WebThemeContext";
import { IoIosArrowUp } from "react-icons/io";


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
const {webTheme}=useWebThemeContext();
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3  text-white rounded-full shadow-lg transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background:webTheme["bg-color"]||"#0f3493"
      }}
    >
      <IoIosArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
