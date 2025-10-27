// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import { LanguageContext } from "./context/LanguageContext";
import { NewsContext } from "./context/NewsContext";
import { WebThemeContext } from "./context/ThemeContext";
import { SocialMediaProvider } from "./context/SocialMediaContext";
import ScrollToTop from "./utils/ScrollToTop";
import Loader from "./utils/Loader";
import { getSettings, GetWebTheme } from "../api";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";
import { AdProvider } from "./context/AdsContext";
import GoogleTranslate from "./GoogleTranslate";

// Cache keys
const WEB_THEME_CACHE_KEY = 'webThemeCache';
const WEB_THEME_TIMESTAMP_KEY = 'webThemeTimestamp';

export default function App() {
  const [language, setLanguage] = useState("hi");
  const [news, setNews] = useState({});
  const [webTheme, setWebTheme] = useState({});
  const [loading, setLoading] = useState(true);

  const loadWebTheme = async (forceRefresh = false) => {
    // Check if we have cached data and it's not expired (30 minutes)
    const cachedTheme = sessionStorage.getItem(WEB_THEME_CACHE_KEY);
    const cacheTimestamp = sessionStorage.getItem(WEB_THEME_TIMESTAMP_KEY);
    const now = new Date().getTime();
    const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    
    if (cachedTheme && cacheTimestamp && !forceRefresh && (now - parseInt(cacheTimestamp)) < thirtyMinutes) {
      // Use cached data
      setWebTheme(JSON.parse(cachedTheme));
      setLoading(false);
      return;
    }

    // Otherwise fetch new data
    try {
      const res = await GetWebTheme("MYAWR241227001");
      if (res?.data?.response) {
        const themeData = res.data.response;
        setWebTheme(themeData);
        
        // Cache the data with timestamp
        const timestamp = new Date().getTime();
        sessionStorage.setItem(WEB_THEME_CACHE_KEY, JSON.stringify(themeData));
        sessionStorage.setItem(WEB_THEME_TIMESTAMP_KEY, timestamp.toString());
      }
    } catch (error) {
      console.error("Failed to fetch web theme:", error);
      
      // Fallback to cached data if available
      if (cachedTheme) {
        setWebTheme(JSON.parse(cachedTheme));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWebTheme();
  }, []);

  // Set up interval to refresh data every 30 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Auto-refreshing web theme data (30-minute interval)');
      loadWebTheme(true);
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   const loadSetting = async () => {
  //     try {
  //       const res =await getSettings("");
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   loadSetting();
  // }, []);
  // const isExitPollEnabled = getSettingStatus("Exit Polls")
  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <ScrollToTop />
<Toaster
  position="top-center"
  toastOptions={{
    // Default options
    style: {
      width: "500px",
      height: "45px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      color: "#000",
      fontWeight: "bold",
      marginTop:'340px'
    },
    success: {
      style: {
        background: "#B0F7BF",
      },
    },
  error: {
  style: {
    background: "#fef2f2", // Tailwind bg-red-50 का hex code
  },
},
    custom: {
      style: {
        background: "orange",
      },
    },
  }}
/>
      <SocialMediaProvider>
        <WebThemeContext.Provider value={{ webTheme, setWebTheme, refreshWebTheme: () => loadWebTheme(true) }}>
          <LanguageContext.Provider value={{ language, setLanguage }}>
            <NewsContext.Provider value={{ news, setNews }}>
              <AdProvider>
              <Suspense fallback={<Loader />}>
                <div className="bg-gray-100 min-h-screen">
                   {/* <GoogleTranslate /> */}
                  <Layout />
                </div>
              </Suspense>
              </AdProvider>
            </NewsContext.Provider>
          </LanguageContext.Provider>
        </WebThemeContext.Provider>
      </SocialMediaProvider>
    </Router>
  );
}
