import { createContext, useContext, useState, useEffect } from "react";
import { getSettings } from "../../api"; // should return a promise

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState([]);

  // 🧠 Return status true/false for a given setting name
  const getSettingStatus = (settingName) => {
    const item = settings?.find((s) => s.setting === settingName);
    return item?.status !== "1";
  };

  // ✅ Save to sessionStorage
  const saveToSession = (data) => {
    sessionStorage.setItem("globalSettings", JSON.stringify(data));
  };

  // ✅ Load from sessionStorage
  const loadFromSession = () => {
    const stored = sessionStorage.getItem("globalSettings");
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      const now = new Date().getTime();
      const twentyMinutes = 20 * 60 * 1000;

      // ⏱ Expired?
      if (now - parsed.timestamp > twentyMinutes) {
        sessionStorage.removeItem("globalSettings");
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error("Failed to parse session data:", error);
      return null;
    }
  };

  // 📦 Fetch from API (only if not in sessionStorage)
  const fetchSettings = async () => {
    try {
      const cached = loadFromSession();
      // console.log(cached)
      if (cached) {
        // console.log(cached);
        setSettings(cached);
      } else {
        const res = await getSettings("MYAWR241227001"); // assuming it's async
        // console.log(res.data.response);
        if (res?.data.response) {
          setSettings(res.data.response);
          saveToSession(res.data.response);
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, getSettingStatus, fetchSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// 👇 Custom hook to use context
export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider"
    );
  }
  return context;
};
