import { useState } from "react";
import { useCallback } from "react";
import { decryptData } from "../../utils/cryptoHelper";
import {
  GetNewsById,
  GetShortsNewsDetails,
  loadNewsByCategory,
} from "../../../api";

const useNewsDetails = (type, newsId) => {
  const [news, setNews] = useState(null);
  // console.log(decryptData(newsId))
  const getUserIP = async () => {
    try {
      const res = await fetch("https://api64.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch {
      return "0.0.0.0";
    }
  };

  const loadNewsDetails = useCallback(async () => {
    const ip = await getUserIP();
    try {
      const response =
        type === "shorts"
          ? await GetShortsNewsDetails(decryptData(newsId), ip)
          : await GetNewsById(decryptData(newsId), ip);
      const newsData =
        type !== "shorts"
          ? response.data.response[0]
          : response?.data?.response?.news?.[0];
      console.log(response);
      setNews(newsData || null);
    } catch (err) {
      console.log("Error loading news:", err);
    }
  }, [type, newsId]);

  return { news, loadNewsDetails };
};

export default useNewsDetails;

export const newsFeed = async (category_id) => {
  try {
    const res = await loadNewsByCategory(category_id);
    return res.data;
  } catch (error) {
    return error;
  }
};
