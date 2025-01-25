import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import BreakingNewsBar from "./TopBar/BreakingNewsBar";
import Header from "./TopBar/Header";
import HeaderAd from "./TopBar/HeaderAd";
import Navbar from "./navigation/Navbar";
import { useState } from "react";
import { LanguageContext } from "./context/LanguageContext";
import Footer from "./footer/footer";
export default function App() {
  const [language, setLanguage] = useState("hi");
  return (
    <Router>
      <div className="text-red-900 ">
        <LanguageContext.Provider
          value={{
            language,
            setLanguage,
          }}
        >
          <Header />
          <HeaderAd />
          <Navbar />
          <BreakingNewsBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<Navbar />} />
            <Route path="/contact" element={<BreakingNewsBar />} />
            <Route path="/login" element={<HeaderAd />} />
          </Routes>
          <Footer />
        </LanguageContext.Provider>
      </div>
    </Router>
  );
}
