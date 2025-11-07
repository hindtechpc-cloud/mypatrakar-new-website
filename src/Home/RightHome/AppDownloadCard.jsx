import React from "react";
import { useWebThemeContext } from "../../context/WebThemeContext";

export default function AppDownloadCard() {
  const {webTheme}=useWebThemeContext();
  return (
    <div className="mt-4 xl:w-[335px] lg:w-[295px]  flex flex-col items-center justify-center  text-white rounded-2xl p-8 shadow-lg w-full  mx-auto" style={{
      background:webTheme['bg-color']
    }}>
      {/* Logo */}
      <div className="mb-4">
        <img
          src= {webTheme['web-logo']}
          alt="MyPatrakar Logo"
          className="h-28 w-28 object-contain"
        />
      </div>

      {/* Title */}
      <h2 className="text-center text-xl font-normal tracking-wide mb-6">
        FOR SMARTPHONES <br /> AND TABLETS
      </h2>

      {/* Store Buttons */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Google Play Button */}
        <a
          href="#"
          className="flex items-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="h-10 w-auto"
          />
        </a>

        {/* App Store Button */}
        <a
          href="#"
          className="flex items-center "
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="h-10 w-auto"
          />
        </a>
      </div>
    </div>
  );
}
