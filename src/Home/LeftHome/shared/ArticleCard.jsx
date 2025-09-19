import React from 'react'
import NewsCard from './NewsCard'

export default function ArticleCard({
    className,
            classNameToImage,
            classNameForContent,
            image,
            ctaText,
            title
            description,
            newsId,
            maxLength,
            news
}) {
  return (
     <div className="flex w-full transition-transform rounded-xl">
          <NewsCard
            className="flex flex-col md:flex-row items-start gap-5 transition-transform duration-300 overflow-hidden"
            classNameToImage="w-[230px] h-[129px] object-cover rounded-lg"
            classNameForContent="flex-1 text-[20px] flex flex-col justify-between"
            image={imageUrl}
            ctaText={category}
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
        </div>
  )
}
