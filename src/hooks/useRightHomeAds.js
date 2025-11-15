import { useQueries } from "@tanstack/react-query";
import {
  GetRightTopAds,
  GetRightMainAds,
  GetRightBottomAds,
} from "../../api";

export const useRightHomeAds = (isAdsEnabled) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["rightAds", "top"],
        queryFn: async () => {
          const res = await GetRightTopAds();
          return res?.data?.response?.top_banner ?? null;
        },
        enabled: isAdsEnabled,
      },
      {
        queryKey: ["rightAds", "main"],
        queryFn: async () => {
          const res = await GetRightMainAds();
          return res?.data?.response?.main_banner ?? null;
        },
        enabled: isAdsEnabled,
      },
      {
        queryKey: ["rightAds", "bottom"],
        queryFn: async () => {
          const res = await GetRightBottomAds();
          return res?.data?.response?.bottom_banner ?? null;
        },
        enabled: isAdsEnabled,
      },
    ],
  });

  return {
    topAds: results[0]?.data,
    mainAds: results[1]?.data,
    bottomAds: results[2]?.data,
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
  };
};
