import React from "react";

const BreakingNewsBar = () => {
  const newsItems = [
    "सीनियर गेंदबाज का खेलना मुश्किल",
    "सोनू सूद की तमाम कोशिश के बावजूद नहीं बची लड़की की जान, एक्टर बोले- 'काश! मैं उसे बचा पाता'",
    "सस्ते इंजेक्शन पर बड़ा फैसला",
  ];

  return (
    <div className="bg-red-700 rounded-l-lg rounded-r-lg text-white mx-0 sm:mx-2 md:mx-14 my-2">
      <div className="flex items-center space-x-4 ">
        {/* Breaking Label */}
        {/* <div className="flex items-center rounded-r-sm bg-black px-3 py-1 text-xs md:text-sm font-bold rounded">
          BREAKING
        </div> */}
       <div className="relative flex items-center rounded-l-lg bg-black h-full px-3 py-2 text-xs md:text-sm font-bold text-white rounded-r-sm">
  <span>BREAKING</span>

  {/* Right Arrow */}
  <div
    className="absolute h-full w-4 bg-black"
    style={{
      clipPath: "polygon(0 0, 100% 50%, 0 100%)",
      right: "-16px", // Adjust positioning to align with the button
    }}
  ></div>
</div>


        {/* News Ticker */}
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee space-x-5 text-xs md:text-sm">
            {newsItems.map((news, index) => (
              <span key={index} className="inline-block">
                {news} <span className="mx-1 h-5 text-yellow-500">››</span>
              </span>
            ))}
          </div>
        </div>

        {/* Clock */}
        <div className="bg-black px-3 rounded-r-lg py-2 text-xs md:text-sm font-bold rounded">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
