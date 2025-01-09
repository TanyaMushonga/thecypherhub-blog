"use client";
import Lottie from "lottie-react";
import empty from "@/lottie/empty.json";
import { SkeletonCard } from "./blogSkeleton";
import Article from "./article";
import { useFetchArticles } from "@/hooks/useFetchBlogs";
import { useRouter } from "next/navigation";

function ArticleLists({ value }: { value: string }) {
  const { articles, loading, refetch } = useFetchArticles(value);
  const router = useRouter();

  return (
    <div className="w-full h-full p-4">
      {loading ? (
        <SkeletonCard />
      ) : (
        <>
          {articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                {articles.slice(0, 13).map((article) => (
                  <Article key={article.id} blog={article} />
                ))}
              </div>
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
            </>
          ) : (
            <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
              <Lottie animationData={empty} loop={true} />
              <h2 className="text-white font-bold text-xl md:text-2xl">
                Something went wrong
              </h2>
              <p className="text-slate-300 text-lg ">
                Seams like there is nothing here yet, try to refresh
              </p>
              <button
                onClick={refetch}
                className="px-6 py-2 bg-transparent border border-blue-500 dark:border-white dark:text-white text-blue-500 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              >
                Refresh
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ArticleLists;
