import React from "react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const JoinChannels = () => {
  return (
    <div className="flex flex-col items-center p-2 bg-gray-800 rounded-lg w-full my-5">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/8060905167"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-green-500 text-white py-2 px-4 rounded-lg mb-2 hover:bg-green-600 transition duration-300"
      >
        <FaWhatsapp className="mr-2 text-lg" />
        ज्वाइन व्हाट्सएप चैनल
      </a>

      {/* Telegram Button */}
      <a
        href="https://t.me/your-telegram-link"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        <FaTelegramPlane className="mr-2 text-lg" />
        ज्वाइन टेलीग्राम चैनल
      </a>
    </div>
  );
};

export default JoinChannels;
