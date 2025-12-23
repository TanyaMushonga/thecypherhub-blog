"use client";
import { useFetchArticles } from "@/hooks/useFetchArticles";
import Article from "./article";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

interface ArticleListsProps {
  value: string;
}

function ArticleLists({ value }: ArticleListsProps) {
  const { setPage, articles, loading, totalCount, page } =
    useFetchArticles("all");
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const filterArticlesByCategory = (
    articles: Article[],
    category: string
  ): Article[] => {
    if (category.toLowerCase() === "all") {
      return articles;
    }
    return articles.filter(
      (article) => article.category === category.toLowerCase()
    );
  };

  const filteredArticles = filterArticlesByCategory(articles, value);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) {
    return (
      <div className="w-full h-full p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 flex flex-col">
      {filteredArticles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 mb-6">
            {filteredArticles.map((article) => (
              <Article key={article.slug} blog={article} className="" />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-auto py-4 w-full bg-background">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={page === 1}
                className="text-white border-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={page === totalPages || totalPages === 0}
                className="text-white border-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
          <h2 className="text-white font-bold text-xl md:text-2xl">
            No articles found
          </h2>
          <p className="text-slate-300 text-lg">
            {value === "all"
              ? "There are no articles available yet."
              : `There are no articles in the ${value} category.`}
          </p>
        </div>
      )}
    </div>
  );
}

export default ArticleLists;
