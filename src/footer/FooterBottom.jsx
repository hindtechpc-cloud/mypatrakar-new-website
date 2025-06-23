import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaPinterest, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa";
import SocialIcons from "../TopBar/SocialIcons";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-4 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Left Side: Copyright */}
        <p className="text-center md:text-left">
          © Copyright {currentYear}, All Rights Reserved to{" "}
          <span className="font-bold">MyPatrakar</span>
        </p>

        {/* Right Side: Developed by */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
            {/* <span className="text-gray-400 text-xs font-thin">Social Media</span> */}
          {/* Social Media Icons */}
          <SocialIcons />
          


          {/* Developer Info */}
          <p className="text-sm">
            Powered by{" "}
            <span className="font-semibold text-md">MyPatrakar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
