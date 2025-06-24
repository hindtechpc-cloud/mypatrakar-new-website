// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import { LanguageContext } from "./context/LanguageContext";
import { NewsContext } from "./context/NewsContext";
import { WebThemeContext } from "./context/ThemeContext";
import { SocialMediaProvider } from "./context/SocialMediaContext";
import ScrollToTop from "./utils/ScrollToTop";
import Loader from "./utils/Loader";
import { GetWebTheme } from "../api";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";

export default function App() {
  const [language, setLanguage] = useState("hi");
  const [news, setNews] = useState({});
  const [webTheme, setWebTheme] = useState({});

  useEffect(() => {
    const loadWebTheme = async () => {
      try {
        const res = await GetWebTheme("MYAWR241227001");
        if (res?.data?.response) {
          setWebTheme(res.data.response);
        }
      } catch (error) {
        console.error("Failed to fetch web theme:", error);
      }
    };

    loadWebTheme();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <SocialMediaProvider>
        <WebThemeContext.Provider value={{ webTheme, setWebTheme }}>
          <LanguageContext.Provider value={{ language, setLanguage }}>
            <NewsContext.Provider value={{ news, setNews }}>
              <Suspense fallback={<Loader />}>
                <div className="bg-gray-100 min-h-screen">
                  <Layout />
                </div>
              </Suspense>
            </NewsContext.Provider>
          </LanguageContext.Provider>
        </WebThemeContext.Provider>
      </SocialMediaProvider>
    </Router>
  );
}
