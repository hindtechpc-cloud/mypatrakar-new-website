import React, { useContext, useState } from "react";
import { WebThemeContext } from "../../../context/ThemeContext";
import { useWebThemeContext } from "../../../context/WebThemeContext";

export default function KMBInfoComponent() {
  const [open, setOpen] = useState(false);
  const { webTheme } = useWebThemeContext();

  const theme=webTheme['bg-color']||"blue";

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2  border text-sm  rounded-md shadow-md  transition animate-pulse"
        style={{
            background:""
        }}
      >
       K, M, और B का मतलब
      </button>

      {/* Overlay + Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-5 z-10">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h2 className="text-gray-800 font-semibold text-lg ">
                K, M, और B का मतलब
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-xl leading-none"
              >
                ✖
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 text-sm text-gray-700">
              <p>ये अक्षर बड़ी संख्याओं को छोटा रूप में दिखाते हैं:</p>
              <ul className="space-y-2">
                <li>
                  <strong>K</strong> = हज़ार{" "}
                  <span className="text-gray-500">(1K = 1,000)</span>
                </li>
                <li>
                  <strong>M</strong> = मिलियन{" "}
                  <span className="text-gray-500">(1M = 1,000,000)</span>
                </li>
                <li>
                  <strong>B</strong> = बिलियन{" "}
                  <span className="text-gray-500">(1B = 1,000,000,000)</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-gray-700 mb-3 mt-3 text-center">
              यह चार्ट और संख्याओं को पढ़ने में आसान बनाता है:
            </p>
            {/* Footer */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2   rounded-md border bg-blue-50 "
            
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
