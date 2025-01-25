// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationHI from "./locales/hi/translation.json";
import translationMR from "./locales/mr/translation.json";
import translationPA from "./locales/pa/translation.json";
import translationTA from "./locales/ta/translation.json";
import translationTE from "./locales/te/translation.json";
import translationBN from "./locales/bn/translation.json";
import translationGR from "./locales/gr/translation.json";
// import translationHI from "./locales/hi/translation.json";
// import translationHI from "./locales/hi/translation.json";
// Import other languages as needed

const resources = {

  hi: {
    translation: translationHI,
  },
  en: {
    translation: translationEN,
  },
  mr: {
    translation: translationMR,
  },
  pa: {
    translation: translationPA,
  },
  bn: {
    translation: translationBN,
  },
  gr: {
    translation: translationGR,
  },
  ta: {
    translation: translationTA,
  },
  te: {
    translation: translationTE,
  },
  // Add other languages here
};

i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    lng: "hi", // Default language
    fallbackLng: "hi", // Language to fall back on if a translation is not available
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
