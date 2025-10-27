import React, { useState, useEffect, useContext } from "react";
import { extractChannelIdOrUsername } from "../../../utils/youtubeHelper";
import {
  getChannelInfo,
  getVideosFromPlaylist,
} from "../../../../api/youtubeApi";
import { BsYoutube, BsPlayCircle, BsCalendar } from "react-icons/bs";
import { FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { SocialMediaContext } from "../../../context/SocialMediaContext";

// Skeleton loader for video cards
const VideoSkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse border border-gray-100">
    <div className="bg-gray-200 h-48 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-4/5" />
      <div className="h-3 bg-gray-100 rounded w-3/5" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="h-8 bg-gray-100 rounded w-1/4" />
      </div>
    </div>
  </div>
);

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
console.log(socialLinks)
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        let channelIdOrUsername = extractChannelIdOrUsername(youtubeUrl);
console.log(channelIdOrUsername)

        if (!channelIdOrUsername) {
          throw new Error("Invalid YouTube channel URL from context");
        }

        const playlistId = await getChannelInfo(
          channelIdOrUsername.type,
          channelIdOrUsername.value
        );

        const videoList = await getVideosFromPlaylist(playlistId);
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
      setError("No YouTube channel found in your profile.");
      setLoading(false);
    }
  }, [youtubeUrl]);

  const handleLoadMore = () => {
    setVisibleVideos((prev) => prev + 6);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const visibleList = videos.slice(0, visibleVideos);

  return (
    <div className="py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-100">
        <div className="p-3 bg-red-100 rounded-full">
          <BsYoutube className="text-3xl text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">YouTube </h2>
          <p className="text-gray-600">Latest YouTube videos </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <VideoSkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-white rounded-full mb-4">
            <FiAlertCircle className="text-3xl text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Unable to load videos
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Make sure your YouTube URL is correctly added to your profile.
          </p>
        </div>
      )}

      {/* Success State */}
      {!loading && !error && visibleList?.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleList.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <BsPlayCircle className="text-4xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
                    {video.snippet.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                    {video.snippet.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <BsCalendar className="mr-1" />
                      {formatDate(video.snippet.publishedAt)}
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      Watch
                      <FiArrowRight className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleVideos < videos.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                className="bg-white text-red-600 px-6 py-3 rounded-lg border border-red-200 hover:bg-red-50 font-medium flex items-center shadow-sm hover:shadow-md transition-all"
              >
                Load More Videos
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && !error && videos.length === 0 && (
        <div className="mt-8 p-8 bg-gray-50 border border-gray-200 rounded-xl text-center">
          <div className="p-3 bg-white rounded-full inline-flex mb-4">
            <BsYoutube className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No videos found
          </h3>
          <p className="text-gray-600">
            This YouTube channel doesn't have any public videos yet.
          </p>
        </div>
      )}
    </div>
  );
}
