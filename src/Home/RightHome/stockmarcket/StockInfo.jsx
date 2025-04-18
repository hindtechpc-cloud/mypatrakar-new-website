import React, { useState } from "react";
import axios from "axios";
import senses from "../../../assets/senses.svg"
const StockInfo = () => {
  const [country, setCountry] = useState("");
  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    try {
      setError("");

      setLoading(true);
      setStockData(null);
  
      const apiKey = import.meta.env.VITE_STOCK_API_KEY; // Replace with your key
      const response = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "TIME_SERIES_DAILY",
          symbol: symbol,
          outputsize: "full",
          apikey: apiKey,
        },
      });
  
      const timeSeries = response.data["Time Series (Daily)"];
  
      if (!timeSeries) {
        throw new Error(response.data["Error Message"] || "Invalid Symbol or Data not found");
      }
  
      // Get latest date by sorting (in case object order is unreliable)
      const sortedDates = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a));
      const latestDate = sortedDates[0];
      const latestData = timeSeries[latestDate];
  
      setStockData({
        date: latestDate,
        open: latestData["1. open"],
        high: latestData["2. high"],
        low: latestData["3. low"],
        close: latestData["4. close"],
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch stock data. Please check the symbol.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country || !symbol) {
      setError("Country and Symbol are required fields.");
      return;
    }
    fetchStockData();
  };

  return (
    <div className="my-2 mt-5 font-sans md:max-w-sm  w-[300px] mx-auto py-4">
      <div className="max-w-xl mx-auto  bg-white p-2  rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          Stock Info Viewer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">-- Select Country --</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Stock Symbol (e.g., RELIANCE.BSE) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Enter stock symbol"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {error && <p className="text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Stock Info"}
          </button>
        </form>

        {stockData ? (
          <div className="mt-8 bg-gray-100 p-4 rounded-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Latest Stock Data
            </h3>
            <p><strong>Date:</strong> {stockData.date}</p>
            <p><strong>Open:</strong> ₹{stockData.open}</p>
            <p><strong>High:</strong> ₹{stockData.high}</p>
            <p><strong>Low:</strong> ₹{stockData.low}</p>
            <p><strong>Close:</strong> ₹{stockData.close}</p>
          </div>
        ):<div>
          <img src={senses} alt="senses" className="w-full h-full" /></div>}
      </div>
    </div>
  );
};

export default StockInfo;
