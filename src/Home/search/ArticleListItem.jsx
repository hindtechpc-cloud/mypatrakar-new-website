// src/Home/search/ArticleListItem.jsx (FINAL - Fixes the infinite loop)

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NewsCard from "../LeftHome/shared/NewsCard";
import { motion } from "framer-motion";

const BASE_URL =import.meta.env.VITE_REACT_APP_API_URL_Image ;

const ArticleListItem = ({ article }) => {
  // Fix image URL if it's a relative path
  const imageUrl = `${BASE_URL}${article?.news_img_url}`

  
 


 

 

 

  return (
  <motion.div
      className="flex w-full transition-transform rounded-xl md:mb-2"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ delay:  0.1, duration: 0.4 }}
    >
      <NewsCard
        className="md:flex flex-1 md:flex-row items-start gap-5 transition-transform duration-300 overflow-hidden"
        classNameToImage="md:w-[230px]  w-full md:h-[129px] sm:h-[365px]  h-[228px] object-cover rounded-lg"
        classNameForContent="flex-1 md:text-[20px] text-[18px] flex flex-col justify-between "
        image={article?.news_img_url}
        ctaText={article.is_breaking==1?"Breaking":""}
        title={article.news_headline.slice(0, 100) || "Untitled Article"}
        description={article.news_description_html}
        newsId={article.news_id}
        maxLength={100}
        news={{
          title: article.news_headline,
          urlToImage: imageUrl,
          content: article.news_description_html,
          news_id: article.news_id,
        }}
      />
    </motion.div>
  );
};

ArticleListItem.propTypes = {
  article: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default ArticleListItem;
