import React from "react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const JoinChannels = () => {
  return (
    <div className="mt-[9px] xl:w-[335px] lg:w-[295px] w-full mx-auto bg-[#2e2e2e] py-5 rounded-xl shadow-lg">
      <div className="flex flex-col items-center w-[300px] mx-auto space-y-3 font-sans">

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/8060905167"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-full bg-green-600 text-white font-bold py-2 px-3 rounded-full hover:bg-green-700 transition duration-300"
        >
          <span className="flex items-center justify-center w-9 h-9 bg-white rounded-full ml-2">
            <FaWhatsapp className="text-2xl text-green-600 font-bold" />
          </span>
          <span className="flex-1 text-center">ज्वाइन व्हाट्सएप चैनल</span>
        </a>

        {/* Telegram Button */}
        <a
          href="https://t.me/your-telegram-link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-full bg-[#229ED9] text-white font-bold py-2 px-3 rounded-full hover:bg-blue-600 transition duration-300"
        >
          <span className="flex items-center justify-center w-9 h-9 bg-white rounded-full ml-2">
            <FaTelegramPlane className="text-2xl text-[#229ED9] font-bold" />
          </span>
          <span className="flex-1 text-center">ज्वाइन टेलीग्राम चैनल</span>
        </a>

      </div>
    </div>
  );
};

export default JoinChannels;
