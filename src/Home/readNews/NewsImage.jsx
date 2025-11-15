// import speaker from "../../assets/speaker.svg";
// import { FaStopCircle } from "react-icons/fa";
// import { handleReadAloud } from "../../utils/voiceUtils";

// export default function NewsImage({
//   news,
//   type,
//   isSpeaking,
//   setIsSpeaking,
//   selectedVoice,
//   language,
// }) {
//   const imageUrl = `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
//     type === "shorts" ? news?.news_img : news?.news_img_url
//   }`;

//   return (
//     <div className="relative">
//       <img
//         src={imageUrl}
//         alt={type === "shorts" ? news.news_title : news.news_headline}
//         className="rounded-lg shadow-lg w-full h-96 object-center"
//       />
//       <div
//         title={isSpeaking ? "Stop Reading" : "Read Aloud"}
//         className="-bottom-5 right-2 w-10 h-10 absolute cursor-pointer rounded-full bg-blue-500"
//         onClick={() =>
//           handleReadAloud({
//             news,
//             selectedVoice,
//             setIsSpeaking,
//             isSpeaking,
//             language,
//           })
//         }
//       >
//         {!isSpeaking ? (
//           <img src={speaker} alt="Speaker" className="w-full h-full" />
//         ) : (
//           <FaStopCircle className="w-full h-full text-xl text-red-700" />
//         )}
//       </div>
//     </div>
//   );
// }




// import speaker from "../../assets/speaker.svg";
// import { FaStopCircle } from "react-icons/fa";
// import { FaEllipsisV } from "react-icons/fa"; // is_news_type "1" के लिए Options Icon
// import { handleReadAloud } from "../../utils/voiceUtils";

// export default function NewsImage({
//   news,
//   type,
//   isSpeaking,
//   setIsSpeaking,
//   selectedVoice,
//   language,
//   // is_news_type के लिए नया prop:
//   isNewsType, 
// }) {
//   // Image URL को shorts या full news के आधार पर निर्धारित करना
//   const imageUrl = `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
//     type === "shorts" ? news?.news_img : news?.news_img_url
//   }`;

//   // इस कॉम्पोनेंट को केवल तब रेंडर करना जब यह इमेज दिखाने के लिए हो (isNewsType 0 या 1)
//   // 'shorts' के लिए isNewsType की जाँच की आवश्यकता नहीं है
//   const isImageNews = type === "shorts" || isNewsType === "0" || isNewsType === "1" ||isNewsType==="2";

//   if (!isImageNews) {
//     // अगर newsType '2' (Video) या '3' (Gallery) है, तो यह कॉम्पोनेंट रेंडर नहीं होगा। 
//     // आपको इस कॉम्पोनेंट के बाहर VideoPlayer या ImageGallery को रेंडर करना होगा।
//     return null; 
//   }


//   return (
//     <div className="relative">
//       <img
//         src={imageUrl}
//         alt={type === "shorts" ? news.news_title : news.news_headline}
//         className="rounded-lg shadow-lg w-full h-96 object-cover" // object-cover जोड़ा गया
//       />
      
//       {/* is_news_type === "1" (खबरों की श्रृंखला) के लिए Options Icon */}
//       {type !== "shorts" && isNewsType === "2" &&isNewsType === "1" && (
//           <button 
//             title="View News Types"
//             className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-10 hover:bg-gray-100"
//             onClick={() => {
//               // TODO: यहाँ लॉजिक डालें जिससे सारे news types दिखें
//               console.log("Options button clicked for is_news_type: 1");
//             }} 
//           >
//             <FaEllipsisV className="text-gray-800" /> 
//           </button>
//       )}

//       {/* Read Aloud Button */}
//       <div
//         title={isSpeaking ? "Stop Reading" : "Read Aloud"}
//         // -bottom-5 right-2 से बदलकर bottom-4 right-4 कर रहा हूँ ताकि UI में बेहतर दिखे
//         className="bottom-4 right-4 w-10 h-10 absolute cursor-pointer rounded-full bg-blue-500 shadow-xl flex items-center justify-center z-10"
//         onClick={() =>
//           handleReadAloud({
//             news,
//             selectedVoice,
//             setIsSpeaking,
//             isSpeaking,
//             language,
//           })
//         }
//       >
//         {!isSpeaking ? (
//           <img src={speaker} alt="Speaker" className="w-6 h-6" /> // w-full h-full से w-6 h-6 किया
//         ) : (
//           <FaStopCircle className="w-8 h-8 text-red-700" /> // साइज़ एडजस्ट किया
//         )}
//       </div>
//     </div>
//   );
// }


import { FaEllipsisV } from "react-icons/fa"; // is_news_type "1" ke liye Options Icon
// Read Aloud se related imports (speaker, FaStopCircle, handleReadAloud) hata diye gaye hain.

export default function NewsImage({
  news,
  type,
  // isSpeaking, setIsSpeaking, selectedVoice, language props hata diye gaye hain.
  isNewsType, 
}) {
  // Image URL ko shorts ya full news ke aadhar par nirdharit karna
  const imageUrl = `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
    type === "shorts" ? news?.news_img : news?.news_img_url
  }`;

  // RENDER LOGIC: isNewsType "2" YouTube Video hai, toh NewsImage ko use nahi karna chahiye.
  // Lekin aapne isNewsType==="2" add kiya hai. Agar aapka isNewsType "2" Video hai, toh use remove kar dena chahiye.
  // Main maan raha hoon ki aap isNewsType==="2" ko galti se add kar rahe hain aur aapko sirf 0 aur 1 chahiye.
  // Agar isNewsType "2" bhi image hai, toh usko rehne dein.
  // Aapke pichle switch case (News.jsx) ke hisaab se, '2' YouTube video hai, aur '1' news series hai.
  
  // Naya logic: Shorts ya isNewsType 0/1 (Image/Series) ke liye hi render karo.
  const isImageNews = type === "shorts" || isNewsType === "0" || isNewsType === "1"||isNewsType=="2";

  if (!isImageNews) {
    // Agar newsType '2' (Video) ya '3' (Gallery) hai, toh yeh component render nahi hoga. 
    return null; 
  }


  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt={type === "shorts" ? news.news_title : news.news_headline}
        className="rounded-lg shadow-lg w-full h-96 object-cover" 
      />
      
      {/* is_news_type === "1" (Khabaron ki shrinkhala) ke liye Options Icon */}
      {/* Aapka logic: isNewsType === "2" && isNewsType === "1" kabhi true nahi hoga. 
          Main isko isNewsType === "1" (News Series) ke liye fix kar raha hoon. */}
      {/* {type !== "shorts" && isNewsType === "1" && (
          <button 
            title="View News Types"
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-10 hover:bg-gray-100"
            onClick={() => {
              console.log("Options button clicked for is_news_type: 1");
            }} 
          >
            <FaEllipsisV className="text-gray-800" /> 
          </button>
      )} */}

      {/* Read Aloud Button ka poora <div> block yahan se hata diya gaya hai. */}
      
    </div>
  );
}