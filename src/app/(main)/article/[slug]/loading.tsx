import React from "react";
import ReadSkeleton from "@/components/common/readSkeleton";

export default function ArticleLoading() {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 md:px-5">
      <div className="lg:w-2/3 w-full p-4 md:p-5 mt-5">
        <ReadSkeleton />
      </div>

      <aside className="lg:w-1/3 lg:block mt-5 sticky top-24 h-fit hidden">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-muted/20 rounded" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 w-full bg-muted/10 rounded" />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
