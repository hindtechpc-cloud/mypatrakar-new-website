import React from "react";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import {articlesCard} from "../../search/news.js";

export default function Game() {
  return (
    <div>
      <Menu menuText={"खेल"} menu={[]}></Menu>
      <div className="flex  flex-col items-center gap-4">
        {articlesCard.map((item, index) => (
          <NewsCard
            key={index}
            className="md:flex flex-1  items-start gap-4 max-w-4xl mx-auto"
            classNameToImage="md:w-80 md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
            classNameForContent="md:w-5/6 w-full"
            title={item.title}
            // image={item.image}
            ctaText={item.category}
            image={item.urlToImage}
            description={item.content}
            news={item}
          />
        ))}
      </div>
    </div>
  );
}
