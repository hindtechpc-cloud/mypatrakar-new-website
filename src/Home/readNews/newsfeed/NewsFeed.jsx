import { MdNavigateNext } from "react-icons/md";
import NewsCard from "../../LeftHome/shared/NewsCard";
import { useState } from "react";

export default function NewsFeed({ newsCard }) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const handleNextPage = () => {
    if (end < newsCard?.length) {
      setStart((prevStart) => prevStart + 4);
      setEnd((prevEnd) => prevEnd + 4);
    }
  };

  return (
    <div>
      <div className="flex flex-col mt-10 items-start justify-center gap-5">
        {newsCard?.slice(start, end)?.map((card, index) => (
          <div key={index} className={card.className}>
            <NewsCard
              className="md:flex flex-1 items-start gap-4 max-w-4xl mx-auto"
              classNameToImage="md:w-52 md:h-32 sm:w-full w-full h-60 sm:h-48 items-end justify-end relative"
              classNameForContent="md:w-2/3 w-full "
              image={card?.urlToImage}
              ctaText={card?.category}
              title={card?.title}
              description={card?.content}
              news={card}
            />
          </div>
        ))}
      </div>
      {end < newsCard?.length && (
        <div
          className="flex items-end justify-end cursor-pointer mt-5"
          onClick={handleNextPage}
        >
          <button className="py-2 px-3 border border-yellow-300">
            Next Page
          </button>
          <span className="py-3 px-3 border border-yellow-300">
            <MdNavigateNext className="text-black" />
          </span>
        </div>
      )}
    </div>
  );
}
