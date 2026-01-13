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

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const toc: TOCItem[] = Array.from(headings).map((heading) => {
      const id =
        heading.id ||
        heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // More aggressive sanitization: only alphanumeric and dashes
          .replace(/^-+|-+$/g, "") || // Remove leading/trailing dashes
        "";
      heading.id = id;
      return {
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.replace("H", ""), 10),
      };
    });

    setTocItems(toc);

    const articleDiv = document.querySelector(".prose");
    if (articleDiv) {
      const articleHeadings = articleDiv.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      Array.from(articleHeadings).forEach((heading, index) => {
        // Use the sanitized ID from our TOC map if possible, otherwise generate it
        const id =
          toc[index]?.id ||
          heading.id ||
          heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") ||
          `heading-${index}`;
        heading.id = id;
      });
    }

    setLoading(false);
  }, [content]);

  if (tocItems.length === 0 && !loading) return null;

  return (
    <div className="flex flex-col h-full bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="p-6 pb-2 border-b border-white/5">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Table of Contents
        </h2>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="p-4 pr-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-3/4 rounded-full bg-white/5" />
              <Skeleton className="h-4 w-full rounded-full bg-white/5" />
              <Skeleton className="h-4 w-5/6 rounded-full bg-white/5 ml-4" />
              <Skeleton className="h-4 w-2/3 rounded-full bg-white/5 ml-4" />
              <Skeleton className="h-4 w-4/5 rounded-full bg-white/5" />
            </div>
          ) : (
            <ul className="space-y-1">
              {tocItems.map((item) => (
                <li
                  key={item.id}
                  style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
                >
                  <a
                    href={`#${item.id}`}
                    className={`block py-1.5 px-3 rounded-xl text-sm transition-all duration-200 hover:bg-white/5 ${
                      item.level === 2
                        ? "font-semibold text-slate-100"
                        : "text-slate-400 hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        const offset = 100; // Account for sticky header
                        const bodyRect =
                          document.body.getBoundingClientRect().top;
                        const elementRect = element.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 pt-2 border-t border-white/5 bg-slate-900/60">
        <Disclaimer />
        <div className="border-t border-white/10 pt-4 mt-4">
          <h3 className="text-[10px] text-slate-500 mb-3 font-bold uppercase tracking-[0.2em]">
            Share thoughts
          </h3>
          <CopyLink />
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
