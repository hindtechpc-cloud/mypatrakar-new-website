import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy } from "react";
import { GetTopBannerAds } from "../api";
import HeaderAd from "./TopBar/HeaderAd";
import Navbar from "./navigation/Navbar";
import Header from "./TopBar/Header";
import BreakingNewsBar from "./TopBar/BreakingNewsBar";
import Footer from "./footer/footer";
import FooterLinks from "./Home/FooterLinks";
import ScrollToTopButton from "./ScrollToTopButton";
import { useTranslation } from "react-i18next";
import { useSettingsContext } from "./context/SettingsContext";
import { AdDetailPage } from "./Home/market/pages/AdDetailPage";
import SellerQueryForm from "./Home/market/pages/QueryForm";
import { AdListingPage } from "./Home/market/pages/AdListingPage";
// import { useAds } from "./AdProvider"; // Import useAds hook
import { useAds } from "./context/AdsContext";
import NewsSkeleton from "./utils/NewsSkeleton";


// Lazy components
const Home = lazy(() => import("./Home/Home"));
const ReadNews = lazy(() => import("./Home/readNews/ReadNews"));
const Search = lazy(() => import("./Home/search/Search"));
const AboutMypatrakar = lazy(() => import("./Home/aboutMypatrakar/AboutMypatrakar"));
const PrivacyPolicy = lazy(() => import("./Home/privacyPolicy/PrivacyPolicy"));
const TermsAndCondition = lazy(() => import("./Home/termsAndConditions/TermsAndConditions"));
const ContactUs = lazy(() => import("./Home/contactUs/ContactUs"));
const AdvertiseWithUs = lazy(() => import("./Home/advertiseWithUs/AdvertiseWithUs"));
const OurReporters = lazy(() => import("./Home/ourRporters/OurReporters"));
const Feedback = lazy(() => import("./Home/readNews/feedback/Feedback"));
const ShortsPages = lazy(() => import("./Home/RightHome/shorts/ShortsPages"));
// const VideoGallery = lazy(() => import("./Home/readNews/videos/VideoGallery"));
const Category = lazy(() => import("./Home/category/Category"));
const Subcategory = lazy(() => import("./Home/subcategory/Subcategory"));

function Layout() {
  const location = useLocation();
  const { t } = useTranslation();
  const { getSettingStatus } = useSettingsContext();
  const { ads, isLoading, error, getAds } = useAds(); // Use the useAds hook

  const isBreakingNewsEnabled = getSettingStatus("Breaking Banner");
  const isAboutPageEnabled = getSettingStatus("About Us");
  const isAdvertiseWithUsPageEnabled = getSettingStatus("Apply for Advertisement");
  const commonPaths = [
    "/contact-us",
    "/our-reporters",
    "/about-us",
    "/terms-and-conditions",
    "/privacy-policy",
    "/advertise-with-us",
    "/feedback",
    "/market-place",
    "/seller-query-form",
    "/buyer-query-form",
    "/market-place/details",
  ];

  const searchPaths = ["/search", ...commonPaths];
  const isShorts = location.pathname.startsWith("/shorts");
  const isCommonPage = commonPaths.includes(location.pathname);
  const isSearchPage = searchPaths.includes(location.pathname);

  // Fetch top banner ads on mount
  useEffect(() => {
    getAds("topBanner", GetTopBannerAds, "").catch((err) =>
      console.log("Error fetching top banner ads:", err)
    );
  }, []);
console.log(ads);
  return (
    <>
      {!isShorts && <Header />}
      {!isCommonPage && !isShorts && (
        <>
          {ads?.topBanner?.top_banner!== null && (
            <div className="flex items-center justify-center mx-auto">
              <HeaderAd
                className="my-4 flex justify-center items-center bg-gray-300 sm:mx-0 rounded sm:w-[728px]  w-[320px] "
                adData={ads?.topBanner?.top_banner}
                text="Loading Top nav top Banner Ads..."
              />
            </div>
          )}
          <Navbar />
        </>
      )}
      {!isSearchPage && !isShorts && isBreakingNewsEnabled && <BreakingNewsBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/feedback" element={<Feedback />} />
        {isAboutPageEnabled && <Route path="/about-us" element={<AboutMypatrakar />} />}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {isAboutPageEnabled && <Route path="/about" element={<Navbar />} />}
        <Route path="/contact-us" element={<ContactUs />} />
        {isAdvertiseWithUsPageEnabled && (
          <Route path="/advertise-with-us" element={<AdvertiseWithUs />} />
        )}
        <Route path="/our-reporters" element={<OurReporters />} />
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/read-news/:type/:newsId" element={<ReadNews />} />
        <Route path="/shorts" element={<ShortsPages />} />
        <Route path="/search" element={<Search />} />
        <Route path="/market-place/:AdsId" element={<AdDetailPage />} />
        <Route path="/bharat-trending" element={<Search />} />
        <Route path="/buyer-query-form" element={<SellerQueryForm />} />
        <Route path="/seller-query-form" element={<SellerQueryForm />} />
        <Route path="/market-place" element={<AdListingPage />} />
        <Route path="/topic/:category/:categoryId" element={<Category />} />
        <Route
          path="/topic/:category/:subcategory/:subCategoryId"
          element={<Subcategory />}
        />
      </Routes>

      {!isCommonPage && !isShorts && <Footer />}
      {isCommonPage && !isShorts && <FooterLinks />}

{/* <NewsSkeleton/> */}
      <ScrollToTopButton />
    </>
  );
}

export default Layout;






