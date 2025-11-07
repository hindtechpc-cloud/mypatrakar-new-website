import React from "react";
import { FaHeart, FaCommentDots, FaShareAlt } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";

export default function NewsArticleSkeleton() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-10 border border-yellow-100 hover:shadow-2xl hover:border-yellow-300 transition-all duration-500">
      {/* Header Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
          alt="Stock Market Bull"
          className="w-full h-72 object-cover"
        />
        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          शेयर बाजार
        </div>
      </div>

      {/* Reaction Section */}
      <div className="flex items-center justify-between px-5 py-3 text-gray-600 text-sm border-b border-gray-100">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
            <FaHeart /> <span>25.9k</span>
          </div>
          <div className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
            <FaCommentDots /> <span>657 Comments</span>
          </div>
          <div className="flex items-center gap-1 hover:text-yellow-500 transition-colors cursor-pointer">
            <BsFillSunFill /> <span>Top News</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaShareAlt className="cursor-pointer hover:text-green-600 transition" />
        </div>
      </div>

      {/* Author Section */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
        <img
          src="https://i.pravatar.cc/50"
          alt="Author"
          className="w-12 h-12 rounded-full border-2 border-yellow-300"
        />
        <div>
          <h3 className="font-semibold text-gray-800">Tinku Shah</h3>
          <p className="text-gray-500 text-sm">
            Aug 3, 2021 • <span className="italic">8 mins ago</span>
          </p>
        </div>
      </div>

      {/* Article Title */}
      <div className="px-5 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3 hover:text-yellow-600 transition-colors duration-300">
          अमेरिका और यूरोप के देशों में भारतीय आमों की डिमांड, अब योगी सरकार जेवर बना रही रेडिएशन ट्रीटमेंट प्लांट
        </h1>

        {/* Article Content Skeleton */}
        <div className="space-y-3 text-gray-700 leading-relaxed text-justify">
          <p>
            उत्तर प्रदेश के मुख्यमंत्री योगी आदित्यनाथ गुरुवार से जम्मू-कश्मीर विधानसभा चुनाव प्रचार में उतरे।
            योगी आदित्यनाथ ने माणक से उम्मीदवार रवींद्र कुमार मणि‍त्र, बिस्वापुर से चंदनकुमार गा, सांता से सुरेश सिंह
            व आसपास पूर से डॉ. नरेन्द्र सिंह...
          </p>
          <p>
            जम्मू : उत्तर प्रदेश के मुख्यमंत्री योगी आदित्यनाथ गुरुवार से जम्मू-कश्मीर विधानसभा चुनाव प्रचार में उतरे।
            योगी आदित्यनाथ ने माणक से उम्मीदवार रवींद्र कुमार मणि‍त्र, बिस्वापुर से चंदनकुमार गा...
          </p>
          <p>
            योगी सरकार जेवर में आधुनिक रेडिएशन ट्रीटमेंट प्लांट स्थापित कर रही है ताकि आमों का निर्यात अंतरराष्ट्रीय
            मानकों पर हो सके। यह प्लांट यूपी को एक्सपोर्ट हब में बदलने में मदद करेगा।
          </p>
        </div>
      </div>
    </div>
  );
}
