// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n"; //

import { GoogleOAuthProvider } from "@react-oauth/google";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { WebThemeProvider } from "./context/WebThemeContext.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
createRoot(document.getElementById("news-app")).render(
  <StrictMode>
   <Provider store={store}>

     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SettingsProvider>
         <WebThemeProvider>
          <App />
          </WebThemeProvider>
      </SettingsProvider>
    </GoogleOAuthProvider>
   </Provider>
  </StrictMode>
);
