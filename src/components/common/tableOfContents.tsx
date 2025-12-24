"use client";

import React, { useEffect, useState } from "react";
import CopyLink from "./copyLink";
import Disclaimer from "./disclaimer";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ content }: { content: string }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!content) {
      setLoading(true);
      return;
    }

    setLoading(true);

    // Create a temporary DOM element to parse the HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Extract headings (h1, h2, h3, etc.)
    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const toc: TOCItem[] = Array.from(headings).map((heading) => {
      const id =
        heading.id ||
        heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
        "";
      heading.id = id; // Ensure the heading has an ID for linking
      return {
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.replace("H", ""), 10), // Extract heading level (e.g., 1 for <h1>)
      };
    });

    setTocItems(toc);

    // Add IDs to the actual headings in the DOM
    const articleDiv = document.querySelector(".prose");
    if (articleDiv) {
      const articleHeadings = articleDiv.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      Array.from(articleHeadings).forEach((heading) => {
        const id =
          heading.id ||
          heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
          "";
        heading.id = id; // Ensure the heading has an ID for linking
      });
    }

    setLoading(false);
  }, [content]);

  return (
    <aside className="text-white p-4 hidden md:block md:mt-10 min-w-[300px]">
      <div className="sticky top-28 self-start border border-border/30 rounded-md p-4 bg-card max-h-[85vh] flex flex-col">
        {tocItems.length > 0 && (
          <h2 className="font-semibold text-lg mb-4">Table of Contents</h2>
        )}

        {loading ? (
          <div className="space-y-3 pr-2">
            <Skeleton className="h-4 w-3/4 rounded-sm" />
            <Skeleton className="h-4 w-full rounded-sm" />
            <Skeleton className="h-4 w-5/6 rounded-sm ml-4" />
            <Skeleton className="h-4 w-2/3 rounded-sm ml-4" />
            <Skeleton className="h-4 w-4/5 rounded-sm" />
            <Skeleton className="h-4 w-3/4 rounded-sm ml-4" />
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-3 -mr-3">
            <ul className="space-y-2 pb-4">
              {tocItems.map((item) => (
                <li
                  key={item.id}
                  className={`ml-${
                    (item.level - 1) * 4
                  } text-sm hover:underline transition-all`}
                  style={{ paddingLeft: `${(item.level - 1) * 0.5}rem` }}
                >
                  <a
                    href={`#${item.id}`}
                    className="text-primary transition-colors block py-1 line-clamp-2"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${item.id}`)?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    title={item.text}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}

        <div className="shrink-0 mt-auto">
          <Disclaimer />
          <div className="border-t border-border/20 pt-4 mt-4">
            <h3 className="text-sm text-muted-foreground mb-3 font-medium uppercase tracking-wider">
              Share Article
            </h3>
            <CopyLink />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TableOfContents;
