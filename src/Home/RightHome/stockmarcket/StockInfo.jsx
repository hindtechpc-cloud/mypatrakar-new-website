import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowUp, FiArrowDown, FiRefreshCw } from "react-icons/fi";
import { FaSearch, FaChartLine, FaInfoCircle } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../shared/Header";

const symbolsByCountry = {
  India: [
    { label: "RELIANCE.BSE", value: "RELIANCE.BSE" },
    { label: "TCS.BSE", value: "TCS.BSE" },
    { label: "INFY.BSE", value: "INFY.BSE" },
  ],
  USA: [
    { label: "AAPL", value: "AAPL" },
    { label: "MSFT", value: "MSFT" },
    { label: "GOOGL", value: "GOOGL" },
  ],
  Germany: [
    { label: "BMW.DE", value: "BMW.DE" },
    { label: "DAI.DE", value: "DAI.DE" },
    { label: "BAS.DE", value: "BAS.DE" },
  ],
  UK: [
    { label: "HSBA.L", value: "HSBA.L" },
    { label: "VOD.L", value: "VOD.L" },
    { label: "BP.L", value: "BP.L" },
  ],
};

const StockInfo = () => {
  const [country, setCountry] = useState("");
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  // Clear symbol when country changes
  useEffect(() => {
    setSymbol("");
    setStockData(null);
    setError("");
  }, [country]);

  const fetchStockData = async () => {
    try {
      setError("");
      setLoading(true);
      setStockData(null);

      const apiKey = import.meta.env.VITE_STOCK_API_KEY;
      const response = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "TIME_SERIES_DAILY",
          symbol: symbol,
          outputsize: "compact",
          apikey: apiKey,
        },
      });

      const timeSeries = response.data["Time Series (Daily)"];

      if (!timeSeries) {
        throw new Error(
          response.data["Error Message"] || "Invalid Symbol or Data not found"
        );
      }

      const sortedDates = Object.keys(timeSeries).sort(
        (a, b) => new Date(b) - new Date(a)
      );
      const latestDate = sortedDates[0];
      const prevDate = sortedDates[1];
      const latestData = timeSeries[latestDate];
      const prevData = timeSeries[prevDate];

      const change = parseFloat(latestData["4. close"]) - parseFloat(prevData["4. close"]);
      const changePercent = (change / parseFloat(prevData["4. close"])) * 100;

      setStockData({
        symbol,
        date: latestDate,
        open: parseFloat(latestData["1. open"]).toFixed(2),
        high: parseFloat(latestData["2. high"]).toFixed(2),
        low: parseFloat(latestData["3. low"]).toFixed(2),
        close: parseFloat(latestData["4. close"]).toFixed(2),
        change: change.toFixed(2),
        changePercent: changePercent.toFixed(2),
        volume: latestData["5. volume"],
      });
      
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch stock data. Please check the symbol.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country) {
      setError("Please select a country.");
      return;
    }
    if (!symbol) {
      setError("Please select a stock symbol.");
      return;
    }
    fetchStockData();
  };

  const isPositiveChange = stockData?.change >= 0;

  return (
    <div className="max-w-md w-full mx-auto p-4 font-sans">
      {/* Header with Glow Effect */}
      <Header text="Stock Market Info" />

      {/* Search Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Country Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Select Country</option>
                {Object.keys(symbolsByCountry).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Symbol Select (Conditional) */}
          {country && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Symbol <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select Symbol</option>
                  {symbolsByCountry[country].map((sym) => (
                    <option key={sym.value} value={sym.value}>
                      {sym.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaChartLine className="text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200"
            >
              <FaInfoCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md"
            disabled={loading}
          >
            {loading ? (
              <>
                <ImSpinner8 className="animate-spin" />
                Fetching Data...
              </>
            ) : (
              <>
                <FaSearch />
                Get Stock Info
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Stock Data Display */}
      <AnimatePresence>
        {stockData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            {/* Stock Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-5 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{stockData.symbol}</h3>
                  <p className="text-sm text-gray-500">{stockData.date}</p>
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full ${isPositiveChange ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isPositiveChange ? (
                    <FiArrowUp className="mr-1" />
                  ) : (
                    <FiArrowDown className="mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {stockData.change} ({stockData.changePercent}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Stock Metrics */}
            <div className="grid grid-cols-2 gap-4 p-5">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Open</p>
                <p className="text-lg font-semibold text-gray-800">${stockData.open}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">High</p>
                <p className="text-lg font-semibold text-gray-800">${stockData.high}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Low</p>
                <p className="text-lg font-semibold text-gray-800">${stockData.low}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Close</p>
                <p className="text-lg font-semibold text-gray-800">${stockData.close}</p>
              </div>
            </div>

            {/* Volume */}
            <div className="px-5 pb-5">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-blue-500 uppercase tracking-wider">Volume</p>
                <p className="text-lg font-semibold text-blue-800">{Number(stockData.volume).toLocaleString()}</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-right">
                Last updated: {lastUpdated}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!stockData && !loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100"
        >
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <FaChartLine className="text-blue-500 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No Stock Data</h3>
          <p className="text-gray-500 mb-4">Select a country and symbol to view stock information</p>
          <div className="text-xs text-gray-400">
            <p>Try: India → RELIANCE.BSE</p>
            <p>or USA → APPLE</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StockInfo;