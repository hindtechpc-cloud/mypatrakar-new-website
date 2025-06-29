import { useContext, useEffect, useState } from "react";
import { BsFillCameraReelsFill, BsYoutube } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { SocialMediaContext } from "../../../context/SocialMediaContext";

// Default YouTube channel ID (example: BBC News)
const DEFAULT_CHANNEL_ID = "UC16niRr50-MSBwiO3YDb3RA";

// Skeleton component for loading state
const VideoSkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
    <div className="bg-gray-300 h-56 w-full" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [channelId, setChannelId] = useState("");
  const [usingDefaultChannel, setUsingDefaultChannel] = useState(false);
  const { socialLinks } = useContext(SocialMediaContext);

  // Extract YouTube URL from context
  const youtubeUrl = socialLinks?.find(
    (link) =>
      link.icon?.toLowerCase() === "fayoutube" ||
      link.name?.toLowerCase().includes("youtube")
  )?.url;

  // Extract channel ID from YouTube URL with fallback to default
  useEffect(() => {
    const extractChannelId = async () => {
      if (!youtubeUrl) {
        setError("YouTube link not found. Showing default channel videos.");
        setUsingDefaultChannel(true);
        setChannelId(DEFAULT_CHANNEL_ID);
        return;
      }

      try {
        setLoading(true);
        setError("");
        setUsingDefaultChannel(false);

        // Try using noembed API
        const noembedRes = await fetch(
          `https://noembed.com/embed?url=${encodeURIComponent(youtubeUrl)}`
        );
        
        if (!noembedRes.ok) throw new Error("Noembed API failed");
        
        const noembedData = await noembedRes.json();
        const authorUrl = noembedData?.author_url;

        if (authorUrl?.includes("/channel/")) {
          const id = authorUrl.split("/channel/")[1].split(/[\/?#]/)[0];
          setChannelId(id);
          return;
        }

        // Fallback: extract from handle
        const handle = youtubeUrl.split("youtube.com/@")[1]?.split(/[\/?#]/)[0];
        if (!handle) throw new Error("Invalid YouTube handle URL.");

        const htmlRes = await fetch(`https://www.youtube.com/@${handle}`);
        if (!htmlRes.ok) throw new Error("YouTube page not found");
        
        const html = await htmlRes.text();

        const match =
          html.match(/"channelId":"(UC[\w-]+)"/) ||
          html.match(/{"key":"browse_id","value":"(UC[\w-]+)"}/);

        if (match?.[1]) {
          setChannelId(match[1]);
        } else {
          throw new Error("Channel ID not found in HTML.");
        }
      } catch (err) {
        console.error("Channel ID extraction error:", err);
        setError("Failed to get YouTube channel information. Showing default videos.");
        setUsingDefaultChannel(true);
        setChannelId(DEFAULT_CHANNEL_ID);
      } finally {
        setLoading(false);
      }
    };

    extractChannelId();
  }, [youtubeUrl]);

  // Fetch videos from YouTube RSS feed with error handling
  useEffect(() => {
    if (!channelId) return;

    const fetchVideos = async () => {
      try {
        setLoading(true);
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
        );
        
        if (!res.ok) throw new Error("RSS feed fetch failed");
        
        const data = await res.json();

        if (data?.items?.length) {
          setVideos(data.items);
          setError("");
        } else {
          throw new Error("No videos found in feed.");
        }
      } catch (err) {
        console.error("Video fetch error:", err);
        setError("Failed to load videos from this channel. Trying default channel...");
        
        // Try fallback to default channel if current channel fails
        if (!usingDefaultChannel) {
          setUsingDefaultChannel(true);
          setChannelId(DEFAULT_CHANNEL_ID);
        } else {
          setError("Failed to load videos. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelId, usingDefaultChannel]);

  const loadMoreVideos = () => {
    setVisibleVideos((prev) => prev + 6);
  };

  const handleSubscribe = () => {
    if (channelId) {
      window.open(
        `https://www.youtube.com/channel/${channelId}?sub_confirmation=1`,
        "_blank"
      );
    }
  };

  return (
    <div className="my-6 font-sans bg-gradient-to-b from-gray-100 to-gray-300 p-6 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BsFillCameraReelsFill className="text-red-600 text-2xl" />
        <h2 className="text-2xl font-bold text-gray-800">
          {usingDefaultChannel ? "Featured Videos" : "Latest Videos"}
        </h2>
        {usingDefaultChannel && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
            Default Channel
          </span>
        )}
      </div>

      {/* Error message (if not loading) */}
      {error && !loading && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <FiAlertCircle className="text-yellow-500 text-xl mt-0.5 flex-shrink-0" />
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <VideoSkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          {/* Video Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.slice(0, visibleVideos).map((video) => {
              const videoId =
                video.link?.split("v=")[1]?.split("&")[0] ||
                video.guid?.split(":")[2];
              return (
                <div
                  key={video.guid}
                  className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-2xl"
                >
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-t-lg">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      {new Date(video.pubDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            {visibleVideos < videos.length && (
              <button
                className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:bg-gray-900 hover:shadow-lg"
                onClick={loadMoreVideos}
              >
                Load More Videos
              </button>
            )}
            <button
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
              onClick={handleSubscribe}
            >
              <BsYoutube className="text-lg" />
              Subscribe {usingDefaultChannel ? "to Featured Channel" : ""}
            </button>
          </div>
        </>
        
      )}
    </div>
  );
};

export default VideoGallery;