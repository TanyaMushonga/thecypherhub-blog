import Link from "next/link";
import React, { Suspense } from "react";
import { IoTerminal } from "react-icons/io5";

const Search = React.lazy(() => import("./search"));

export default async function Navbar() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog?page=1&page_size=50`
  );
  const data = await res.json();
  const articles: Article[] = data.blogs;

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-lg border-b border-border/50 z-50">
      <div className="container mx-auto px-5 h-16 flex justify-between items-center">
        <Link
          prefetch={false}
          href="/"
          className="group flex items-center gap-2"
        >
          <div className="bg-primary/20 p-1.5 rounded-lg group-hover:bg-primary/30 transition-colors">
            <IoTerminal className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            The Cypher Hub
          </span>
        </Link>
        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Loading...</div>
          }
        >
          <Search articles={articles} />
        </Suspense>
      </div>
    </nav>
  );
}
