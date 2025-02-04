"use client";
import Article from "./article";
import { useRouter } from "next/navigation";

function ArticleLists({
  value,
  allArticle,
}: {
  value: string;
  allArticle: Article[];
}) {
  const router = useRouter();

  function filterArticlesByCategory(
    articles: Article[],
    category: string
  ): Article[] {
    if (category.toLowerCase() === "all") {
      return articles;
    }
    return articles.filter((article) => article.category === category);
  }

  return (
    <div className="w-full h-full p-4">
      {allArticle.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filterArticlesByCategory(allArticle, value)
              .slice(0, 13)
              .map((article) => (
                <Article key={article.id} blog={article} className="" />
              ))}
          </div>
          {allArticle.length > 13 && (
            <div className="mt-5">
              <button
                onClick={() => {
                  router.push(`/all`);
                }}
                className="px-8 py-1  border-2 border-slate-50 dark:border-white uppercase bg-white text-black transition duration-200 text-sm "
              >
                View all
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
          <h2 className="text-white font-bold text-xl md:text-2xl">
            Something went wrong
          </h2>
          <p className="text-slate-300 text-lg ">
            Seams like there is nothing here yet, try to refresh
          </p>
        </div>
      )}
    </div>
  );
}

export default ArticleLists;
