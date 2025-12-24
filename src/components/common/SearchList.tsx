import React from "react";
import { DialogClose } from "@/components/ui/dialog";
import { LuChevronRight, LuFileText } from "react-icons/lu";
import Link from "next/link";

function SearchList({ article }: { article: Article }) {
  return (
    <DialogClose asChild>
      {/* Use Link directly instead of RouteLayout */}
      <Link
        href={`/blog/${article.slug}`}
        className="group flex items-center justify-between rounded-md px-3 py-2 transition hover:bg-muted cursor-pointer me-2"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <LuFileText className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground line-clamp-1">
              {article.title}
            </p>

            <p className="text-xs text-muted-foreground line-clamp-1">
              {article.description}
            </p>
          </div>
        </div>

        <LuChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2" />
      </Link>
    </DialogClose>
  );
}

export default SearchList;
