import ArticleTabs from "@/components/common/articleTabs";
import { BlogSkeleton } from "@/components/common/blogSkeleton";
import Latestblog from "@/components/common/latestblog";
import LatestSkeleton from "@/components/common/latestSkeleton";
import Mostpopular from "@/components/common/mostpopular";
import MostPopularSkeleton from "@/components/common/mostPopularSkeleton";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Suspense } from "react";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const data: Article[] = await response.json();
  const latestBlog = data[0];

  return (
    <BackgroundBeamsWithCollision className="pt-10">
      <div className="xl:w-3/4 w-full mx-auto p-5 flex flex-col gap-5">
        <Suspense fallback={<LatestSkeleton />}></Suspense>
        <Latestblog latestBlog={latestBlog} />
        <Suspense fallback={<MostPopularSkeleton />}>
          <Mostpopular mostPopular={data} />
        </Suspense>
        <Suspense fallback={<BlogSkeleton />}>
          <ArticleTabs allArticle={data} />
        </Suspense>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
