// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { WebThemeProvider } from "./context/WebThemeContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

// ✅ React Query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Create a single Query Client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry failed requests once
      refetchOnWindowFocus: false, // disable auto refetch on tab focus
      staleTime: 1000 * 60 * 5, // cache fresh for 5 minutes
      cacheTime: 1000 * 60 * 30, // keep cache for 30 minutes
    },
  },
});

createRoot(document.getElementById("news-app")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SettingsProvider>
          <WebThemeProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </WebThemeProvider>
        </SettingsProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
