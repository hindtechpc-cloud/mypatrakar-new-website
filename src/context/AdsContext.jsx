import React, { useEffect, useState } from "react";
import { GetTopBannerAds, GetMarketPlaceAds } from "../../api"; // Import all your ad APIs

export const AdContext = React.createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to get cache key
  const getCacheKey = (adType, portalId) => `ad_${adType}_${portalId}`;

  // Load data from session storage or fetch fresh
  const loadAdData = async (adType, fetchFunction, portalId = "MYAWR241227001") => {
    const cacheKey = getCacheKey(adType, portalId);
    
    // Check session storage first
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      
      // Use cached data if less than 30 minutes old
      if (Date.now() - timestamp < 30 * 60 * 1000) {
        return data;
      }
    }

    // Fetch fresh data if no cache or expired
    try {
      const res = await fetchFunction(portalId);
      if (res?.data?.response) {
        const dataToCache = {
          data: res.data.response,
          timestamp: Date.now()
        };
        sessionStorage.setItem(cacheKey, JSON.stringify(dataToCache));
        return res.data.response;
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.error(`Error fetching ${adType} ads:`, error);
      throw error;
    }
  };

  // Load all ads on initial render
  useEffect(() => {
    const fetchAllAds = async () => {
      try {
        setIsLoading(true);
        
        const [topBanner, marketplace] = await Promise.all([
          loadAdData("top_banner", GetTopBannerAds),
          loadAdData("marketplace", GetMarketPlaceAds),
          // Add other ad types here
        ]);

        setAds({
          top_banner: topBanner,
          marketplace: marketplace,
          // Add other ad types here
        });

      } catch (error) {
        setError("Failed to load some ads");
        console.error("Error loading ads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllAds();
  }, []);

  // Function to manually refresh specific ad
  const refreshAd = async (adType) => {
    try {
      setIsLoading(true);
      let freshData;
      
      switch (adType) {
        case "top_banner":
          freshData = await loadAdData("top_banner", GetTopBannerAds);
          break;
        case "marketplace":
          freshData = await loadAdData("marketplace", GetMarketPlaceAds);
          break;
        // Add other cases
        default:
          throw new Error("Unknown ad type");
      }

      setAds(prev => ({ ...prev, [adType]: freshData }));
    } catch (error) {
      console.error(`Error refreshing ${adType} ad:`, error);
      setError(`Failed to refresh ${adType} ad`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdContext.Provider value={{ ads, isLoading, error, refreshAd }}>
      {children}
    </AdContext.Provider>
  );
};

// Custom hook for easy consumption
export const useAds = () => {
  const context = React.useContext(AdContext);
  if (!context) {
    throw new Error("useAds must be used within an AdProvider");
  }
  return context;
};