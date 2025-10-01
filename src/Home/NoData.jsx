import React, { useContext } from "react";
import { motion } from "framer-motion"; // ✅ framer-motion
import { SearchX } from "lucide-react";
import { WebThemeContext } from "../context/ThemeContext";
import nodata from "../assets/no_data.png"
import { useWebThemeContext } from "../context/WebThemeContext";
export default function NoData() {
  const { webTheme } = useWebThemeContext();

  const themeColor = webTheme["bg-color"] || ""; // fallback color

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[70vh] w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Circle Icon */}
      <motion.div
        className="flex items-center justify-center rounded-full p-3 shadow-md cursor-pointer animate-bounce bg-red-200"
        // style={{ backgroundColor: themeColor }}
        whileHover={{
          scale: 1.2,
          rotate: 10,
          boxShadow: `0 0 20px ${themeColor}`,
        }}
        whileTap={{ scale: 0.9, rotate: -10 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
       <img src={nodata} alt="no data found " className="w-[60px] h-[60px]"/>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-lg font-semibold mt-4 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        कोई डेटा नहीं मिला
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-sm text-gray-500 mt-1 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        ऐसा लगता है कि यहां अभी शुरू नहीं हुआ है।
      </motion.p>

      {/* Retry Button */}
      <motion.button
        onClick={() => window.location.reload()}
        className="mt-6 px-5 py-2 rounded-md text-white text-sm font-medium shadow-md transition"
        style={{ backgroundColor: themeColor||"#e82020" }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 15px ${themeColor}`,
        }}
        whileTap={{ scale: 0.95 }}
      >
        रीफ़्रेश करें
      </motion.button>
    </motion.div>
  );
}
