import { Link } from "react-router-dom";
import { useSettingsContext } from "../context/SettingsContext";

export default function FooterLinks() {
  const { getSettingStatus } = useSettingsContext();

  const isOurReportersPageEnabled = getSettingStatus("Our Reporters");
  const isAboutPageEnabled = getSettingStatus("About Us");
  const isAdvertiseWithUsPageEnabled = getSettingStatus("Apply for Advertisement");
    console.log(isOurReportersPageEnabled)
    console.log(isAboutPageEnabled)
    console.log(isAdvertiseWithUsPageEnabled)

  const links = [
    isAboutPageEnabled && { label: "ABOUT US", path: "/about-us" },
    isOurReportersPageEnabled && { label: "OUR REPORTERS", path: "/our-reporters" },
    isAdvertiseWithUsPageEnabled && { label: "ADVERTISE WITH US", path: "/advertise-with-us" },
    { label: "PRIVACY POLICY", path: "/privacy-policy" },
    { label: "CONTACT US", path: "/contact-us" },
    { label: "TERMS AND CONDITIONS", path: "/terms-and-conditions" },
    { label: "MARKET PLACE", path: "/market-place" },
    // { label: "ADVERTISE WITH US", path: "/advertise-with-us" },
  ].filter(Boolean); // Remove false values

  return (
    <div className="bg-black text-white py-4 text-sm bottom-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
          {links.map((link, index) => (
            <div key={index} className="flex items-center">
              {index !== 0 && (
                <span className="text-yellow-500 px-2">|</span>
              )}
              <Link
                to={link.path}
                className="hover:underline focus:text-yellow-300"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
