"use client";
import { useFetchArticles } from "@/hooks/useFetchArticles";
import Article from "./article";
import { Skeleton } from "../ui/skeleton";
 
import { useCallback, useEffect, useRef, useState } from "react";

interface ArticleListsProps {
  value: string;
  initialArticles?: Article[];
}

function ArticleLists({ value, initialArticles }: ArticleListsProps) {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>(
    initialArticles || []
  );
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const itemsPerPage = 12;
  const { setPage, articles, loading, totalCount, page } = useFetchArticles(
    value,
    initialArticles
  );

  // Update displayed articles when new articles are fetched
  useEffect(() => {
    if (page === 1) {
      setDisplayedArticles(articles);
    } else {
      setDisplayedArticles((prev) => {
        const newArticles = articles.filter(
          (article) => !prev.some((p) => p.slug === article.slug)
        );
        return [...prev, ...newArticles];
      });
    }

    // Check if there are more articles to load
    const totalPages = Math.ceil((totalCount || 0) / itemsPerPage);
    setHasMore(page < totalPages);
    setLoadingMore(false);
  }, [articles, page, totalCount]);

  // Handle manual "Load More" button click
  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    setPage((prev) => prev + 1);
  }, [setPage]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          handleLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, handleLoadMore]);

  if (loading && displayedArticles.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6 py-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col space-y-3 border-b border-border/40 pb-6 px-4"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (displayedArticles.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-400 text-lg">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-0">
      {displayedArticles.map((article, idx) => (
        <div
          key={article.slug}
          className={`flex gap-4 py-6 border-b border-gray-700/50 hover:bg-gray-900/30 transition-colors duration-200 px-0 ${
            idx === displayedArticles.length - 1 ? "last:border-b-0" : ""
          }`}
        >
          <div className="shrink-0 w-10 text-right p-4">
            <span className="text-sm font-mono text-cyan-400/80">
              {String(idx + 1).padStart(2, "0")}
            </span>
          </div>

          <Article
            blog={article}
            className="bg-transparent! rounded-none! gap-0! p-0!"
            showImage={false}
            variant="compact"
          />
        </div>
      ))}

      {/* Load More Button or Infinite Scroll Trigger */}
      <div ref={observerTarget} className="py-8 flex justify-center w-full">
        {hasMore || loadingMore || loading ? (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <span className="inline-block animate-spin">↻</span>
            <span>Loading more articles...</span>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            You&apos;ve reached the end of articles
          </p>
        )}
      </div>
    </div>
  );
}

export default ArticleLists;
