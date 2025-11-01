import React, { useEffect, useState } from "react";
import { GetOwnerSocialLinks } from "../../api";

export const SocialMediaContext = React.createContext();
export const SocialMediaProvider = ({ children }) => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setIsLoading(true);
        const res = await GetOwnerSocialLinks();
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

  return (
    <SocialMediaContext.Provider value={{ socialLinks, isLoading, error }}>
      {children}
    </SocialMediaContext.Provider>
  );
};