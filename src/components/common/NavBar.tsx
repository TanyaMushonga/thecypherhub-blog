import Link from "next/link";
import React, { Suspense } from "react";

const Search = React.lazy(() => import("./search"));

export default async function Navbar() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const data = await res.json();
  const articles: Article[] = data.blogs;

  return (
    <nav className="fixed top-0 left-0 w-full bg-secondary backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link prefetch={false} className="text-white" href="/">
            The Cypher Hub
          </Link>
        </div>
        <Suspense fallback={<div>Loading search...</div>}>
          <Search articles={articles} />
        </Suspense>
      </div>
    </nav>
  );
}
