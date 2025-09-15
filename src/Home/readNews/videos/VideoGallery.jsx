import React, { useState, useEffect, useContext } from "react";
import { extractChannelIdOrUsername } from "../../../utils/youtubeHelper";
import {
  getChannelInfo,
  getVideosFromPlaylist,
} from "../../../../api/youtubeApi";
import { BsYoutube } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { SocialMediaContext } from "../../../context/SocialMediaContext";

// Skeleton loader for video cards
const VideoSkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
    <div className="bg-gray-300 h-56 w-full" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const DEFAULT_CHANNEL_ID = "UC16niRr50-MSBwiO3YDb3RA"; // BBC News as fallback

export default function JournalistYouTubeFeed() {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { socialLinks } = useContext(SocialMediaContext);

  // Automatically get YouTube URL from context
  const youtubeUrl = socialLinks?.find(
    (link) =>
      link.icon?.toLowerCase() === "fayoutube" ||
      link.name?.toLowerCase().includes("youtube")
  )?.url;
console.log(youtubeUrl)

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        let channelIdOrUsername = extractChannelIdOrUsername(youtubeUrl);
        console.log(channelIdOrUsername);
        if (!channelIdOrUsername) {
          throw new Error("Invalid YouTube channel URL from context");
        }

        const playlistId = await getChannelInfo(
          channelIdOrUsername.type,
          channelIdOrUsername.value
        );
console.log(playlistId)
        const videoList = await getVideosFromPlaylist(playlistId);
        console.log(videoList)
        setVideos(videoList);
      } catch (err) {
        console.log(err);
        setError(err.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    if (youtubeUrl) {
      fetchVideos();
    } else {
      setError("YouTube URL not found in context.");
      setLoading(false);
    }
  }, [youtubeUrl]);

  const handleLoadMore = () => {
    setVisibleVideos((prev) => prev + 6);
  };

  const visibleList = videos.slice(0, visibleVideos);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <BsYoutube className="text-2xl text-red-600" />
        <h2 className="text-2xl font-bold">Journalist YouTube Feed</h2>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <VideoSkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 text-red-600 flex items-center gap-2">
          <FiAlertCircle className="text-xl" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && visibleList?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {visibleList.map((video) => (
            <div key={video.id} className="border p-2 rounded shadow">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full rounded"
              />
              <h3 className="font-semibold mt-2">{video.snippet.title}</h3>
              <a
                href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && visibleVideos < videos.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
