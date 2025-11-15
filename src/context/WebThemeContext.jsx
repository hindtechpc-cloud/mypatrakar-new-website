// import { createContext, useContext, useState, useEffect, useCallback } from "react";
// import { GetWebTheme } from "../../api"; // adjust the path

// const WebThemeContext = createContext();

// export const WebThemeProvider = ({ children }) => {
//   const [webTheme, setWebTheme] = useState({});
// // console.log(webTheme)
//   // Session keys
//   const SESSION_KEY = "webTheme";

//   const saveToSession = (data) => {
//     sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
//   };

//   const loadFromSession = () => {
//     const stored = sessionStorage.getItem(SESSION_KEY);
//     console.log(stored)
//     return stored ? JSON.parse(stored) : null;
//   };
//   const fetchWebTheme = useCallback(async () => {
//     try {
//       const cached = loadFromSession();
//       if (cached!==null) {
//         setWebTheme(cached);
//       } else {
//         const res = await GetWebTheme(""); // dynamic if needed
//         console.log(res)
//         // console.log(object)
//         if (res?.data?.response) {
//           setWebTheme(res.data.response);
//           saveToSession(res.data.response);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to fetch web theme:", error);
//     }
//   },[]);

//   useEffect(() => {
//     fetchWebTheme();
//   }, [fetchWebTheme]);

//   return (
//     <WebThemeContext.Provider value={{ webTheme, fetchWebTheme }}>
//       {children}
//     </WebThemeContext.Provider>
//   );
// };

// export const useWebThemeContext = () => {
//   const context = useContext(WebThemeContext);
//   if (!context) {
//     throw new Error("useWebThemeContext must be used within a WebThemeProvider");
//   }
//   return context;
// };



// src/context/WebThemeContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { GetWebTheme } from "../../api"; // adjust path

const WebThemeContext = createContext();

export const WebThemeProvider = ({ children }) => {
  const [webTheme, setWebTheme] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔹 Session keys
  const THEME_KEY = "webTheme";
  const TIMESTAMP_KEY = "webThemeTimestamp";
  const EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes

  // ✅ Save data and timestamp
  const saveToSession = (data) => {
    const timestamp = new Date().getTime();
    sessionStorage.setItem(THEME_KEY, JSON.stringify(data));
    sessionStorage.setItem(TIMESTAMP_KEY, timestamp.toString());
  };

  // ✅ Load data if available
  const loadFromSession = useCallback(() => {
    const storedTheme = sessionStorage.getItem(THEME_KEY);
    const storedTime = sessionStorage.getItem(TIMESTAMP_KEY);
    if (!storedTheme || !storedTime) return null;

    const isExpired = Date.now() - parseInt(storedTime, 10) > EXPIRY_TIME;
    if (isExpired) {
      console.log("🕒 Theme cache expired, fetching new data...");
      return null;
    }

    console.log("✅ Using cached web theme");
    return JSON.parse(storedTheme);
  },[EXPIRY_TIME]);

  // ✅ Fetch API
  const fetchWebTheme = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    try {
      const cached = !forceRefresh ? loadFromSession() : null;

      if (cached!==null && cached=="") {
        setWebTheme(cached);
      } else {
        const res = await GetWebTheme("MYAWR241227001");
        if (res?.data?.response) {
          setWebTheme(res.data.response);
          saveToSession(res.data.response);
        }
      }
    } catch (error) {
      console.error("❌ Failed to fetch web theme:", error);
    } finally {
      setLoading(false);
    }
  }, [loadFromSession]);

  // ✅ On mount
  useEffect(() => {
    fetchWebTheme();
  }, [fetchWebTheme]);

  // ✅ Optional: auto refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔄 Auto refreshing theme (30-min interval)");
      fetchWebTheme(true);
    }, EXPIRY_TIME);

    return () => clearInterval(interval);
  }, [EXPIRY_TIME, fetchWebTheme]);

  return (
    <WebThemeContext.Provider value={{ webTheme, loading, fetchWebTheme }}>
      {children}
    </WebThemeContext.Provider>
  );
};

// ✅ Custom hook
export const useWebThemeContext = () => {
  const context = useContext(WebThemeContext);
  if (!context) {
    throw new Error("useWebThemeContext must be used within WebThemeProvider");
  }
  return context;
};
