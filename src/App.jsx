// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState, lazy, Suspense } from "react";
// import { LanguageContext } from "./context/LanguageContext";
// import { NewsContext } from "./context/NewsContext";
// import Loader from "./utils/Loader";
// import ScrollToTopButton from "./ScrollToTopButton";

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
// export default function App() {
//   const [language, setLanguage] = useState("hi");
//   const [news, setNews] = useState({});

//   const urls = [
//     "/contact-us",
//     "/our-reporters",
//     "/about-us",
//     "/terms-and-conditions",
//     "/privacy-policy",
//     "/advertise-with-us",
//     "/feedback",
//   ];
//   const urlSearch = [
//     "/search",
//     "/contact-us",
//     "/our-reporters",
//     "/about-us",
//     "/terms-and-conditions",
//     "/privacy-policy",
//     "/advertise-with-us",
//     "/feedback",
//   ];
//   return (
//     <Router>
//       <div className="">
//         <LanguageContext.Provider value={{ language, setLanguage }}>
//           <NewsContext.Provider value={{ news, setNews }}>
//             <Suspense
//               fallback={
//                 <div>
//                   <Loader />
//                 </div>
//               }
//             >
//               {!location.pathname.startsWith("/shorts") && <Header />}
//               {!urls.includes(location.pathname) ||
//                 (!location.pathname.startsWith("/shorts") && (
//                   <div>
//                     <HeaderAd />
//                     <Navbar />
//                   </div>
//                 ))}
//               {!urlSearch.includes(location.pathname) ||
//                 (!location.pathname.startsWith("/shorts") && (
//                   <BreakingNewsBar />
//                 ))}

//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 {/* <Route path="/trending" element={<TopNews />} /> */}
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/feedback" element={<Feedback />} />
//                 <Route path="/about-us" element={<AboutMypatrakar />} />
//                 <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//                 <Route path="/about" element={<Navbar />} />
//                 <Route path="/contact-us" element={<ContactUs />} />
//                 <Route
//                   path="/advertise-with-us"
//                   element={<AdvertiseWithUs />}
//                 />
//                 <Route path="/our-reporters" element={<OurReporters />} />
//                 <Route
//                   path="/terms-and-conditions"
//                   element={<TermsAndCondition />}
//                 />
//                 <Route path="/readNews/:title" element={<ReadNews />} />
//                 <Route path="/search" element={<Search />} />
//               </Routes>

//               {!urls.includes(location.pathname) ||
//                 (!location.pathname.startsWith("/shorts") && <Footer />)}
//               {urls.includes(location.pathname) ||
//                 (!location.pathname.startsWith("/shorts") && <FooterLinks />)}
//               <ScrollToTopButton />
//             </Suspense>
//           </NewsContext.Provider>
//         </LanguageContext.Provider>
//       </div>
//     </Router>
//   );
// }

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
import ShortsPages from "./Home/RightHome/shorts/ShortsPages";

const Home = lazy(() => import("./Home/Home"));
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

function Layout() {
  const location = useLocation();
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
