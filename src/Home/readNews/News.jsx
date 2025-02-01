import Sharing from "./Sharing";
import UserProfile from "./UserProfile";
// import speaker from "../../assets/speaker.svg";
// import { useContext, useEffect, useState } from "react";
// import { FaStopCircle } from "react-icons/fa";
// import { NewsContext } from "../../context/NewsContext";
// import { LanguageContext } from "../../context/LanguageContext";
// export default function News() {
//   // const news = {
//   //   source: {
//   //     id: null,
//   //     name: "The Times of India",
//   //   },
//   //   author: {
//   //     name: "Rajat",
//   //     image: "https://picsum.photos/200/300",
//   //     links: [
//   //       {
//   //         url: "https://www.linkedin.com/in/rajat-singh-1b1b3b1b3/",
//   //         name: "LinkedIn",
//   //       },
//   //       {
//   //         url: "https://www.whatsapp.com/in/rajat-singh-1b1b3b1b3/",
//   //         name: "whatsapp",
//   //       },
//   //       {
//   //         url: "https://www.email.com/in/rajat-singh-1b1b3b1b3/",
//   //         name: "email",
//   //       },
//   //       { url: "https://www.instagram.com/rajat_2502/", name: "Instagram" },
//   //       { url: "https://twitter.com/RajatSi2502", name: "Twitter" },
//   //       { url: "https://www.facebook.com/rajat.singh.2502", name: "Facebook" },
//   //       {
//   //         url: "https://www.youtube.com/channel/UC9QJQJ9Zjv3ZJjJLJ9Zzv9A",
//   //         name: "Youtube",
//   //       },
//   //     ],
//   //   },
//   //   title:
//   //     "MELBOURNE: India's star batsmen Rohit Sharma, Virat Kohli and Rishabh Pant will join the squad on Wednesday ahead of the first Test against Australia, starting on December 17.The trio was not a part of the limi… [+1602 chars]",
//   //   urlToImage:
//   //     "https://static.toiimg.com/thumb/msid-79510186,width-1070,height-580,imgsize-101117,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
//   //   publishedAt: "2020-05-15T14:30:00",
//   //   views: 100,
//   //   comments: 1020,
//   //   category: "Sports",
//   //   content:
//   //     "MELBOURNE: India's star batsmen Rohit Sharma, Virat Kohli and Rishabh Pant will join the squad on Wednesday ahead of the first Test against Australia, starting on December 17.The trio was not a part of the limi… [+1602 chars]",
//   // };
  // const { news } = useContext(NewsContext);
  // const { language } = useContext(LanguageContext);
  // const [zoomText, setZoomText] = useState(15);
  // const [isSpeaking, setIsSpeaking] = useState(false);
  // const [pitch, setPitch] = useState(1); // Default pitch
  // const [rate, setRate] = useState(1); // Default rate
  // const [voices, setVoices] = useState([]);
  // const [selectedVoice, setSelectedVoice] = useState(null);

//   // Fetch available voices
//   useEffect(() => {
//     const voices = speechSynthesis.getVoices();
//     setVoices(voices);
//     console.log(voices);

//     // Select a default voice with Indian accent if available
//     const indianVoice = voices.find((voice) =>
//       voice.name.toLowerCase().includes(language)
//     );
//     if (indianVoice) {
//       console.log(selectedVoice);
//       setSelectedVoice(indianVoice);
//     }
//   }, []);


//   const handleReadAloud = async () => {
//     if (isSpeaking) {
//       // If speech is playing, stop it
//       speechSynthesis.cancel();
//       setIsSpeaking(false);
//     } else {
//       // Concatenate both paragraphs
//       const utterance = new SpeechSynthesisUtterance(
//         news.title + " " + news.content
//       );

//       // Set the selected voice and adjust pitch and rate
//       utterance.voice = selectedVoice;
//       utterance.pitch = pitch;
//       utterance.rate = rate;

//       // Start speaking
//       speechSynthesis.speak(utterance);
//       setIsSpeaking(true);
//     }
//   };
//   // const handleReadAloud = () => {
//   //   if (isSpeaking) {
//   //     // If speech is currently playing, stop it
//   //     speechSynthesis.cancel();
//   //     setIsSpeaking(false); // Update the state to reflect it's stopped
//   //   } else {
//   //     // If speech is not playing, start it
//   //     const utterance = new SpeechSynthesisUtterance(
//   //       news.title + " " + news.content
//   //     );
//   //     utterance.pitch = 1;
//   //     utterance.rate = 1;

//   //     // Event listener to track when speech starts or ends
//   //     utterance.onstart = () => {
//   //       setIsSpeaking(true); // Speech started
//   //     };

//   //     utterance.onend = () => {
//   //       setIsSpeaking(false); // Speech ended
//   //     };

//   //     // Start speaking
//   //     speechSynthesis.speak(utterance);
//   //   }
//   // };
//   return (
//     <div className="bg-white p-2 rounded-lg">
//       <div className="relative">
//         {/* <img
//           src={news.urlToImage}
//           alt={news.title}
//           className="rounded-lg shadow-lg w-full h-96 object-cover"
//           loading="lazy"
//         /> */}
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
// import { jsPDF } from "jspdf";
import "jspdf-autotable"; 
import { jsPDF } from "jspdf";
import { useContext, useEffect, useState } from "react";
import { FaStopCircle } from "react-icons/fa";
import { NewsContext } from "../../context/NewsContext";
import { LanguageContext } from "../../context/LanguageContext";
import speaker from "../../assets/speaker.svg";

export default function News() {
  const { news } = useContext(NewsContext);
  const { language } = useContext(LanguageContext);
  const [zoomText, setZoomText] = useState(15);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pitch, setPitch] = useState(1); // Default pitch
  const [rate, setRate] = useState(1); // Default rate
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);


  // Function to update available voices
  const loadVoices = () => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);

    // Map language codes to full names used in speech synthesis
    const langMap = {
      hi: "hi-IN",
    en: "en-US",
    mr: "mr-IN",
    pa: "pa-IN",
    bn: "bn-IN",
    gu: "gu-IN",
    ta: "ta-IN",
    te: "te-IN",
    };
    
    const preferredVoice = availableVoices.find((voice) =>
      voice.lang.toLowerCase().includes(langMap[language] || language)
    );

    setSelectedVoice(preferredVoice || availableVoices[0]); // Fallback to first available voice
  };

  // Load voices when component mounts
  useEffect(() => {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [language]);

  const handleReadAloud = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(news.title + " " + news.content);

      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.pitch = pitch;
      utterance.rate = rate;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
    }
  };



  // tables if needed

// const handleDownloadPDF = () => {
//   const doc = new jsPDF({
//     orientation: "p", // Portrait mode
//     unit: "mm",
//     format: "a4", // Standard A4 size
//   });

//   // Page Settings
//   const marginX = 15; // Left margin
//   let cursorY = 20; // Starting position for content

//   // Title Styling
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(18);
//   doc.setTextColor(30, 30, 30); // Dark Gray Color
//   doc.text(news.title, marginX, cursorY, { maxWidth: 180, align: "justify" });

//   cursorY += 15; // Move cursor down

//   // Image (if available)
//   if (news.urlToImage) {
//     doc.addImage(news.urlToImage, "JPEG", marginX, cursorY, 180, 80);
//     cursorY += 85; // Move cursor after image
//   }

//   // Content Styling
//   doc.setFont("times", "normal");
//   doc.setFontSize(12);
//   doc.setTextColor(50, 50, 50); // Darker Gray

//   const contentLines = doc.splitTextToSize(news.content, 180); // Wrap text
//   doc.text(contentLines, marginX, cursorY, { align: "justify" });

//   cursorY += contentLines.length * 6; // Adjust cursor based on content

//   // Page Footer
//   const pageCount = doc.internal.getNumberOfPages();
//   for (let i = 1; i <= pageCount; i++) {
//     doc.setPage(i);
//     doc.setFontSize(10);
//     doc.setTextColor(150, 150, 150);
//     doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
//   }

//   // Save PDF with a clean file name
//   doc.save(`News_${news.title.replace(/\s+/g, "_")}.pdf`);
// };


const handleDownloadPDF = () => {
  const doc = new jsPDF({
    orientation: "p", // Portrait mode
    unit: "mm",
    format: "a4", // Standard A4 size
  });

  // Page settings
  const marginLeft = 15; // Left Margin
  const marginRight = 10; // Right Margin
  const pageWidth = doc.internal.pageSize.width; // Page width
  const pageHeight = doc.internal.pageSize.height; // Page height
  const contentWidth = pageWidth - marginLeft - marginRight; // Usable content width
  let cursorY = 20; // Initial cursor position

  // Title Styling
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(30, 30, 30); // Dark Gray Color
  doc.text(news.title, marginLeft, cursorY, { maxWidth: contentWidth, align: "justify" });

  cursorY += 15; // Move cursor down

  // Image Handling
  const maxImgWidth = contentWidth; // Maximum image width
  const maxImgHeight = 80; // Maximum image height
  let imgHeight = maxImgHeight;

  if (news.urlToImage) {
    doc.addImage(news.urlToImage, "JPEG", marginLeft, cursorY, maxImgWidth, imgHeight);
    cursorY += imgHeight + 10; // Move cursor after image
  }

  // Content Styling
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50); // Darker Gray

  const contentLines = doc.splitTextToSize(news.content, contentWidth); // Wrap text within margins

  // Function to add text with pagination
  const addTextWithPagination = (textArray) => {
    textArray.forEach((line) => {
      if (cursorY + 10 > pageHeight - 20) {
        doc.addPage(); // Add a new page if content exceeds page height
        cursorY = 20; // Reset cursor for new page
      }
      doc.text(line, marginLeft, cursorY);
      cursorY += 6; // Move cursor down after each line
    });
  };

  addTextWithPagination(contentLines);

  // Page Footer with Page Numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
  }

  // Save PDF with a clean file name
  doc.save(`News_${news.title.replace(/\s+/g, "_")}.pdf`);
};





  return (
    <div className="bg-white p-2 rounded-lg">
      <div className="relative">
        <img src={news.urlToImage} alt={news.title} className="rounded-lg shadow-lg w-full h-96 object-cover" />
        <div
          title={isSpeaking ? "Stop Reading" : "Read Aloud"}
          className="-bottom-5 right-2 w-10 h-10 absolute cursor-pointer rounded-full bg-blue-500"
          onClick={handleReadAloud}
        >
          {!isSpeaking ? <img src={speaker} alt="w-full h-ful" /> : <FaStopCircle className="w-full h-full text-xl text-red-700" />}
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
         handleDownloadPDF={handleDownloadPDF}
       />
       <div
         className="text-lg font-bold text-gray-800 my-2"
         style={{
           fontSize: `${zoomText + 5}px`,
         }}
       >
         {news?.title}
       </div>
       <div className="">
         <p className="" style={{ fontSize: `${zoomText}px` }}>
           {news?.content}
         </p>
      </div>
    </div>
  );
}
