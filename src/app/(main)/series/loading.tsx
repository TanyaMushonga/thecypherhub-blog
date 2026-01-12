import React from "react";

export default function SeriesLoading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 animate-pulse">
      <header className="mb-12 max-w-2xl">
        <div className="mb-4 h-8 w-40 rounded-full bg-muted/20" />
        <div className="mb-6 h-12 w-3/4 rounded-xl bg-muted/20 md:h-16" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-muted/20" />
          <div className="h-4 w-5/6 rounded bg-muted/20" />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/10"
          >
            <div className="aspect-video bg-muted/20" />
            <div className="p-6 space-y-4">
              <div className="h-6 w-3/4 rounded bg-muted/20" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted/20" />
                <div className="h-4 w-5/6 rounded bg-muted/20" />
              </div>
              <div className="mt-4 h-4 w-24 rounded bg-muted/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
