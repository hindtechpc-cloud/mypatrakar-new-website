import React from "react";

export default function TopNewsItems({ topNewsItems,className }) {
  return (
    <div className={className}>
      {topNewsItems?.map((item, index) => {
        return (
          <div key={index} className="flex items-start gap-2">
            <div className="w-80">
              <img
                src={item.image}
                alt="news"
                className="w-full h-20 rounded-xl object-cover"
              />
            </div>
            <p className="text-gray-800 text-sm font-semibold">
              {item.description.slice(0, 130)}...
            </p>
          </div>
        );
      })}
    </div>
  );
}
