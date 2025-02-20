import ArticleTabs from "@/components/common/articleTabs";
import { BlogSkeleton } from "@/components/common/blogSkeleton";
import Latestblog from "@/components/common/latestblog";
import LatestSkeleton from "@/components/common/latestSkeleton";
import Mostpopular from "@/components/common/mostpopular";
import MostPopularSkeleton from "@/components/common/mostPopularSkeleton";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - The Cypher Hub",
  description:
    "Discover the latest and most popular blogs from The Cypher Hub newsletter.",
  openGraph: {
    title: "Home - The Cypher Hub",
    description:
      "Discover the latest and most popular blogs from The Cypher Hub newsletter.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    type: "website",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  },
};

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const data = await res.json();
  const articles: Article[] = data.blogs;
  const latestBlog = articles[0];

  return (
    <div className="xl:w-3/4 w-full mx-auto p-5 flex flex-col gap-5 pt-20">
      <Suspense fallback={<LatestSkeleton />}>
        <Latestblog latestBlog={latestBlog} />
      </Suspense>
      <Suspense fallback={<MostPopularSkeleton />}>
        <Mostpopular mostPopular={articles} />
      </Suspense>
      <Suspense fallback={<BlogSkeleton />}>
        <ArticleTabs allArticle={articles} />
      </Suspense>
    </div>
  );
}
