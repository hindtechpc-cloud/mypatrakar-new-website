import { stripHtmlTags } from "./stripHtmlTags";

export const handleReadAloud = ({
  news,
  selectedVoice,
  setIsSpeaking,
  isSpeaking,
  language,
}) => {
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

  if (!news) return;
  if (isSpeaking) {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  } else {
    const utterance = new SpeechSynthesisUtterance(
      `${news.news_title || news.news_headline} ${stripHtmlTags(
        news.news_des || news.news_description_html
      )}`
    );
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice?.lang || langMap[language] || "en-US";
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  }
};
