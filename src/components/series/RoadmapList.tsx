"use client";

import React from "react";
import Link from "next/link";
import { PlayCircle, Lock as LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapListProps {
  articles: Article[];
}

export default function RoadmapList({ articles }: RoadmapListProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/50 p-12 text-center">
        <p className="text-muted-foreground">No articles in this series yet.</p>
      </div>
    );
  }

  return (
    <div className="relative space-y-8">
      {/* Roadmap Line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border/50 hidden md:block" />

      {articles.map((article, index) => {
        const isPublished = article.status === "published";
        const publishDate = article.publishedAt
          ? new Date(article.publishedAt)
          : null;
        const isFuture = publishDate && publishDate > new Date();
        const showBadge = !isPublished || isFuture;

        return (
          <div key={article.id} className="relative pl-0 md:pl-12 group">
            {/* Milestone Circle */}
            <div className="absolute left-0 top-0 hidden md:flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-card/50 text-xs font-bold text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors">
              {index + 1}
            </div>

            <div
              className={cn(
                "block overflow-hidden transition-all duration-300",
                !isPublished || isFuture
                  ? "cursor-not-allowed opacity-80"
                  : "cursor-pointer"
              )}
            >
              <Link
                href={
                  isPublished && !isFuture ? `/article/${article.slug}` : "#"
                }
                onClick={(e) => {
                  if (!isPublished || isFuture) {
                    e.preventDefault();
                  }
                }}
                className="block"
              >
                <div className="rounded-xl border border-border/50 bg-card/20 p-5 md:p-6 hover:bg-card/40 hover:border-primary/50 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
                          Module {index + 1}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span className="text-xs text-muted-foreground">
                          {article.readTime || "5 min read"}
                        </span>
                        {showBadge && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-border" />
                            <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase">
                              {isFuture && publishDate
                                ? `Available ${publishDate.toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}`
                                : "Coming Soon"}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                        {article.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                          isPublished && !isFuture
                            ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black"
                            : "bg-muted/20 text-muted-foreground"
                        )}
                      >
                        {isPublished && !isFuture ? (
                          <PlayCircle className="h-5 w-5" />
                        ) : (
                          <LockIcon className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
