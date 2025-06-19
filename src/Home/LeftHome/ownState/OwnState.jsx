import React, { useCallback, useEffect, useState } from "react";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "../TopNews/TopNewsItems";
import { articlesCard } from "../../search/news";
import { loadNewsByCategory } from "../../../../api";

export default function OwnState({
  section_id,
  category_id,
  category,
  section_typetype,
  web_section_idion_id,
  section_title,
}) {
  const [subcategory, setSubcategory] = useState("");
  const menu = [];

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await loadNewsByCategory(category_id);
      setArticles(data?.response || []);
    } catch (err) {
      console.error("News fetch error:", err);
      setError(err.response?.message || "Failed to load news");
    } finally {
      setLoading(false);
    }
  }, [category_id]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!articles.length) return <div className="p-4">No articles found</div>;

  const featuredArticle = articles[0];

  return (
    <div className="my-2 mb-5">
      <Menu
        menuText={" Own State"}
        menu={menu}
        setSubcategory={setSubcategory}
      />
      <div className="md:flex flex-1 items-start gap-4">
        <div className="">
          <NewsCard
            className="md:flex flex-col items-start gap-4 max-w-4xl mx-auto"
            classNameToImage="md:w-96 md:h-48 sm:w-full w-full h-96 sm:h-96 items-end justify-end relative"
            classNameForContent="w-5/6"
            image={featuredArticle?.news_img_url}
            ctaText={featuredArticle.category}
            title={featuredArticle.news_headline}
            description={featuredArticle.news_description_html}
            newsId={featuredArticle.news_id}
            news={{
              title: featuredArticle.news_headline,
              urlToImage: featuredArticle?.news_img_url,
            }}
          />
        </div>
        <div className="w-full">
          <TopNewsItems topNewsItems={articles} className={"grid gap-3"} />
        </div>
      </div>
    </div>
  );
}
