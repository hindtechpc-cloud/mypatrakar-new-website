import { Link } from "react-router-dom";

export default function FooterLinks() {
  return (
    <div className="bg-black text-white py-4 text-sm bottom-0">
      <div className="container mx-auto px-4">
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
          <Link to="/about-us" className="hover:underline focus:text-yellow-300">
            ABOUT US
          </Link>

          <span className=" text-yellow-500">|</span>
          <Link to="/our-reporters" className="hover:underline focus:text-yellow-300">
            OUR REPORTERS
          </Link>

          <span className=" text-yellow-500">|</span>
          <Link to="/privacy-policy" className="hover:underline focus:text-yellow-300">
            PRIVACY POLICY
          </Link>

          <span className=" text-yellow-500">|</span>
          <Link to="/contact-us" className="hover:underline focus:text-yellow-300">
            CONTACT US
          </Link>

          <span className=" text-yellow-500">|</span>
          <Link
            to="/terms-and-conditions"
            className="hover:underline focus:text-yellow-300"
          >
            TERMS AND CONDITIONS
          </Link>

          <span className=" text-yellow-500">|</span>
          <Link to="/advertise-with-us" className="hover:underline focus:text-yellow-300">
            ADVERTISE WITH US
          </Link>
        </div>
      </div>
    </div>
  );
}
