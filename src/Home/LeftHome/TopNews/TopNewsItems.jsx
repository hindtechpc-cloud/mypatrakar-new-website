// import { useCallback, useContext } from "react";
// import { NewsContext } from "../../../context/NewsContext";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { encryptData } from "../../../utils/cryptoHelper";
// import HtmlToPlainText from "../../../utils/HtmlToPlainText";

// const NewsItem = ({ news, onNewsClick }) => {
//   return (
//     <div className="flex items-start justify-start gap-2 w-full">
//       <div className="w-48">
//         <img
//           src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
//             news?.news_img_url
//           }`}
//           alt={news?.news_headline}
//           className="w-full h-28 rounded-xl object-cover"
//           loading="lazy"
//         />
//       </div>
//       <div className="text-start w-2/3">
//         <h2
//           className="text-gray-800 text-sm font-semibold cursor-pointer hover:underline w-5/6"
//           onClick={() => onNewsClick(news)}
//         >
//           {news?.news_headline?.length > 300
//             ? `${news.news_headline.slice(0, 300)}...`
//             : news.news_headline}
//         </h2>
//        <p className="-ml-3 -mt-7">
//          <HtmlToPlainText htmlContent={news?.news_description_html} maxLength={50}/>
//        </p>
//       </div>
//     </div>
//   );
// };

// NewsItem.propTypes = {
//   news: PropTypes.shape({
//     news_img_url: PropTypes.string,
//     news_headline: PropTypes.string,
//     news_id: PropTypes.string,
//   }).isRequired,
//   onNewsClick: PropTypes.func.isRequired,
// };

// export default function TopNewsItems({
//   topNewsItems = [],
//   className,
//   itemsToShow = 5,
// }) {
//   const navigate = useNavigate();
//   const { setNews } = useContext(NewsContext);

//   const handleNewsClick = useCallback(
//     (news) => {
//       setNews(news);
//       navigate(
//         `/read-news/${news?.news_headline}/${encryptData(news.news_id)}`
//       );
//     },
//     [setNews, navigate]
//   );

//   return (
//     <div className={className}>
//       {topNewsItems.slice(1, itemsToShow).map((item) => (
//         <NewsItem
//           key={item.news_id}
//           news={item}
//           onNewsClick={handleNewsClick}
//         />
//       ))}
//     </div>
//   );
// }

// TopNewsItems.propTypes = {
//   topNewsItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       news_img_url: PropTypes.string,
//       news_headline: PropTypes.string,
//       news_id: PropTypes.string,
//       title: PropTypes.string,
//     })
//   ),
//   className: PropTypes.string,
//   itemsToShow: PropTypes.number,
// };

// TopNewsItems.defaultProps = {
//   topNewsItems: [],
//   className: "",
// };

import { useCallback, useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { encryptData } from "../../../utils/cryptoHelper";
import HtmlToPlainText from "../../../utils/HtmlToPlainText";
import { motion } from "framer-motion";

const NewsItem = ({ news, onNewsClick, index }) => {
  return (
    <motion.div
      className="flex items-start justify-start gap-4  w-full  cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5, backgroundColor: "#f8fafc" }}
      onClick={() => onNewsClick(news)}
    >
      <div className="flex-shrink-0 w-32 h-28 relative overflow-hidden rounded shadow-md">
        <img
          src={`${import.meta.env.VITE_REACT_APP_API_URL_Image}${
            news?.news_img_url
          }`}
          alt={news?.news_headline}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" /> */}
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-gray-800 text-sm font-semibold leading-tight hover:text-blue-600 transition-colors duration-300">
          {news?.news_headline?.length > 0 && news?.news_headline?.length > 300
            ? `${news.news_headline.slice(0, 300)}...`
            : news.news_headline}
        </h2>

        <div className="text-xs text-gray-500 ">
          <HtmlToPlainText
            htmlContent={news?.news_description_html}
            maxLength={60}
          />
        </div>

        {/* <div className="flex items-center text-xs text-gray-400 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {new Date(news.created_at || Date.now()).toLocaleDateString()}
        </div> */}
      </div>
    </motion.div>
  );
};

NewsItem.propTypes = {
  news: PropTypes.shape({
    news_img_url: PropTypes.string,
    news_headline: PropTypes.string,
    news_id: PropTypes.string,
    created_at: PropTypes.string,
    news_description_html: PropTypes.string,
  }).isRequired,
  onNewsClick: PropTypes.func.isRequired,
  index: PropTypes.number,
};

export default function TopNewsItems({
  topNewsItems = [],
  className,
  itemsToShow = 5,
}) {
  const navigate = useNavigate();
  const { setNews } = useContext(NewsContext);

  const handleNewsClick = useCallback(
    (news) => {
      setNews(news);
      navigate(
        `/read-news/${news?.news_headline}/${encryptData(news.news_id)}`
      );
    },
    [setNews, navigate]
  );

  return (
    <div className={className}>
      {topNewsItems.slice(0, itemsToShow).map((item, index) => (
        <NewsItem
          key={item.news_id}
          news={item}
          onNewsClick={handleNewsClick}
          index={index}
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
      created_at: PropTypes.string,
      news_description_html: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  itemsToShow: PropTypes.number,
};

TopNewsItems.defaultProps = {
  topNewsItems: [],
  className: "",
};
