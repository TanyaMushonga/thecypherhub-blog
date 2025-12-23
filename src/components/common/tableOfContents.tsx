"use client";

import React, { useEffect, useState } from "react";
import CopyLink from "./copyLink";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ content }: { content: string }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (!content) return;

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
  }, [content]);

  return (
    <aside className="text-white p-4 hidden md:block md:mt-28">
      <div className="sticky top-28 self-start border border-border/30 rounded-md p-4 bg-card">
        <h2 className="text-lg font-semibold mb-4">CONTENTS</h2>
        <ul className="space-y-2 max-h-[60vh] overflow-auto pr-2 no-visible-scrollbar">
          {tocItems.map((item) => (
            <li
              key={item.id}
              className={`ml-${(item.level - 1) * 4} text-sm hover:underline`}
            >
              <a href={`#${item.id}`} className="text-blue-400">
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-border/20 pt-4">
          <h3 className="text-sm text-slate-300 mb-2">Share</h3>
          <CopyLink />
        </div>
      </div>
    </aside>
  );
};

export default TableOfContents;
