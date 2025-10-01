import React from "react";
import { ImSpinner8 } from "react-icons/im";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-gray-50 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg">
      <div className="relative">
        <ImSpinner8 className="animate-spin text-indigo-600 text-4xl mb-4" />
        <div className="absolute inset-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-700 font-medium mt-2">Fetching live scores...</p>
      <p className="text-gray-500 text-sm mt-1">Getting the latest match updates</p>
    </div>
  );
}
