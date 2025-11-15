

// import { useContext, useEffect, useState } from "react";
// // Imports
// import Sharing from "./Sharing";
// import UserProfile from "./UserProfile";
// import NewsImage from "./NewsImage";
// import NewsContent from "./NewsContent";
// import { LanguageContext } from "../../context/LanguageContext";
// import { handleDownloadPDF } from "./NewsPDFDownloader";
// import useNewsDetails from "./useNewsDetails";
// import NewsArticleSkeleton from "./NewsArticleSkeleton";
// import ImageGallerySlider from "./ImageGallerySlider"; // Assuming this exists
// // Icons and Utils
// import speaker from "../../assets/speaker.svg";
// import { FaStopCircle, FaEllipsisV, FaEye } from "react-icons/fa";
// import { handleReadAloud } from "../../utils/voiceUtils";
// import { Link } from "react-router-dom";
// import { IoMdEyeOff } from "react-icons/io";
// import { MdArrowBackIosNew } from "react-icons/md";
// import { RiVideoFill } from "react-icons/ri";
// import { FaArrowUpRightFromSquare } from "react-icons/fa6";
// import { GrGallery } from "react-icons/gr";

// // --- Read Aloud Button Component ---
// const ReadAloudButton = ({
//   news,
//   isSpeaking,
//   setIsSpeaking,
//   selectedVoice,
//   language,
// }) => (
//   <div
//     title={isSpeaking ? "Stop Reading" : "Read Aloud"}
//     className=" cursor-pointer rounded-full bg-blue-500 shadow-xl flex items-center justify-center z-20 absolute -bottom-5 right-2"
//     onClick={() =>
//       handleReadAloud({
//         news,
//         selectedVoice,
//         setIsSpeaking,
//         isSpeaking,
//         language,
//       })
//     }
//   >
//     {!isSpeaking ? (
//       <img src={speaker} alt="Speaker" className="w-10 h-10" />
//     ) : (
//       <FaStopCircle className="w-10 h-10 text-red-700" size={30} />
//     )}
//   </div>
// );
// // --- End Read Aloud Button Component ---

// // --- YouTube Video Player Component ---
// function YouTubeVideoPlayer({ news }) {
//   const extractYouTubeId = (url) => {
//     if (!url) return null;
//     const regex =
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   const videoId = extractYouTubeId(news?.youtube_url);

//   if (!videoId) {
//     return (
//       <div className="relative mb-6 flex justify-center items-center h-96 bg-gray-200 rounded-lg text-gray-700">
//         <p className="font-semibold text-lg">🎥 Video URL not found</p>
//       </div>
//     );
//   }

//   const embedUrl = `https://www.youtube.com/embed/${videoId}`;

//   return (
//     <div className="relative mb-6 w-full h-96 flex justify-center items-center bg-black rounded-lg overflow-hidden shadow-md">
//       <iframe
//         className="w-full h-full"
//         src={embedUrl}
//         title={news?.news_headline || "YouTube video"}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// }

// // ----------------------------------------------------------------------

// export default function News({ type, newsId }) {
//   const { language } = useContext(LanguageContext);
//   const [zoomText, setZoomText] = useState(15);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [selectedVoice, setSelectedVoice] = useState(null);

//   // Custom Hook Call (Should be at the top)
//   const { news, loadNewsDetails } = useNewsDetails(type, newsId);

//   // State for Dynamic View (Hooks should be at the top)
//   const [currentMediaView, setCurrentMediaView] = useState("image");
//   const [showOptions, setShowOptions] = useState(false);
//   console.log(news);

//   // ----------------------------------------------------------------------
//   // EFFECT 1: Load News Details
//   useEffect(() => {
//     loadNewsDetails();
//   }, [type, newsId, loadNewsDetails]);

//   // ----------------------------------------------------------------------
//   // Media Logic Setup (derived state)
//   const isFullNews = type !== "shorts";
//   const newsType = isFullNews ? news?.is_news_type : null;
//   const hasVariants =
//     isFullNews && (newsType === "2" || newsType === "3" || news?.youtube_url);

//   // EFFECT 2: Set Initial View when News loads (Hooks should be at the top)
//   useEffect(() => {
//     if (news && isFullNews && !hasVariants) {
//       // Agar variants hain (jaise type 2/3), toh default view 'image' set karo.
//       setCurrentMediaView("image");
//     } else if (news && newsType == "3" && hasVariants) {
//       // Agar sirf gallery hai aur koi variant nahi hai, toh gallery dikhao (Optional, depends on exact data structure)
//       // Abhi ke liye, hum hamesha image se shuru kar rahe hain agar variants hain.
//       setCurrentMediaView("gallery");
//     }
//     // Shorts ke liye default 'image' hi rahega.
//   }, [news, isFullNews, hasVariants]);

//   if (!news) return <NewsArticleSkeleton />;

//   // ----------------------------------------------------------------------
//   // Options List and Renderer Logic
//   // ----------------------------------------------------------------------

//   // List of available formats (variants) for the options dropdown
//   const availableFormats = [
//     {
//       id: "image",
//       label: {
//         icon: <MdArrowBackIosNew size={20} />,
//         text: "Back",
//       },
//       show: true,
//     },
//     {
//       id: "video",
//       label: {
//         icon: <RiVideoFill size={20}></RiVideoFill>,
//         text: "Video",
//       },
//       show: !!news?.youtube_url,
//     },
//     {
//       id: "source",
//       label: {
//         icon: <FaArrowUpRightFromSquare size={20} />,
//         text: "Source News",
//       },
//       show: !!news?.source_url,
//     },
//     {
//       id: "gallery",
//       label: {
//         icon: <GrGallery />,
//         text: "Gallery",
//       },
//       show: !!news?.images,
//     },
//   ].filter((f) => f.show);

//   // --- News Type Options Component ---
//   const NewsTypeOptions = () => {
//     if (!hasVariants) return null;

//     return (
//       <>
//         {/* Options Button */}
//         {newsType == "2" && (
//           <button
//             title="View News Formats"
//             className="absolute top-4 right-4 py-2 px-2 
// bg-black/35 hover:bg-black/40 
// rounded-full shadow-lg z-30 
// transition-all duration-300 text-white"
//             onClick={() => setShowOptions(!showOptions)}
//           >
//             {showOptions ? (
//               <div className="flex items-center justify-center gap-2">
//                 <span>
//                   {" "}
//                   <IoMdEyeOff className="text-gray-50" />
//                 </span>
//                 <span>Hide Options</span>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center gap-2">
//                 <span>
//                   {" "}
//                   <FaEye className="text-gray-50" />
//                 </span>
//                 <span>Show Options</span>
//               </div>
//             )}
//           </button>
//         )}

//         {/* Dropdown List */}
//        {showOptions && newsType != "3" && (
//   <div className="absolute top-14 right-4 p-2 z-40 min-w-[150px]">
//     {availableFormats
//       .filter((format) => {
//         // ✅ Hide 'back' in default state
//         if (format.id === "back" && currentMediaView === "default") {
//           return false;
//         }
//         return true;
//       })
//       .map((format) => (
//         <button
//           key={format.id}
//           className={`w-full text-white text-left my-1 py-2 px-3 rounded-full transition-colors ${
//             currentMediaView === format.id
//               ? "bg-black/40 text-blue-700 font-bold"
//               : "hover:bg-black/35 bg-black/40"
//           }`}
//           onClick={() => {
//             setCurrentMediaView(format.id);
//             setShowOptions(false);
//           }}
//         >
//           {format.id === "source" ? (
//             <Link
//               to={news?.source_url}
//               target="_blank"
//               className="flex items-center justify-start gap-2"
//             >
//               {format.label.icon} {format.label.text}
//             </Link>
//           ) : (
//             <p className="flex items-center justify-start gap-2">
//               {format.label.icon} {format.label.text}
//             </p>
//           )}
//         </button>
//       ))}
//   </div>
// )}

//       </>
//     );
//   };
//   // ----------------------------------------------------------------------

//   // 3. Media Renderer Logic: currentMediaView ke aadhar par component choose karna
//   let MediaContentComponent;

//   switch (currentMediaView) {
//     case "video":
//       MediaContentComponent = <YouTubeVideoPlayer news={news} />;
//       break;
//     case "gallery":
//       MediaContentComponent = <ImageGallerySlider news={news} />;
//       break;
//     case "image":
//     default:
//       MediaContentComponent = (
//         <NewsImage news={news} type={type} isNewsType={newsType} />
//       );
//       break;
//   }

//   return (
//     <div className="">
//       {/* RENDER THE DYNAMIC MEDIA COMPONENT AUR OPTIONS */}
//       <div className="relative mb-6">
//         {MediaContentComponent}

//         {/* Options Button and Dropdown: Full news aur variants ke liye */}
//         {isFullNews && <NewsTypeOptions />}

//         {/* Read Aloud Button: Ab yeh har Media ke saath Render hoga */}
//         <ReadAloudButton
//           news={news}
//           isSpeaking={isSpeaking}
//           setIsSpeaking={setIsSpeaking}
//           selectedVoice={selectedVoice}
//           language={language}
//         />
//       </div>
//       {/* --------------------------------- */}

//       <Sharing
//         data={{
//           views: news?.clap_clount || news.views_count || news.views || 0,
//           comments: news?.comments || news.comments_count || 0,
//           category: news?.news_category_name || news.category || "General",
//           video: news?.news_video_url,
//         }}
//       />

//       <UserProfile
//         user={{
//           name: news.reporter_name,
//           profileImage: news.reporter_img,
//           date: news.publishedAt,
//           links: news.author?.links || [],
//         }}
//         setZoomText={setZoomText}
//         zoomText={zoomText}
//         handleDownloadPDF={() => handleDownloadPDF(type, news)}
//       />

//       <NewsContent news={news} type={type} zoomText={zoomText} />
//     </div>
//   );
// }



import { useContext, useEffect, useState } from "react";
import Sharing from "./Sharing";
import UserProfile from "./UserProfile";
import NewsImage from "./NewsImage";
import NewsContent from "./NewsContent";
import { LanguageContext } from "../../context/LanguageContext";
import { handleDownloadPDF } from "./NewsPDFDownloader";
import useNewsDetails from "./useNewsDetails";
import NewsArticleSkeleton from "./NewsArticleSkeleton";
import ImageGallerySlider from "./ImageGallerySlider";
import speaker from "../../assets/speaker.svg";
import { FaStopCircle, FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { handleReadAloud } from "../../utils/voiceUtils";
import { Link } from "react-router-dom";

// 🎧 Read Aloud Button
const ReadAloudButton = ({
  news,
  isSpeaking,
  setIsSpeaking,
  selectedVoice,
  language,
}) => (
  <div
    title={isSpeaking ? "Stop Reading" : "Read Aloud"}
    className="cursor-pointer rounded-full bg-blue-500 shadow-xl flex items-center justify-center z-20 absolute -bottom-5 right-2"
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
      <img src={speaker} alt="Speaker" className="w-12 h-12" />
    ) : (
      <FaStopCircle className="w-12 h-12 text-red-700" size={60} />
    )}
  </div>
);

// 🎥 YouTube Video Player
function YouTubeVideoPlayer({ news }) {
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractYouTubeId(news?.youtube_url);
  if (!videoId)
    return (
      <div className="relative mb-6 flex justify-center items-center h-96 bg-gray-200 rounded-lg text-gray-700">
        <p className="font-semibold text-lg">🎥 Video URL not found</p>
      </div>
    );

  return (
    <div className="relative mb-6 w-full h-96 flex justify-center items-center bg-black rounded-lg overflow-hidden shadow-md">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={news?.news_headline || "YouTube video"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

// 📰 MAIN COMPONENT
export default function News({ type, newsId }) {
  const { language } = useContext(LanguageContext);
  const [zoomText, setZoomText] = useState(15);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const { news, loadNewsDetails } = useNewsDetails(type, newsId);
  const [currentMediaView, setCurrentMediaView] = useState("image");
  const [showOptions, setShowOptions] = useState(false);

  const isFullNews = type !== "shorts";
  const newsType = isFullNews ? news?.is_news_type : null;
  const hasVariants =
    isFullNews && (newsType === "2" || newsType === "3" || news?.youtube_url);

  useEffect(() => {
    loadNewsDetails();
  }, [type, newsId, loadNewsDetails]);

  useEffect(() => {
    if (news && isFullNews && !hasVariants) setCurrentMediaView("image");
    else if (news && newsType == "3" && hasVariants)
      setCurrentMediaView("gallery");
  }, [news, isFullNews, hasVariants]);

  if (!news) return <NewsArticleSkeleton />;

  // ✅ Available formats
  const availableFormats = [
    {
      id: "back",
      label: { icon: <MdArrowBackIosNew size={20} />, text: "Back" },
      show: true,
    },
    {
      id: "video",
      label: { icon: <RiVideoFill size={20} />, text: "Video" },
      show: !!news?.youtube_url,
    },
    {
      id: "source",
      label: { icon: <FaArrowUpRightFromSquare size={20} />, text: "Source News" },
      show: !!news?.source_url,
    },
    {
      id: "gallery",
      label: { icon: <GrGallery />, text: "Gallery" },
      show: !!news?.images,
    },
  ].filter((f) => f.show);

  // 🎛 Options Dropdown Component
  const NewsTypeOptions = () => {
    if (!hasVariants) return null;

    return (
      <>
        {/* Toggle Button */}
        {newsType == "2" && (
          <button
            title="View News Formats"
            className="absolute top-4 right-4 py-2 px-2 bg-black/35 hover:bg-black/40 rounded-full shadow-lg z-30 transition-all duration-300 text-white"
            onClick={() => setShowOptions(!showOptions)}
          >
            {showOptions ? (
              <div className="flex items-center justify-center gap-2">
                <IoMdEyeOff className="text-gray-50" />
                <span>Hide Options</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaEye className="text-gray-50" />
                <span>Show Options</span>
              </div>
            )}
          </button>
        )}

        {/* Dropdown List */}
        {showOptions && newsType != "3" && (
          <div className="absolute top-14 right-4 p-2 z-40 min-w-[150px]">
            {availableFormats
              .filter((format) => {
                // ✅ Hide 'Back' until another format is selected
                if (format.id === "back" && currentMediaView === "image") return false;
                return true;
              })
              .map((format) => (
                <button
                  key={format.id}
                  className={`w-full text-white text-left my-1 py-2 px-3 rounded-full transition-colors ${
                    currentMediaView === format.id
                      ? "bg-black/40 text-blue-700 font-bold"
                      : "hover:bg-black/35 bg-black/40"
                  }`}
                  onClick={() => {
                    if (format.id === "back") setCurrentMediaView("image");
                    else setCurrentMediaView(format.id);
                    setShowOptions(false);
                  }}
                >
                  {format.id === "source" ? (
                    <Link
                      to={news?.source_url}
                      target="_blank"
                      className="flex items-center justify-start gap-2"
                    >
                      {format.label.icon} {format.label.text}
                    </Link>
                  ) : (
                    <p className="flex items-center justify-start gap-2">
                      {format.label.icon} {format.label.text}
                    </p>
                  )}
                </button>
              ))}
          </div>
        )}
      </>
    );
  };

  // 🧩 Dynamic Media Renderer
  let MediaContentComponent;
  switch (currentMediaView) {
    case "video":
      MediaContentComponent = <YouTubeVideoPlayer news={news} />;
      break;
    case "gallery":
      MediaContentComponent = <ImageGallerySlider news={news} />;
      break;
    case "image":
    default:
      MediaContentComponent = (
        <NewsImage news={news} type={type} isNewsType={newsType} />
      );
      break;
  }

  return (
    <div>
      <div className="relative mb-6">
        {MediaContentComponent}
        {isFullNews && <NewsTypeOptions />}
        <ReadAloudButton
          news={news}
          isSpeaking={isSpeaking}
          setIsSpeaking={setIsSpeaking}
          selectedVoice={selectedVoice}
          language={language}
        />
      </div>

      <Sharing
        data={{
          views: news?.clap_clount || news.views_count || news.views || 0,
          comments: news?.comments || news.comments_count || 0,
          category: news?.news_category_name || news.category || "General",
          video: news?.news_video_url,
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
        handleDownloadPDF={() => handleDownloadPDF(type, news)}
      />

      <NewsContent news={news} type={type} zoomText={zoomText} />
    </div>
  );
}
