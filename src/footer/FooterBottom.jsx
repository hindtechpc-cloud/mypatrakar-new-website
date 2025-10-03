//   );
// }

import { useWebThemeContext } from "../context/WebThemeContext";
import SocialIcons from "../TopBar/SocialIcons";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();
const {webTheme}=useWebThemeContext();
  return (
    <footer className="bg-gradient-to-r from-blue-950 to-blue-950 text-white py-6 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright Section */}
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base">
              © Copyright {currentYear}, All Rights Reserved to{" "}
              <span className="font-bold  transition-colors duration-300" style={{
            color:webTheme["bg-color"]
          }}>
                MyPatrakar
              </span>
            </p>
          </div>

          {/* Social Media and Developer Info */}

          <SocialIcons />
        </div>

        {/* Additional Links */}
        {/* <div className="mt-4 pt-4 border-t border-gray-800 flex flex-wrap justify-center gap-4 text-xs text-gray-300">
          <a
            href="/privacy-policy"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-and-conditions"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="/about-us"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="/contact-us"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Contact
          </a>
        </div> */}
      </div>
    </footer>
  );
}
