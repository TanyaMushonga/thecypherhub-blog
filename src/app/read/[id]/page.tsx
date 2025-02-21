import React, { Suspense } from "react";
import SUbscribe from "@/components/common/Subscribe";
import Related from "@/components/common/related";
import ReadSkeleton from "@/components/common/readSkeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const Read = React.lazy(() => import("@/components/common/read"));

export const revalidate = 3600;
export const dynamicParams = true;

type Props = {
  params: Promise<{ id: string }>;
};

async function getArticleAndRelated(id: string) {
  const articleRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`,
    { next: { revalidate: 3600 } }
  );
  if (!articleRes.ok) {
    throw new Error(
      `Failed to fetch article with id ${id}: ${articleRes.statusText}`
    );
  }
  const articleData = await articleRes.json();
  const article: Article = articleData;

  const relatedRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
    next: { revalidate: 3600 },
  });
  if (!relatedRes.ok) {
    throw new Error(
      `Failed to fetch related articles: ${relatedRes.statusText}`
    );
  }
  const relatedData = await relatedRes.json();
  const articles: Article[] = relatedData.blogs;

  if (!Array.isArray(articles)) {
    throw new Error("Expected articles to be an array");
  }

  const related: Article[] = articles.filter(
    (related: Article) => related.category === article.category
  );

  if (!related.length) notFound();

  return { article, related: related.slice(0, 3) };
}

export async function generateStaticParams() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog?page=1&page_size=50`,
    { next: { revalidate: 3600 } }
  ).then((res) => res.json());
  const blogs: Article[] = data.blogs;

  return blogs.map((blog: Article) => ({ id: blog.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  try {
    const { article } = await getArticleAndRelated(id);

    if (!article) {
      return {
        title: "Error",
        description: "An error occurred while fetching metadata.",
      };
    }

    return {
      title: article?.title,
      description: article?.description,
      keywords: article?.keywords || [],
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
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/read/${id}`,
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
  const { article, related } = await getArticleAndRelated(id);

  return (
    <div className="xl:w-1/2 w-full mx-auto p-5 flex flex-col gap-5 mt-5">
      <Suspense fallback={<ReadSkeleton />}>
        <Read article={article} />
      </Suspense>
      <Suspense fallback={<ReadSkeleton />}>
        <Related related={related} />
        <SUbscribe />
      </Suspense>
    </div>
  );
}
