

import React, { useContext, useEffect, useState } from "react";
import { GetLiveYouTube } from "../../../api";
import { BsYoutube, BsBroadcast, BsPlayCircle, BsCalendar } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { WebThemeContext } from "../../context/ThemeContext";
import { extractChannelIdOrUsername } from "../../utils/youtubeHelper";
import { getChannelInfo, getVideosFromPlaylist } from "../../../api/youtubeApi";
import { useWebThemeContext } from "../../context/WebThemeContext";

function LiveTv() {
  const [liveUrl, setLiveUrl] = useState("");
  const [isLive, setIsLive] = useState();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const { webTheme } = useWebThemeContext();


  const loadLiveMode = async () => {
    try {
      const res = await GetLiveYouTube();
      setIsLive(res?.data?.response?.is_live);
      setLiveUrl(
        `https://www.youtube.com/embed/${res?.data?.response?.live_url}`
      );

      // ✅ अगर live नहीं है तो channel videos लाओ
      if (res?.data?.response?.is_live != 0) {
        const youtubeUrl = res?.data?.response?.channel_url; // 👈 ये आपके API से आना चाहिए
        let channelIdOrUsername = extractChannelIdOrUsername(youtubeUrl);

        if (channelIdOrUsername) {
          const playlistId = await getChannelInfo(
            channelIdOrUsername.type,
            channelIdOrUsername.value
          );

          const videoList = await getVideosFromPlaylist(playlistId);
          console.log(videoList)
          setVideos(videoList || []);
        }
      }
    } catch (error) {
      console.error("Error loading live stream:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLiveMode();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
console.log(videos)
  return (
    <div className="mt-4 font-sans xl:w-[335px] lg:w-[295px] w-full mx-auto">
      <div className="bg-white shadow-xl rounded overflow-hidden border-0 h-90">
        {/* Header */}
        <div
          className="text-white py-2 px-5 relative"
          style={{
            background:
              webTheme["bg-color"] == "#fff" ? "#000" : webTheme["bg-color"],
          }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3">
                <BsYoutube className="text-2xl text-red-600" />
              </div>
              <p className="text-[16px] font-semibold">Live Stream</p>
            </div>
            {isLive != 0 && (
              <div className="flex items-center bg-red-800 px-3 py-1 rounded-full">
                <div className="h-2 w-2 bg-red-300 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs font-semibold">LIVE</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">Checking live status...</p>
            </div>
          ) : isLive == 0 ? (
            // ✅ अगर live है तो stream दिखाओ
            <div className="rounded overflow-hidden shadow-lg relative">
              <iframe
                width="100%"
                height="100%"
                src={liveUrl}
                title="YouTube Live Stream"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded h-72"
              />
              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <BsBroadcast className="mr-1" />
                <span>Live</span>
              </div>
            </div>
          ) : (
            // ✅ अगर live नहीं है तो recent videos दिखाओ
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Recent Videos
              </h3>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="min-w-[200px] max-w-[200px] bg-gray-50 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="rounded-t-lg w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition flex items-center justify-center">
                        <BsPlayCircle className="text-3xl text-white opacity-80" />
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium line-clamp-2 h-10">
                        {video.snippet.title}
                      </p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <BsCalendar className="mr-1" />
                          {formatDate(video.snippet.publishedAt)}
                        </span>
                        <a
                          href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center text-red-600 hover:text-red-800 font-medium"
                        >
                          Watch <FiArrowRight className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(LiveTv);

