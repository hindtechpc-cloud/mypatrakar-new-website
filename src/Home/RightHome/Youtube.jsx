import { useState, useEffect } from "react";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import { FiAlertCircle } from "react-icons/fi";
import Header from "./shared/Header";

const YouTube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  // Directly use the Malayalam All Songs channel URL
  const channelUrl = "https://youtube.com/@malayalamallsongs";

  // ✅ Extract Channel ID from channel handle URL
  const getChannelIdFromURL = async (url) => {
    try {
      if (!url) return null;
      
      // Remove query params like ?si=xxx
      const cleanUrl = url.split("?")[0].trim();

      // Directly extract the handle
      const handle = cleanUrl.match(/youtube\.com\/@([^\/]+)/)?.[1];
      if (!handle) throw new Error("Invalid YouTube handle URL");

      // Method 1: Try through noembed
      try {
        const noembedRes = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(cleanUrl)}`);
        if (!noembedRes.ok) throw new Error("Noembed request failed");
        
        const noembedData = await noembedRes.json();
        const authorUrl = noembedData?.author_url;

        if (authorUrl && authorUrl.includes("/channel/")) {
          return authorUrl.split("/channel/")[1].split(/[\/?#]/)[0];
        }
      } catch (e) {
        console.warn("Noembed approach failed, trying alternative methods");
      }

      // Method 2: Fetch channel page HTML directly
      try {
        const res = await fetch(`https://www.youtube.com/@${handle}`);
        const text = await res.text();
        
        // Try to find channelId in the HTML
        const match = text.match(/"channelId":"(UC[\w-]+)"/);
        if (match) return match[1];
        
        // Alternative pattern if above doesn't work
        const altMatch = text.match(/{"key":"browse_id","value":"(UC[\w-]+)"}/);
        if (altMatch) return altMatch[1];
      } catch (e) {
        console.error("HTML extraction failed:", e);
      }

      throw new Error("Could not extract channel ID");
    } catch (e) {
      console.error("Failed to get channel ID:", e);
      throw e;
    }
  };

  // ✅ Fetch videos from channel ID using RSS feed
  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError("");

      const channelId = await getChannelIdFromURL(channelUrl);
      if (!channelId) {
        throw new Error("Failed to extract Channel ID from the URL.");
      }

      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      
      if (data?.items?.length) {
        setVideos(data.items.slice(0, 10)); // Limit to 10 videos
      } else {
        throw new Error("No videos found in the channel.");
      }
    } catch (err) {
      console.error("Video fetch error:", err);
      setError(err.message || "Error loading YouTube videos.");
      
      // Retry logic (max 3 retries)
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          fetchVideos();
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [retryCount]);

  return (
    <div className="my-2 mt-5 font-sans max-w-md w-full mx-auto py-4 px-2">
      <Header
        text={
          <div className="flex items-center justify-start gap-2 text-lg">
            <BsFillCameraReelsFill className="text-red-500" /> 
            <span>Malayalam All Songs Videos</span>
          </div>
        }
      />
      
      <div className="mt-4 flex flex-col items-center justify-center gap-4 w-full overflow-y-auto max-h-[500px] hide-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <ImSpinner8 className="animate-spin text-2xl text-blue-500 mb-2" />
            <p className="text-gray-600 text-sm">Loading videos...</p>
            {retryCount > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Attempt {retryCount + 1} of 3
              </p>
            )}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <FiAlertCircle className="mx-auto text-red-500 text-2xl mb-2" />
            <p className="text-red-600 font-medium">{error}</p>
            {retryCount < 3 && (
              <button
                onClick={() => fetchVideos()}
                className="mt-3 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition"
              >
                Try Again
              </button>
            )}
          </div>
        ) : videos.length > 0 ? (
          videos.map((video) => {
            const videoId = video.guid.split(":").pop();
            return (
              <div
                key={video.guid}
                className="bg-white shadow-md w-full rounded-lg overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-48 sm:h-56"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-black font-semibold text-sm line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-2">
                    Published: {new Date(video.pubDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-gray-500">
            No videos available
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTube;