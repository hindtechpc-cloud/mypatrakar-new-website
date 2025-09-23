import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MdOutlineAccessTime } from "react-icons/md";
import { encryptData } from "../utils/cryptoHelper";

const NewPreviewSubMenuHovered = ({ hoveredNews }) => {
  if (!hoveredNews || hoveredNews.length === 0) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="relative "
      >
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hoveredNews.slice(0, 6).map((newsItem) => (
            <Link
              key={newsItem.news_id}
              to={`/read-news/${encodeURIComponent(
                newsItem.news_headline
              )}/${encryptData(newsItem.news_id)}`}
              className="  flex flex-col"
            >
              {/* Image */}
              <div className="h-[120px] w-[200px] rounded-md">
                <img
                  src={
                    newsItem?.news_img_url
                      ? `${import.meta.env.VITE_REACT_APP_API_URL_Image}${
                          newsItem.news_img_url
                        }`
                      : "https://via.placeholder.com/350x200?text=No+Image"
                  }
                  alt={newsItem.news_headline}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/350x200?text=No+Image";
                  }}
                />
              </div>

              {/* Content */}
              <div className="pt-[8px] flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-50 mb-1 line-clamp-2">
                  {newsItem.news_headline}
                </h3>
                <div className="flex items-center text-xs text-gray-50 mt-auto">
                  <span>
                    {newsItem?.publishedAt ? (
                      <>
                        <MdOutlineAccessTime className="mr-1 " />

                        {new Date(newsItem.publishedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewPreviewSubMenuHovered;
