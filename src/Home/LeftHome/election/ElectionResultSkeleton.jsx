import React from "react";

export default function ElectionResultSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-md animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="h-6 w-56 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Content: Chart + List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Skeleton */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-48 h-48 rounded-full bg-gray-200"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-10 bg-gray-300 rounded-md"></div>
            </div>
          </div>
          <div className="mt-3 h-4 w-28 bg-gray-200 rounded"></div>
        </div>

        {/* Party List Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-20 bg-gray-100 rounded"></div>
                </div>
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 h-3 w-2/3 bg-gray-200 rounded mx-auto"></div>
    </div>
  );
}
