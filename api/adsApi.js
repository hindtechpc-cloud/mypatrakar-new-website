// src/api/adsApi.js
import API from "./axiosClient";

const PORTAL_ID = "MYAWR241227001";

export const adsApi = {
  // 🏞️ Top banner ads
  getTopBannerAds: () =>
    API.get("/top-banner-ads", { params: { portal_id: PORTAL_ID } }),

  // 🧭 Left-side home banners
  getLeftHomeBannerAds: () =>
    API.get("/left-home-banner-ads", { params: { portal_id: PORTAL_ID } }),

  // 🏠 Left-side main ads
  getLeftHomeMainAds: () =>
    API.get("/left-home-main-ads", { params: { portal_id: PORTAL_ID } }),

  // 📱 Bottom banner ads
  getBottomBannerAds: () =>
    API.get("/bottom-banner-ads", { params: { portal_id: PORTAL_ID } }),

  // 🔍 Search page ads
  getSearchPageAds: () =>
    API.get("/search-page-ads", { params: { portal_id: PORTAL_ID } }),

  // 📰 News reading page ads (top)
  getReadNewsPageTopAds: () =>
    API.get("/news-read-main-page-ads", { params: { portal_id: PORTAL_ID } }),

  // 📰 News reading page ads (bottom)
  getReadNewsPageBottomAds: () =>
    API.get("/news-read-bottom-ads", { params: { portal_id: PORTAL_ID } }),

  // 💰 Custom right-side home ads (3 slots)
  getRightTopAds: () =>
    API.get("/custom-right-home-main-ads", { params: { portal_id: PORTAL_ID } }),

  getRightMainAds: () =>
    API.get("/custom-right-home-main-2-ads", { params: { portal_id: PORTAL_ID } }),

  getRightBottomAds: () =>
    API.get("/custom-right-home-bottom-ads", { params: { portal_id: PORTAL_ID } }),
};
