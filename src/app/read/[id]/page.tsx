import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SUbscribe from "@/components/Subscribe";
import Related from "@/components/related";
import Read from "@/components/read";
import { Metadata } from "next";

type Params = Promise<{ id: string[] }>;

export async function generateStaticParams() {
  const blogs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`).then(
    (res) => res.json()
  );

  return blogs.map((post: Article) => ({
    id: post.id,
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

    return {
      title: article?.title,
      description: article?.description,
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
function Page() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="xl:w-1/2 w-full mx-auto p-5 flex flex-col gap-5 mt-5">
        <Read />
        <Related />
        <SUbscribe />
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default Page;
