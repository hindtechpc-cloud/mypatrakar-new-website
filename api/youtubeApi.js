// api/youtubeApi.js
import axios from "axios";

const API_KEY = `${import.meta.env.VITE_REACT_APP_YOUTUBE_API_KEY}`; // 👉 Replace with your YouTube API key

export const getChannelInfo = async (type, value) => {
  const url =
    type === "channelId"
      ? `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${value}&key=${API_KEY}`
      : `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${value}&key=${API_KEY}`;

  const res = await axios.get(url);
  return res.data.items[0]?.contentDetails?.relatedPlaylists?.uploads;
};
export const getVideosFromPlaylist = async (playlistId) => {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
  const res = await axios.get(url);
  return res.data.items;
};
