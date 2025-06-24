import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaChartLine,
  FaInfoCircle,
} from "react-icons/fa";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
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
};

const StockInfo = () => {
  const [country, setCountry] = useState("");
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setSymbol("");
    setStockData(null);
    setError("");
  }, [country]);

  const fetchStockData = async () => {
    try {
      setError("");
      setLoading(true);

      const apiKey = import.meta.env.VITE_STOCK_API_KEY;
      const res = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "TIME_SERIES_DAILY",
          symbol,
          outputsize: "compact",
          apikey: apiKey,
        },
      });

      const timeSeries = res.data["Time Series (Daily)"];
      if (!timeSeries) throw new Error("No stock data found");

      const [latestDate, prevDate] = Object.keys(timeSeries).sort(
        (a, b) => new Date(b) - new Date(a)
      );

      const latest = timeSeries[latestDate];
      const prev = timeSeries[prevDate];

      const close = parseFloat(latest["4. close"]);
      const prevClose = parseFloat(prev["4. close"]);
      const change = close - prevClose;
      const changePercent = ((change / prevClose) * 100).toFixed(2);

      setStockData({
        symbol,
        date: latestDate,
        open: latest["1. open"],
        high: latest["2. high"],
        low: latest["3. low"],
        close: close.toFixed(2),
        change: change.toFixed(2),
        changePercent,
        volume: latest["5. volume"],
      });

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError("Failed to load stock data. Please try a different symbol.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country || !symbol) {
      setError("Please select both country and stock symbol.");
      return;
    }
    fetchStockData();
  };

  const isPositive = stockData?.change >= 0;

  return (
  <>
  {
     (  <div className="max-w-md mx-auto px-4 py-5 space-y-5 font-sans">
      <Header text="📈 Stock Info Tracker" />

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-5 rounded-xl border border-gray-100 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🌍 Choose Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Country --</option>
            {Object.keys(symbolsByCountry).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {country && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              💼 Choose Company
            </label>
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Symbol --</option>
              {symbolsByCountry[country].map((sym) => (
                <option key={sym.value} value={sym.value}>
                  {sym.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded flex items-start gap-2">
            <FaInfoCircle className="mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 transition"
        >
          {loading ? (
            <>
              <ImSpinner8 className="animate-spin" />
              Fetching...
            </>
          ) : (
            <>
              <FaSearch />
              Get Stock Data
            </>
          )}
        </button>
      </form>

      {/* Result Section */}
      <AnimatePresence>
        {stockData && (
          <motion.div
            className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 space-y-3 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {stockData.symbol}
                </h2>
                <p className="text-xs text-gray-500">{stockData.date}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-md text-xs font-medium flex items-center ${
                  isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {isPositive ? <FiArrowUp /> : <FiArrowDown />}
                <span className="ml-1">
                  {stockData.change} ({stockData.changePercent}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded p-2 text-center">
                <p className="text-xs text-gray-500">Open</p>
                <p className="font-medium">${stockData.open}</p>
              </div>
              <div className="bg-gray-50 rounded p-2 text-center">
                <p className="text-xs text-gray-500">Close</p>
                <p className="font-medium">${stockData.close}</p>
              </div>
              <div className="bg-gray-50 rounded p-2 text-center">
                <p className="text-xs text-gray-500">High</p>
                <p className="font-medium">${stockData.high}</p>
              </div>
              <div className="bg-gray-50 rounded p-2 text-center">
                <p className="text-xs text-gray-500">Low</p>
                <p className="font-medium">${stockData.low}</p>
              </div>
            </div>

            <div className="text-xs text-blue-600 text-center">
              Volume: {Number(stockData.volume).toLocaleString()}
            </div>
            <div className="text-[10px] text-right text-gray-400">
              Last updated: {lastUpdated}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty Info */}
      {!stockData && !loading && (
        <div className="text-center text-sm text-gray-500">
         
        </div>
      )}
    </div>)
  }
  </>
  );
};

export default StockInfo;
