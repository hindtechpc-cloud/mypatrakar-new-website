// import { BsInstagram } from "react-icons/bs";
// import { FaFacebook, FaPinterest, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa";
// import SocialIcons from "../TopBar/SocialIcons";

// export default function FooterBottom() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-900 text-white py-4 text-sm">
//       <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
//         {/* Left Side: Copyright */}
//         <p className="text-center md:text-left">
//           © Copyright {currentYear}, All Rights Reserved to{" "}
//           <span className="font-bold">MyPatrakar</span>
//         </p>

//         {/* Right Side: Developed by */}
//         <div className="flex items-center space-x-4 mt-2 md:mt-0">
//             {/* <span className="text-gray-400 text-xs font-thin">Social Media</span> */}
//           {/* Social Media Icons */}
//           <SocialIcons />

//           {/* Developer Info */}
//           <p className="text-sm">
//             Powered by{" "}
//             <span className="font-semibold text-md">MyPatrakar</span>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import SocialIcons from "../TopBar/SocialIcons";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-950 to-blue-950 text-white py-6 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright Section */}
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base">
              © Copyright {currentYear}, All Rights Reserved to{" "}
              <span className="font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
                MyPatrakar
              </span>
            </p>
          </div>

          {/* Social Media and Developer Info */}

          <SocialIcons />
        </div>

        {/* Additional Links */}
        <div className="mt-4 pt-4 border-t border-gray-800 flex flex-wrap justify-center gap-4 text-xs text-gray-300">
          <a
            href="/privacy"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="/about"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
