import Link from "next/link";
import React, { Suspense } from "react";
import { IoTerminal } from "react-icons/io5";

const Search = React.lazy(() => import("./search"));

export default async function Navbar() {
  let articles: Article[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog?page=1&page_size=50`,
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const data = await res.json();
      articles = data.blogs || [];
    }
  } catch (error) {
    console.error("Failed to fetch articles for search:", error);
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
        {/* Logo Section with coding-appropriate fonts */}
        <Link
          prefetch={false}
          href="/"
          className="group flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          {/* Animated terminal icon */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-cyan-500/30 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-500" />
            <div className="relative bg-gradient-to-br from-card to-gray-900 p-2 rounded-lg border border-gray-800 group-hover:border-primary/50 transition-all duration-300">
              <IoTerminal className="w-6 h-6 text-primary group-hover:text-cyan-400/80 transition-colors duration-300" />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-200 via-primary/25 to-cyan-400/80 bg-clip-text text-transparent group-hover:from-primary group-hover:via-cyan-300/80 group-hover:to-primary transition-all duration-300 font-mono">
              The Cypher Hub
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-[0.2em] uppercase font-mono">
              {/* Code-related taglines */}
              <span className="text-primary">{"<"} </span>
              Code • Tech • Insights
              <span className="text-primary"> {" />"}</span>
            </span>
          </div>
        </Link>

        {/* Search Section */}
        <Suspense
          fallback={
            <div className="flex items-center gap-2">
              <div className="hidden md:block h-9 w-36 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse border border-gray-800" />
              <div className="md:hidden h-9 w-9 rounded-lg bg-gray-900 animate-pulse border border-gray-800" />
            </div>
          }
        >
          <Search articles={articles} />
        </Suspense>
      </div>
    </nav>
  );
}
