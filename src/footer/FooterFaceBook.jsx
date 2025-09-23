// src/components/FooterFaceBook.jsx
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import { SocialMediaContext } from "../context/SocialMediaContext";

/**
 * FooterFaceBook
 * - normalizes many facebook url formats
 * - builds the facebook plugins/page.php?href=... url
 * - shows fallback / unavailable UI if no url or iframe fails to load
 */
export default function FooterFaceBook() {
  const { socialLinks = [] } = useContext(SocialMediaContext);

  // raw href we will pass to the plugin (full https://www.facebook.com/...)
  const [facebookHref, setFacebookHref] = useState("");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const timeoutRef = useRef(null);

  // find candidate link from socialLinks
  const facebookLink = useMemo(() => {
    return socialLinks.find(
      (link) =>
        (link.icon && link.icon.toLowerCase().includes("facebook")) ||
        (link.name && link.name.toLowerCase().includes("facebook")) ||
        (link.url && link.url.toLowerCase().includes("facebook"))
    );
  }, [socialLinks]);

  // helper: normalize different facebook input formats into full https://www.facebook.com/xxx or profile.php?id=...
  const normalizeFacebookHref = (input) => {
    if (!input) return null;

    // trim & remove surrounding whitespace
    let v = String(input).trim();

    // If user gave a full plugin URL already, accept it
    if (v.includes("facebook.com/plugins/page.php")) {
      // Might already be an embed URL — attempt to extract href param
      try {
        const u = new URL(v.startsWith("http") ? v : `https://${v}`);
        const hrefParam = u.searchParams.get("href");
        if (hrefParam) return hrefParam;
      } catch (e) {
        // fallthrough
      }
    }

    // If it's a bare username: accept it
    // e.g. HindtechLucknow  OR facebook.com/HindtechLucknow
    // ensure no query params
    try {
      // if value doesn't contain protocol, add http to parse
      const maybeUrl = v.startsWith("http") ? v : `https://${v}`;
      const url = new URL(maybeUrl);

      // if path is profile.php and has id param, keep that full URL
      if (url.pathname.includes("profile.php")) {
        // keep full profile.php?id=xxxxx
        const id = url.searchParams.get("id");
        if (id) {
          return `https://www.facebook.com/profile.php?id=${encodeURIComponent(
            id
          )}`;
        }
      }

      // otherwise take the first path segment as username/page
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length > 0) {
        return `https://www.facebook.com/${parts.join("/")}`;
      }

      // fallback to hostname (rare)
      const hostPart = url.hostname.split(".")[0];
      if (hostPart && hostPart !== "www" && hostPart !== "facebook") {
        return `https://www.facebook.com/${hostPart}`;
      }
    } catch (err) {
      // not a URL — maybe raw username
      // strip unwanted chars and return
      const username = v.replace(/^@/, "").split(/[?#/]/)[0];
      if (username) return `https://www.facebook.com/${username}`;
    }

    return null;
  };

  // compute plugin src from href
  const pluginSrcFromHref = (href) => {
    if (!href) return "";
    const encoded = encodeURIComponent(href);
    return `https://www.facebook.com/plugins/page.php?href=${encoded}&tabs=timeline&small_header=true&width=300&adapt_container_width=true&hide_cover=false&show_facepile=true`;
  };

  // when facebookLink changes, normalize and set href
  useEffect(() => {
    setIframeLoaded(false);
    setIframeFailed(false);
    clearTimeout(timeoutRef.current);

    if (!facebookLink?.url && !facebookLink) {
      // nothing provided
      setFacebookHref("");
      return;
    }

    const candidate = facebookLink?.url || facebookLink;
    const normalized = normalizeFacebookHref(candidate);

    if (normalized) {
      setFacebookHref(normalized);
    } else {
      setFacebookHref("");
    }
  }, [facebookLink]);

  // If href set, start a timeout to consider load failed if onLoad not fired in 8s
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    setIframeLoaded(false);
    setIframeFailed(false);

    if (!facebookHref) return;

    timeoutRef.current = setTimeout(() => {
      if (!iframeLoaded) {
        setIframeFailed(true);
      }
    }, 8000);

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facebookHref]);

  const iframeSrc = useMemo(() => pluginSrcFromHref(facebookHref), [facebookHref]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeFailed(false);
    clearTimeout(timeoutRef.current);
  };

  const openInNewTab = () => {
    if (!facebookHref) return;
    window.open(facebookHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* If we don't have a normalized Facebook href — show placeholder */}
      {!facebookHref ? (
        <div className="w-full p-4 border border-gray-200 rounded-md text-center bg-white shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Facebook unavailable</h4>
          <p className="text-sm text-gray-600 mb-3">
            कोई वैध Facebook लिंक नहीं मिली। कृपया सुनिश्चित करें कि आपने
            अपना Facebook page URL/username सही दिया है — जैसे:
          </p>
          <code className="block bg-gray-100 p-2 rounded text-xs mb-2">
            https://www.facebook.com/hindtechLucknow
          </code>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                // try fallback: open admin-provided raw value (if available)
                const fallback = facebookLink?.url || facebookLink;
                if (!fallback) return;
                try {
                  const target = fallback.startsWith("http")
                    ? fallback
                    : `https://${fallback}`;
                  window.open(target, "_blank", "noopener,noreferrer");
                } catch (e) {
                  // noop
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded shadow-sm"
            >
              Open provided link
            </button>
          </div>
        </div>
      ) : (
        // Have a facebook href -> show iframe with overlay if failed
        <div className="relative w-full rounded-md overflow-hidden shadow-sm">
          {/* iframe */}
          <iframe
            src={iframeSrc}
            className="w-full h-[500px] sm:h-[420px] md:h-[310px] lg:h-[330px] border-none"
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            title="Facebook Page Plugin"
            onLoad={handleIframeLoad}
            // onError is not reliable for cross-origin iframes but included just in case
            onError={() => setIframeFailed(true)}
            style={{ minHeight: 320 }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />

          {/* Loading indicator (before load) */}
          {!iframeLoaded && !iframeFailed && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700" />
                <div className="text-sm text-gray-700">Loading Facebook...</div>
              </div>
            </div>
          )}

          {/* Unavailable overlay */}
          {iframeFailed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 p-4 text-center">
              <h4 className="text-lg font-semibold mb-2 text-red-600">
                Facebook content unavailable
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Facebook plugin नहीं दिख रही — संभव है कि page/plugin restricted हो
                या privacy settings allow नहीं कर रही। आप सीधे page खोल सकते हैं।
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={openInNewTab}
                  className="px-4 py-2 bg-blue-600 text-white rounded shadow"
                >
                  Open Facebook Page
                </button>
                <button
                  onClick={() => {
                    // try reload only this component's iframe
                    setIframeFailed(false);
                    setIframeLoaded(false);
                    // restart the timeout
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = setTimeout(() => {
                      if (!iframeLoaded) setIframeFailed(true);
                    }, 8000);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  Retry
                </button>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                Link:{" "}
                <a
                  href={facebookHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {facebookHref}
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
