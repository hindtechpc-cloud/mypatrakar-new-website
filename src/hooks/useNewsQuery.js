// src/hooks/useNewsQuery.js
import { useQuery } from "@tanstack/react-query";
import { newsApi } from "../api/newsApi";

export const useFeaturedSection = () => {
  return useQuery({
    queryKey: ["featured-section"],
    queryFn: () => newsApi.getFeaturedSection().then((res) => res.data),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
    retry: 2, // retry twice if failed
  });
};

export const useBreakingNews = () => {
  return useQuery({
    queryKey: ["breaking-news"],
    queryFn: () => newsApi.getBreakingNews().then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
