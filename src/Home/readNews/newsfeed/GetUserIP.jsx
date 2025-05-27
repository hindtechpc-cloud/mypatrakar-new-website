import { useEffect } from "react";
import axios from "axios";

const GetUserIP = () => {
  useEffect(() => {
    const fetchIPAndSend = async () => {
      try {
        const res = await axios.get("https://api.ipify.org?format=json");
        const ip = res.data.ip;
        // console.log("User IP:", ip);
        return ip; // Return the IP address

        // Send to backend
        // await axios.post("http://localhost:5000/api/save-ip", { ip });
      } catch (err) {
        console.error("Failed to fetch/send IP:", err);
      }
    };

    fetchIPAndSend();
  }, []);

  return null; // This can be placed in any main component like App.js
};

export default GetUserIP;
