// import React, { useState, useEffect, useContext } from "react";
// import { extractChannelIdOrUsername } from "../../../utils/youtubeHelper";
// import {
//   getChannelInfo,
//   getVideosFromPlaylist,
// } from "../../../../api/youtubeApi";
// import { BsYoutube, BsPlayCircle, BsCalendar } from "react-icons/bs";
// import { FiAlertCircle, FiArrowRight } from "react-icons/fi";
// import { SocialMediaContext } from "../../../context/SocialMediaContext";

// // Skeleton loader for video cards
// const VideoSkeletonCard = () => (
//   <div className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse border border-gray-100">
//     <div className="bg-gray-200 h-48 w-full" />
//     <div className="p-4 space-y-3">
//       <div className="h-4 bg-gray-200 rounded w-4/5" />
//       <div className="h-3 bg-gray-100 rounded w-3/5" />
//       <div className="flex justify-between items-center pt-2">
//         <div className="h-3 bg-gray-100 rounded w-1/4" />
//         <div className="h-8 bg-gray-100 rounded w-1/4" />
//       </div>
//     </div>
//   </div>
// );

// export default function JournalistYouTubeFeed() {
//   const [videos, setVideos] = useState([]);
//   const [visibleVideos, setVisibleVideos] = useState(6);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { socialLinks } = useContext(SocialMediaContext);

//   // Automatically get YouTube URL from context
//   const youtubeUrl = socialLinks?.find(
//     (link) =>
//       link.icon?.toLowerCase() === "fayoutube" ||
//       link.name?.toLowerCase().includes("youtube")
//   )?.url;
//   console.log(socialLinks);
//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         let channelIdOrUsername = extractChannelIdOrUsername(youtubeUrl);
//         console.log(channelIdOrUsername);

//         if (!channelIdOrUsername) {
//           throw new Error("Invalid YouTube channel URL from context");
//         }

//         const playlistId = await getChannelInfo(
//           channelIdOrUsername.type,
//           channelIdOrUsername.value
//         );

//         const videoList = await getVideosFromPlaylist(playlistId);
//         setVideos(videoList);
//       } catch (err) {
//         console.log(err);
//         setError(err.message || "Failed to load videos");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (youtubeUrl) {
//       fetchVideos();
//     } else {
//       setError("No YouTube channel found in your profile.");
//       setLoading(false);
//     }
//   }, [youtubeUrl]);

//   const handleLoadMore = () => {
//     setVisibleVideos((prev) => prev + 6);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const visibleList = videos.slice(0, visibleVideos);

//   return (
//     <div className="py-6 max-w-6xl mx-auto">
//       {/* Header */}
//       {/* <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-100">
//         <div className="p-3 bg-red-100 rounded-full">
//           <BsYoutube className="text-3xl text-red-600" />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">YouTube </h2>
//           <p className="text-gray-600">Latest YouTube videos </p>
//         </div>
//       </div> */}

//       {/* Loading State */}
//       {loading && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <VideoSkeletonCard key={i} />
//           ))}
//         </div>
//       )}

//       {/* Error State */}
//       {!loading && error && (
//         <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-xl flex flex-col items-center justify-center text-center">
//           <div className="p-3 bg-white rounded-full mb-4">
//             <FiAlertCircle className="text-3xl text-red-500" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Unable to load videos
//           </h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <p className="text-sm text-gray-500">
//             Make sure your YouTube URL is correctly added to your profile.
//           </p>
//         </div>
//       )}

//       {/* Success State */}
//       {!loading && !error && visibleList?.length > 0 && (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {visibleList.map((video) => (
//               <div key={video.id} className="group">
//                 <a
//                   href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className=""
//                 >
//                   <div className="relative overflow-hidden">
//                     <img
//                       src={video.snippet.thumbnails.medium.url}
//                       alt={video.snippet.title}
//                       className="w-full h-40 object-cover rounded group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300">
//                       {/* YouTube Icon Container */}
//                       <div className=" h-[20px] rounded-full absolute top-16 right-28 bg-white/90  hover:bg-white transition-all duration-300">
//                         <BsYoutube className="text-gray-600   transition-colors duration-300" size={35}/>
//                       </div>
//                     </div>
//                   </div>
//                 </a>
                
//               </div>
//             ))}
//           </div>

//           {visibleVideos < videos.length && (
//             <div className="flex justify-center mt-10">
//               <button
//                 onClick={handleLoadMore}
//                 className="bg-white text-red-600 px-6 py-3 rounded-lg border border-red-200 hover:bg-red-50 font-medium flex items-center shadow-sm hover:shadow-md transition-all"
//               >
//                 Load More Videos
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {/* Empty State */}
//       {!loading && !error && videos.length === 0 && (
//         <div className="mt-8 p-8 bg-gray-50 border border-gray-200 rounded-xl text-center">
//           <div className="p-3 bg-white rounded-full inline-flex mb-4">
//             <BsYoutube className="text-3xl text-gray-400" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             No videos found
//           </h3>
//           <p className="text-gray-600">
//             This YouTube channel doesn't have any public videos yet.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect, useContext } from "react";
import { extractChannelIdOrUsername } from "../../../utils/youtubeHelper";
import {
  getChannelInfo,
  getVideosFromPlaylist,
} from "../../../../api/youtubeApi";
import { BsYoutube } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { SocialMediaContext } from "../../../context/SocialMediaContext";

// Skeleton loader for video cards
const VideoSkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse border border-gray-100">
    <div className="bg-gray-200 h-48 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-4/5" />
      <div className="h-3 bg-gray-100 rounded w-3/5" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="h-8 bg-gray-100 rounded w-1/4" />
      </div>
    </div>
  </div>
);

export default function JournalistYouTubeFeed() {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { socialLinks } = useContext(SocialMediaContext);

  // Automatically get YouTube URL from context
  const youtubeUrl = socialLinks?.find(
    (link) =>
      link.icon?.toLowerCase() === "fayoutube" ||
      link.name?.toLowerCase().includes("youtube")
  )?.url;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        let channelIdOrUsername = extractChannelIdOrUsername(youtubeUrl);
        if (!channelIdOrUsername) {
          throw new Error("Invalid YouTube channel URL from context");
        }

        const playlistId = await getChannelInfo(
          channelIdOrUsername.type,
          channelIdOrUsername.value
        );

        const videoList = await getVideosFromPlaylist(playlistId);
        setVideos(videoList);
      } catch (err) {
        setError(err.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    if (youtubeUrl) {
      fetchVideos();
    } else {
      setError("No YouTube channel found in your profile.");
      setLoading(false);
    }
  }, [youtubeUrl]);

  const handleLoadMore = () => {
    setVisibleVideos((prev) => prev + 6);
  };

  const visibleList = videos.slice(0, visibleVideos);

  return (
    <div className="py-6 max-w-6xl mx-auto">
      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <VideoSkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="mt-8 p-6 bg-red-50 border border-red-100 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-white rounded-full mb-4">
            <FiAlertCircle className="text-3xl text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Unable to load videos
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Make sure your YouTube URL is correctly added to your profile.
          </p>
        </div>
      )}

      {/* Success State */}
      {!loading && !error && visibleList?.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleList.map((video) => (
              <div key={video.id} className="group">
                <a
                  href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full md:h-40 h-60 object-cover rounded group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                      <div className="absolute top-[35%] md:right-28 right-[30%]  bg-white/90 h-[25px] rounded-lg  flex items-center justify-center transition-all duration-300">
                        <BsYoutube className="text-gray-600 text-2xl hover:text-red-600 transition-colors duration-300" size={30} />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Buttons Row: Load More + Subscribe */}
          <div className="flex justify-center items-center gap-4 mt-10 flex-wrap">
            {visibleVideos < videos.length && (
              <button
                onClick={handleLoadMore}
                className="bg-white text-red-600 px-6 py-3 rounded-lg border border-red-200 hover:bg-red-50 font-medium flex items-center shadow-sm hover:shadow-md transition-all"
              >
                Load More Videos
              </button>
            )}

            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all font-semibold "
              >
                <BsYoutube className="text-xl" />
                Subscribe
              </a>
            )}
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && !error && videos.length === 0 && (
        <div className="mt-8 p-8 bg-gray-50 border border-gray-200 rounded-xl text-center">
          <div className="p-3 bg-white rounded-full inline-flex mb-4">
            <BsYoutube className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No videos found
          </h3>
          <p className="text-gray-600">
            This YouTube channel doesn't have any public videos yet.
          </p>
        </div>
      )}
    </div>
  );
}
