import { createContext, useContext } from "react";

const ApiCacheContext = createContext();

const EXPIRY_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export const ApiCacheProvider = ({ children }) => {
  const getApiData = async (key, fetchFunction) => {
    const cachedItem = sessionStorage.getItem(key);

    if (cachedItem) {
      try {
        const parsed = JSON.parse(cachedItem);
        const now = new Date().getTime();

        // ⏳ Check expiry
        if (now - parsed.timestamp < EXPIRY_DURATION) {
          return parsed.data;
        }
      } catch (err) {
        console.error("Cache parse error:", err);
      }
    }

    try {
      const data = await fetchFunction();

      // 🧠 Store with timestamp
      const payload = {
        data,
        timestamp: new Date().getTime(),
      };

      sessionStorage.setItem(key, JSON.stringify(payload));
      return data;
    } catch (error) {
      console.error("API Fetch error:", error);
      throw error;
    }
  };

  return (
    <ApiCacheContext.Provider value={{ getApiData }}>
      {children}
    </ApiCacheContext.Provider>
  );
};

export const useApiCache = () => useContext(ApiCacheContext);
