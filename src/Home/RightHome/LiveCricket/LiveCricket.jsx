import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import { GetLiveCrickeScore } from "../../../../api";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaSync,
  FaFire,
} from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveCricket() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchLiveMatches = async () => {
    try {
      setLoading(true);
      const res = await GetLiveCrickeScore();

      if (res?.data?.data?.length > 0) {
        setMatches(res.data.data);
      } else {
        setMatches([]);
      }
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch live matches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 30000); // Refresh every 30 sec
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-md w-full mx-auto p-4 font-sans overflow-x-hidden hover:overflow-x-hidden">
      {/* Header with Glow Effect */}

      <Header text="Live Cricket" />

      {/* Main Content */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-8"
          >
            <ImSpinner8 className="animate-spin text-blue-600 text-4xl mb-4" />
            <p className="text-gray-600 font-medium">Fetching live scores...</p>
            <p className="text-sm text-gray-400 mt-1">This won't take long</p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 text-center"
          >
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-medium text-red-600">Error Loading Data</p>
              <p className="text-red-500 mt-1">{error}</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={fetchLiveMatches}
                className="mt-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-lg shadow-sm transition-all"
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* No Matches */}
        {!error && !loading && matches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 text-center"
          >
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-3">
              <FaCalendarAlt className="text-blue-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-700">No Live Matches</h3>
            <p className="text-gray-500 mt-1">
              Currently no matches being played
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={fetchLiveMatches}
              className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-lg shadow-sm transition-all"
            >
              Check Again
            </motion.button>
          </motion.div>
        )}

        {/* Live Matches */}
        {!error && !loading && matches.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-h-[600px] overflow-y-auto"
          >
            <AnimatePresence>
              {matches.map((match) => (
                <motion.div
                  key={match?.match_id}
                  variants={itemVariants}
                  className="border-b border-gray-200 last:border-b-0 p-6 hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  layout
                >
                  {/* Match Header with Gradient */}
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
                      {match.teams}
                    </h2>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        match.match_status.includes("Live")
                          ? "animate-pulse bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {match.match_status}
                    </span>
                  </div>

                  {/* Match Info Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-5">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-400" />
                      <span>{match.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-blue-400" />
                      <span>{match.match_time}</span>
                    </div>
                    <div className="col-span-2 flex items-start">
                      <FaMapMarkerAlt className="mr-2 mt-0.5 text-blue-400" />
                      <span className="text-gray-700">{match.venue}</span>
                    </div>
                  </div>

                  {/* Scores with Modern Card */}
                  {match.score?.innings?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-5"
                    >
                      <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="bg-blue-500 w-2 h-2 rounded-full mr-2"></span>
                        Scorecard
                      </h3>
                      <div className="space-y-3">
                        {match.score.innings.map((inning, index) => (
                          <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-800">
                                {inning.team}
                              </span>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {inning.overs} overs
                              </span>
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <span className="text-2xl font-bold text-gray-900">
                                  {inning.runs}
                                </span>
                                <span className="text-gray-500">
                                  /{inning.wickets}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Run Rate:{" "}
                                {(inning.runs / inning.overs).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
