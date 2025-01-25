import React, { useRef, useState } from "react";

const LiveVideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
      {/* Live Video */}
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full"
          src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" // Replace with your live stream URL
          autoPlay
          muted={isMuted}
          controls={false}
          playsInline
        ></video>
        
        {/* Overlay Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 p-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="text-white text-xl mr-4 focus:outline-none"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="text-white text-xl mr-4 focus:outline-none"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

          {/* Live Indicator */}
          <span className="text-red-600 font-bold text-sm uppercase">Live</span>
        </div>
      </div>

      {/* Video Title */}
      <div className="p-3 bg-red-800 text-center text-white font-semibold">
        <h3>सुर्खियों में उत्तर प्रदेश (Live)</h3>
      </div>
    </div>
  );
};

export default LiveVideoPlayer;
