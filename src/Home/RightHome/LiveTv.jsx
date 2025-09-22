import React, { useContext, useEffect, useState } from "react";
import { GetLiveYouTube } from "../../../api";
import Header from "./shared/Header";
import { BsYoutube, BsArrowRepeat, BsBroadcast } from "react-icons/bs";
import { RiLiveLine } from "react-icons/ri";
import { WebThemeContext } from "../../context/ThemeContext";

function LiveTv() {
  const [liveUrl, setLiveUrl] = useState("");
  const [isLive, setIsLive] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { webTheme } = useContext(WebThemeContext);
  const loadLiveMode = async () => {
    try {
      setRefreshing(true);
      const res = await GetLiveYouTube();
      console.log(res);
      setIsLive(res?.data?.response?.is_live);
      setLiveUrl(
        `https://www.youtube.com/embed/${res?.data?.response?.live_url}`
      );
    } catch (error) {
      console.error("Error loading live stream:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLiveMode();
  }, []);

  return (
    <div className="mt-[px] font-sans xl:w-[335px] lg:w-[295px] w-full mx-auto">
      {/* <Header text="Live " /> */}
      <div className="bg-white shadow-xl rounded overflow-hidden border-0 h-90">
        {/* Header with gradient and animation */}
        <div
          className=" text-white py-2 px-5 relative overflow-hidden "
          style={{
            background:
              webTheme["bg-color"] == "#fff" ? "#000" : webTheme["bg-color"],
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-40 h-40 bg-red-500 rounded-full opacity-10 -mt-20 -ml-20"></div>
            <div className="w-40 h-40 bg-red-500 rounded-full opacity-10 -mb-20 -mr-20"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center justify-center ">
              <div className="bg-white p-2 rounded-full mr-3">
                <BsYoutube className="text-2xl text-red-600" />
              </div>
              <p className="text-[16px] font-semibold">Live Stream</p>
            </div>
            {isLive == 0 && (
              <div className="flex items-center bg-red-800 px-3 py-1 rounded-full">
                <div className="h-2 w-2 bg-red-300 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs font-semibold">LIVE</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">
                Checking live status...
              </p>
            </div>
          ) : isLive == 0 ? (
            <>
              <div className="-video rounded overflow-hidden shadow-lg relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={liveUrl}
                  title="YouTube Live Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded  h-72"
                />
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <BsBroadcast className="mr-1" />
                  <span>Live</span>
                </div>
              </div>

              {/* <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-5">
                <div className="flex items-center text-red-700">
                  <RiLiveLine className="text-lg mr-2" />
                  <span className="text-sm font-medium">We're live now! Join the conversation.</span>
                </div>
              </div> */}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BsYoutube className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Not Currently Live
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                {`We're`} not broadcasting at the moment.
              </p>
              <p className="text-gray-400 text-xs">
                Check back later for our next live stream.
              </p>
            </div>
          )}
          {/* 
          <div className="text-center mt-2">
            <button
              onClick={loadLiveMode}
              disabled={refreshing}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center mx-auto ${
                refreshing 
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow hover:shadow-md"
              }`}
            >
              {refreshing ? (
                <>
                  <BsArrowRepeat className="animate-spin mr-2" />
                  Refreshing...
                </>
              ) : (
                <>
                  <BsArrowRepeat className="mr-2" />
                  Refresh Status
                </>
              )}
            </button>
            
            {!loading && isLive != 0 && (
              <p className="text-xs text-gray-400 mt-4">
                Last checked: {new Date().toLocaleTimeString()}
              </p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(LiveTv);
