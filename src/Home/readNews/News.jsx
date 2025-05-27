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
import { useParams } from "react-router-dom";
import {
  // GetFullNewsDetails,
  GetNewsById,
  GetShortsNewsDetails,
} from "../../../api";
import HtmlToPlainText from "../../utils/HtmlToPlainText";
import { getUserIP } from "../../utils/userIp";

// export default function News() {
//   const { news } = useContext(NewsContext);
//   const { language } = useContext(LanguageContext); // Get selected language
//   const [zoomText, setZoomText] = useState(15);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [voices, setVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);

//   // Map language codes to Speech Synthesis formats
// const langMap = {
//   hi: "hi-IN", // Hindi
//   en: "en-US", // English
//   mr: "mr-IN", // Marathi
//   pa: "pa-IN", // Punjabi
//   bn: "bn-IN", // Bengali
//   gu: "gu-IN", // Gujarati
//   ta: "ta-IN", // Tamil
//   te: "te-IN", // Telugu
//   kn: "kn-IN", // Kannada
//   ml: "ml-IN", // Malayalam
//   ur: "ur-IN", // Urdu
//   ar: "ar-SA", // Arabic
//   fr: "fr-FR", // French
//   de: "de-DE", // German
//   es: "es-ES", // Spanish
//   zh: "zh-CN", // Chinese (Mandarin)
// };

//   // Load available voices and select the correct one
//   const loadVoices = () => {
//     const availableVoices = speechSynthesis.getVoices();
//     setVoices(availableVoices);

//     const preferredVoice = availableVoices.find((voice) =>
//       voice.lang.toLowerCase().includes(langMap[language] || language)
//     );

//     setSelectedVoice(preferredVoice || availableVoices[0]); // Fallback to first available voice
//   };

//   // Load voices when component mounts or language changes
//   useEffect(() => {
//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }, [language]);

//   // Function to read aloud in selected language
//   const handleReadAloud = () => {
//     if (isSpeaking) {
//       speechSynthesis.cancel();
//       setIsSpeaking(false);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(
//         `${news?.title} ${news?.content}`
//       );

//       if (selectedVoice) {
//         utterance.voice = selectedVoice;
//         utterance.lang = selectedVoice.lang;
//       } else {
//         utterance.lang = langMap[language] || "en-US"; // Fallback to English if no match
//       }

//       utterance.onstart = () => setIsSpeaking(true);
//       utterance.onend = () => setIsSpeaking(false);

//       speechSynthesis.speak(utterance);
//     }
//   };
//   const handleDownloadPDF = async () => {
//     const doc = new jsPDF("p", "mm", "a4"); // A4 portrait
//     const pageWidth = doc.internal.pageSize.getWidth();
//     let currentY = 20;

//     const toDataURL = (url) =>
//       fetch(url)
//         .then((response) => response.blob())
//         .then(
//           (blob) =>
//             new Promise((resolve, reject) => {
//               const reader = new FileReader();
//               reader.onloadend = () => resolve(reader.result);
//               reader.onerror = reject;
//               reader.readAsDataURL(blob);
//             })
//         );

//     // Header Title
//     doc.setFont("times", "bold");
//     doc.setFontSize(20);
//     doc.text(news.title, 10, currentY);
//     currentY += 10;

//     // Meta Info: Author, Date, Location
//     doc.setFont("times", "italic");
//     doc.setFontSize(10);
//     doc.text(
//       `By ${news.author.name} | ${new Date(
//         news.publishedAt
//       ).toLocaleString()} | ${news.location}`,
//       10,
//       currentY
//     );
//     currentY += 8;

//     // Category & Subcategory
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(11);
//     doc.text(
//       `Category: ${news.category} | Subcategory: ${news.subcategory}`,
//       10,
//       currentY
//     );
//     currentY += 10;

//     // Add Image
//     if (news.urlToImage) {
//       try {
//         const imageData = await toDataURL(news.urlToImage);
//         doc.addImage(imageData, "JPEG", 10, currentY, pageWidth - 20, 60);
//         currentY += 65;
//       } catch (error) {
//         console.error("Image load error:", error);
//       }
//     }

//     // Content
//     doc.setFont("times", "normal");
//     doc.setFontSize(12);
//     const contentLines = doc.splitTextToSize(news.content, pageWidth - 20);
//     doc.text(contentLines, 10, currentY);
//     currentY += contentLines.length * 6;

//     // Views and Comments
//     doc.setFont("helvetica", "italic");
//     doc.setFontSize(10);
//     doc.text(
//       `👁️ ${news.views} views | 💬 ${news.comments} comments`,
//       10,
//       currentY
//     );
//     currentY += 10;

//     // External Links
//     if (news.links && news.links.length) {
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(11);
//       doc.text("Follow the author:", 10, currentY);
//       currentY += 7;

//       doc.setFont("helvetica", "normal");
//       news.links.forEach((link) => {
//         doc.textWithLink(link.name, 12, currentY, { url: link.url });
//         currentY += 6;
//       });
//     }

//     // Footer - Source
//     doc.setFontSize(10);
//     doc.setFont("times", "italic");
//     doc.text(`Source: ${news.source?.name || "Unknown"}`, 10, 290);

//     // Save the file
//     doc.save(`${news.title}.pdf`);
//   };

//   const { type, newsId } = useParams();
//   const loadNewsDetails = async () => {
//     // Fetch news details from API or context
//     // This is a placeholder; replace with actual API call
//     const newsDetails =
//       type == "shorts"
//         ? await GetShortsNewsDetails(newsId)
//         : await GetFullNewsDetails(newsId);
//     console.log(newsDetails);

//     // setNews(newsDetails);
//   };
//   useEffect(() => {
//     loadNewsDetails();
//   });
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
//             <img src={speaker} alt="Speaker Icon" className="w-full h-full" />
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
//         style={{ fontSize: `${zoomText + 5}px` }}
//       >
//         {news?.title}
//       </div>
//       <div>
//         <p style={{ fontSize: `${zoomText}px` }}>{news?.content}</p>
//       </div>
//     </div>
//   );
// }

// ... (other imports remain same)
// import { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import { FaStopCircle } from "react-icons/fa";
// import { LanguageContext } from "../context/LanguageContext";
// import { GetNewsById, GetShortsNewsDetails } from "../api/newsApi";
// import HtmlToPlainText from "../components/HtmlToPlainText";
// import Sharing from "../components/Sharing";
// import UserProfile from "../components/UserProfile";
// import speaker from "../assets/speaker.png";

export default function News() {
  const { language } = useContext(LanguageContext);
  const [zoomText, setZoomText] = useState(15);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [news, setNews] = useState(null);
  const { type, newsId } = useParams();

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

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = speechSynthesis.getVoices();
      if (synthVoices.length) {
        const voice = synthVoices.find((v) => v.lang === langMap[language]);
        setSelectedVoice(voice || synthVoices[0]);
      }
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [language]);

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

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
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleDownloadPDF = async () => {
    if (!news) return;
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    let currentY = 20;

    const toDataURL = (url) =>
      fetch(url)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );

    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text(news.news_title || news.news_headline, 10, currentY);
    currentY += 10;

    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.text(
      `By ${news.reporter_name} | ${new Date(
        news.publishedAt || Date.now()
      ).toLocaleString()} | ${news.location || "Location"}`,
      10,
      currentY
    );
    currentY += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(
      `Category: ${news.category || news.news_category_name || "N/A"}`,
      10,
      currentY
    );
    currentY += 10;

    if (news.news_img || news.urlToImage) {
      try {
        const imageData = await toDataURL(news.news_img || news.urlToImage);
        doc.addImage(imageData, "JPEG", 10, currentY, pageWidth - 20, 60);
        currentY += 65;
      } catch (err) {
        console.error("Image error:", err);
      }
    }

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    const plainText = stripHtmlTags(news.news_des || news.news_description);
    const contentLines = doc.splitTextToSize(plainText, pageWidth - 20);
    doc.text(contentLines, 10, currentY);
    currentY += contentLines.length * 6;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(
      `👁️ ${news.views_count || news.views || 0} views | 💬 ${
        news.comments_count || news.comments || 0
      } comments`,
      10,
      currentY
    );
    currentY += 10;

    if (news.links && news.links.length) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Follow the author:", 10, currentY);
      currentY += 7;
      doc.setFont("helvetica", "normal");
      news.links.forEach((link) => {
        doc.textWithLink(link.name, 12, currentY, { url: link.url });
        currentY += 6;
      });
    }

    doc.setFontSize(10);
    doc.setFont("times", "italic");
    doc.text(`Source: ${news.reporter_name || "Unknown"}`, 10, 290);

    doc.save(`${(news.news_title || news.news_headline).slice(0, 50)}.pdf`);
  };

  const getUserIP = async () => {
    try {
      const res = await fetch("https://api64.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch {
      return "0.0.0.0";
    }
  };

  const loadNewsDetails = async () => {
    const ip = await getUserIP();
    try {
      const response =
        type === "shorts"
          ? await GetShortsNewsDetails(newsId, ip)
          : await GetNewsById(newsId, ip);
      // console.log(response);
      const newsData =
        type !== "shorts"
          ? response.data.response[0]
          : response?.data?.response?.news?.[0];
      setNews(newsData || null);
    } catch (err) {
      console.error("Error loading news:", err);
    }
  };

  useEffect(() => {
    loadNewsDetails();
  }, [type, newsId]);

  if (!news) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white p-2 rounded-lg animate-fadeIn">
      <div className="relative">
        <img
          src={
            type == "shorts"
              ? news.news_img
              : news.news_img ||
                news.urlToImage ||
                "https://picsum.photos/300/500"
          }
          alt={type == "shorts" ? news.news_title : news.news_headline}
          className="rounded-lg shadow-lg w-full h-96 object-cover"
        />
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
      </div>

      <Sharing
        data={{
          views: news?.clap_clount || news.views_count || news.views || 0,
          comments: news?.comments || news.comments_count || 0,
          category: news?.news_category_name || news.category || "General",
        }}
      />

      <UserProfile
        user={{
          name: news.reporter_name,
          profileImage: news.reporter_img,
          date: news.publishedAt,
          links: news.author?.links || [],
        }}
        setZoomText={setZoomText}
        zoomText={zoomText}
        handleDownloadPDF={handleDownloadPDF}
      />

      <div
        className="text-lg font-bold text-gray-800 my-2"
        style={{ fontSize: `${zoomText + 5}px` }}
      >
        {type == "shorts" ? news.news_title : news.news_headline}
      </div>
      <div >
        <p >
          <HtmlToPlainText
            htmlContent={
              type == "shorts"
                ? news.news_des
                : news.news_description_html || news.news_description
            }
            style={{ fontSize: `${zoomText + 5}px` }}
          />
        </p>
      </div>
    </div>
  );
}
