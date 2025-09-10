import React, { useCallback, useEffect, useState } from "react";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "../TopNews/TopNewsItems";
import { articlesCard } from "../../search/news";
import { loadNewsByCategory } from "../../../../api";
import { AdCardSkeleton } from "../../market/components/Skeleton";
import EmptyCard from "../shared/EmptyCard";

export default function OwnState({
  section_id,
  category_id,
  category,
  section_typetype,
  web_section_id,
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
      // console.log(data);
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
  const featuredArticle = articles[0];
  if (loading || error) {
    <div>
      <Menu menuText={section_title || "State"} menu={[]} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <AdCardSkeleton key={i} />
        ))}
      </div>
    </div>;
  }
  return (
    <div className="my-2 mb-5">
      {/* {(loading || error) && (
        <div className="">
          <Menu />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <AdCardSkeleton key={i} />
            ))}
          </div>
        </div>
      )} */}

      {!error && !loading && (
        <div>
          <Menu
            menuText={section_title}
            menu={menu}
            setSubcategory={setSubcategory}
          />
          {!articles.length ? (
            <EmptyCard> Nothing to show in {section_title}</EmptyCard>
          ) : (
            <div>
              {articles.length && (
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
                    <TopNewsItems
                      topNewsItems={articles}
                      className={"grid gap-3"}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
