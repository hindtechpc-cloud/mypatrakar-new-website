import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import { useEffect, useState } from "react";
import { GetOwnerSocialLinks } from "../../api";

const SocialIcons = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await GetOwnerSocialLinks("MYAWR241227001");
        console.log("API Response:", res);
        if (res?.data?.response) {
          setSocialLinks(res.data.response);
          console.log("Social Links:", res.data.response);
        } else {
          console.warn("Invalid response format:", res);
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  const iconMap = {
    ...FaIcons,
    ...TbIcons,
  };

  return (
    <div className="flex flex-wrap gap-2 text-xl">
      {socialLinks.map((item, idx) => {
        const iconName = item.icon?.trim();
        const IconComponent = iconMap[iconName];
        const url = item?.url?.trim();

        if (!IconComponent) {
          console.warn(`Icon not found for: ${iconName}`);
          return null;
        }
        if (!url) {
          console.warn(`Invalid or empty URL for icon: ${iconName}`);
          return null;
        }

        return (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name || "Social Link"}
            className="flex items-center justify-center  rounded-full  text-gray-200 hover:text-blue-500  transition-all duration-300 cursor-pointer"
          >
            <IconComponent className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
