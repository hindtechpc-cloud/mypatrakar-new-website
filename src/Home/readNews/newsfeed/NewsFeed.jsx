import { MdNavigateNext } from "react-icons/md";
import NewsCard from "../../LeftHome/shared/NewsCard";
import { useState } from "react";

export default function NewsFeed({ newsCard }) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const handleNextPage = () => {
    if (end < newsCard?.length) {
      setStart((prevStart) => prevStart + 4);
      setEnd((prevEnd) => prevEnd + 4);
    }
  };

  return (
    <div>
      <div className="flex flex-col mt-10 items-start justify-center gap-5">
        {newsCard?.length>0?newsCard?.slice(start, end)?.map((card, index) => (
          <div key={index} className={newsCard?.className}>
            <NewsCard
              className="md:flex flex-1 items-start gap-4 max-w-4xl mx-auto"
              classNameToImage="md:w-[230px]  w-full md:h-[130px] sm:h-[365px]  h-[228px] object-cover rounded-lg"
              classNameForContent="md:w-2/3 w-full "
              image={card?.news_img_url}
              newsId={card?.news_id}
              ctaText={card?.news_category_name || "Read More"}
              title={card?.news_headline}
              description={card?.news_description_html}
              news={card}
              maxLength={100}
            />
          </div>
        )):<div className="text-xl w-full font-medium text-center"> Nothing to show</div>}
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
