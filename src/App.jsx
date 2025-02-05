import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import { LanguageContext } from "./context/LanguageContext";
import { NewsContext } from "./context/NewsContext";
import Loader from "./utils/Loader";
import ScrollToTopButton from "./ScrollToTopButton";
import ScrollToTop from "./utils/ScrollToTop";
import Category from "./Home/category/Category";
import Subcategory from "./Home/subcategory/Subcategory";
import VideoGallery from "./Home/readNews/videos/VideoGallery";
import { useTranslation } from "react-i18next";

const Home = lazy(() => import("./Home/Home"));
const ShortsPages = lazy(() => import("./Home/RightHome/shorts/ShortsPages"));
const BreakingNewsBar = lazy(() => import("./TopBar/BreakingNewsBar"));
const Header = lazy(() => import("./TopBar/Header"));
const HeaderAd = lazy(() => import("./TopBar/HeaderAd"));
const Navbar = lazy(() => import("./navigation/Navbar"));
const Footer = lazy(() => import("./footer/footer"));
const ReadNews = lazy(() => import("./Home/readNews/ReadNews"));
const Search = lazy(() => import("./Home/search/Search"));
const FooterLinks = lazy(() => import("./Home/FooterLinks"));

const AboutMypatrakar = lazy(() =>
  import("./Home/aboutMypatrakar/AboutMypatrakar")
);
const PrivacyPolicy = lazy(() => import("./Home/privacyPolicy/PrivacyPolicy"));
const TermsAndCondition = lazy(() =>
  import("./Home/termsAndConditions/TermsAndConditions")
);
const ContactUs = lazy(() => import("./Home/contactUs/ContactUs"));
const AdvertiseWithUs = lazy(() =>
  import("./Home/advertiseWithUs/AdvertiseWithUs")
);
const OurReporters = lazy(() => import("./Home/ourRporters/OurReporters"));
const Feedback = lazy(() => import("./Home/readNews/feedback/Feedback"));
import './i18n'
function Layout() {
  const location = useLocation();
  const { t, i18n } = useTranslation();


  const urls = [
    "/contact-us",
    "/our-reporters",
    "/about-us",
    "/terms-and-conditions",
    "/privacy-policy",
    "/advertise-with-us",
    "/feedback",
  ];
  const urlSearch = ["/search", ...urls];
  // const location = useLocation();
  // find last url
  // const lastUrl = location.pathname.split("/").pop();
  return (
    <>
      {!location.pathname.startsWith("/shorts") && <Header />}
      {!urls.includes(location.pathname) &&
        !location.pathname.startsWith("/shorts") && (
          <>
            <HeaderAd />
            <Navbar />
          </>
        )}
      {!urlSearch.includes(location.pathname) &&
        !location.pathname.startsWith("/shorts") && <BreakingNewsBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about-us" element={<AboutMypatrakar />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<Navbar />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/advertise-with-us" element={<AdvertiseWithUs />} />
        <Route path="/our-reporters" element={<OurReporters />} />
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/readNews/:title" element={<ReadNews />} />
        <Route path="/shorts/:title" element={<ShortsPages />} />
        <Route path="/search" element={<Search />} />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/topic/:category" element={<Category />} />
        <Route path="/topic/:category/:subcategory" element={<Subcategory />} />
      </Routes>

      {!urls.includes(location.pathname) &&
        !location.pathname.startsWith("/shorts") && <Footer />}
      {urls.includes(location.pathname) &&
        !location.pathname.startsWith("/shorts") && <FooterLinks />}

      <ScrollToTopButton />
    </>
  );
}

export default function App() {
  const [language, setLanguage] = useState("hi");
  const [news, setNews] = useState({});
  return (
    <Router>
      <ScrollToTop /> {/* Add this component here */}
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <NewsContext.Provider value={{ news, setNews }}>
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        </NewsContext.Provider>
      </LanguageContext.Provider>
    </Router>
  );
}
