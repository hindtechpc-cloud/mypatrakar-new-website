// App.jsx
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { LanguageContext } from "./context/LanguageContext";
import { NewsContext } from "./context/NewsContext";
import { WebThemeContext } from "./context/ThemeContext";
import ScrollToTop from "./utils/ScrollToTop";
import Loader from "./utils/Loader";
import { GetWebTheme } from "../api";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout";

export default function App() {
  const [language, setLanguage] = useState("hi");
  const [news, setNews] = useState({});
  const [webTheme, setWebTheme] = useState({});
  const hasFetchedTheme = useRef(false);

  const loadWebTheme = async () => {
    const res = await GetWebTheme("MYAWR241227001");
    if (res?.data?.response) {
      setWebTheme(res.data.response);
    }
  };

  useEffect(() => {
    if (!hasFetchedTheme.current) {
      loadWebTheme();
      hasFetchedTheme.current = true;
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <WebThemeContext.Provider value={{ webTheme, setWebTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <NewsContext.Provider value={{ news, setNews }}>
            <Suspense fallback={<Loader />}>
              <div className="bg-gray-100 min-h-screen">
                <Toaster position="top-right" />
                <Layout />
              </div>
            </Suspense>
          </NewsContext.Provider>
        </LanguageContext.Provider>
      </WebThemeContext.Provider>
    </Router>
  );
}
