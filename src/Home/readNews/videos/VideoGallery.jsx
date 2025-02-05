import Menu from "../../LeftHome/shared/MenuBar";
import { useEffect, useState } from "react";

const CHANNEL_ID = "UCpcuPyan9wYPk5At-Q4c1ig"; // Replace with your YouTube Channel ID
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(6);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`
        );
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const loadMoreVideos = () => {
    setVisibleVideos((prev) => prev + 6);
  };

  const handleSubscribe = () => {
    window.open(`https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`, "_blank");
  };

  return (
    <div className="my-6 font-sans bg-gradient-to-b from-gray-100 to-gray-300 p-6 rounded-lg shadow-lg">
      {/* Menu Section */}
      <Menu menuText={"🎥 Latest Videos"} setSubcategory={"setCurrentState"} menu={[]} />

      {/* Video Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
        {videos.slice(0, visibleVideos).map((video) => (
          <div key={video.guid} className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
            <iframe
              className="w-full h-56 rounded-t-lg"
              src={`https://www.youtube.com/embed/${video.link.split("=")[1]}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        {visibleVideos < videos.length && (
          <button 
            className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:bg-gray-900 hover:shadow-lg"
            onClick={loadMoreVideos}
          >
            Load More...
          </button>
        )}
        <button 
          className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 hover:bg-red-800 hover:shadow-lg"
          onClick={handleSubscribe}
        >
          <span>🔔</span> Subscribe
        </button>
      </div>
    </div>
  );
};

export default VideoGallery;
