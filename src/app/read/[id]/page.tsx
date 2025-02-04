export const revalidate = 86400;
export const dynamicParams = true;

import React, { Suspense } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SUbscribe from "@/components/common/Subscribe";
import Related from "@/components/common/related";
import Read from "@/components/common/read";
import { Metadata } from "next";
import ReadSkeleton from "@/components/common/readSkeleton";

type Params = Promise<{ id: string[] }>;

export async function generateStaticParams() {
  const blogs: Article[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog`
  ).then((res) => res.json());

  if (!blogs) {
    return {
      notFound: true,
    };
  }

  return blogs.map((post: Article) => ({
    id: String(post.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const article = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`
    ).then((res) => res.json());

    if (!article) {
      return {
        title: "Error",
        description: "An error occurred while fetching metadata.",
      };
    }

    return {
      title: article?.title,
      description: article?.description,
      twitter: {
        card: "summary_large_image",
      },
      openGraph: {
        images: [
          {
            url: article?.coverImgUrl,
            alt: article?.title,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while fetching metadata.",
    };
  }
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const blog: Article = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`
  ).then((res) => res.json());

  return (
    <BackgroundBeamsWithCollision>
      <div className="xl:w-1/2 w-full mx-auto p-5 flex flex-col gap-5 mt-5">
        <Suspense fallback={<ReadSkeleton />}>
          <Read article={blog} />
        </Suspense>
        <Related />
        <SUbscribe />
      </div>
    </BackgroundBeamsWithCollision>
  );
}
