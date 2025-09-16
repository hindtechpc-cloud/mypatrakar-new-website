// api/youtubeApi.js
import axios from "axios";

const API_KEY = `${import.meta.env.VITE_REACT_APP_YOUTUBE_API_KEY}`; // 👉 Replace with your YouTube API key

// 🔄 Get Uploads Playlist from Channel
export const getChannelInfo = async (type, value) => {
  let channelId;

  try {
    if (type === "handle") {
      // 👇 Resolve handle using YouTube Search API
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${value}&key=${API_KEY}`;
      const searchRes = await axios.get(searchUrl);
      channelId = searchRes.data.items[0]?.snippet?.channelId;

      if (!channelId) {
        console.warn("Channel ID not found for handle:", value);
        return null;
      }
    }

    const finalChannelId = type === "channelId" ? value : channelId;
    const isUsername = type === "username";

    const url = isUsername
      ? `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${value}&key=${API_KEY}`
      : `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${finalChannelId}&key=${API_KEY}`;

    const res = await axios.get(url);
    const playlistId = res.data.items[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!playlistId) {
      console.warn("Uploads playlist not found for the given channel.");
      return null;
    }

    return playlistId;
  } catch (error) {
    console.error("YouTube API Error in getChannelInfo:", error?.response?.data || error.message);
    return null;
  }
};

// 🔄 Get Videos from Uploads Playlist
export const getVideosFromPlaylist = async (playlistId) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
    const res = await axios.get(url);
    return res.data.items || [];
  } catch (error) {
    console.error("YouTube API Error in getVideosFromPlaylist:", error?.response?.data || error.message);
    return [];
  }
};
