import ArticleTabs from "@/components/common/articleTabs";
import { BlogSkeleton } from "@/components/common/blogSkeleton";
import Latestblog from "@/components/common/latestblog";
import LatestSkeleton from "@/components/common/latestSkeleton";
import Mostpopular from "@/components/common/mostpopular";
import MostPopularSkeleton from "@/components/common/mostPopularSkeleton";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Suspense } from "react";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const data = await res.json();
  const articles: Article[] = data.blogs;
  const latestBlog = articles[0];

  return (
    <BackgroundBeamsWithCollision className="pt-10">
      <div className="xl:w-3/4 w-full mx-auto p-5 flex flex-col gap-5">
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
    </BackgroundBeamsWithCollision>
  );
}
