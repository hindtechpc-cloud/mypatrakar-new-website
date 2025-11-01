

// import React, { useContext, useEffect, useState } from "react";
// import { GetLiveYouTube } from "../../../api";
// import {
//   BsYoutube,
//   BsBroadcast,
//   BsCalendar,
// } from "react-icons/bs";
// import { FiArrowRight } from "react-icons/fi";
// import { extractChannelIdOrUsername } from "../../utils/youtubeHelper";
// import { getChannelInfo, getVideosFromPlaylist } from "../../../api/youtubeApi";
// import { useWebThemeContext } from "../../context/WebThemeContext";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
// import { SocialMediaContext } from "../../context/SocialMediaContext";

// function LiveTv() {
//   const [liveUrl, setLiveUrl] = useState("");
//   const [isLive, setIsLive] = useState();
//   const [loading, setLoading] = useState(true);
//   const [videos, setVideos] = useState([]);
//   const { webTheme } = useWebThemeContext();
//   const { socialLinks = [], isLoading, error } = useContext(SocialMediaContext);
//   const fallbackChannel = "NDTV"; // default channel
// console.log(socialLinks)
//   const loadLiveMode = async () => {
//     try {
//       const res = await GetLiveYouTube();
//       const liveStatus = res?.data?.response?.is_live;
//       setIsLive(liveStatus);

//       if (liveStatus === 1) {
//         // ✅ Live stream show
//         const liveId = res?.data?.response?.live_url;
//         setLiveUrl(`https://www.youtube.com/embed/${liveId}`);
//       } else {
//         // ✅ Not live → check sessionStorage
//         const cachedData = sessionStorage.getItem("yt_videos");
//         const cachedTime = sessionStorage.getItem("yt_videos_time");
//         const now = Date.now();

//         if (cachedData && cachedTime && now - cachedTime < 24 * 60 * 60 * 1000) {
//           // ✅ Use cached videos (24 hours validity)
//           setVideos(JSON.parse(cachedData));
//         } else {
//           // ✅ Fetch new videos
//           const youtubeUrl =
//             res?.data?.response?.channel_url ||
//             `https://www.youtube.com/@${fallbackChannel}`;
//           const channelIdOrUsername = extractChannelIdOrUsername(youtubeUrl);

//           if (channelIdOrUsername) {
//             const playlistId = await getChannelInfo(
//               channelIdOrUsername.type,
//               channelIdOrUsername.value
//             );
//             const videoList = await getVideosFromPlaylist(playlistId);

//             // ✅ Store only 10 videos in session
//             const latestVideos = (videoList || []).slice(0, 10);
//             setVideos(latestVideos);
//             sessionStorage.setItem("yt_videos", JSON.stringify(latestVideos));
//             sessionStorage.setItem("yt_videos_time", now);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error loading live stream:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadLiveMode();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="font-sans xl:w-[335px] lg:w-[295px] w-full mx-auto">
//       <div className="bg-white shadow-xl rounded border-0 h-90">
//         {/* Header */}
//         <div
//           className="text-white py-2 px-5 relative"
//           style={{
//             background:
//               webTheme["bg-color"] === "#fff" ? "#000" : webTheme["bg-color"],
//           }}
//         >
//           <div className="flex items-center justify-between relative z-10">
//             <div className="flex items-center">
//               <div className="bg-white p-2 rounded-full mr-3">
//                 <BsYoutube className="text-2xl text-red-600" />
//               </div>
//               {isLive === 1 ? (
//                 <p className="text-[16px] font-semibold">Live Stream</p>
//               ) : (
//                 <p className="text-[16px] font-semibold">Recent Videos</p>
//               )}
//             </div>
//             {isLive === 1 && (
//               <div className="flex items-center bg-red-800 px-3 py-1 rounded-full">
//                 <div className="h-2 w-2 bg-red-300 rounded-full animate-pulse mr-2"></div>
//                 <span className="text-xs font-semibold">LIVE</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-2">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-10">
//               <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
//               <p className="text-gray-500 font-medium">
//                 Checking live status...
//               </p>
//             </div>
//           ) : isLive === 1 ? (
//             // ✅ Live iframe
//             <div className="rounded overflow-hidden shadow-lg relative">
//               <iframe
//                 width="100%"
//                 height="100%"
//                 src={liveUrl}
//                 title="YouTube Live Stream"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="rounded h-72"
//               />
//               <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
//                 <BsBroadcast className="mr-1" />
//                 <span>Live</span>
//               </div>
//             </div>
//           ) : (
//             // ✅ Recent Videos with scroll buttons
//             <div className="w-[320px]">
//               <div className="relative">
//                 {videos.length > 0 && (
//                   <button
//                     onClick={() =>
//                       document
//                         .getElementById("videoSlider")
//                         ?.scrollBy({ left: -330, behavior: "smooth" })
//                     }
//                     className="absolute -left-6 top-1/2 -translate-y-1/2 z-50 bg-white shadow-md rounded-full w-8 h-8 hover:bg-gray-100 flex items-center justify-center"
//                   >
//                     <FaChevronLeft />
//                   </button>
//                 )}

//                 <div
//                   id="videoSlider"
//                   className="flex gap-2 overflow-x-scroll scrollbar-hide pb-2 scroll-smooth"
//                 >
//                   {videos.map((video) => (
//                     <div
//                       key={video.id}
//                       className="min-w-[315px] max-w-[320px] bg-gray-50 rounded-lg shadow hover:shadow-md transition cursor-pointer"
//                     >
//                       <a
//                         href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         <div className="relative">
//                           <img
//                             src={video.snippet.thumbnails.medium.url}
//                             alt={video.snippet.title}
//                             className="rounded-lg w-full h-56 object-cover"
//                           />
//                         </div>
//                         <div className="p-2">
//                           <p className="text-sm font-medium line-clamp-2 h-10">
//                             {video.snippet.title}
//                           </p>
//                           <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
//                             <span className="flex items-center">
//                               <BsCalendar className="mr-1" />
//                               {formatDate(video.snippet.publishedAt)}
//                             </span>
//                             <span className="flex items-center text-red-600 hover:text-red-800 font-medium">
//                               Watch <FiArrowRight className="ml-1" />
//                             </span>
//                           </div>
//                         </div>
//                       </a>
//                     </div>
//                   ))}
//                 </div>

//                 {videos.length > 0 && (
//                   <button
//                     onClick={() =>
//                       document
//                         .getElementById("videoSlider")
//                         ?.scrollBy({ left: 330, behavior: "smooth" })
//                     }
//                     className="absolute -right-6 top-1/2 -translate-y-1/2 z-50 bg-white shadow-md rounded-full w-8 h-8 hover:bg-gray-100 flex items-center justify-center"
//                   >
//                     <FaChevronRight />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default React.memo(LiveTv);



import React, { useContext, useEffect, useState } from "react";
import { GetLiveYouTube } from "../../../api";
import {
  BsYoutube,
  BsBroadcast,
  BsCalendar,
} from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { extractChannelIdOrUsername } from "../../utils/youtubeHelper";
import { getChannelInfo, getVideosFromPlaylist } from "../../../api/youtubeApi";
import { useWebThemeContext } from "../../context/WebThemeContext";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { SocialMediaContext } from "../../context/SocialMediaContext";

function LiveTv() {
  const [liveUrl, setLiveUrl] = useState("");
  const [isLive, setIsLive] = useState();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const { webTheme } = useWebThemeContext();
  const { socialLinks = [], isLoading, error } = useContext(SocialMediaContext);

  // ✅ Get YouTube URL from backend social links
  const youtubeLink = socialLinks.find(
    (item) => item.name?.toLowerCase() === "youtube"
  )?.url;

  // ✅ Fallback YouTube channel if not available
  const fallbackChannel = youtubeLink || "https://www.youtube.com/@NDTV";

  const loadLiveMode = async () => {
    try {
      const res = await GetLiveYouTube();
      const liveStatus = res?.data?.response?.is_live;
      setIsLive(liveStatus);

      if (liveStatus === 1) {
        // ✅ Show live stream
        const liveId = res?.data?.response?.live_url;
        setLiveUrl(`https://www.youtube.com/embed/${liveId}`);
      } else {
        // ✅ Not live → check sessionStorage
        const cachedData = sessionStorage.getItem("yt_videos");
        const cachedTime = sessionStorage.getItem("yt_videos_time");
        const now = Date.now();

        if (cachedData && cachedTime && now - cachedTime < 24 * 60 * 60 * 1000) {
          setVideos(JSON.parse(cachedData));
        } else {
          // ✅ Use YouTube link from backend or fallback
          const youtubeUrl =
            res?.data?.response?.channel_url || fallbackChannel;

          const channelIdOrUsername = extractChannelIdOrUsername(youtubeUrl);

          if (channelIdOrUsername) {
            const playlistId = await getChannelInfo(
              channelIdOrUsername.type,
              channelIdOrUsername.value
            );
            const videoList = await getVideosFromPlaylist(playlistId);

            // ✅ Store top 10 videos
            const latestVideos = (videoList || []).slice(0, 10);
            setVideos(latestVideos);
            sessionStorage.setItem("yt_videos", JSON.stringify(latestVideos));
            sessionStorage.setItem("yt_videos_time", now);
          }
        }
      }
    } catch (error) {
      console.error("Error loading live stream:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLiveMode();
  }, [socialLinks]); // re-run when social links are updated

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="font-sans xl:w-[335px] lg:w-[295px] w-full mx-auto">
      <div className="bg-white shadow-xl rounded border-0 h-90">
        {/* Header */}
        <div
          className="text-white py-2 px-5 relative"
          style={{
            background:
              webTheme["bg-color"] === "#fff" ? "#000" : webTheme["bg-color"],
          }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3">
                <BsYoutube className="text-2xl text-red-600" />
              </div>
              {isLive === 1 ? (
                <p className="text-[16px] font-semibold">Live Stream</p>
              ) : (
                <p className="text-[16px] font-semibold">Recent Videos</p>
              )}
            </div>
            {isLive === 1 && (
              <div className="flex items-center bg-red-800 px-3 py-1 rounded-full">
                <div className="h-2 w-2 bg-red-300 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs font-semibold">LIVE</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">
                Checking live status...
              </p>
            </div>
          ) : isLive === 1 ? (
            // ✅ Live iframe
            <div className="rounded overflow-hidden shadow-lg relative">
              <iframe
                width="100%"
                height="100%"
                src={liveUrl}
                title="YouTube Live Stream"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded h-72"
              />
              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <BsBroadcast className="mr-1" />
                <span>Live</span>
              </div>
            </div>
          ) : (
            // ✅ Recent Videos with scroll buttons
            <div className="w-[320px]">
              <div className="relative">
                {videos.length > 0 && (
                  <button
                    onClick={() =>
                      document
                        .getElementById("videoSlider")
                        ?.scrollBy({ left: -330, behavior: "smooth" })
                    }
                    className="absolute -left-6 top-1/2 -translate-y-1/2 z-50 bg-white shadow-md rounded-full w-8 h-8 hover:bg-gray-100 flex items-center justify-center"
                  >
                    <FaChevronLeft />
                  </button>
                )}

                <div
                  id="videoSlider"
                  className="flex gap-2 overflow-x-scroll scrollbar-hide pb-2 scroll-smooth"
                >
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="min-w-[315px] max-w-[320px] bg-gray-50 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                    >
                      <a
                        href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="relative">
                          <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="rounded-lg w-full h-56 object-cover"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-sm font-medium line-clamp-2 h-10">
                            {video.snippet.title}
                          </p>
                          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <BsCalendar className="mr-1" />
                              {formatDate(video.snippet.publishedAt)}
                            </span>
                            <span className="flex items-center text-red-600 hover:text-red-800 font-medium">
                              Watch <FiArrowRight className="ml-1" />
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>

                {videos.length > 0 && (
                  <button
                    onClick={() =>
                      document
                        .getElementById("videoSlider")
                        ?.scrollBy({ left: 330, behavior: "smooth" })
                    }
                    className="absolute -right-6 top-1/2 -translate-y-1/2 z-50 bg-white shadow-md rounded-full w-8 h-8 hover:bg-gray-100 flex items-center justify-center"
                  >
                    <FaChevronRight />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(LiveTv);
