// src/api/newsApi.js
import API from "./axiosClient";

const PORTAL_ID = "MYAWR241227001";

export const newsApi = {
  getFeaturedSection: () =>
    API.post("/featured-section", { portal_id: PORTAL_ID }),

  getFeaturedNews: (section_id) =>
    API.post("/featured-news", { section_id, portal_id: PORTAL_ID }),

  getBreakingNews: () =>
    API.post("/breaking-news", { portal_id: PORTAL_ID }),

  getNewsByCategory: (category) =>
    API.post("/news-by-category", { category, portal_id: PORTAL_ID }),

  getNewsById: (news_id, ip) =>
    API.post("/news-by-id", { news_id, ip, portal_id: PORTAL_ID }),
};
