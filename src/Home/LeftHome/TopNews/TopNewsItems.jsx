import { useCallback, useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NewsItem = ({ news, onNewsClick }) => {
  return (
    <div className="flex items-start gap-2">
      <div className="w-48">
        <img
          src={news?.news_img_url}
          alt={news?.news_headline}
          className="w-full h-24 rounded-xl object-cover"
          loading="lazy"
        />
      </div>
      <h2
        className="text-gray-800 text-sm font-semibold cursor-pointer hover:underline w-5/6"
        onClick={() => onNewsClick(news)}
      >
        {news?.news_headline?.length > 300
          ? `${news.news_headline.slice(0, 300)}...`
          : news.news_headline}
      </h2>
    </div>
  );
};

NewsItem.propTypes = {
  news: PropTypes.shape({
    news_img_url: PropTypes.string,
    news_headline: PropTypes.string,
    news_id: PropTypes.string,
  }).isRequired,
  onNewsClick: PropTypes.func.isRequired,
};

export default function TopNewsItems({
  topNewsItems = [],
  className,
  itemsToShow = 6,
}) {
  const navigate = useNavigate();
  const { setNews } = useContext(NewsContext);

  const handleNewsClick = useCallback(
    (news) => {
      setNews(news);
      navigate(`/read-news/${news?.news_headline}/${news.news_id}`);
    },
    [setNews, navigate]
  );

  return (
    <div className={className}>
      {topNewsItems.slice(0, itemsToShow).map((item) => (
        <NewsItem
          key={item.news_id}
          news={item}
          onNewsClick={handleNewsClick}
        />
      ))}
    </div>
  );
}

TopNewsItems.propTypes = {
  topNewsItems: PropTypes.arrayOf(
    PropTypes.shape({
      news_img_url: PropTypes.string,
      news_headline: PropTypes.string,
      news_id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  itemsToShow: PropTypes.number,
};

TopNewsItems.defaultProps = {
  topNewsItems: [],
  className: "",
};
