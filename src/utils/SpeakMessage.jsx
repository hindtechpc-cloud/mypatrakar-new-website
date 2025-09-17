import React, { useEffect } from "react";

const SpeakMessage = ({ message }) => {
  useEffect(() => {
    if ("speechSynthesis" in window && message) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "en-IN"; // Hindi-English accent (Indian)
      utterance.rate = 1;       // बोलने की speed
      utterance.pitch = 1;      // pitch
      speechSynthesis.speak(utterance);
    }
  }, [message]);

  return null; // कोई UI नहीं, सिर्फ बोलना है
};

export default SpeakMessage;
