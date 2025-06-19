// src/TopBar/SocialIcons.jsx

import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import { useEffect, useState } from "react";
import { GetOwnerSocialLinks } from "../../api";
import React from "react";

const SocialIcons = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setIsLoading(true);
        const res = await GetOwnerSocialLinks("MYAWR241227001");

        if (res?.data?.response) {
          setSocialLinks(res.data.response);
        } else {
          setError("Invalid response format");
          console.warn("Invalid response format:", res);
        }
      } catch (error) {
        setError("Failed to load social links");
        console.error("Error fetching social links:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  const iconMap = {
    ...FaIcons,
    ...TbIcons,
  };

  const colorMap = {
    FaFacebook: "#1877F2",
    FaInstagram: "#E1306C",
    FaTwitter: "#1DA1F2",
    FaLinkedin: "#0077B5",
    FaYoutube: "#FF0000",
    FaWhatsapp: "#25D366",
    FaPinterest: "#BD081C",
    FaTelegram: "#0088cc",
    FaGithub: "#333",
    FaTiktok: "#010101",
    TbWorld: "#0A66C2", // Optional custom
  };

  if (isLoading) {
    return (
      <div className="flex gap-3 animate-pulse">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-500 dark:text-red-400">{error}</div>
    );
  }

  if (socialLinks.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        No social links available
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.map((item, idx) => {
        const iconName = item.icon?.trim();
        const IconComponent = iconMap[iconName];
        const url = item?.url?.trim();
        const brandColor = colorMap[iconName];

        if (!IconComponent || !url) return null;

        return (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name || "Social Link"}
            className="
              flex items-center justify-center
              
              rounded-full
              transition-all duration-300
              transform hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
              text-gray-700 dark:text-gray-300
            "
            aria-label={`Visit ${item.name || "social profile"}`}
          >
            <IconComponent
              className="w-5 h-5"
              style={{
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (brandColor) e.currentTarget.style.color = brandColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
