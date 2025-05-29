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
      console.log(newsData);
      setNews(newsData || null);
    } catch (err) {
      console.error("Error loading news:", err);
    }
  };

  useEffect(() => {
    loadNewsDetails();
  }, [type, newsId]);
  // console.log(`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
  //                   news?.news_img_url
  //                 }`)
  if (!news) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="bg-white p-2 rounded-lg animate-fadeIn">
      <div className="relative">
        <img
          src={
            type == "shorts"
              ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                  news?.news_img
                }`
              : `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                  news?.news_img_url
                }`
          }
          alt={type == "shorts" ? news.news_title : news.news_headline}
          className="rounded-lg shadow-lg w-full h-96 object-center"
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
      <div>
        <p>
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
