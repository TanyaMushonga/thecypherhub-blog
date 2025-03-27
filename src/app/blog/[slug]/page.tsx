import React, { Suspense } from "react";
import SUbscribe from "@/components/common/Subscribe";
import Related from "@/components/common/related";
import ReadSkeleton from "@/components/common/readSkeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import TableOfContents from "@/components/common/tableOfContents";

const Read = React.lazy(() => import("@/components/common/read"));

export const revalidate = 3600;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

async function getArticleAndRelated(slug: string) {
  const articleRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`,
    { next: { revalidate: 3600 } }
  );
  if (!articleRes.ok) {
    throw new Error(
      `Failed to fetch article with slug ${slug}: ${articleRes.statusText}`
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

  return blogs.map((blog: Article) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  try {
    const { article } = await getArticleAndRelated(slug);

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
            url: article?.coverImgUrl,
            width: 1200,
            height: 630,
            alt: article?.slug,
          },
        ],
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}blog/${slug}`,
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
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { article, related } = await getArticleAndRelated(slug);

  return (
    <div className="xl:w-3/4 w-full mx-auto p-5 flex flex-col gap-5 mt-5">
      <Suspense fallback={<ReadSkeleton />}>
        <div className="flex flex-row gap-20">
          <Read article={article} />
          <TableOfContents content={article?.content} />
        </div>
      </Suspense>
      <Suspense fallback={<ReadSkeleton />}>
        <Related related={related} />
        <SUbscribe />
      </Suspense>
    </div>
  );
}
