import React from "react";

export default function AddRightHome1({ adsData }) {
  const shouldShowCustomUI =
    !adsData ||
    !adsData.ad_title ||
    !adsData.ad_image_url ||
    adsData.ad_image_url.length === 0;

  if (shouldShowCustomUI) {
    return (
      <div className="relative md:max-w-sm w-[320px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-red-100 via-blue-50 to-purple-100 border-2 border-white hover:shadow-3xl transition-all duration-500 group">
        {/* Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-400 rounded-full filter blur-xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full filter blur-xl opacity-20"></div>

        <div className="relative z-10 p-6 text-center">
          {/* Header */}
          <div className="mb-5">
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 inline-block">
              लाखों रीडर्स/व्यूअर्स तक
              <span className="block h-1 mt-1 bg-gradient-to-r from-red-400 to-purple-400 w-3/4 mx-auto scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </h3>
            <p className="text-gray-600 mt-2 font-medium text-sm">
              पहुंचाएं अपना विज्ञापन न्यूनतम दर में
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: "चुनावी विज्ञापन", color: "red" },
              { label: "व्यवसाय", color: "blue" },
              { label: "प्रतिष्ठान", color: "purple" },
              { label: "शैक्षिणिक संस्थान", color: "pink" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/90 p-2 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-8 h-8 mx-auto mb-1 bg-${item.color}-100 rounded-full flex items-center justify-center`}
                >
                  <div
                    className={`w-5 h-5 text-${item.color}-600`}
                    dangerouslySetInnerHTML={{
                      __html: `
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                        </svg>`,
                    }}
                  />
                </div>
                <span
                  className={`text-xs font-bold text-${item.color}-600`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="relative w-full py-3 px-6 mb-4 font-extrabold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
            <span className="relative z-10">आज ही संपर्क करें</span>
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            <span className="absolute animate-pulse-slow top-0 left-0 w-2 h-full bg-white/30 -translate-x-10 group-hover:translate-x-[400px] transition-transform duration-1000"></span>
          </button>

          {/* Contact info */}
          <div className="flex items-center justify-center mb-2 animate-float">
            <div className="bg-white/90 px-4 py-2 rounded-full shadow-md border border-gray-100 flex items-center">
              <span className="text-lg font-bold text-gray-800">+91 XXXX-XX-XXXX</span>
              <a href="#" className="ml-2 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors shadow-inner">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-4 text-xs text-gray-500 border-t border-gray-200 pt-3">
            विज्ञापन के लिए संपर्क करें और न्यूज़ वेबसाइट पर प्रकाशित कराएं।
          </p>
        </div>
      </div>
    );
  }

  // ✅ If ads data available, show dynamic ad component
  return (
    <div className="w-[320px] p-3 border rounded-lg shadow-sm bg-white mx-auto">
      {adsData.ad_image_url.length > 0 && (
        <img
          src={adsData.ad_image_url[0]}
          alt="Ad Banner"
          className="rounded-lg w-full mb-2"
        />
      )}
      {adsData.ad_title && (
        <h2 className="text-lg font-semibold text-gray-800">{adsData.ad_title}</h2>
      )}
      {adsData.ad_subtitle && (
        <p className="text-sm text-gray-600">{adsData.ad_subtitle}</p>
      )}
      {adsData.ad_url && (
        <a
          href={adsData.ad_url}
          className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit
        </a>
      )}
    </div>
  );
}
