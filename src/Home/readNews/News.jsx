


import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sharing from "./Sharing";
import UserProfile from "./UserProfile";
import NewsImage from "./NewsImage";
import NewsContent from "./NewsContent";
import NewsReader from "./NewsReader";
import { NewsContext } from "../../context/NewsContext";
import { LanguageContext } from "../../context/LanguageContext";
import { handleDownloadPDF } from "./NewsPDFDownloader";
import useNewsDetails from "./useNewsDetails";
import Loader from "../../utils/Loader";
import NewsArticleSkeleton from "./NewsArticleSkeleton";

export default function News() {
  const { language } = useContext(LanguageContext);
  const [zoomText, setZoomText] = useState(15);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const { type, newsId } = useParams();

  const { news, loadNewsDetails } = useNewsDetails(type, newsId);
  console.log(news)

  useEffect(() => {
    loadNewsDetails();
    // setNewsCategory(news.news_category_name)
  }, [type, newsId]);

  if (!news) return <NewsArticleSkeleton/>;

  return (
    <div className="">
      <NewsImage
        news={news}
        type={type}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
        selectedVoice={selectedVoice}
        language={language}
      />

      <Sharing
        data={{
          views: news?.clap_clount || news.views_count || news.views || 0,
          comments: news?.comments || news.comments_count || 0,
          category: news?.news_category_name || news.category || "General",
          video:news?.news_video_url
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
        handleDownloadPDF={() => handleDownloadPDF(type,news)}
      />

      <NewsContent news={news} type={type} zoomText={zoomText} />
    </div>
  );
}
