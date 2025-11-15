
import { useQuery } from "@tanstack/react-query";
import { loadNewsByCategory } from "../../../../api";
import TopnewsSkeleton from "./TopnewsSkeleton";
import EmptyCard from "../shared/EmptyCard";
import NewsCard from "../shared/NewsCard";
import TopNewsItems from "./TopNewsItems";
import Menu from "../shared/MenuBar";
import { motion } from "framer-motion";

export default function TopNews({ category_id, section_title }) {
  const {
    data: articles = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["news", category_id], // ✅ unique cache key
    queryFn: async () => {
      const { data } = await loadNewsByCategory(category_id);
      return data?.response || [];
    },
    staleTime: 1000 * 60 * 10, // ✅ 10 mins cache (industry default)
    cacheTime: 1000 * 60 * 30, // ✅ keep cache for 30 mins
    refetchOnWindowFocus: false, // ✅ prevent unwanted reloads
  });
console.log(error)
  const featuredArticle = articles[0];

  if (isLoading) return <TopnewsSkeleton />;

  if (isError)
    return (
      <div>
        <Menu menuText={section_title} menu={[]} />
        <div className="flex flex-col items-center justify-center mx-auto my-5">
          {/* <p className="text-red-600 text-center my-4">{error.message}</p> */}
          <button
            onClick={() => refetch()}
            className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (!articles.length)
    return <EmptyCard>Nothing to show in {section_title}</EmptyCard>;

  return (
    <div>
      <Menu
        menuText={section_title || "Game"}
        menu={[]}
        articles={articles}
        totalArticles={articles.length}
      />
      <motion.div
        className="w-full flex items-start justify-start my-2"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <NewsCard
          className="md:flex flex-1 w-full items-start justify-start gap-[27px] mx-auto"
          classNameToImage="md:w-[365px] md:h-[205px] w-full sm:h-[365px] h-[228px] h-[] items-end justify-end relative rounded"
          image={featuredArticle?.news_img_url}
          ctaText={featuredArticle?.is_breaking == 1 ? "Breaking" : ""}
          classNameForContent="md:w-1/2 w-full md:mt-0 mt-[4px] flex-1 text-[20px] flex flex-col justify-between"
          title={featuredArticle?.news_headline}
          description={featuredArticle?.news_description_html}
          newsId={featuredArticle?.news_id}
          maxLength={140}
          category_id={category_id}
          news={{
            title: featuredArticle?.news_headline,
            urlToImage: featuredArticle?.news_img_url,
            content: featuredArticle?.news_description_html,
          }}
        />
      </motion.div>
      <TopNewsItems
        topNewsItems={articles}
        className="grid grid-cols-1 sm:grid-cols-2 xl:gap-[35px] md:gap-[25px] gap-[17px]"
        maxLength={60}
        start={1}
        category_id={category_id}
      />
    </div>
  );
}
