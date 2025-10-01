// import React, { useContext } from "react";
// import * as FaIcons from "react-icons/fa";
// import * as TbIcons from "react-icons/tb";
// import { SocialMediaContext } from "../context/SocialMediaContext";

// const SocialIcons = () => {
//   const { socialLinks, isLoading, error } = useContext(SocialMediaContext);

//   const iconMap = {
//     ...FaIcons,
//     ...TbIcons,
//   };

//   const colorMap = {
//     FaFacebook: "#1877F2",
//     FaTwitter: "#1DA1F2",
//     FaInstagram: "#E1306C",
//     FaLinkedin: "#0077B5",
//     FaYoutube: "#FF0000",
//     FaWhatsapp: "#25D366",
//     FaTelegram: "#0088cc",
//     FaPinterest: "#BD081C",
//     FaTiktok: "#010101",
//     FaSnapchat: "#FFFC00",
//     FaReddit: "#FF4500",
//     TbWorld: "#0A66C2", // fallback
//   };

//   if (isLoading) return <div className="text-gray-500">Loading...</div>;
//   // if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="flex flex-wrap gap-4 items-center justify-center">
//       {socialLinks.map((item, index) => {
//         const iconName = item.icon?.trim();
//         const IconComponent = iconMap[iconName];
//         const url = item.url?.startsWith("http") ? item.url : `https://${item.url}`;
//         const color = colorMap[iconName] || "#333";

//         if (!IconComponent || !url) return null;

//         return (
//           <a
//             key={index}
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label={item.name}
//             className="transition transform hover:scale-110"
//           >
//             <IconComponent
//               className="w-5 h-5  "
//               style={{ transition: "color 0.3s ease" }}
//               onMouseEnter={(e) => (e.currentTarget.style.color = color)}
//               onMouseLeave={(e) => (e.currentTarget.style.color = "")}
//               title={item.name}
//             />
//           </a>
//         );
//       })}
//     </div>
//   );
// };

// export default SocialIcons;

import React, { useContext, useMemo } from "react";
import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import { SocialMediaContext } from "../context/SocialMediaContext";
import { ImSpinner2 } from "react-icons/im";

const SocialIcons = () => {
  const { socialLinks = [], isLoading, error } = useContext(SocialMediaContext);

  const iconMap = useMemo(() => ({
    ...FaIcons,
    ...TbIcons,
  }), []);

  const colorMap = useMemo(() => ({
    FaFacebook: "#1877F2",
    FaTwitter: "#1DA1F2",
    FaInstagram: "#E1306C",
    FaLinkedin: "#0077B5",
    FaYoutube: "#FF0000",
    FaWhatsapp: "#25D366",
    FaTelegram: "#0088cc",
    FaPinterest: "#BD081C",
    FaTiktok: "#010101",
    FaSnapchat: "#FFFC00",
    FaReddit: "#FF4500",
    TbWorld: "#0A66C2", // fallback
  }), []);

  if (isLoading) return <div className=" text-center">
                <ImSpinner2 className="animate-spin text-white" size={40} />
              </div>;
  // if (error) return <div className="text-red-500">{error}</div>; // Uncomment if needed

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {socialLinks.map((item, index) => {
        const iconName = item?.icon?.trim();
        const IconComponent = iconMap[iconName];
        // const url = item?.url?.startsWith("http") ? item.url : `https://${item?.url}`;
        const url = item?.url;
        const color = colorMap[iconName] || "#333";

        if (!IconComponent || !url) return null;

        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item?.name || "social-link"}
            className="transition transform hover:scale-110"
          >
            <IconComponent
              className="w-5 h-5"
              title={item?.name}
              style={{ transition: "color 0.3s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = color)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
