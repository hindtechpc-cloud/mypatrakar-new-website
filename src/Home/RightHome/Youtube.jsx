import { useState, useEffect } from "react";
import { BsFillCameraReelsFill } from "react-icons/bs";
import Header from "./shared/Header";
import { GetOwnerSocialLinks } from "../../../api";

const YouTube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [channelUrl, setChannelUrl] = useState("");

  // ✅ Extract Channel ID from channel or handle URL
const getChannelIdFromURL = async (url) => {
  try {
    // Remove query params like ?si=xxx
    const cleanUrl = url.split("?")[0];

    // Case 1: Direct /channel/ link
    if (cleanUrl.includes("/channel/")) {
      return cleanUrl.split("/channel/")[1];
    }

    // Case 2: Handle /@ links
    const noembedRes = await fetch(`https://noembed.com/embed?url=${cleanUrl}`);
    const noembedData = await noembedRes.json();
    // console.log(noembedData);

    const authorUrl = noembedData?.author_url;

    if (authorUrl && authorUrl.includes("/channel/")) {
      return authorUrl.split("/channel/")[1];
    }

    // Fallback: try to extract from HTML (if needed)
    if (authorUrl) {
      const htmlRes = await fetch(authorUrl);
      const html = await htmlRes.text();
      const match = html.match(/"channelId":"(UC[\w-]+)"/);
      if (match) return match[1];
    }

  } catch (e) {
    console.error("Failed to get channel ID:", e);
  }
  return null;
};


  // ✅ Fetch videos from channel ID using RSS feed
  useEffect(() => {
    const fetchVideos = async () => {
      if (!channelUrl) return;

      try {
        setLoading(true);
        setError("");

        const channelId = await getChannelIdFromURL(channelUrl);
        if (!channelId) {
          setError("Failed to extract Channel ID.");
          setLoading(false);
          return;
        }

        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const res = await fetch(apiUrl);
        const data = await res.json();
        // console.log("Video feed response:", data);

        if (data?.items?.length) {
          setVideos(data.items);
        } else {
          setError("No videos found.");
        }
      } catch (err) {
        console.error(err);
        setError("Error loading YouTube videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelUrl]);

  // ✅ Get YouTube URL from backend and trigger channel fetch
  const getYoutubeUrl = async () => {
    try {
      const res = await GetOwnerSocialLinks("MYAWR241227001");
      const youtubeUrl = res?.data?.response?.find(
        (item) => item.name.toLowerCase() === "youtube"
      )?.url;

      if (youtubeUrl) {
        setChannelUrl(youtubeUrl);
      } else {
        setError("YouTube link not found.");
      }
    } catch (err) {
      console.error("Error fetching social links:", err);
      setError("Failed to fetch social links.");
    }
  };

  useEffect(() => {
    getYoutubeUrl();
  }, []);

  return (
    <div className="my-2 mt-5 font-sans md:max-w-sm w-[300px] mx-auto py-4">
      <Header
        text={
          <div className="flex items-center justify-start gap-2">
            <BsFillCameraReelsFill /> Latest Videos
          </div>
        }
      />
      <div className="flex flex-col items-center justify-center gap-4 w-full overflow-y-auto h-[500px] hide-scroll">
        {loading ? (
          <p className="text-white text-sm animate-pulse">Loading videos...</p>
        ) : error ? (
          <p className="text-red-400 text-center font-medium">{error}</p>
        ) : (
          videos.map((video) => (
            <div
              key={video.guid}
              className="bg-white shadow-xl w-[320px] rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <iframe
                className="w-full h-60"
                src={`https://www.youtube.com/embed/${video.guid.split(":").pop()}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              ></iframe>
              <div className="p-3">
                <h3 className="text-black font-semibold text-sm truncate">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-xs mt-1">
                  {new Date(video.pubDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default YouTube;
