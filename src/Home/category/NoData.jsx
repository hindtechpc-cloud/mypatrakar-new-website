// src/Home/NoData.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { WebThemeContext } from "../context/ThemeContext";

export default function NoData({ message, showRetry = false, onRetry }) {
  const { webTheme } = useContext(WebThemeContext);
  const themeColor = webTheme["bg-color"] || "#b91c1c";

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[60vh] w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon */}
      <motion.div
        className="flex items-center justify-center rounded-full p-6 shadow-md"
        style={{ backgroundColor: themeColor }}
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        <SearchX size={40} color="white" strokeWidth={2.5} />
      </motion.div>

      {/* Title */}
      <h2 className="text-lg font-semibold mt-4 text-gray-800">
        {message || "कोई डेटा नहीं मिला"}
      </h2>

      {/* Retry Button */}
      {showRetry && (
        <motion.button
          onClick={onRetry}
          className="mt-6 px-5 py-2 rounded-md text-white text-sm font-medium shadow-md transition"
          style={{ backgroundColor: themeColor }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          फिर से कोशिश करें
        </motion.button>
      )}
    </motion.div>
  );
}
