import { useState } from 'react'
import Header from '../shared/Header';

export default function OwnState() {
    const articles = [
        {
          title:
            "राजनीति से जुड़ी युवाओं की आस, राष्ट्रीय युवा संसद में अपनी भागीदारी पर जाहिर की उम्मीदें",
          date: "March 6, 2024",
        },
        {
          title:
            "कौन है वो कांग्रेस नेता जिसने 'खुद को ही मान लिया कानून...? अब सुप्रीम कोर्ट ने की बड़ी टिप्पणी",
          date: "March 6, 2024",
        },
        {
          title:
            "महिला रैली में पीएम मोदी बोले, “भाज़पा ने नारी शक्ति को बनाया विकासशील भारत की शक्ति”",
          date: "March 6, 2024",
        },
        {
          title:
            "आखिर अचानक क्यों बंद हो गया था Facebook और Instagram! META ने दिया ये जवाब",
          date: "March 6, 2024",
        },
        {
          title:
            "PM MODI ने नमो भारत ट्रेन का किया उद्घाटन, सांसद वी के सिंह और मंत्री हरदीप सिंह पुरी रहे मौजूद",
          date: "March 6, 2024",
        },
      ];
  const [hoverIndex, setHoverIndex] = useState(null); // State to track the hovered index
 
   return (
     <div className="my-2 mt-5 font-sans">
       <Header text={"उत्तर प्रदेश"}/>
       <div className="  flex items-start justify-center   ">
       {/* Root Section */}
       <div className="flex flex-col items-start relative">
         {articles.map((article, index) => (
           <div
             key={index}
             className="flex items-center  relative"
             onMouseEnter={() => setHoverIndex(index)} // Highlight on hover
             onMouseLeave={() => setHoverIndex(null)} // Reset highlight
           >
             {/* Line (except for the first dot) */}
             {index !== 0 && (
               <div
                 className={`absolute -top-1/2 left-[3.5px]   w-[1px] h-full transition ${
                   hoverIndex === index || hoverIndex === index - 1
                     ? "bg-gray-300"
                     : "bg-gray-300"
                 }`}
               ></div>
             )}
 
             {/* Dot */}
             <div
               className={`w-2 h-2 rounded-full transition  ${
                 hoverIndex === index ? "bg-yellow-500 z-20" : "bg-gray-300 z-20"
               }`}
             ></div>
 
             {/* News Section */}
             <div
               className={`  w-full max-w-3xl px-2 py-2 ml-1 transition ${
                 hoverIndex === index ? "bg-gray-100" : ""
               }`}
             >
             
               <p className="text-xs text-gray-500 mt-1">{article.date}</p>
               <h3
                 className={`text-xs font-semibold transition duration-300 cursor-pointer ${
                   hoverIndex === index ? "text-yellow-500" : "text-gray-800"
                 }`}
               >
                 {article.title}
               </h3>
             </div>
           </div>
         ))}
       </div>
     </div>
     </div>
   );
}
