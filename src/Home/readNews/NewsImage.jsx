import speaker from "../../assets/speaker.svg";
import { FaStopCircle } from "react-icons/fa";
import { handleReadAloud } from "../../utils/voiceUtils";

export default function NewsImage({
  news,
  type,
  isSpeaking,
  setIsSpeaking,
  selectedVoice,
  language,
}) {
  const imageUrl = `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
    type === "shorts" ? news?.news_img : news?.news_img_url
  }`;

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt={type === "shorts" ? news.news_title : news.news_headline}
        className="rounded-lg shadow-lg w-full h-96 object-center"
      />
      <div
        title={isSpeaking ? "Stop Reading" : "Read Aloud"}
        className="-bottom-5 right-2 w-10 h-10 absolute cursor-pointer rounded-full bg-blue-500"
        onClick={() =>
          handleReadAloud({
            news,
            selectedVoice,
            setIsSpeaking,
            isSpeaking,
            language,
          })
        }
      >
        {!isSpeaking ? (
          <img src={speaker} alt="Speaker" className="w-full h-full" />
        ) : (
          <FaStopCircle className="w-full h-full text-xl text-red-700" />
        )}
      </div>
    </div>
  );
}
