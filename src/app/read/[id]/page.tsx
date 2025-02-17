import React, { Suspense } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SUbscribe from "@/components/common/Subscribe";
import Related from "@/components/common/related";
import ReadSkeleton from "@/components/common/readSkeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const Read = React.lazy(() => import("@/components/common/read"));

export const revalidate = 345600; 
export const dynamicParams = true;

type Props = {
  params: Promise<{ id: string }>;
};

async function getArticle(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`);
  const data = await res.json();
  const article: Article = data;
  if (!article) notFound();
  return article;
}

async function getRelated(id: string) {
  const currentBlog: Article = await getArticle(id);
  const currentBlogCategory = currentBlog?.category;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const data = await res.json();
  const articles: Article[] = data.blogs;

  if (!Array.isArray(articles)) {
    throw new Error("Expected articles to be an array");
  }

  const related: Article[] = articles.filter(
    (related: Article) => related.category === currentBlogCategory
  );

  if (!related.length) notFound();
  return related.slice(0, 3);
}

export async function generateStaticParams() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`).then(
    (res) => res.json()
  );
  const blogs: Article[] = data.blogs;

  return blogs.map((blog) => ({ params: { id: blog.id } }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  try {
    const article = await getArticle(id);

    if (!article) {
      return {
        title: "Error",
        description: "An error occurred while fetching metadata.",
      };
    }

    return {
      title: article?.title,
      description: article?.description,
      //TODO ADD KEYWORDS
      authors: [
        { name: "Tanyaradzwa Tanatswa Mushonga" },
        {
          name: "Tanyaradzwa Tanatswa Mushonga",
          url: "https://www.tanyaradzwatmushonga.me/",
        },
      ],
      publisher: "The Cypher Hub",
      formatDetection: {
        telephone: true,
        email: true,
        address: true,
      },
      openGraph: {
        images: [
          {
            url: article?.coverImgUrl || "",
            width: 800,
            height: 600,
            alt: article?.title,
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
  const blog = await getArticle(id);
  const related = await getRelated(id);

  return (
    <BackgroundBeamsWithCollision>
      <div className="xl:w-1/2 w-full mx-auto p-5 flex flex-col gap-5 mt-5">
        <Suspense fallback={<ReadSkeleton />}>
          <Read article={blog} />
        </Suspense>
        <Suspense fallback={<ReadSkeleton />}>
          <Related related={related} />
        </Suspense>
        <SUbscribe />
      </div>
    </BackgroundBeamsWithCollision>
  );
}
