import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n"; //
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/app/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("news-app")).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    </PersistGate>
  </StrictMode>
);
