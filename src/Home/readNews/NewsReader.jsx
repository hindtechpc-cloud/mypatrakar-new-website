import { useEffect, useState } from "react";
import { FaStopCircle } from "react-icons/fa";
import speaker from "../../assets/speaker.svg";

const langMap = {
  hi: "hi-IN",
  en: "en-US",
  mr: "mr-IN",
  pa: "pa-IN",
  bn: "bn-IN",
  gu: "gu-IN",
  ta: "ta-IN",
  te: "te-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  ur: "ur-IN",
  ar: "ar-SA",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
  zh: "zh-CN",
};

const stripHtmlTags = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export default function NewsReader({ language, news }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        const voice = voices.find((v) => v.lang === langMap[language]);
        setSelectedVoice(voice || voices[0]);
      }
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [language]);

  const handleReadAloud = () => {
    if (!news) return;
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        `${news.news_title || news.news_headline} ${stripHtmlTags(
          news.news_des || news.news_description
        )}`
      );
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice?.lang || langMap[language] || "en-US";
      utterance.rate = 0.1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      title={isSpeaking ? "Stop Reading" : "Read Aloud"}
      className="-bottom-5 right-2 w-10 h-10 absolute cursor-pointer rounded-full bg-blue-500"
      onClick={handleReadAloud}
    >
      {!isSpeaking ? (
        <img src={speaker} alt="Speaker" className="w-full h-full" />
      ) : (
        <FaStopCircle className="w-full h-full text-xl text-red-700" />
      )}
    </div>
  );
}
