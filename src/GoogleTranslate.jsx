import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "hi,ta,te,bn,gu,ml,mr,pa,ur,en",
          layout:
            window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        marginTop: "10px",
        textAlign: "center",
      }}
    ></div>
  );
};

export default GoogleTranslate;
