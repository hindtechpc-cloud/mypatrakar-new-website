import { useWebThemeContext } from "../context/WebThemeContext";
import SocialIcons from "../TopBar/SocialIcons";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();
  const { webTheme } = useWebThemeContext();

  return (
    <footer className="w-full bg-gray-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Copyright Section */}
        <p className="text-center md:text-left text-sm md:text-base text-gray-200">
          © {currentYear} My Patrakar All rights reserved.{" "}
         
        </p>

        {/* Social Media + Developer Info */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-sm">
          <SocialIcons />
          <span className="text-gray-200">
            Powered & Developed by{" "}
            <span className="font-semibold text-white ml"> {" "}MyPatrakar</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
