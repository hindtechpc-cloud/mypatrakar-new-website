import React, { useCallback, useEffect, useState } from "react";
import { CheckShortsClapped, SubmitShortsClap } from "../../../../api";
import toast from "react-hot-toast";
// import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import SourceWidget from "../../../footer/SourceWidget";
import { PiHandsClappingDuotone } from "react-icons/pi";

export default function ShortsClap({ news_id, user_id }) {
  const [isClapped, setIsClapped] = useState(false);
  const [clapCount, setClapCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showSourcePopup, setShowSourcePopup] = useState(false);

  // ✅ Fetch current status + count
  const fetchClapStatus = useCallback(async () => {
    if (!news_id) return;

    try {
      const res = await CheckShortsClapped(news_id, user_id);
      const { is_clapped, clap_count } = res?.data?.response || {};
      setIsClapped(!!is_clapped);
      setClapCount(clap_count || 0);
    } catch (error) {
      console.error("Error fetching clap status:", error);
    } finally {
      setIsChecking(false);
    }
  }, [news_id, user_id]);

  // ✅ Handle clap toggle
  const handleClap = async () => {
    if (!news_id || !user_id) {
      setShowSourcePopup(true);
      return;
    }

    // 🔥 Optimistic update (instant UI update)
    const optimisticNewClap = !isClapped;
    setIsClapped(optimisticNewClap);
    setClapCount((prev) =>
      optimisticNewClap ? prev + 1 : Math.max(prev - 1, 0)
    );

    try {
      setLoading(true);
      const res = await SubmitShortsClap(news_id, user_id);
      if (res.data.status_code == 200) {
        try {
          const response = await CheckShortsClapped(news_id, user_id);
          console.log(response);
          setIsClapped(response.data.response.is_clapped);
          toast.success(
            response.data.response.is_clapped
              ? "👏 You clapped this!"
              : "👏 Clap removed"
          );
          // setClapCount(clap_count || 0);
        } catch (error) {
          console.log(error);
        }
      }

      // ✅ Sync with server
    } catch (error) {
      console.error("Error submitting clap:", error);

      // ❌ Rollback
      setIsClapped(!optimisticNewClap);
      setClapCount((prev) =>
        optimisticNewClap ? Math.max(prev - 1, 0) : prev + 1
      );

      toast.error("Something went wrong while clapping.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run only on mount or id change
  useEffect(() => {
    fetchClapStatus();
  }, [fetchClapStatus]);

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
          <PiHandsClappingDuotone className="text-red-500 text-lg transition-colors" />
        ) : (
          <PiHandsClappingDuotone className="text-gray-700 text-lg transition-colors" />
        )}
      </button>

      {showSourcePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-blue-500 rounded-xl shadow-lg p-6 max-w-md w-full relative animate-fade-in">
            <button
              onClick={() => setShowSourcePopup(false)}
              className="absolute top-2 right-3 text-gray-50 hover:text-black text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-3 text-center text-gray-100">
              Please login to Clap this post
            </h2>
            <SourceWidget
              redirectTo={"/shorts"}
              showLoginOverlay={showSourcePopup}
              setShowLoginOverlay={setShowSourcePopup}
            />
          </div>
        </div>
      )}
    </>
  );
}
