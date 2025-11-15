// src/hooks/useAdsQuery.js
import { useQuery } from "@tanstack/react-query";
import { adsApi } from "../../api/adsApi";


// 🏞️ Fetch all top banner ads
export const useTopBannerAds = () => {
  return useQuery({
    queryKey: ["top-banner-ads"],
    queryFn: () => adsApi.getTopBannerAds().then((res) => res.data),
    staleTime: 1000 * 60 * 10,
  });
};

// 📰 Fetch ads for news read page
export const useNewsReadPageAds = () => {
  return useQuery({
    queryKey: ["read-page-ads"],
    queryFn: async () => {
      const [topAds, bottomAds] = await Promise.all([
        adsApi.getReadNewsPageTopAds(),
        adsApi.getReadNewsPageBottomAds(),
      ]);
      return {
        top: topAds.data,
        bottom: bottomAds.data,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};
