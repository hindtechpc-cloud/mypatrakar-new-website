import { useState } from "react";
import Menu from "../../LeftHome/shared/MenuBar";

const VideoGallery = () => {
  const videos = [
    "https://www.youtube.com/embed/VIDEO_ID_1",
    "https://www.youtube.com/embed/VIDEO_ID_2",
    "https://www.youtube.com/embed/VIDEO_ID_3",
    "https://www.youtube.com/embed/VIDEO_ID_4",
    "https://www.youtube.com/embed/VIDEO_ID_5",
    "https://www.youtube.com/embed/VIDEO_ID_6",
  ];

  const [visibleVideos, setVisibleVideos] = useState(3);

  const loadMoreVideos = () => {
    setVisibleVideos((prev) => prev + 3);
  };

  const handleSubscribe = () => {
    window.open("https://www.youtube.com/@YourChannel", "_blank");
  };

  return (
    <div>
      <Menu menuText={"Videos"} menu={[]}></Menu>
      <div className="container mx-auto p-4 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.slice(0, visibleVideos).map((video, index) => (
            <div key={index} className="relative">
              <iframe
                className="w-full h-48 sm:h-64"
                src={video}
                title={`YouTube Video ${index + 1}`}
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          {visibleVideos < videos.length && (
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800"
              onClick={loadMoreVideos}
            >
              Load More...
            </button>
          )}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2 hover:bg-blue-700"
            onClick={handleSubscribe}
          >
            <span>🔔</span> Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
