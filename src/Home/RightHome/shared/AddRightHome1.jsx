import React from "react";
import { Link } from "react-router-dom";
import { useSettingsContext } from "../../../context/SettingsContext";

export default function AddRightHome1({ adsData, text, className }) {
  const { getSettingStatus } = useSettingsContext();

  const isAdvertiseWithUsPageEnabled = getSettingStatus(
    "Apply for Advertisement"
  );
  const isAdDataValid =
    adsData &&
    Array.isArray(adsData.ad_image_url) &&
    adsData.ad_image_url.length > 0;

  // ✅ If real ad data exists - Show actual advertisement
  if (isAdDataValid) {
    return (
      <div className={`relative group mt-2 ${className}`}>
        {/* Advertisement Card */}
        <div className="w-[300px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 mx-auto">
          
          {/* AD Badge */}
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              Advertisement
            </span>
          </div>

          {/* Ad Image */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${adsData.ad_image_url[0]}`}
              alt={adsData.ad_title || "Advertisement"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Ad Content */}
          <div className="p-4">
            {adsData.ad_title && (
              <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                {adsData.ad_title}
              </h3>
            )}
            
            {adsData.ad_subtitle && (
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                {adsData.ad_subtitle}
              </p>
            )}

            {/* CTA Button */}
            {adsData.ad_url && (
              <a
                href={adsData.ad_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center text-xs font-semibold py-2 px-4 rounded transition-colors duration-200"
              >
                Learn More
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }


  // const handleContactClick=()=>{

  // }
  // 🧱 Fallback: Promotional Ad for Advertising Space
  return (
    <div className={`mt-2 mx-auto ${className}`}>
      {/* Advertising Space Card - Looks like real ad */}
      <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        
        {/* Header with Ad Label */}
        <div className="bg-gray-100 px-3 py-2 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Advertisement Space
            </span>
            <span className="text-[10px] bg-yellow-500 text-white px-2 py-1 rounded font-bold">
              AVAILABLE
            </span>
          </div>
        </div>

        {/* Ad Content */}
        <div className="p-4 text-center">
          
          {/* Icon */}
          <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0V3m0 3h6V3"/>
            </svg>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-sm mb-2">
            Your Ad Could Be Here
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-xs mb-4 leading-relaxed">
            Reach 1M+ monthly readers. Premium sidebar placement. High visibility for your brand.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center">
              <div className="font-bold text-blue-600 text-sm">1M+</div>
              <div className="text-[10px] text-gray-500">Readers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600 text-sm">50K+</div>
              <div className="text-[10px] text-gray-500">Daily Visits</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600 text-sm">95%</div>
              <div className="text-[10px] text-gray-500">Visibility</div>
            </div>
          </div>

          {/* CTA Button */}
          {isAdvertiseWithUsPageEnabled && (
            <Link 
              to="/advertise-with-us" 
              className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-semibold py-2 px-4 rounded transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Advertise With Us
            </Link>
          )}

          {/* Contact Info */}
          {/* <div className="mt-3 text-center">
            <div className="text-[10px] text-gray-500 mb-1">Contact for rates:</div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs font-semibold text-gray-800">+91 XXXXX XXXXX</span>
              <button className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors" onClick={handleContactClick}>
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
            </div>
          </div> */}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-3 py-2 border-t border-gray-300">
          <p className="text-[10px] text-gray-500 text-center">
            Premium advertising spot • High conversion rates
          </p>
        </div>
      </div>
    </div>
  );
}