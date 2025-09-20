import React, { useCallback, useEffect, useState } from "react";
import Menu from "../shared/MenuBar";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "../TopNews/TopNewsItems";
import { loadNewsByCategory } from "../../../../api";
import { AdCardSkeleton } from "../../market/components/Skeleton";
import EmptyCard from "../shared/EmptyCard";
import OwnStateSkeleton from "./OwnStateSkeleton";

export default function OwnState({
  section_id,
  category_id,
  category,
  section_typetype,
  web_section_id,
  section_title = "State",
}) {
  const [subcategory, setSubcategory] = useState("");
  const menu = [];
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [articlList,setArticlList]=useState([])
  const CACHE_KEY = `own_state_news_${category_id}`;
  const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

  const fetchNews = useCallback(
    async (forceRefresh = false) => {
      try {
        setLoading(true);
        setError(null);

        if (!forceRefresh) {
          const cached = sessionStorage.getItem(CACHE_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            const now = Date.now();

            if (now - parsed.timestamp < CACHE_EXPIRY) {
              setArticles(parsed.data || []);
              setLoading(false);
              return;
            }
          }
        }

        const { data } = await loadNewsByCategory(category_id);
        const freshData = data?.response || [];
        setArticles(freshData);

        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: freshData, timestamp: Date.now() })
        );
      } catch (err) {
        console.error("News fetch error:", err);
        setError(err.response?.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    },
    [category_id]
  );

  useEffect(() => {
    fetchNews();

    // Auto refresh after 30 minutes
    const interval = setInterval(() => {
      fetchNews(true);
    }, CACHE_EXPIRY);

    return () => clearInterval(interval);
  }, [fetchNews]);

  const featuredArticle = articlList.length > 0 ? articlList[0] : articles[0];


  /* -------- Loading -------- */
  if (loading) {
    return (
      <div className="mb-3">
        <Menu
               menuText={section_title}
               menu={[]}
               setArticlList={setArticlList}
               articles={articles}
               totalArticles={articles.length}
             />
        <OwnStateSkeleton />
      </div>
    );
  }

  /* -------- Error -------- */
  if (error) {
    return (
      <div>
        <Menu
        menuText={section_title }
        menu={[]}
        setArticlList={setArticlList}
        articles={articles}
        totalArticles={articles.length}
      />
        <div className="flex flex-col items-center justify-center mx-auto mb-3">

          <p className="text-red-600  text-center my-4">{error}</p>
        <button
          onClick={() => fetchNews(true)}
          className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Retry
        </button>
        </div>
      </div>
    );
  }

  /* -------- Main Render -------- */
  return (
    <div className="mt-4">
       <Menu
              menuText={section_title }
              menu={[]}
              setArticlList={setArticlList}
              articles={articles}
              totalArticles={articles.length}
            />

      {!articles.length ? (
        <EmptyCard> Nothing to show in {section_title}</EmptyCard>
      ) : (
        <div className="mt-[9px]">
          <div className="w-full md:flex flex-1 items-start justify-start gap-[32px] ">
            {/* Featured Article */}
            {featuredArticle && (
            
                <div className="md:w-[363px] w-full">

                  <NewsCard
                  className="md:flex flex-col items-start gap-[5px] w-full mx-auto"
                  classNameToImage="md:w-[363px] w-full md:h-48 sm:h-[365px] h-[228px] sm:w-full w-full h-96 sm:h-96 items-start justify-start relative rounded"
                  classNameForContent="w-full mt-1 gap-1"
                  image={featuredArticle?.news_img_url}
                  ctaText={featuredArticle?.is_breaking == 1 ? "Breaking" : ""}
                  title={featuredArticle.news_headline}
                  description={featuredArticle.news_description_html}
                  newsId={featuredArticle.news_id}
                  maxLength={300}
                  news={{
                    title: featuredArticle.news_headline,
                    urlToImage: featuredArticle?.news_img_url,
                  }}
                />
                </div>
            
            )}

            {/* List of Other Articles */}
            <div className="md:w-2/3 w-full flex items-start justify-start ">
              <TopNewsItems
                topNewsItems={articlList.length > 0 ? articlList : articles}
                className={"grid md:gap-2 gap-[13px]"}
                maxLength={50}
                headingLength={100}
                start={1}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
