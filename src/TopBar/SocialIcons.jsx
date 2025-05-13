import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import { useEffect, useState } from "react";
import { GetOwnerSocialLinks } from "../../api";

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
              hover:text-blue-500 dark:hover:text-blue-400
              transition-all duration-300
              transform hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
            "
            aria-label={`Visit ${item.name || "social profile"}`}
          >
            <IconComponent className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
