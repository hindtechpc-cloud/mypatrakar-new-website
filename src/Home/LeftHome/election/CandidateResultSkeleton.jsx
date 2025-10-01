import React from "react";

export default function CandidateResultSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white rounded-xl shadow-md animate-pulse">
      {/* Top Party Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 rounded-lg border bg-gray-50 flex flex-col items-center justify-center shadow-sm"
          >
            <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 w-20 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>

      {/* Title Bar */}
      <div className="bg-gray-200 h-10 rounded-lg mb-4"></div>

      {/* Candidate Table Header */}
      <div className="grid grid-cols-5 gap-2 text-sm font-bold text-gray-500 border-b pb-2 mb-3">
        <div className="h-4 bg-gray-200 rounded w-10"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-28"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>

      {/* Candidate Rows */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-2 items-center border-b pb-2"
          >
            {/* क्रम */}
            <div className="h-4 w-6 bg-gray-200 rounded"></div>

            {/* Candidate Info */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>

            {/* Constituency */}
            <div className="h-4 w-24 bg-gray-200 rounded"></div>

            {/* Party */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Result */}
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 h-3 w-1/2 bg-gray-200 rounded mx-auto"></div>
    </div>
  );
}
