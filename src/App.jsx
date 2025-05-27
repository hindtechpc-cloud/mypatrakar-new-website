// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import { useState, lazy, Suspense, useEffect } from "react";
// import { LanguageContext } from "./context/LanguageContext";
// import { NewsContext } from "./context/NewsContext";
// import Loader from "./utils/Loader";
// import ScrollToTopButton from "./ScrollToTopButton";
// import ScrollToTop from "./utils/ScrollToTop";
// import Category from "./Home/category/Category";
// import Subcategory from "./Home/subcategory/Subcategory";
// import { useTranslation } from "react-i18next";

// const Home = lazy(() => import("./Home/Home"));
// const BreakingNewsBar = lazy(() => import("./TopBar/BreakingNewsBar"));
// const Header = lazy(() => import("./TopBar/Header"));
// const HeaderAd = lazy(() => import("./TopBar/HeaderAd"));
// const Navbar = lazy(() => import("./navigation/Navbar"));
// const Footer = lazy(() => import("./footer/footer"));
// const ReadNews = lazy(() => import("./Home/readNews/ReadNews"));
// const Search = lazy(() => import("./Home/search/Search"));
// const FooterLinks = lazy(() => import("./Home/FooterLinks"));

// const AboutMypatrakar = lazy(() =>
//   import("./Home/aboutMypatrakar/AboutMypatrakar")
// );
// const PrivacyPolicy = lazy(() => import("./Home/privacyPolicy/PrivacyPolicy"));
// const TermsAndCondition = lazy(() =>
//   import("./Home/termsAndConditions/TermsAndConditions")
// );
// const ContactUs = lazy(() => import("./Home/contactUs/ContactUs"));
// const AdvertiseWithUs = lazy(() =>
//   import("./Home/advertiseWithUs/AdvertiseWithUs")
// );
// const OurReporters = lazy(() => import("./Home/ourRporters/OurReporters"));
// const Feedback = lazy(() => import("./Home/readNews/feedback/Feedback"));
// import "./i18n";
// import { Toaster } from "react-hot-toast";
// import ShortsPages from "./Home/RightHome/shorts/ShortsPages";
// import VideoGallery from "./Home/readNews/videos/VideoGallery";
// // import Horoscope from "./Horoscope";
// import { GetTopBannerAds, GetWebTheme } from "../api";
// import { WebThemeContext } from "./context/ThemeContext";
// function Layout() {
//   const location = useLocation();
//   const { t, i18n } = useTranslation();

//   const urls = [
//     "/contact-us",
//     "/our-reporters",
//     "/about-us",
//     "/terms-and-conditions",
//     "/privacy-policy",
//     "/advertise-with-us",
//     "/feedback",
//   ];
//   const urlSearch = ["/search", ...urls];
//   // const location = useLocation();
//   // find last url
//   // const lastUrl = location.pathname.split("/").pop();
//   const [topBanner, setTopBanner] = useState(null);
//   const [loadingBanner, setLoadingBanner] = useState(true);
//   const [bannerError, setBannerError] = useState(false);

//   const loadTopBannerAds = async () => {
//     try {
//       setLoadingBanner(true);
//       setBannerError(false);

//       const res = await GetTopBannerAds("MYAWR241227001");

//       // Check for valid structure
//       if (res) {
//         // console.log(res);
//         setTopBanner(res.data.response.top_banner);
//       } else {
//         console.warn("Top banner structure not valid or images missing");
//         setBannerError(true);
//       }
//     } catch (error) {
//       console.log("Error loading top banner ads:", error);
//       setBannerError(true);
//     } finally {
//       setLoadingBanner(false);
//     }
//   };

//   useEffect(() => {
    
//     loadTopBannerAds();
//   }, []);
//   return (
//     <>
//       <Toaster position="top-right" />
//       {!location.pathname.startsWith("/shorts") && <Header />}
//       {!urls.includes(location.pathname) &&
//         !location.pathname.startsWith("/shorts") && (
//           <>
//             <div className=" flex items-center justify-center mx-auto">
//               {" "}
//               <HeaderAd
//                 className="my-4 flex justify-center items-center bg-gray-300 sm:mx-0 mx-2 rounded 
//   sm:w-[728px] sm:h-[90px] w-[320px] h-[100px]"
//                 adData={topBanner}
//                 text="Loading Top Banner Ads..."
//               />
//               {/* <Horoscope /> */}
//             </div>
//             <Navbar />
//           </>
//         )}
//       {!urlSearch.includes(location.pathname) &&
//         !location.pathname.startsWith("/shorts") && <BreakingNewsBar />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/feedback" element={<Feedback />} />
//         <Route path="/about-us" element={<AboutMypatrakar />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/about" element={<Navbar />} />
//         <Route path="/contact-us" element={<ContactUs />} />
//         <Route path="/advertise-with-us" element={<AdvertiseWithUs />} />
//         <Route path="/our-reporters" element={<OurReporters />} />
//         <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
//         <Route path="/read-news/:type/:newsId" element={<ReadNews />} />
//         <Route path="/shorts" element={<ShortsPages />} />
//         <Route path="/search" element={<Search />} />
//         <Route path="/bharat-trending" element={<Search />} />
//         <Route path="/videos" element={<VideoGallery />} />
//         <Route path="/topic/:category/:categoryId" element={<Category />} />
//         <Route
//           path="/topic/:category/:subcategory/:subCategoryId"
//           element={<Subcategory />}
//         />
//       </Routes>

//       {!urls.includes(location.pathname) &&
//         !location.pathname.startsWith("/shorts") && <Footer />}
//       {urls.includes(location.pathname) &&
//         !location.pathname.startsWith("/shorts") && <FooterLinks />}

//       <ScrollToTopButton />
//     </>
//   );
// }

// export default function App() {
//   const [language, setLanguage] = useState("hi");
//   const [news, setNews] = useState({});
//   const [webTheme, setWebTheme] = useState({});
//   // useEffect(() => {
//   //   let newsData = JSON.parse(localStorage.getItem("news"));
//   //   setNews(newsData);
//   // }, [news, setNews]);

//   const loadWebTheme = async () => {
//     const res = await GetWebTheme("MYAWR241227001");
//     // console.log(res.data.response);
//     setWebTheme(res.data.response);
//   };
//   useEffect(() => {
//     loadWebTheme();
//   }, []);
//   return (
//     <Router>
//       <ScrollToTop /> {/* Add this component here */}
//       <WebThemeContext.Provider value={{ webTheme, setWebTheme }}>
//         <LanguageContext.Provider value={{ language, setLanguage }}>
//           <NewsContext.Provider value={{ news, setNews }}>
//             <Suspense fallback={<Loader />}>
//               <div className="bg-gray-100 min-h-screen">
//                 <Layout />
//               </div>
//             </Suspense>
//           </NewsContext.Provider>
//         </LanguageContext.Provider>
//       </WebThemeContext.Provider>
//     </Router>
//   );
// }



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
