import Sharing from "./Sharing";
import UserProfile from "./UserProfile";
import speaker from "../../assets/speaker.svg";
import { useContext, useEffect, useState } from "react";
import { FaStopCircle } from "react-icons/fa";
import { NewsContext } from "../../context/NewsContext";
export default function News() {
  // const news = {
  //   source: {
  //     id: null,
  //     name: "The Times of India",
  //   },
  //   author: {
  //     name: "Rajat",
  //     image: "https://picsum.photos/200/300",
  //     links: [
  //       {
  //         url: "https://www.linkedin.com/in/rajat-singh-1b1b3b1b3/",
  //         name: "LinkedIn",
  //       },
  //       {
  //         url: "https://www.whatsapp.com/in/rajat-singh-1b1b3b1b3/",
  //         name: "whatsapp",
  //       },
  //       {
  //         url: "https://www.email.com/in/rajat-singh-1b1b3b1b3/",
  //         name: "email",
  //       },
  //       { url: "https://www.instagram.com/rajat_2502/", name: "Instagram" },
  //       { url: "https://twitter.com/RajatSi2502", name: "Twitter" },
  //       { url: "https://www.facebook.com/rajat.singh.2502", name: "Facebook" },
  //       {
  //         url: "https://www.youtube.com/channel/UC9QJQJ9Zjv3ZJjJLJ9Zzv9A",
  //         name: "Youtube",
  //       },
  //     ],
  //   },
  //   title:
  //     "MELBOURNE: India's star batsmen Rohit Sharma, Virat Kohli and Rishabh Pant will join the squad on Wednesday ahead of the first Test against Australia, starting on December 17.The trio was not a part of the limi… [+1602 chars]",
  //   urlToImage:
  //     "https://static.toiimg.com/thumb/msid-79510186,width-1070,height-580,imgsize-101117,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
  //   publishedAt: "2020-05-15T14:30:00",
  //   views: 100,
  //   comments: 1020,
  //   category: "Sports",
  //   content:
  //     "MELBOURNE: India's star batsmen Rohit Sharma, Virat Kohli and Rishabh Pant will join the squad on Wednesday ahead of the first Test against Australia, starting on December 17.The trio was not a part of the limi… [+1602 chars]",
  // };
  const { news } = useContext(NewsContext);
  const [zoomText, setZoomText] = useState(15);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pitch, setPitch] = useState(1); // Default pitch
  const [rate, setRate] = useState(1); // Default rate
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Fetch available voices
  useEffect(() => {
    const voices = speechSynthesis.getVoices();
    setVoices(voices);
    console.log(voices);

    // Select a default voice with Indian accent if available
    const indianVoice = voices.find((voice) =>
      voice.name.toLowerCase().includes("hindi")
    );
    if (indianVoice) {
      console.log(selectedVoice);
      setSelectedVoice(indianVoice);
    }
  }, []);
  const handleReadAloud = async () => {
    if (isSpeaking) {
      // If speech is playing, stop it
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Concatenate both paragraphs
      const utterance = new SpeechSynthesisUtterance(
        news.title + " " + news.content
      );

      // Set the selected voice and adjust pitch and rate
      utterance.voice = selectedVoice;
      utterance.pitch = pitch;
      utterance.rate = rate;

      // Start speaking
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };
  // const handleReadAloud = () => {
  //   if (isSpeaking) {
  //     // If speech is currently playing, stop it
  //     speechSynthesis.cancel();
  //     setIsSpeaking(false); // Update the state to reflect it's stopped
  //   } else {
  //     // If speech is not playing, start it
  //     const utterance = new SpeechSynthesisUtterance(
  //       news.title + " " + news.content
  //     );
  //     utterance.pitch = 1;
  //     utterance.rate = 1;

  //     // Event listener to track when speech starts or ends
  //     utterance.onstart = () => {
  //       setIsSpeaking(true); // Speech started
  //     };

  //     utterance.onend = () => {
  //       setIsSpeaking(false); // Speech ended
  //     };

  //     // Start speaking
  //     speechSynthesis.speak(utterance);
  //   }
  // };
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
            <img src={speaker} alt="w-full h-ful" />
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
