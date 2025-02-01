import React from "react";
import Menu from "../shared/MenuBar";
import TopNewsItems from "../TopNews/TopNewsItems";
import { news } from "../../../navigation/news";
export default function Entertainment() {
 
  return (
    <div className="flex flex-col items-start justify-start">
      <Menu menuText={"मनोरंजन"} menu={[]} />

      <div className="md:flex flex-1  items-start gap-8">
        <div className="relative md:w-96 w-full h-96 rounded-lg overflow-hidden shadow-xl my">
          {/* Background Image */}
          <img
            src="https://picsum.photos/400/600"
            alt="Entertainment"
            className="w-full h-full object-cover"
          />

          {/* Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* Content Section */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center text-center">
            <button className="bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:bg-red-800 transition-all">
              🎭 मनोरंजन
            </button>
            <p className="text-white font-semibold text-lg mt-2">
              Are you Free? Let's Enjoy the Best Entertainment!
            </p>
          </div>
        </div>
        
        <div className="sm:my-0 my-3 w-full flex items-start">
          
          <TopNewsItems topNewsItems={news} className={"flex gap-4 flex-col items-start justify-between"} />
        </div>
      </div>
    </div>
  );
}
