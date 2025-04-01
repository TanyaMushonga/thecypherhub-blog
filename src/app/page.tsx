import { BlogSkeleton } from "@/components/common/blogSkeleton";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ArticleTabs = dynamic(() => import("@/components/common/articleTabs"));
const Latestblog = dynamic(() => import("@/components/common/latestblog"));
const LatestSkeleton = dynamic(
  () => import("@/components/common/latestSkeleton")
);
const Mostpopular = dynamic(() => import("@/components/common/mostpopular"));
const MostPopularSkeleton = dynamic(
  () => import("@/components/common/mostPopularSkeleton")
);

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog?page=1&page_size=15`,
    {
      next: { revalidate: 3600 }, 
    }
  );
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
