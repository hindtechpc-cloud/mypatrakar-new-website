import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { GetWebTheme } from "../../api"; // adjust the path

const WebThemeContext = createContext();

export const WebThemeProvider = ({ children }) => {
  const [webTheme, setWebTheme] = useState({});
// console.log(webTheme)
  // Session keys
  const SESSION_KEY = "webTheme";

  const saveToSession = (data) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  };

  const loadFromSession = () => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    // console.log(stored)
    return stored ? JSON.parse(stored) : null;
  };
  const fetchWebTheme = useCallback(async () => {
    try {
      const cached = loadFromSession();
      if (cached!==null) {
        setWebTheme(cached);
      } else {
        const res = await GetWebTheme(""); // dynamic if needed
        console.log(res)
        // console.log(object)
        if (res?.data?.response) {
          setWebTheme(res.data.response);
          saveToSession(res.data.response);
        }
      }
    } catch (error) {
      console.error("Failed to fetch web theme:", error);
    }
  },[]);

  useEffect(() => {
    fetchWebTheme();
  }, [fetchWebTheme]);

  return (
    <WebThemeContext.Provider value={{ webTheme, fetchWebTheme }}>
      {children}
    </WebThemeContext.Provider>
  );
};

export const useWebThemeContext = () => {
  const context = useContext(WebThemeContext);
  if (!context) {
    throw new Error("useWebThemeContext must be used within a WebThemeProvider");
  }
  return context;
};
