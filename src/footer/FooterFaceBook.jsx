import { useEffect, useState } from "react";
import { GetOwnerSocialLinks } from "../../api";

export default function FooterFaceBook() {
  const [facebookUrl, setFacebookUrl] = useState("HindtechLucknow");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setIsLoading(true);
        const res = await GetOwnerSocialLinks("MYAWR241227001");

        if (res?.data?.response) {
          const links = res.data.response;
          const facebookLink = links.find(link => link.name === "Facebook");

          if (facebookLink) {
            const fbUrl = new URL(facebookLink.url);
            const fbPage = fbUrl.pathname.split("/").filter(Boolean)[0];
            setFacebookUrl(fbPage || "HindtechLucknow");
          } else {
            setError("Facebook link not found.");
          }
        } else {
          setError("Invalid response format.");
        }
      } catch {
        setError("Failed to load social links.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  if (isLoading || !facebookUrl) return null;
  // if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center p-1 rounded h-[330px]">
      <iframe
        src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${facebookUrl}&tabs=timeline&small_header=true&width=300&adapt_container_width=true&hide_cover=false&show_facepile=true`}
        className="border-none overflow-hidden rounded-md w-full h-[500px] sm:h-[500px] md:h-[310px] lg:h-[330px] sm:w-[full] md:w-[250px] lg:w-[270px]"
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        style={{ border: "none", overflow: "hidden" }}
        data-chrome="noscrollbar"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
}
