import React from "react";
import { GoDotFill } from "react-icons/go";
import Header from "./shared/Header";
// import { GetLiveYouTube } from "../../../api";
const GetLiveYouTube = () =>
  Promise.resolve({
    status_code: 200,
    message: "Fetched Successfully",
    response: {
      is_live: "0", // Change to "1" to test live stream
      share_url: "https://youtu.be/xyz",
      live_url: "https://www.youtube.com/embed/live_stream?channel=UCXYZ", // or demo YouTube embed
    },
  });

const LiveTv = () => {
  const defaultVideoUrl =
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1";

  const [liveUrl, setLiveUrl] = React.useState("");
  const [isLive, setIsLive] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const loadVideo = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await GetLiveYouTube();
      if (res.status_code === 200) {
        const data = res.response;
        if (data.is_live === "1" && data.live_url) {
          setIsLive(true);
          setLiveUrl(data.live_url);
        } else {
          setIsLive(false);
          setLiveUrl(defaultVideoUrl);
        }
      } else {
        setError("Failed to fetch live video.");
        setLiveUrl(defaultVideoUrl);
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
      setLiveUrl(defaultVideoUrl);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadVideo();
  }, []);

  return (
    <div className="min-h-1/2 bg-gradient-to-br py-8 px-4 flex justify-center items-center">
      <div className="w-full max-w-xl">
        <Header text="📺 Live TV Stream" />
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
          {loading ? (
            <div className="animate-pulse text-center text-white text-lg">
              Loading live stream...
            </div>
          ) : error ? (
            <div className="text-center text-red-400 font-semibold">
              {error}
            </div>
          ) : (
            <>
              {isLive && (
                <div className="flex items-center justify-center gap-2 text-white text-2xl font-semibold mb-4 animate-pulse">
                  <GoDotFill className="text-4xl text-red-500" />
                  <span>Live Now</span>
                </div>
              )}

              <div className="relative overflow-hidden rounded-xl shadow-lg border-4 border-white/30 hover:scale-[1.01] transition-transform">
                <iframe
                  className="w-full h-64 md:h-80 rounded-xl"
                  src={liveUrl}
                  title="Live Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-xl border-2 border-white opacity-10 animate-pulse"></div>
              </div>

              {!isLive && (
                <p className="mt-4 text-center text-white text-sm font-medium">
                  ⚠️ Currently not live. Showing default video.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveTv;
