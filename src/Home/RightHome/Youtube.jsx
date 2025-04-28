import { useState, useEffect } from "react";
import Header from "./shared/Header";
import { BsFillCameraReelsFill } from "react-icons/bs";

const CHANNEL_ID = "UCpcuPyan9wYPk5At-Q4c1ig"; // Replace with actual YouTube Channel ID
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const YouTube = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            RSS_FEED_URL
          )}`
        );
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="my-2 mt-5 font-sans md:max-w-sm  w-[300px] mx-auto py-4">
      <Header
        text={
          <div className="flex items-center justify-start gap-2">
            <BsFillCameraReelsFill /> Latest Videos
          </div>
        }
      />
      {/* <h2 className="text-3xl font-bold text-center text-gray-800 mb-6"></h2> */}
      <div className="flex flex-wrap items-center justify-center gap-5 w-full overflow-y-auto h-[500px] hide-scroll">
        {videos.map((video) => (
          <div
            key={video.guid}
            className="bg-white shadow-xl flex  w-[350px] rounded-lg overflow-hidden transform transition-all hover:scale-105"
          >
            <iframe
              className="w-full h-60"
              src={`https://www.youtube.com/embed/${video.link.split("=")[1]}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                        </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTube;
