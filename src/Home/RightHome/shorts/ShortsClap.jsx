import React, { useEffect, useState } from "react";
import { CheckShortsClapped, SubmitShortsClap } from "../../../../api";
import toast from "react-hot-toast";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import SourceWidget from "../../../footer/SourceWidget";

export default function ShortsClap({ news_id, user_id }) {
  const [isClapped, setIsClapped] = useState(false);
  const [clapCount, setClapCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showSourcePopup, setShowSourcePopup] = useState(false);

  const currentPage = window.location.href;

  const fetchClapStatus = async () => {
    if (!news_id) return;

    try {
      const res = await CheckShortsClapped(news_id, user_id);
      const { is_clapped } = res?.data?.response || {};
      setIsClapped(is_clapped || false);
    } catch (error) {
      console.error("Error fetching clap status:", error);
    } finally {
      setIsChecking(false);
    }
  };

  // const handleClap = async () => {
  //   if (!news_id || !user_id) {
  //     setShowSourcePopup(true);
  //     return;
  //   }

  //   const optimisticNewClap = !isClapped;

  //   // 1. Immediate UI update
  //   setIsClapped(optimisticNewClap);

  //   // 2. Fire to backend
  //   try {
  //     setLoading(true);
  //     const res = await SubmitShortsClap(news_id, user_id);
  //     console.log(res);
  //     const is_clapped = res?.data?.response || {};

  //     // 3. Set backend-confirmed state (in case optimistic and backend differ)
  //     setIsClapped(is_clapped);

  //     toast.success(is_clapped ? "👏 You clapped this!" : "❌ Clap removed");
  //   } catch (error) {
  //     // 4. Revert UI if backend failed
  //     console.error("Error submitting clap:", error);
  //     setIsClapped(!optimisticNewClap);
  //     toast.error("Something went wrong while clapping.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleClap = async () => {
  if (!news_id || !user_id) {
    setShowSourcePopup(true);
    return;
  }

  const optimisticNewClap = !isClapped;
  setIsClapped(optimisticNewClap); // UI immediately reflects

  try {
    setLoading(true);
    const res = await SubmitShortsClap(news_id, user_id);
    const is_clapped = res?.data?.response;

    // ✅ Convert to Boolean (0 or 1 => false or true)
    setIsClapped(Boolean(is_clapped));

    toast.success(
      is_clapped ? "👏 You clapped this!" : "👏 You unclapped this!"
    );
  } catch (error) {
    console.error("Error submitting clap:", error);
    setIsClapped(!optimisticNewClap); // rollback
    toast.error("Something went wrong while clapping.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchClapStatus();
  }, [news_id, user_id]);

  return (
    <>
      <button
        onClick={handleClap}
        disabled={loading || isChecking}
        className={`flex items-center gap-2 p-2 rounded-full transition duration-200 text-sm
          ${
            isClapped
              ? "bg-red-100 hover:bg-red-200"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        title={isClapped ? "Remove your Clap" : "Clap this post"}
        aria-label="Clap button"
      >
        {loading || isChecking ? (
          <ImSpinner2 className="animate-spin text-gray-500 text-lg" />
        ) : isClapped ? (
          <FaHeart className="text-red-500 animate-pulse text-lg" />
        ) : (
          <FaRegHeart className="text-gray-700 text-lg" />
        )}
      </button>

      {showSourcePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative animate-fade-in">
            <button
              onClick={() => setShowSourcePopup(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-3 text-center text-red-600">
              Please login to Clap this post
            </h2>
            <SourceWidget redirectTo={"/shorts"} showLoginOverlay={showSourcePopup} setShowLoginOverlay={setShowSourcePopup}/>
          </div>
        </div>
      )}
    </>
  );
}
