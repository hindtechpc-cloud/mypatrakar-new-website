import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaBullhorn, FaUsers, FaStar, FaRocket } from "react-icons/fa";

export default function PosterAd({ isAdvertiseWithUsPageEnabled }) {
  return (
    <div className="mt-2 w-[320px] mx-auto text-center rounded-2xl shadow-2xl overflow-hidden border-0 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
      {/* Premium Header Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 h-3 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 px-6 py-6 relative">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 opacity-5">
          <FaBullhorn size={80} />
        </div>
        
        {/* Main Title with Icon */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-full shadow-lg">
            <FaBullhorn className="text-white" size={20} />
          </div>
          <h2 className="text-blue-800 font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            विज्ञापन बॉक्स
          </h2>
        </div>

        {/* Subtitle */}
        <h3 className="text-red-600 font-extrabold text-lg mb-3 flex items-center justify-center gap-2">
          <FaUsers className="text-red-500" />
          लाखों रीडर्स / व्यूअर्स तक
          <FaRocket className="text-red-500 ml-1" />
        </h3>

        {/* Main Description */}
        <div className="bg-white/80 rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <p className="text-gray-800 text-sm leading-relaxed mb-2 font-medium">
            पहुँचाएं अपना विज्ञापन <span className="text-green-600 font-bold">न्यूनतम दरों</span> में
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="flex items-center gap-1 text-xs">
              <FaStar className="text-yellow-500 text-xs" />
              <span className="text-gray-700">प्रीमियम विजिबिलिटी</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <FaStar className="text-yellow-500 text-xs" />
              <span className="text-gray-700">वाइड रीच</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <FaStar className="text-yellow-500 text-xs" />
              <span className="text-gray-700">कॉस्ट एफेक्टिव</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <FaStar className="text-yellow-500 text-xs" />
              <span className="text-gray-700">इंस्टेंट रिस्पॉन्स</span>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed mb-3 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100">
            <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded">चुनावी विज्ञापन</span>,{" "}
            <span className="text-blue-600 font-semibold">व्यवसाय</span>,{" "}
            <span className="text-green-600 font-semibold">प्रतिष्ठान</span>,{" "}
            <span className="text-purple-600 font-semibold">शैक्षिक संस्थान</span>,{" "}
            <span className="text-orange-600 font-semibold">विशेष अवसर</span> पर शुभकामना संदेश
          </p>
        </div>

        {/* Call to Action */}
        <div className="  rounded-xl ">
          <p className="text-black font-bold text-sm mb-2 flex items-center justify-center gap-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">
              LIMITED TIME
            </span>
            आज ही संपर्क करें
          </p>

          {/* WhatsApp Contact - Enhanced */}
         <Link to={`https://wa.me/918960905167?text=${encodeURIComponent("नमस्ते! मैं विज्ञापन के बारे में जानकारी चाहता हूँ।")}`}>
         
          <div className="bg-green-50 rounded-lg shadow-sm border border-green-100 p-2 mb-2">
            <div className="flex justify-center items-center space-x-3 mb-2">
              <div className="bg-white  rounded-full">
                <FaWhatsapp className="text-green-600" size={24} />
              </div>
              <span className="font-bold text-gray-800 text-lg tracking-wide">
                +91 8960905167
              </span>
            </div>
            {/* <p className="text-green-600 text-xs font-medium">24x7 Available</p> */}
          </div></Link>
        </div>

        {/* CTA Button */}
        {isAdvertiseWithUsPageEnabled && (
          <Link
            to="/advertise-with-us"
            className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl text-sm font-bold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {/* <FaWhatsapp className="text-white" size={18} /> */}
            Message करने के लिए क्लिक करें
          </Link>
        )}

     
      </div>

      {/* Premium Footer Banner */}
      <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 h-3 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
    </div>
  );
}