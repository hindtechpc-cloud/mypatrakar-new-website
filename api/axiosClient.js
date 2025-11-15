// src/api/axiosClient.js
import axios from "axios";
import rateLimit from "axios-rate-limit";

const API = rateLimit(
  axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    headers: {
      "X-Custom-Token": "aaaaa",
      "Content-Type": "application/json",
    },
  }),
  { maxRequests: 5, perMilliseconds: 1000 } // 5 requests/sec limit
);

// 🔁 Auto retry if 429 (Too Many Requests)
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 429) {
      console.warn("⚠️ Too many requests, retrying in 2s...");
      await new Promise((r) => setTimeout(r, 2000));
      return API(error.config);
    }
    return Promise.reject(error);
  }
);

export default API;
