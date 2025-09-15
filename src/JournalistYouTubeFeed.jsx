import React, { useState } from "react";
import { extractChannelIdOrUsername } from "./utils/youtubeHelper";
import { getChannelInfo, getVideosFromPlaylist } from "../api/youtubeApi";


export default function JournalistYouTubeFeed() {
  const [channelUrl, setChannelUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchVideos = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setVideos([]);

    try {
      const channelInfo = extractChannelIdOrUsername(channelUrl);
      if (!channelInfo) {
        throw new Error("Invalid YouTube Channel URL");
      }

      const playlistId = await getChannelInfo(channelInfo.type, channelInfo.value);
      const videoList = await getVideosFromPlaylist(playlistId);
      setVideos(videoList);
    } catch (err) {
      setError(err.message || "Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Journalist YouTube Feed</h2>

      <form onSubmit={handleFetchVideos} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter YouTube channel URL"
          value={channelUrl}
          onChange={(e) => setChannelUrl(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Get Videos
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {videos.map((video) => (
            <div key={video.id} className="border p-2 rounded">
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
    </div>
  );
}
