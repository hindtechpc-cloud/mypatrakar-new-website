// src/utils/GoogleTranslateHandler.js
export const loadGoogleTranslate = () => {
  return new Promise((resolve) => {
    if (window.google && window.google.translate) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
      resolve();
    };
  });
};

export const translatePageTo = (langCode) => {
  const select = document.querySelector(".goog-te-combo");
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
  } else {
    console.warn("Google Translate combo not found");
  }
};
