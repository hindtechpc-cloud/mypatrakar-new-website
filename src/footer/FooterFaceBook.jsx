import { useContext, useEffect, useState, useMemo } from "react";
import { SocialMediaContext } from "../context/SocialMediaContext";

export default function FooterFaceBook() {
  const [facebookUrl, setFacebookUrl] = useState("HindtechLucknow");
  const { socialLinks = [] } = useContext(SocialMediaContext);

  // Memoize the Facebook link finding to avoid recalculating unnecessarily
  const facebookLink = useMemo(() => {
    return socialLinks.find(
      (link) =>
        link.icon?.toLowerCase() === "fafacebook" ||
        link.name?.toLowerCase().includes("facebook")
    );
  }, [socialLinks]);

  useEffect(() => {
    if (!facebookLink?.url) return;

    try {
      const fbUrl = new URL(
        // Ensure the URL has a protocol for URL parsing
        facebookLink.url.startsWith('http') 
          ? facebookLink.url 
          : `https://${facebookLink.url}`
      );
      
      console.log(fbUrl)
      // Extract the page name more reliably
      const fbPage = fbUrl.pathname.split('/').filter(Boolean)[0] || 
                    fbUrl.hostname.split('.')[0];
      
      if (fbPage) {
        console.log(fbUrl.username)
        setFacebookUrl(fbUrl.username);
      }
    } catch (err) {
      console.error("Invalid Facebook URL:", facebookLink.url);
    }
  }, [facebookLink]);

  // Memoize the iframe src to prevent unnecessary re-renders
  const iframeSrc = useMemo(() => {
    return `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
      `https://www.facebook.com/${facebookUrl||"HindtechLucknow"}`
    )}&tabs=timeline&small_header=true&width=300&adapt_container_width=true&hide_cover=false&show_facepile=true`;
  }, [facebookUrl]);

  return (
    <div className="flex justify-center items-center p-1 rounded h-auto md:h-[330px]">
      <iframe
        src={iframeSrc}
        className="border-none overflow-hidden rounded-md w-full h-[500px] sm:h-[500px] md:h-[310px] lg:h-[330px] sm:w-full md:w-[250px] lg:w-[270px]"
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        style={{ border: "none", overflow: "hidden" }}
        data-chrome="noscrollbar"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Facebook Page Plugin"
      />
    </div>
  );
}