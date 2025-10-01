
import React, { useState } from "react";
import axios from "axios";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../shared/Header";

// ✅ Top 50 Indian companies (Nifty 50)
const symbolsByCountry = {
  India: [
    { label: "Reliance Industries", value: "RELIANCE.BSE" },
    { label: "TCS", value: "TCS.BSE" },
    { label: "Infosys", value: "INFY.BSE" },
    { label: "HDFC Bank", value: "HDFCBANK.BSE" },
    { label: "ICICI Bank", value: "ICICIBANK.BSE" },
    { label: "HDFC", value: "HDFC.BSE" },
    { label: "Kotak Mahindra Bank", value: "KOTAKBANK.BSE" },
    { label: "Axis Bank", value: "AXISBANK.BSE" },
    { label: "State Bank of India", value: "SBIN.BSE" },
    { label: "Bharti Airtel", value: "BHARTIARTL.BSE" },
    { label: "ITC", value: "ITC.BSE" },
    { label: "Hindustan Unilever", value: "HINDUNILVR.BSE" },
    { label: "Larsen & Toubro", value: "LT.BSE" },
    { label: "Bajaj Finance", value: "BAJFINANCE.BSE" },
    { label: "Bajaj Finserv", value: "BAJAJFINSV.BSE" },
    { label: "Asian Paints", value: "ASIANPAINT.BSE" },
    { label: "Nestle India", value: "NESTLEIND.BSE" },
    { label: "Sun Pharma", value: "SUNPHARMA.BSE" },
    { label: "Dr. Reddy’s Labs", value: "DRREDDY.BSE" },
    { label: "Cipla", value: "CIPLA.BSE" },
    { label: "Wipro", value: "WIPRO.BSE" },
    { label: "Tech Mahindra", value: "TECHM.BSE" },
    { label: "HCL Technologies", value: "HCLTECH.BSE" },
    { label: "NTPC", value: "NTPC.BSE" },
    { label: "Power Grid", value: "POWERGRID.BSE" },
    { label: "Tata Steel", value: "TATASTEEL.BSE" },
    { label: "JSW Steel", value: "JSWSTEEL.BSE" },
    { label: "UltraTech Cement", value: "ULTRACEMCO.BSE" },
    { label: "Grasim Industries", value: "GRASIM.BSE" },
    { label: "Adani Enterprises", value: "ADANIENT.BSE" },
    { label: "Adani Ports", value: "ADANIPORTS.BSE" },
    { label: "Maruti Suzuki", value: "MARUTI.BSE" },
    { label: "Mahindra & Mahindra", value: "M&M.BSE" },
    { label: "Tata Motors", value: "TATAMOTORS.BSE" },
    { label: "Eicher Motors", value: "EICHERMOT.BSE" },
    { label: "Hero MotoCorp", value: "HEROMOTOCO.BSE" },
    { label: "Bajaj Auto", value: "BAJAJ-AUTO.BSE" },
    { label: "Hindalco", value: "HINDALCO.BSE" },
    { label: "Coal India", value: "COALINDIA.BSE" },
    { label: "Britannia", value: "BRITANNIA.BSE" },
    { label: "Titan Company", value: "TITAN.BSE" },
    { label: "Divi’s Labs", value: "DIVISLAB.BSE" },
    { label: "SBI Life Insurance", value: "SBILIFE.BSE" },
    { label: "HDFC Life", value: "HDFCLIFE.BSE" },
    { label: "ICICI Lombard", value: "ICICIGI.BSE" },
    { label: "IndusInd Bank", value: "INDUSINDBK.BSE" },
    { label: "UPL", value: "UPL.BSE" },
    { label: "Shree Cement", value: "SHREECEM.BSE" },
    { label: "ONGC", value: "ONGC.BSE" },
  ],
};

const PAGE_SIZE = 5;

const StockInfo = () => {
  const [country] = useState("India"); // default India
  const [page, setPage] = useState(0);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);

  const companies = symbolsByCountry[country];
  const paginatedCompanies = companies.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  const fetchStockData = async (company) => {
    try {
      setError("");
      setLoading(true);
      setStockData(null);
      setSelectedCompany(company);

      const apiKey = import.meta.env.VITE_STOCK_API_KEY;
      const res = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "TIME_SERIES_DAILY",
          symbol: company.value,
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
        companyName: company.label,
        symbol: company.value,
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
      setError("Failed to load stock data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isPositive = stockData?.change >= 0;

  return (
    <div className="mt-[9px]  xl:w-[335px] lg:w-[295px] w-full mx-auto">
      <Header text="📈 Indian Stock Tracker (Nifty 50)" />

      {/* If no company selected → Show company list */}
      {!selectedCompany && (
        <>
          <div className="grid grid-cols-1 gap-2">
            {paginatedCompanies.map((company) => (
              <div
                key={company.value}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
              >
                <span>{company.label}</span>
                <button
                  onClick={() => fetchStockData(company)}
                  className="px-3 py-1 bg-gradient-to-b from-blue-900 to-blue-950 text-gray-200 text-sm rounded hover:bg-blue-700"
                >
                  View Stock
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="px-3 py-1 text-sm bg-gray-100 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setPage((p) =>
                  (p + 1) * PAGE_SIZE < companies.length ? p + 1 : p
                )
              }
              disabled={(page + 1) * PAGE_SIZE >= companies.length}
              className="px-3 py-1 text-sm bg-gray-100 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center text-blue-600 h-[400px] items-center">
          <ImSpinner8 className="animate-spin text-lg" />
          <span className="ml-2">Fetching...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded">
          {error}
        </div>
      )}

      {/* Stock Info */}
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
                  {stockData.companyName}
                </h2>
                <p className="text-xs text-gray-500">{stockData.date}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-md text-xs font-medium flex items-center ${
                  isPositive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
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
                <p className="font-medium">₹{stockData.open}</p>
              </div>
              <div className="bg-gray-50 rounded p-2 text-center">
                <p className="text-xs text-gray-500">Close</p>
                <p className="font-medium">₹{stockData.close}</p>
              </div>
              <div className="bg-gray-50 rounded p-2 text-center">
                <p className="text-xs text-gray-500">High</p>
                <p className="font-medium">₹{stockData.high}</p>
              </div>
              <div className="bg-gray-50 rounded p-2 text-center">
                <p className="text-xs text-gray-500">Low</p>
                <p className="font-medium">₹{stockData.low}</p>
              </div>
            </div>

            <div className="text-xs text-blue-600 text-center">
              Volume: {Number(stockData.volume).toLocaleString()}
            </div>
            <div className="text-[10px] text-right text-gray-400">
              Last updated: {lastUpdated}
            </div>

            {/* Back Button */}
            <div className="pt-3">
              <button
                onClick={() => {
                  setSelectedCompany(null);
                  setStockData(null);
                }}
                className="w-full py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Back to Company List
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StockInfo;
