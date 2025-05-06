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
    <div className="flex space-x-3 text-xl">
      {socialLinks.map((item, idx) => {
        const IconComponent = iconMap[item.icon];
        const url = item?.url?.trim();

        if (!IconComponent || !url) return null;

        return (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name || "Social Link"}
            className="hover:opacity-75 transition-opacity inline-block"
          >
            <IconComponent className="w-6 h-6 text-gray-200 hover:text-blue-500" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
