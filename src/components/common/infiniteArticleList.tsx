"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFetchArticles } from "@/hooks/useFetchArticles";
import Article from "./article";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

interface InfiniteArticleListProps {
  category: string;
}

export function InfiniteArticleList({ category }: InfiniteArticleListProps) {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const pageSize = 12;
  const { articles, loading, totalCount, page, setPage } =
    useFetchArticles(category, pageSize);

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
    const totalPages = Math.ceil((totalCount || 0) / pageSize);
    setHasMore(page < totalPages);
    setLoadingMore(false);
  }, [articles, page, totalCount, pageSize]);

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

  // Initial loading state
  if (loading && displayedArticles.length === 0) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border-b border-gray-800/50 pb-6 last:border-b-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (displayedArticles.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400 text-lg">
          No articles found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Vertical list with hover effects */}
      {displayedArticles.map((article, idx) => (
        <div
          key={article.slug}
          className={`py-6 border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors duration-200 px-0 cursor-pointer ${
            idx === displayedArticles.length - 1 ? "last:border-b-0" : ""
          }`}
        >
          <Article
            blog={article}
            className="!bg-transparent !rounded-none !gap-0 !p-0"
            showImage={false}
            variant="compact"
          />
        </div>
      ))}

      {/* Load More Button or Infinite Scroll Trigger */}
      <div ref={observerTarget} className="py-8 flex justify-center">
        {hasMore && (
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore || loading}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-200"
          >
            {loadingMore || loading ? (
              <>
                <span className="inline-block animate-spin">↻</span>
                Loading...
              </>
            ) : (
              <>
                <span>Load More Articles</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
        {!hasMore && displayedArticles.length > 0 && (
          <p className="text-gray-500 text-sm">
            You&apos;ve reached the end of articles
          </p>
        )}
      </div>
    </div>
  );
}
