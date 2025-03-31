// import Sharing from "./Sharing";
// import UserProfile from "./UserProfile";
// import "jspdf-autotable";
// import { jsPDF } from "jspdf";
// import { useContext, useEffect, useState } from "react";
// import { FaStopCircle } from "react-icons/fa";
// import { NewsContext } from "../../context/NewsContext";
// import { LanguageContext } from "../../context/LanguageContext";
// import speaker from "../../assets/speaker.svg";

// export default function News() {
//   const { news } = useContext(NewsContext);
//   const { language } = useContext(LanguageContext);
//   const [zoomText, setZoomText] = useState(15);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [pitch, setPitch] = useState(1); // Default pitch
//   const [rate, setRate] = useState(1); // Default rate
//   const [voices, setVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);

//   // Function to update available voices
//   const loadVoices = () => {
//     const availableVoices = speechSynthesis.getVoices();
//     setVoices(availableVoices);

//     // Map language codes to full names used in speech synthesis
//     const langMap = {
//       hi: "hi-IN",
//       en: "en-US",
//       mr: "mr-IN",
//       pa: "pa-IN",
//       bn: "bn-IN",
//       gu: "gu-IN",
//       ta: "ta-IN",
//       te: "te-IN",
//     };

//     const preferredVoice = availableVoices.find((voice) =>
//       voice.lang.toLowerCase().includes(langMap[language] || language)
//     );

//     setSelectedVoice(preferredVoice || availableVoices[0]); // Fallback to first available voice
//   };

//   // Load voices when component mounts
//   useEffect(() => {
//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }, [language]);

//   const handleReadAloud = () => {
//     if (isSpeaking) {
//       speechSynthesis.cancel();
//       setIsSpeaking(false);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(
//         news.title + " " + news.content
//       );

//       if (selectedVoice) utterance.voice = selectedVoice;
//       utterance.pitch = pitch;
//       utterance.lang = language;
//       utterance.rate = rate;

//       utterance.onstart = () => setIsSpeaking(true);
//       utterance.onend = () => setIsSpeaking(false);

//       speechSynthesis.speak(utterance);
//     }
//   };
//   const handleDownloadPDF = () => {
//     const doc = new jsPDF({
//       orientation: "p", // Portrait mode
//       unit: "mm",
//       format: "a4", // Standard A4 size
//     });

//     // Page settings
//     const marginLeft = 15; // Left Margin
//     const marginRight = 10; // Right Margin
//     const pageWidth = doc.internal.pageSize.width; // Page width
//     const pageHeight = doc.internal.pageSize.height; // Page height
//     const contentWidth = pageWidth - marginLeft - marginRight; // Usable content width
//     let cursorY = 20; // Initial cursor position

//     // Title Styling
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(18);
//     doc.setTextColor(30, 30, 30); // Dark Gray Color
//     doc.text(news.title, marginLeft, cursorY, {
//       maxWidth: contentWidth,
//       align: "justify",
//     });

//     cursorY += 15; // Move cursor down

//     // Image Handling
//     const maxImgWidth = contentWidth; // Maximum image width
//     const maxImgHeight = 80; // Maximum image height
//     let imgHeight = maxImgHeight;

//     if (news.urlToImage) {
//       doc.addImage(
//         news.urlToImage,
//         "JPEG",
//         marginLeft,
//         cursorY,
//         maxImgWidth,
//         imgHeight
//       );
//       cursorY += imgHeight + 10; // Move cursor after image
//     }

//     // Content Styling
//     doc.setFont("times", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(50, 50, 50); // Darker Gray

//     const contentLines = doc.splitTextToSize(news.content, contentWidth); // Wrap text within margins

//     // Function to add text with pagination
//     const addTextWithPagination = (textArray) => {
//       textArray.forEach((line) => {
//         if (cursorY + 10 > pageHeight - 20) {
//           doc.addPage(); // Add a new page if content exceeds page height
//           cursorY = 20; // Reset cursor for new page
//         }
//         doc.text(line, marginLeft, cursorY);
//         cursorY += 6; // Move cursor down after each line
//       });
//     };

//     addTextWithPagination(contentLines);

//     // Page Footer with Page Numbers
//     const pageCount = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= pageCount; i++) {
//       doc.setPage(i);
//       doc.setFontSize(10);
//       doc.setTextColor(150, 150, 150);
//       doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, {
//         align: "center",
//       });
//     }

//     // Save PDF with a clean file name
//     doc.save(`News_${news.title.replace(/\s+/g, "_")}.pdf`);
//   };
//   return (
//     <div className="bg-white p-2 rounded-lg">
//       <div className="relative">
//         <img
//           src={news.urlToImage}
//           alt={news.title}
//           className="rounded-lg shadow-lg w-full h-96 object-cover"
//         />
//         <div
//           title={isSpeaking ? "Stop Reading" : "Read Aloud"}
//           className="-bottom-5 right-2 w-10 h-10 absolute cursor-pointer rounded-full bg-blue-500"
//           onClick={handleReadAloud}
//         >
//           {!isSpeaking ? (
//             <img src={speaker} alt="w-full h-ful" />
//           ) : (
//             <FaStopCircle className="w-full h-full text-xl text-red-700" />
//           )}
//         </div>
//       </div>
//       <Sharing
//         data={{
//           views: news?.views,
//           comments: news?.comments,
//           category: news?.category,
//         }}
//       />
//       <UserProfile
//         user={{
//           name: news?.author?.name,
//           profileImage: news?.author?.image,
//           date: news?.publishedAt,
//           links: news?.author?.links,
//         }}
//         setZoomText={setZoomText}
//         zoomText={zoomText}
//         handleDownloadPDF={handleDownloadPDF}
//       />
//       <div
//         className="text-lg font-bold text-gray-800 my-2"
//         style={{
//           fontSize: `${zoomText + 5}px`,
//         }}
//       >
//         {news?.title}
//       </div>
//       <div className="">
//         <p className="" style={{ fontSize: `${zoomText}px` }}>
//           {news?.content}
//         </p>
//       </div>
//     </div>
//   );
// }

import Sharing from "./Sharing";
import UserProfile from "./UserProfile";
import "jspdf-autotable";
import { jsPDF } from "jspdf";
import { useContext, useEffect, useState } from "react";
import { FaStopCircle } from "react-icons/fa";
import { NewsContext } from "../../context/NewsContext";
import { LanguageContext } from "../../context/LanguageContext";
import speaker from "../../assets/speaker.svg";

export default function News() {
  const { news } = useContext(NewsContext);
  const { language } = useContext(LanguageContext); // Get selected language
  const [zoomText, setZoomText] = useState(15);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Map language codes to Speech Synthesis formats
  const langMap = {
    hi: "hi-IN", // Hindi
    en: "en-US", // English
    mr: "mr-IN", // Marathi
    pa: "pa-IN", // Punjabi
    bn: "bn-IN", // Bengali
    gu: "gu-IN", // Gujarati
    ta: "ta-IN", // Tamil
    te: "te-IN", // Telugu
    kn: "kn-IN", // Kannada
    ml: "ml-IN", // Malayalam
    ur: "ur-IN", // Urdu
    ar: "ar-SA", // Arabic
    fr: "fr-FR", // French
    de: "de-DE", // German
    es: "es-ES", // Spanish
    zh: "zh-CN", // Chinese (Mandarin)
  };

  // Load available voices and select the correct one
  const loadVoices = () => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);

    const preferredVoice = availableVoices.find((voice) =>
      voice.lang.toLowerCase().includes(langMap[language] || language)
    );

    setSelectedVoice(preferredVoice || availableVoices[0]); // Fallback to first available voice
  };

  // Load voices when component mounts or language changes
  useEffect(() => {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [language]);

  // Function to read aloud in selected language
  const handleReadAloud = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        `${news?.title} ${news?.content}`
      );

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = langMap[language] || "en-US"; // Fallback to English if no match
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white p-2 rounded-lg">
      <div className="relative">
        <img
          src={news.urlToImage}
          alt={news.title}
          className="rounded-lg shadow-lg w-full h-96 object-cover"
        />
        <div
          title={isSpeaking ? "Stop Reading" : "Read Aloud"}
          className="-bottom-5 right-2 w-10 h-10 absolute cursor-pointer rounded-full bg-blue-500"
          onClick={handleReadAloud}
        >
          {!isSpeaking ? (
            <img src={speaker} alt="Speaker Icon" className="w-full h-full" />
          ) : (
            <FaStopCircle className="w-full h-full text-xl text-red-700" />
          )}
        </div>
      </div>

      <Sharing
        data={{
          views: news?.views,
          comments: news?.comments,
          category: news?.category,
        }}
      />
      <UserProfile
        user={{
          name: news?.author?.name,
          profileImage: news?.author?.image,
          date: news?.publishedAt,
          links: news?.author?.links,
        }}
        setZoomText={setZoomText}
        zoomText={zoomText}
      />

      <div
        className="text-lg font-bold text-gray-800 my-2"
        style={{ fontSize: `${zoomText + 5}px` }}
      >
        {news?.title}
      </div>
      <div>
        <p style={{ fontSize: `${zoomText}px` }}>{news?.content}</p>
      </div>
    </div>
  );
}
