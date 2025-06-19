// src/Home/search/ArticleListItem.jsx (FINAL - Fixes the infinite loop)

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// =========================================================================
// CRITICAL: You MUST set this to your backend's domain.
// Based on your API response, this is the correct value.
// =========================================================================
const API_BASE_URL = 'https://super-admin.hindtechitsolutions.com';

const ArticleListItem = ({ article }) => {
  const fullImageUrl = article.image ? `${API_BASE_URL}${article.image}` : '';
  const placeholderImageUrl = "https://via.placeholder.com/250x160.png?text=Image+Not+Found";
  
  // Use state to manage the image source. This is the key to stopping the loop.
  const [imageSrc, setImageSrc] = useState(fullImageUrl);

  // When the article prop changes, reset the image source
  useEffect(() => {
    setImageSrc(fullImageUrl);
  }, [fullImageUrl]);

  const handleImageError = () => {
    // If the primary image fails, set the source to the placeholder.
    // This will only happen once and will not loop.
    setImageSrc(placeholderImageUrl);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 py-5 w-full border-b last:border-b-0">
      <div className="relative md:w-[250px] w-full h-48 md:h-auto flex-shrink-0">
        <img
          src={imageSrc || placeholderImageUrl} // Use the state-managed src
          alt={article.title}
          className="w-full h-full object-cover rounded-lg bg-gray-200"
          onError={handleImageError} // Call the robust error handler
        />
        {article.category && (
          <span className="absolute bottom-2 left-2 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded">
            {article.category}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-red-700 transition-colors">
          <a href={article.url || '#'}>{article.title}</a>
        </h3>
        <div
          className="text-gray-600 text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.description }}
        />
      </div>
    </div>
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