// import React, { useEffect, useState, useCallback } from "react";

// // CACHE CONSTANTS
// const CACHE_EXPIRY_MINUTES = 30;
// const DEFAULT_PORTAL_ID = "MYAWR241227001";

// export const AdContext = React.createContext();

// export const AdProvider = ({ children }) => {
//   const [ads, setAds] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Helper to get cache key
//   const getCacheKey = (apiName, portalId = DEFAULT_PORTAL_ID) => 
//     `ad_${apiName}_${portalId}`;

//   // Clear expired cache entries
//   const clearExpiredCache = useCallback(() => {
//     Object.keys(sessionStorage).forEach((key) => {
//       if (key.startsWith("ad_")) {
//         const cachedData = sessionStorage.getItem(key);
//         try {
//           const { timestamp } = JSON.parse(cachedData);
//           if (Date.now() - timestamp > CACHE_EXPIRY_MINUTES * 60 * 1000) {
//             sessionStorage.removeItem(key);
//           }
//         } catch {
//           sessionStorage.removeItem(key);
//         }
//       }
//     });
//   }, []);

//   // Fetch data with caching
//   const fetchAdData = useCallback(
//     async (apiName, apiFunction, portalId = DEFAULT_PORTAL_ID) => {
//       const cacheKey = getCacheKey(apiName, portalId);

//       // Clear expired cache first
//       clearExpiredCache();

//       // Check for valid cached data
//       const cachedData = sessionStorage.getItem(cacheKey);
//       if (cachedData) {
//         try {
//           const { data, timestamp } = JSON.parse(cachedData);
//           if (Date.now() - timestamp <= CACHE_EXPIRY_MINUTES * 60 * 1000) {
//             return data;
//           }
//         } catch {
//           // If cache is corrupted, remove it
//           sessionStorage.removeItem(cacheKey);
//         }
//       }

//       // Fetch fresh data
//       try {
//         const res = await apiFunction(portalId);
//         if (res?.data?.response) {
//           const dataToCache = {
//             data: res.data.response,
//             timestamp: Date.now(),
//           };
//           sessionStorage.setItem(cacheKey, JSON.stringify(dataToCache));
//           return res.data.response;
//         }
//         throw new Error("Invalid response format");
//       } catch (error) {
//         console.error(`Error fetching ${apiName} ads:`, error);
//         throw error;
//       }
//     },
//     [clearExpiredCache]
//   );

//   // Load all ads on initial render
//   useEffect(() => {
//     const initializeAds = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         // Clear expired cache on initial load
//         clearExpiredCache();
//       } catch (error) {
//         setError("Failed to initialize ads");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializeAds();
//   }, [clearExpiredCache]);

//   // Create the context value
//   const contextValue = {
//     ads,
//     isLoading,
//     error,
//     fetchAdData,
//     setAds,
//     setIsLoading,
//     setError
//   };

//   return (
//     <AdContext.Provider value={contextValue}>
//       {children}
//     </AdContext.Provider>
//   );
// };

// // Custom hook with simplified interface
// export const useAds = () => {
//   const context = React.useContext(AdContext);
//   if (!context) {
//     throw new Error("useAds must be used within an AdProvider");
//   }

//   const { 
//     ads, 
//     isLoading, 
//     error, 
//     fetchAdData, 
//     setAds, 
//     setIsLoading, 
//     setError 
//   } = context;

//   const getAds = React.useCallback(
//     async (apiName, apiFunction, portalId) => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const data = await fetchAdData(apiName, apiFunction, portalId);

//         // Update the ads state with the new data
//         setAds((prev) => ({
//           ...prev,
//           [apiName]: data,
//         }));

//         return data;
//       } catch (error) {
//         setError(`Failed to load ${apiName} ads`);
//         throw error;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [fetchAdData, setAds, setIsLoading, setError]
//   );

//   return {
//     ads,
//     isLoading,
//     error,
//     getAds
//   };
// };





import React, { useEffect, useState, useCallback, createContext, useContext } from "react";

// CACHE CONSTANTS
const CACHE_EXPIRY_MINUTES = 30;
const DEFAULT_PORTAL_ID = "MYAWR241227001";

export const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to get cache key
  const getCacheKey = useCallback((apiName, portalId = DEFAULT_PORTAL_ID) => {
    return `ad_${apiName}_${portalId}`;
  }, []);

  // Clear expired cache entries
  const clearExpiredCache = useCallback(() => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("ad_")) {
        try {
          const cachedData = JSON.parse(sessionStorage.getItem(key));
          if (!cachedData.timestamp || Date.now() - cachedData.timestamp > CACHE_EXPIRY_MINUTES * 60 * 1000) {
            sessionStorage.removeItem(key);
          }
        } catch {
          sessionStorage.removeItem(key);
        }
      }
    });
  }, []);

  // Fetch data with caching
  const fetchAdData = useCallback(
    async (apiName, apiFunction, portalId = DEFAULT_PORTAL_ID) => {
      const cacheKey = getCacheKey(apiName, portalId);
      clearExpiredCache();

      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp <= CACHE_EXPIRY_MINUTES * 60 * 1000) {
            return data;
          }
        }
      } catch {
        sessionStorage.removeItem(cacheKey);
      }

      try {
        const res = await apiFunction(portalId);
        const response = res?.data?.response;
        if (response) {
          const toCache = {
            data: response,
            timestamp: Date.now(),
          };
          sessionStorage.setItem(cacheKey, JSON.stringify(toCache));
          return response;
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error(`Error fetching ${apiName} ads:`, err);
        throw err;
      }
    },
    [clearExpiredCache, getCacheKey]
  );

  useEffect(() => {
    clearExpiredCache();
  }, [clearExpiredCache]);

  const contextValue = {
    ads,
    isLoading,
    error,
    fetchAdData,
    setAds,
    setIsLoading,
    setError,
  };

  return <AdContext.Provider value={contextValue}>{children}</AdContext.Provider>;
};

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) throw new Error("useAds must be used within an AdProvider");

  const { ads, isLoading, error, fetchAdData, setAds, setIsLoading, setError } = context;

  const getAds = useCallback(
    async (apiName, apiFunction, portalId) => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchAdData(apiName, apiFunction, portalId);
        setAds((prev) => ({
          ...prev,
          [apiName]: data,
        }));

        return data;
      } catch (err) {
        setError(`Failed to load ${apiName} ads`);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAdData, setAds, setIsLoading, setError]
  );

  return { ads, isLoading, error, getAds };
};
