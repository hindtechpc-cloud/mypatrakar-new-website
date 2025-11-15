// src/hooks/useUserQuery.js
import { useQuery, useMutation } from "@tanstack/react-query";
import { userApi } from "../api/userApi";

// 🧩 Fetch user profile
export const useUserProfile = (user_id) => {
  return useQuery({
    queryKey: ["user-profile", user_id],
    queryFn: () => userApi.getUserProfile(user_id).then((res) => res.data),
    enabled: !!user_id, // run only if user_id available
    staleTime: 1000 * 60 * 10,
  });
};

// 🔐 Login mutation
export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data) => userApi.loginUser(data).then((res) => res.data),
  });
};

// 🔐 Register mutation
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data) => userApi.registerUser(data).then((res) => res.data),
  });
};
