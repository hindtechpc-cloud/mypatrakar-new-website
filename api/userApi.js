// src/api/userApi.js
import API from "./axiosClient";

const PORTAL_ID = "MYAWR241227001";

export const userApi = {
  // 🔐 Register user
  registerUser: (data) => API.post("/auth-user", { ...data, portal_id: PORTAL_ID }),

  // 🔐 Login user
  loginUser: (data) => API.post("/auth-login", { ...data, portal_id: PORTAL_ID }),

  // 🧑‍💼 Customer login
  customerLogin: (data) => API.post("/customer-login", { ...data, portal_id: PORTAL_ID }),

  // 🧭 Get user profile (example protected route)
  getUserProfile: (user_id) =>
    API.post("/get-user-profile", { user_id, portal_id: PORTAL_ID }),

  // 💬 Submit comment on news
  submitComment: (data) => API.post("/submit-comment", data),

  // 💬 Reply to comment
  submitCommentReply: (data) => API.post("/submit-comment-reply", data),

  // 💬 Fetch comments for a news article
  getComments: (news_id) => API.post("/get-comments", { news_id }),

  // 💬 Fetch replies for a comment
  getCommentReplies: (comment_id) =>
    API.post("/get-comment-reply", { comment_id }),
};
