import { useContext, useEffect } from "react";
import {
  FaCopyright,
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { TbBrandThreads } from "react-icons/tb";
import { LanguageContext } from "../context/LanguageContext";
// import { useLocation } from "react-router-dom";

import logo1 from "../assets/Ellipse.svg";
import logo2 from "../assets/Mypatrakar2.png";
const languages = [
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "bn", label: "বাংলা" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
];

const Header = () => {
  // const location = useLocation();
  const urls = [
    "/about-us",
    "/terms-and-condition",
    "/privacy-policy",
    "/contact-us",
    "/our-reporters",
    "/advertise-with-us",
  ];
  const { setLanguage } = useContext(LanguageContext);
  // useEffect(() => {
  //   const loadGoogleTranslate = () => {
  //     if (!window.googleTranslateElementInit) {
  //       window.googleTranslateElementInit = () => {
  //         if (window.google && window.google.translate) {
  //           new window.google.translate.TranslateElement(
  //             {
  //               pageLanguage: "en",
  //               includedLanguages: "hi,en,mr,pa,bn,gu,ta,te",
  //               autoDisplay: false,
  //             },
  //             "google_translate_element"
  //           );
  //         }
  //       };
  //     }

  //     const scriptExists = document.getElementById("google-translate-script");
  //     if (!scriptExists) {
  //       const script = document.createElement("script");
  //       script.id = "google-translate-script";
  //       script.src =
  //         "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //       script.classList = "hidden";
  //       script.async = true;
  //       script.onload = () => {
  //         if (window.googleTranslateElementInit) {
  //           window.googleTranslateElementInit();
  //         }
  //       };
  //       document.body.appendChild(script);
  //     }
  //   };

  //   loadGoogleTranslate();
  // }, []);

  const changeLanguage = (langCode) => {
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = langCode;
      setLanguage(langCode);
      selectField.dispatchEvent(new Event("change", { bubbles: false }));
    }
  };

  return (
    <div className="bg-red-800 text-white py-2 px-4">
      {urls.includes(location.pathname) && (
        <div className=" flex flex-wrap justify-between  items-center">
          <div className="w-14">
            <img src={logo1} alt={"MyPatrakar Logo"} className="w-full" />
          </div>
          <div className="w-28">
            <img src={logo2} alt={"MyPatrakar Logo"} className="w-full" />
          </div>
        </div>
      )}
      <div className=" flex flex-wrap justify-between items-center">
        {/* Language Selection */}
        <div className="flex flex-wrap space-x-4 text-sm mb-2 md:mb-0">
          {languages.map(({ code, label }) => (
            <span
              key={code}
              // onClick={() => changeLanguage(code)}
              className="cursor-pointer hover:underline hover:text-yellow-300"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Google Translate Widget (Hidden) */}
        {/* <div id="google_translate_element" className="hidden "></div> */}

        {/* Social Media & Advertisement */}
        <div className="flex flex-wrap items-center space-x-8">
          <SocialIcons />
          {!urls.includes(location.pathname) && (
            <span className="text-sm mt-2 md:mt-0 cursor-pointer hover:underline">
              विज्ञापन के लिए संपर्क करें
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Extracted Social Icons Component
const SocialIcons = () => (
  <div className="flex space-x-2 text-lg">
    <FaFacebookF className="cursor-pointer hover:opacity-75" />
    <FaInstagram className="cursor-pointer hover:opacity-75" />
    <FaYoutube className="cursor-pointer hover:opacity-75" />
    <FaTelegram className="cursor-pointer hover:opacity-75" />
    <FaWhatsapp className="cursor-pointer hover:opacity-75" />
    <FaTwitter className="cursor-pointer hover:opacity-75" />
    <TbBrandThreads className="cursor-pointer hover:opacity-75" />
    <FaCopyright className="cursor-pointer hover:opacity-75" />
  </div>
);

export default Header;
