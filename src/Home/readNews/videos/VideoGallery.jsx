import { useEffect, useState } from "react";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import { FiAlertCircle } from "react-icons/fi";

const YOUTUBE_URL = "https://youtube.com/@malayalamallsongs";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [channelId, setChannelId] = useState("");

  // Extract channel ID from YouTube URL
  useEffect(() => {
    const extractChannelId = async () => {
      try {
        setLoading(true);
        setError("");

        // Method 1: Try noembed API
        const noembedRes = await fetch(
          `https://noembed.com/embed?url=${encodeURIComponent(YOUTUBE_URL)}`
        );
        const noembedData = await noembedRes.json();
        const authorUrl = noembedData?.author_url;

        if (authorUrl && authorUrl.includes("/channel/")) {
          const id = authorUrl.split("/channel/")[1].split(/[\/?#]/)[0];
          setChannelId(id);
          return;
        }

        // Method 2: Try direct HTML parsing
        const handle = YOUTUBE_URL.split("youtube.com/@")[1].split(/[\/?#]/)[0];
        const htmlRes = await fetch(`https://www.youtube.com/@${handle}`);
        const html = await htmlRes.text();
        
        // Try to find channelId in the HTML
        const match = html.match(/"channelId":"(UC[\w-]+)"/) || 
                      html.match(/{"key":"browse_id","value":"(UC[\w-]+)"}/);
        
        if (match && match[1]) {
          setChannelId(match[1]);
        } else {
          throw new Error("Could not extract channel ID");
        }
      } catch (err) {
        console.error("Error extracting channel ID:", err);
        setError("Failed to get channel information");
        setLoading(false);
      }
    };

    extractChannelId();
  }, []);

  // Fetch videos once we have channel ID
  useEffect(() => {
    if (!channelId) return;

    const fetchVideos = async () => {
      try {
        setLoading(true);
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
        );
        const data = await response.json();
        
        if (data?.items) {
          setVideos(data.items);
        } else {
          throw new Error("No videos found");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelId]);

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
        <h2 className="text-2xl font-bold text-gray-800">Latest Videos</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <ImSpinner8 className="animate-spin text-3xl text-blue-600 mr-3" />
          <span>Loading videos...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <FiAlertCircle className="mx-auto text-red-500 text-2xl mb-2" />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      ) : (
        <>
          {/* Video Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {videos.slice(0, visibleVideos).map((video) => {
              const videoId = video.link.split("v=")[1]?.split("&")[0] || 
                            video.guid.split(":")[2];
              return (
                <div
                  key={video.guid}
                  className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <iframe
                    className="w-full h-56 rounded-t-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                    loading="lazy"
                  ></iframe>
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

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            {visibleVideos < videos.length && (
              <button
                className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:bg-gray-900 hover:shadow-lg"
                onClick={loadMoreVideos}
              >
                Load More...
              </button>
            )}
            <button
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 hover:bg-red-800 hover:shadow-lg"
              onClick={handleSubscribe}
              disabled={!channelId}
            >
              <span>🔔</span> Subscribe
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoGallery;